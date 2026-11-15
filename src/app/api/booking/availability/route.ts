import { NextRequest, NextResponse } from 'next/server'
import {
  generateSlotsForDate,
  BOOKING_CONFIG,
  viennaDateTimeToUtc,
} from '@/lib/booking'
import { supabaseAdmin } from '@/lib/supabase'
import { getWorkingHours } from '@/lib/settings'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const dateParam = new URL(req.url).searchParams.get('date')
  if (!dateParam || !/^\d{4}-\d{2}-\d{2}$/.test(dateParam)) {
    return NextResponse.json(
      { error: 'Invalid date parameter (expected YYYY-MM-DD)' },
      { status: 400 },
    )
  }

  const [year, month, day] = dateParam.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, day, 12))
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() + 1 !== month ||
    date.getUTCDate() !== day
  ) {
    return NextResponse.json({ error: 'Invalid date' }, { status: 400 })
  }

  // Query the full Vienna calendar day, including any overnight overlap.
  const dayStart = viennaDateTimeToUtc(year, month, day, 0)
  const nextDay = new Date(Date.UTC(year, month - 1, day + 1))
  const dayEnd = viennaDateTimeToUtc(
    nextDay.getUTCFullYear(),
    nextDay.getUTCMonth() + 1,
    nextDay.getUTCDate(),
    0,
  )

  try {
    const [bookings, blocks, hours] = await Promise.all([
      supabaseAdmin
        .from('bookings')
        .select('slot_start, slot_end')
        .lt('slot_start', dayEnd.toISOString())
        .gt('slot_end', dayStart.toISOString())
        .not('status', 'in', '(cancelled,declined)'),
      supabaseAdmin
        .from('busy_slots')
        .select('slot_start, slot_end')
        .lt('slot_start', dayEnd.toISOString())
        .gt('slot_end', dayStart.toISOString()),
      getWorkingHours(),
    ])

    // Supabase returns query errors as values, not rejected promises.
    if (bookings.error || blocks.error) {
      console.error('Supabase availability query failed', {
        bookings: bookings.error?.code,
        blocks: blocks.error?.code,
      })
      return NextResponse.json(
        { error: 'Service vorübergehend nicht verfügbar' },
        { status: 503 },
      )
    }

    const slots = generateSlotsForDate(
      date,
      [...(bookings.data ?? []), ...(blocks.data ?? [])],
      {
        workingHourStart: hours.start,
        workingHourEnd: hours.end,
      },
    )
    return NextResponse.json(
      {
        date: dateParam,
        duration: BOOKING_CONFIG.durationMinutes,
        timezone: BOOKING_CONFIG.timezone,
        slots,
      },
      { headers: { 'Cache-Control': 'no-store' } },
    )
  } catch (error) {
    console.error('Supabase availability query failed:', error)
    return NextResponse.json(
      { error: 'Service vorübergehend nicht verfügbar' },
      { status: 503 },
    )
  }
}
