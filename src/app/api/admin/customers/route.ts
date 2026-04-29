import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { isAdminLoggedIn } from '@/lib/admin-auth'
import { supabaseAdmin } from '@/lib/supabase'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const querySchema = z.object({
  q: z.string().min(2).max(100),
})

type CustomerHit = {
  source: 'lead' | 'booking'
  id: string
  ref_number: string
  name: string
  email: string
  phone: string | null
  topic: string
  status: string
  created_at: string
  // Booking-spezifisch
  slot_start?: string
}

export async function GET(req: NextRequest) {
  if (!(await isAdminLoggedIn())) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  const url = new URL(req.url)
  const parsed = querySchema.safeParse({ q: url.searchParams.get('q') ?? '' })
  if (!parsed.success) {
    return NextResponse.json({ ok: false, hits: [] })
  }

  const q = parsed.data.q.trim()
  // ILIKE-Pattern für case-insensitive Suche
  const pattern = `%${q.replace(/[%_]/g, '\\$&')}%`

  // Parallel suchen in leads und bookings
  const [leadsRes, bookingsRes] = await Promise.all([
    supabaseAdmin
      .from('leads')
      .select(
        'id, ref_number, name, email, phone, topic, status, created_at',
      )
      .or(`name.ilike.${pattern},email.ilike.${pattern}`)
      .order('created_at', { ascending: false })
      .limit(20),
    supabaseAdmin
      .from('bookings')
      .select(
        'id, ref_number, name, email, phone, topic, status, created_at, slot_start',
      )
      .or(`name.ilike.${pattern},email.ilike.${pattern}`)
      .order('created_at', { ascending: false })
      .limit(20),
  ])

  const hits: CustomerHit[] = []

  if (leadsRes.data) {
    for (const l of leadsRes.data) {
      hits.push({
        source: 'lead',
        id: l.id as string,
        ref_number: (l.ref_number as string) ?? '–',
        name: l.name as string,
        email: l.email as string,
        phone: (l.phone as string | null) ?? null,
        topic: l.topic as string,
        status: l.status as string,
        created_at: l.created_at as string,
      })
    }
  }

  if (bookingsRes.data) {
    for (const b of bookingsRes.data) {
      hits.push({
        source: 'booking',
        id: b.id as string,
        ref_number: b.ref_number as string,
        name: b.name as string,
        email: b.email as string,
        phone: (b.phone as string | null) ?? null,
        topic: b.topic as string,
        status: b.status as string,
        created_at: b.created_at as string,
        slot_start: b.slot_start as string,
      })
    }
  }

  // Nach created_at absteigend sortieren
  hits.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  )

  return NextResponse.json({ ok: true, hits })
}
