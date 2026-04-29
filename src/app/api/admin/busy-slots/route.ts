import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { isAdminLoggedIn } from '@/lib/admin-auth'
import { supabaseAdmin } from '@/lib/supabase'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// GET: Liste aller zukünftigen Busy-Slots
export async function GET() {
  if (!(await isAdminLoggedIn())) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await supabaseAdmin
    .from('busy_slots')
    .select('id, slot_start, slot_end, reason, created_at')
    .gte('slot_start', new Date().toISOString())
    .order('slot_start', { ascending: true })

  if (error) {
    console.error('Busy slots fetch failed:', error)
    return NextResponse.json(
      { ok: false, error: 'Laden fehlgeschlagen' },
      { status: 500 },
    )
  }

  return NextResponse.json({ ok: true, slots: data ?? [] })
}

// POST: Einzelner Slot oder Bereich
const schema = z.object({
  // Einzelner Slot mit konkreten Stunden
  startIso: z.string(),
  endIso: z.string(),
  reason: z.string().max(200).optional().or(z.literal('')),
  // Bei Bereich: split per Tag (rangeMode=true → mehrere inserts)
  rangeMode: z.boolean().default(false),
})

export async function POST(req: NextRequest) {
  if (!(await isAdminLoggedIn())) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'Ungültige Eingaben' },
      { status: 400 },
    )
  }

  const start = new Date(parsed.data.startIso)
  const end = new Date(parsed.data.endIso)

  if (
    isNaN(start.getTime()) ||
    isNaN(end.getTime()) ||
    end <= start
  ) {
    return NextResponse.json(
      { ok: false, error: 'Ungültiger Zeitraum' },
      { status: 400 },
    )
  }

  const reason = parsed.data.reason || null

  // Wenn rangeMode: für jeden Tag im Range einen separaten Slot anlegen
  // (00:00-23:59 jeweils) - macht Lösch-Operation einfacher
  if (parsed.data.rangeMode) {
    const inserts: { slot_start: string; slot_end: string; reason: string | null }[] = []
    const cursor = new Date(start)
    cursor.setHours(0, 0, 0, 0)
    const endDay = new Date(end)
    endDay.setHours(23, 59, 59, 999)

    while (cursor <= endDay) {
      const dayStart = new Date(cursor)
      dayStart.setHours(0, 0, 0, 0)
      const dayEnd = new Date(cursor)
      dayEnd.setHours(23, 59, 59, 999)
      inserts.push({
        slot_start: dayStart.toISOString(),
        slot_end: dayEnd.toISOString(),
        reason,
      })
      cursor.setDate(cursor.getDate() + 1)
    }

    const { error } = await supabaseAdmin.from('busy_slots').insert(inserts)
    if (error) {
      console.error('Busy slots range insert failed:', error)
      return NextResponse.json(
        { ok: false, error: 'Speichern fehlgeschlagen' },
        { status: 500 },
      )
    }
    return NextResponse.json({ ok: true, count: inserts.length })
  }

  // Einzelner Slot
  const { error } = await supabaseAdmin.from('busy_slots').insert({
    slot_start: start.toISOString(),
    slot_end: end.toISOString(),
    reason,
  })

  if (error) {
    console.error('Busy slot insert failed:', error)
    return NextResponse.json(
      { ok: false, error: 'Speichern fehlgeschlagen' },
      { status: 500 },
    )
  }

  return NextResponse.json({ ok: true, count: 1 })
}
