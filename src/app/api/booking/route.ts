import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import {
  validateSlot,
  findAlternativeSlots,
  BOOKING_CONFIG,
} from '@/lib/booking'
import { generateIcs } from '@/lib/ics'
import { supabaseAdmin } from '@/lib/supabase'
import {
  sendBookingNotification,
  sendBookingAutoReply,
  generateRefNumber,
} from '@/lib/mail'
import {
  checkRateLimit,
  getClientIp,
  isSuspiciousSpeed,
} from '@/lib/spam-protection'
import { SITE } from '@/lib/site'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const bookingSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(200),
  phone: z.string().min(5).max(40),
  topic: z.string().min(2).max(120),
  message: z.string().max(2000).optional().or(z.literal('')),
  channel: z.enum(['phone', 'on-site-office', 'on-site-external']),
  externalAddress: z.string().max(200).optional().or(z.literal('')),
  slotStart: z.string(),
  source: z.string().max(80).default('termin-page'),
  website: z.string().max(0).optional().or(z.literal('')),
  formLoadTime: z.number().optional(),
})

export async function POST(req: NextRequest) {
  try {
    // Rate-Limit
    const ip = getClientIp(req.headers)
    const rl = checkRateLimit(`booking:${ip}`)
    if (!rl.allowed) {
      return NextResponse.json(
        {
          ok: false,
          error: `Zu viele Buchungsversuche. Bitte versuchen Sie es in ${Math.ceil(rl.retryAfterSeconds / 60)} Minuten wieder, oder rufen Sie direkt an.`,
        },
        {
          status: 429,
          headers: { 'Retry-After': String(rl.retryAfterSeconds) },
        },
      )
    }

    const body = await req.json()
    const parsed = bookingSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Ungültige Eingaben.',
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      )
    }

    const data = parsed.data

    // Honeypot
    if (data.website && data.website.length > 0) {
      return NextResponse.json({ ok: true, refNumber: 'BOT-FILTERED' })
    }

    // Speed
    if (
      typeof data.formLoadTime === 'number' &&
      isSuspiciousSpeed(Date.now(), data.formLoadTime)
    ) {
      return NextResponse.json({ ok: true, refNumber: 'SPEED-FILTERED' })
    }

    if (
      data.channel === 'on-site-external' &&
      (!data.externalAddress || data.externalAddress.trim().length < 5)
    ) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Bitte geben Sie die Adresse für den Termin ein.',
        },
        { status: 400 },
      )
    }

    // Slot validieren (immer 60 Min)
    const slotCheck = validateSlot(data.slotStart)
    if (!slotCheck.valid || !slotCheck.start || !slotCheck.end) {
      return NextResponse.json(
        { ok: false, error: slotCheck.reason ?? 'Ungültiger Slot.' },
        { status: 400 },
      )
    }

    // Konflikt-Check: irgendein bestehendes Booking im Range?
    const { data: overlapping } = await supabaseAdmin
      .from('bookings')
      .select('slot_start, slot_end')
      .lt('slot_start', slotCheck.end.toISOString())
      .gt('slot_end', slotCheck.start.toISOString())
      .neq('status', 'cancelled')
      .limit(1)

    if (overlapping && overlapping.length > 0) {
      const alternatives = await findAlternativeSlots(
        slotCheck.start,
        async (dayStart, dayEnd) => {
          const [bRes, sRes] = await Promise.all([
            supabaseAdmin
              .from('bookings')
              .select('slot_start, slot_end')
              .gte('slot_start', dayStart.toISOString())
              .lte('slot_start', dayEnd.toISOString())
              .neq('status', 'cancelled'),
            supabaseAdmin
              .from('busy_slots')
              .select('slot_start, slot_end')
              .gte('slot_start', dayStart.toISOString())
              .lte('slot_start', dayEnd.toISOString()),
          ])
          return [...(bRes.data ?? []), ...(sRes.data ?? [])]
        },
        3,
      )

      return NextResponse.json(
        { ok: false, error: 'Slot bereits vergeben.', alternatives },
        { status: 409 },
      )
    }

    const refNumber = generateRefNumber()

    // Persist
    const { error: dbError } = await supabaseAdmin.from('bookings').insert({
      ref_number: refNumber,
      name: data.name,
      email: data.email,
      phone: data.phone,
      topic: data.topic,
      message: data.message || null,
      channel: data.channel,
      external_address:
        data.channel === 'on-site-external' ? data.externalAddress : null,
      duration_minutes: BOOKING_CONFIG.durationMinutes,
      slot_start: slotCheck.start.toISOString(),
      slot_end: slotCheck.end.toISOString(),
      status: 'confirmed',
      source: data.source,
    })

    if (dbError) {
      const code = (dbError as { code?: string }).code
      if (code === '23505') {
        const alternatives = await findAlternativeSlots(
          slotCheck.start,
          async (dayStart, dayEnd) => {
            const [bRes, sRes] = await Promise.all([
              supabaseAdmin
                .from('bookings')
                .select('slot_start, slot_end')
                .gte('slot_start', dayStart.toISOString())
                .lte('slot_start', dayEnd.toISOString())
                .neq('status', 'cancelled'),
              supabaseAdmin
                .from('busy_slots')
                .select('slot_start, slot_end')
                .gte('slot_start', dayStart.toISOString())
                .lte('slot_start', dayEnd.toISOString()),
            ])
            return [...(bRes.data ?? []), ...(sRes.data ?? [])]
          },
          3,
        )
        return NextResponse.json(
          { ok: false, error: 'Slot bereits vergeben.', alternatives },
          { status: 409 },
        )
      }
      console.error('Booking DB insert failed:', dbError)
      return NextResponse.json(
        { ok: false, error: 'Speichern fehlgeschlagen.' },
        { status: 500 },
      )
    }

    // ICS
    const ics = generateIcs({
      uid: `booking-${refNumber}@${SITE.domain}`,
      start: slotCheck.start,
      end: slotCheck.end,
      summary: `Erstgespräch ${SITE.brand} – ${data.topic}`,
      description: `Termin-Referenz: #${refNumber}\nKanal: ${channelLabel(data.channel)}${data.message ? '\n\n' + data.message : ''}`,
      location: locationFor(data.channel, data.externalAddress),
      organizer: {
        name: SITE.founder.name,
        email: SITE.contact.email,
      },
      attendees: [{ name: data.name, email: data.email }],
      url: `${SITE.url}/termin`,
    })

    // Mails
    const bookingForMail = {
      refNumber,
      name: data.name,
      email: data.email,
      phone: data.phone,
      topic: data.topic,
      message: data.message || '',
      channel: data.channel,
      externalAddress: data.externalAddress || '',
      slotStart: slotCheck.start,
      slotEnd: slotCheck.end,
    }

    const [notif, autoReply] = await Promise.allSettled([
      sendBookingNotification(bookingForMail, ics),
      sendBookingAutoReply(bookingForMail, ics),
    ])

    if (notif.status === 'rejected') {
      console.error('Booking notification mail failed:', notif.reason)
    }
    if (autoReply.status === 'rejected') {
      console.error('Booking auto-reply failed:', autoReply.reason)
    }

    return NextResponse.json({
      ok: true,
      refNumber,
      slotStart: slotCheck.start.toISOString(),
      slotEnd: slotCheck.end.toISOString(),
    })
  } catch (err) {
    console.error('Booking API error:', err)
    return NextResponse.json(
      { ok: false, error: 'Technischer Fehler.' },
      { status: 500 },
    )
  }
}

function channelLabel(channel: string): string {
  switch (channel) {
    case 'phone':
      return 'Telefon'
    case 'on-site-office':
      return 'Im Büro (1220 Wien)'
    case 'on-site-external':
      return 'Vor Ort beim Kunden'
    default:
      return channel
  }
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
