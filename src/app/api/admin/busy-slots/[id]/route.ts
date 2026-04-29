import { NextRequest, NextResponse } from 'next/server'
import { isAdminLoggedIn } from '@/lib/admin-auth'
import { supabaseAdmin } from '@/lib/supabase'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function DELETE(
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

  const { error } = await supabaseAdmin.from('busy_slots').delete().eq('id', id)

  if (error) {
    console.error('Busy slot delete failed:', error)
    return NextResponse.json(
      { ok: false, error: 'Löschen fehlgeschlagen' },
      { status: 500 },
    )
  }

  return NextResponse.json({ ok: true })
}
