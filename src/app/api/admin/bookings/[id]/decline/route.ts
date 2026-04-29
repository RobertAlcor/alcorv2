import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { isAdminLoggedIn } from '@/lib/admin-auth'
import { supabaseAdmin } from '@/lib/supabase'
import { sendBookingDeclinedToCustomer } from '@/lib/mail'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const schema = z.object({
  reason: z.string().max(500).optional(),
})

export async function POST(
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

  const body = await req.json().catch(() => ({}))
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'Invalid input' }, { status: 400 })
  }
  const reason = parsed.data.reason ?? ''

  const { data: booking, error: fetchErr } = await supabaseAdmin
    .from('bookings')
    .select('*')
    .eq('id', id)
    .single()

  if (fetchErr || !booking) {
    return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 })
  }

  if (booking.status === 'declined' || booking.status === 'cancelled') {
    return NextResponse.json({ ok: true, alreadyDone: true })
  }

  const { error: updateErr } = await supabaseAdmin
    .from('bookings')
    .update({
      status: 'declined',
      decline_reason: reason || null,
      declined_at: new Date().toISOString(),
    })
    .eq('id', id)

  if (updateErr) {
    console.error('Decline update failed:', updateErr)
    return NextResponse.json(
      { ok: false, error: 'Update fehlgeschlagen.' },
      { status: 500 },
    )
  }

  // Absage-Mail an Kunde
  try {
    await sendBookingDeclinedToCustomer({
      refNumber: booking.ref_number,
      name: booking.name,
      email: booking.email,
      topic: booking.topic,
      slotStart: new Date(booking.slot_start),
      slotEnd: new Date(booking.slot_end),
      reason,
    })
  } catch (err) {
    console.error('Decline mail failed:', err)
  }

  return NextResponse.json({ ok: true })
}
