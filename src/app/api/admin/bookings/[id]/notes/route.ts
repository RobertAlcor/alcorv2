import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { isAdminLoggedIn } from '@/lib/admin-auth'
import { supabaseAdmin } from '@/lib/supabase'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const schema = z.object({
  notes: z.string().max(5000),
})

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminLoggedIn())) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  if (!id || !/^[0-9a-f-]+$/i.test(id)) {
    return NextResponse.json({ ok: false, error: 'Invalid id' }, { status: 400 })
  }

  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'Invalid notes' }, { status: 400 })
  }

  const { error } = await supabaseAdmin
    .from('bookings')
    .update({ admin_notes: parsed.data.notes || null })
    .eq('id', id)

  if (error) {
    console.error('Booking notes update failed:', error)
    return NextResponse.json(
      { ok: false, error: 'Update fehlgeschlagen' },
      { status: 500 },
    )
  }

  return NextResponse.json({ ok: true })
}
