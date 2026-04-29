import { NextRequest, NextResponse } from 'next/server'
import { isAdminLoggedIn } from '@/lib/admin-auth'
import { supabaseAdmin } from '@/lib/supabase'
import { sendBookingConfirmedToCustomer } from '@/lib/mail'
import { generateIcs } from '@/lib/ics'
import { SITE } from '@/lib/site'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? SITE.url

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminLoggedIn())) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  if (!id || !/^[0-9a-f-]+$/i.test(id)) {
    return NextResponse.json({ ok: false, error: 'Invalid id' }, { status: 400 })
  }

  // Booking holen
  const { data: booking, error: fetchErr } = await supabaseAdmin
    .from('bookings')
    .select('*')
    .eq('id', id)
    .single()

  if (fetchErr || !booking) {
    return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 })
  }

  if (booking.status === 'confirmed') {
    return NextResponse.json({ ok: true, alreadyConfirmed: true })
  }

  if (booking.status !== 'pending') {
    return NextResponse.json(
      { ok: false, error: `Status ist '${booking.status}', kann nicht bestätigt werden.` },
      { status: 400 },
    )
  }

  // Status auf confirmed setzen
  const { error: updateErr } = await supabaseAdmin
    .from('bookings')
    .update({
      status: 'confirmed',
      approved_at: new Date().toISOString(),
    })
    .eq('id', id)

  if (updateErr) {
    console.error('Approve update failed:', updateErr)
    return NextResponse.json(
      { ok: false, error: 'Update fehlgeschlagen.' },
      { status: 500 },
    )
  }

  // ICS für Mail
  const ics = generateIcs({
    uid: `booking-${booking.ref_number}@${SITE.domain}`,
    start: new Date(booking.slot_start),
    end: new Date(booking.slot_end),
    summary: `Erstgespräch ${SITE.brand} – ${booking.topic}`,
    description: `Termin-Referenz: #${booking.ref_number}`,
    location: locationFor(booking.channel, booking.external_address),
    organizer: { name: SITE.founder.name, email: SITE.contact.email },
    attendees: [{ name: booking.name, email: booking.email }],
    url: `${siteUrl}/termin`,
  })

  // Bestätigungs-Mail an Kunde
  try {
    await sendBookingConfirmedToCustomer(
      {
        refNumber: booking.ref_number,
        name: booking.name,
        email: booking.email,
        phone: booking.phone,
        topic: booking.topic,
        message: booking.message ?? '',
        channel: booking.channel,
        externalAddress: booking.external_address ?? '',
        slotStart: new Date(booking.slot_start),
        slotEnd: new Date(booking.slot_end),
      },
      ics,
    )
  } catch (err) {
    console.error('Confirmation mail failed:', err)
    // Status bleibt confirmed - Mail-Fehler ist nicht kritisch
  }

  return NextResponse.json({ ok: true })
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
