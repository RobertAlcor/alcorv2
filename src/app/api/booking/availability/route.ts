import { NextRequest, NextResponse } from 'next/server'
import { generateSlotsForDate, BOOKING_CONFIG } from '@/lib/booking'
import { supabaseAdmin } from '@/lib/supabase'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const dateParam = searchParams.get('date')

  if (!dateParam || !/^\d{4}-\d{2}-\d{2}$/.test(dateParam)) {
    return NextResponse.json(
      { error: 'Invalid date parameter (expected YYYY-MM-DD)' },
      { status: 400 },
    )
  }

  const [year, month, day] = dateParam.split('-').map(Number)
  if (!year || !month || !day) {
    return NextResponse.json({ error: 'Invalid date' }, { status: 400 })
  }
  const date = new Date(year, month - 1, day)

  const dayStart = new Date(date)
  dayStart.setHours(0, 0, 0, 0)
  const dayEnd = new Date(date)
  dayEnd.setHours(23, 59, 59, 999)

  let busyFromBookings: { slot_start: string; slot_end: string }[] = []
  let busyFromBlocks: { slot_start: string; slot_end: string }[] = []

  try {
    const { data: bookings } = await supabaseAdmin
      .from('bookings')
      .select('slot_start, slot_end')
      .gte('slot_start', dayStart.toISOString())
      .lte('slot_start', dayEnd.toISOString())
      .neq('status', 'cancelled')
    busyFromBookings = bookings ?? []

    const { data: blocks } = await supabaseAdmin
      .from('busy_slots')
      .select('slot_start, slot_end')
      .gte('slot_start', dayStart.toISOString())
      .lte('slot_start', dayEnd.toISOString())
    busyFromBlocks = blocks ?? []
  } catch (err) {
    console.error('Supabase availability query failed:', err)
    return NextResponse.json(
      { error: 'Service vorübergehend nicht verfügbar' },
      { status: 503 },
    )
  }

  const allBusy = [...busyFromBookings, ...busyFromBlocks]
  const slots = generateSlotsForDate(date, allBusy)

  return NextResponse.json(
    {
      date: dateParam,
      duration: BOOKING_CONFIG.durationMinutes,
      timezone: BOOKING_CONFIG.timezone,
      slots,
    },
    { headers: { 'Cache-Control': 'no-store' } },
  )
}
