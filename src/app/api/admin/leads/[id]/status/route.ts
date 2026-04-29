import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { isAdminLoggedIn } from '@/lib/admin-auth'
import { supabaseAdmin } from '@/lib/supabase'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const schema = z.object({
  status: z.enum(['new', 'contacted', 'qualified', 'won', 'lost']),
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
    return NextResponse.json({ ok: false, error: 'Invalid status' }, { status: 400 })
  }

  const updateData: { status: string; last_contact_at?: string } = {
    status: parsed.data.status,
  }

  // Wenn Status auf 'contacted' oder weiter: last_contact_at aktualisieren
  if (parsed.data.status !== 'new') {
    updateData.last_contact_at = new Date().toISOString()
  }

  const { error } = await supabaseAdmin
    .from('leads')
    .update(updateData)
    .eq('id', id)

  if (error) {
    console.error('Lead status update failed:', error)
    return NextResponse.json(
      { ok: false, error: 'Update fehlgeschlagen' },
      { status: 500 },
    )
  }

  return NextResponse.json({ ok: true })
}
