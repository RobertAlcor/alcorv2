import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { isAdminLoggedIn } from '@/lib/admin-auth'
import { supabaseAdmin } from '@/lib/supabase'
import { BOOKING_CONFIG } from '@/lib/booking'
import {
  sendBookingConfirmedToCustomer,
  generateRefNumber,
} from '@/lib/mail'
import { generateIcs } from '@/lib/ics'
import { SITE } from '@/lib/site'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? SITE.url

const schema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(200),
  phone: z.string().min(5).max(40),
  topic: z.string().min(2).max(120),
  message: z.string().max(2000).optional().or(z.literal('')),
  channel: z.enum(['phone', 'on-site-office', 'on-site-external']),
  externalAddress: z.string().max(200).optional().or(z.literal('')),
  slotStart: z.string(), // ISO
  durationMinutes: z.number().int().min(15).max(480).optional(),
  adminNotes: z.string().max(5000).optional().or(z.literal('')),
  sendCustomerMail: z.boolean().default(false),
})

export async function POST(req: NextRequest) {
  if (!(await isAdminLoggedIn())) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'Ungültige Eingaben', details: parsed.error.flatten() },
      { status: 400 },
    )
  }
  const data = parsed.data

  if (
    data.channel === 'on-site-external' &&
    (!data.externalAddress || data.externalAddress.trim().length < 5)
  ) {
    return NextResponse.json(
      { ok: false, error: 'Adresse für den Termin fehlt.' },
      { status: 400 },
    )
  }

  const start = new Date(data.slotStart)
  if (isNaN(start.getTime())) {
    return NextResponse.json(
      { ok: false, error: 'Ungültiges Datum' },
      { status: 400 },
    )
  }
  const durationMinutes = data.durationMinutes ?? BOOKING_CONFIG.durationMinutes
  const end = new Date(start.getTime() + durationMinutes * 60 * 1000)

  // Konflikt-Check (überlappende non-cancelled bookings)
  const { data: overlapping } = await supabaseAdmin
    .from('bookings')
    .select('slot_start, slot_end, ref_number')
    .lt('slot_start', end.toISOString())
    .gt('slot_end', start.toISOString())
    .not('status', 'in', '(cancelled,declined)')
    .limit(1)

  if (overlapping && overlapping.length > 0) {
    return NextResponse.json(
      {
        ok: false,
        error: `Slot überschneidet sich mit Termin #${overlapping[0]?.ref_number ?? '?'}`,
      },
      { status: 409 },
    )
  }

  const refNumber = generateRefNumber()

  // Direkt als 'confirmed' inserten (Robert legt selber an)
  const { data: insertedBooking, error: dbError } = await supabaseAdmin
    .from('bookings')
    .insert({
      ref_number: refNumber,
      name: data.name,
      email: data.email,
      phone: data.phone,
      topic: data.topic,
      message: data.message || null,
      channel: data.channel,
      external_address:
        data.channel === 'on-site-external' ? data.externalAddress : null,
      duration_minutes: durationMinutes,
      slot_start: start.toISOString(),
      slot_end: end.toISOString(),
      status: 'confirmed',
      approved_at: new Date().toISOString(),
      admin_notes: data.adminNotes || null,
      source: 'admin-manual',
    })
    .select()
    .single()

  if (dbError) {
    const code = (dbError as { code?: string }).code
    if (code === '23505') {
      return NextResponse.json(
        { ok: false, error: 'Slot bereits vergeben.' },
        { status: 409 },
      )
    }
    console.error('Manual booking insert failed:', dbError)
    return NextResponse.json(
      { ok: false, error: 'Speichern fehlgeschlagen.' },
      { status: 500 },
    )
  }

  // Optional Bestätigungs-Mail an Kunde mit ICS
  if (data.sendCustomerMail && insertedBooking) {
    try {
      const ics = generateIcs({
        uid: `booking-${refNumber}@${SITE.domain}`,
        start,
        end,
        summary: `Erstgespräch ${SITE.brand} – ${data.topic}`,
        description: `Termin-Referenz: #${refNumber}`,
        location: locationFor(data.channel, data.externalAddress),
        organizer: { name: SITE.founder.name, email: SITE.contact.email },
        attendees: [{ name: data.name, email: data.email }],
        url: `${siteUrl}/termin`,
      })

      await sendBookingConfirmedToCustomer(
        {
          refNumber,
          name: data.name,
          email: data.email,
          phone: data.phone,
          topic: data.topic,
          message: data.message || '',
          channel: data.channel,
          externalAddress: data.externalAddress || '',
          slotStart: start,
          slotEnd: end,
        },
        ics,
      )
    } catch (err) {
      console.error('Manual booking confirmation mail failed:', err)
      // Termin bleibt confirmed, Mail-Fehler ist nicht kritisch
    }
  }

  return NextResponse.json({ ok: true, refNumber, id: insertedBooking?.id })
}

function locationFor(channel: string, externalAddress?: string): string {
  switch (channel) {
    case 'on-site-office':
      return `${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city}`
    case 'on-site-external':
      return externalAddress || 'Adresse wird vor dem Termin geklärt'
    case 'phone':
      return 'Telefon (Robert ruft an)'
    default:
      return ''
  }
}
