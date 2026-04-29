import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import {
  verifyPassword,
  createSessionToken,
  getSessionCookieOptions,
} from '@/lib/admin-auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const schema = z.object({
  password: z.string().min(1),
})

// Anti-Brute-Force: Rate-Limit pro IP
const attempts = new Map<string, { count: number; resetAt: number }>()
const MAX_ATTEMPTS = 5
const WINDOW_MS = 15 * 60 * 1000 // 15 Min

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now()
  const rec = attempts.get(ip)
  if (!rec || now > rec.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return { allowed: true }
  }
  if (rec.count >= MAX_ATTEMPTS) {
    return {
      allowed: false,
      retryAfter: Math.ceil((rec.resetAt - now) / 1000),
    }
  }
  rec.count++
  return { allowed: true }
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'

  const rl = checkRateLimit(ip)
  if (!rl.allowed) {
    return NextResponse.json(
      {
        ok: false,
        error: `Zu viele Login-Versuche. In ${Math.ceil((rl.retryAfter ?? 0) / 60)} Minuten erneut versuchen.`,
      },
      { status: 429 },
    )
  }

  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'Bitte Passwort eingeben.' },
      { status: 400 },
    )
  }

  if (!verifyPassword(parsed.data.password)) {
    return NextResponse.json(
      { ok: false, error: 'Falsches Passwort.' },
      { status: 401 },
    )
  }

  const token = createSessionToken()
  const opts = getSessionCookieOptions()

  const res = NextResponse.json({ ok: true })
  res.cookies.set(opts.name, token, opts)
  return res
}
