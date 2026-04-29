import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { isAdminLoggedIn } from '@/lib/admin-auth'
import { getWorkingHours, setWorkingHours } from '@/lib/settings'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  if (!(await isAdminLoggedIn())) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  const hours = await getWorkingHours()
  return NextResponse.json({ ok: true, hours })
}

const schema = z.object({
  start: z.number().int().min(0).max(23),
  end: z.number().int().min(1).max(24),
})

export async function PATCH(req: NextRequest) {
  if (!(await isAdminLoggedIn())) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'Werte müssen Zahlen 0-24 sein' },
      { status: 400 },
    )
  }

  if (parsed.data.start >= parsed.data.end) {
    return NextResponse.json(
      { ok: false, error: 'Anfang muss vor Ende liegen' },
      { status: 400 },
    )
  }

  try {
    await setWorkingHours(parsed.data)
    return NextResponse.json({ ok: true, hours: parsed.data })
  } catch (err) {
    console.error('Working hours save failed:', err)
    return NextResponse.json(
      { ok: false, error: 'Speichern fehlgeschlagen' },
      { status: 500 },
    )
  }
}
