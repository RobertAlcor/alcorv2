import { NextRequest, NextResponse } from 'next/server'
import { generateIcs } from '@/lib/ics'
import { supabaseAdmin } from '@/lib/supabase'
import { SITE } from '@/lib/site'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const ref = searchParams.get('ref')

  if (!ref || !/^[A-Z0-9-]+$/i.test(ref)) {
    return NextResponse.json({ error: 'Invalid ref' }, { status: 400 })
  }

  const { data: booking, error } = await supabaseAdmin
    .from('bookings')
    .select('*')
    .eq('ref_number', ref)
    .single()

  if (error || !booking) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const ics = generateIcs({
    uid: `booking-${booking.ref_number}@${SITE.domain}`,
    start: new Date(booking.slot_start),
    end: new Date(booking.slot_end),
    summary: `Erstgespräch ${SITE.brand} – ${booking.topic}`,
    description: `Termin-Referenz: #${booking.ref_number}\nKanal: ${channelLabel(booking.channel)}`,
    location: locationFor(booking.channel),
    organizer: {
      name: SITE.founder.name,
      email: SITE.contact.email,
    },
    attendees: [{ name: booking.name, email: booking.email }],
    url: `${SITE.url}/termin`,
  })

  return new NextResponse(ics, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="termin-${ref}.ics"`,
    },
  })
}

function channelLabel(channel: string): string {
  switch (channel) {
    case 'phone':
      return 'Telefon'
    case 'video':
      return 'Video-Call'
    case 'on-site':
      return 'Vor Ort in Wien'
    default:
      return channel
  }
}

function locationFor(channel: string): string {
  switch (channel) {
    case 'on-site':
      return `${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city}`
    case 'video':
      return 'Video-Call (Link folgt per Mail)'
    case 'phone':
      return 'Telefon (Robert ruft an)'
    default:
      return ''
  }
}
