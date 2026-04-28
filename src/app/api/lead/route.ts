import { NextRequest, NextResponse } from 'next/server'
import { leadSchema } from '@/lib/validation'
import { supabaseAdmin } from '@/lib/supabase'
import {
  sendLeadNotification,
  sendLeadAutoReply,
  generateRefNumber,
} from '@/lib/mail'
import {
  checkRateLimit,
  getClientIp,
  isSuspiciousSpeed,
} from '@/lib/spam-protection'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const TURNSTILE_ENABLED = process.env.TURNSTILE_SECRET_KEY ? true : false

export async function POST(req: NextRequest) {
  try {
    // === SPAM-SCHUTZ Schicht 1: Rate-Limit per IP ===
    const ip = getClientIp(req.headers)
    const rateLimit = checkRateLimit(ip)

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          ok: false,
          error: `Zu viele Anfragen. Bitte versuchen Sie es in ${Math.ceil(rateLimit.retryAfterSeconds / 60)} Minuten wieder, oder rufen Sie direkt an.`,
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateLimit.retryAfterSeconds),
          },
        },
      )
    }

    const body = await req.json()
    const parsed = leadSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 },
      )
    }

    const data = parsed.data

    // === SPAM-SCHUTZ Schicht 2: Honeypot ===
    if (data.website && data.website.length > 0) {
      // Bot detected - pretend success
      return NextResponse.json({ ok: true, refNumber: 'BOT-FILTERED' })
    }

    // === SPAM-SCHUTZ Schicht 3: Speed-Check ===
    if (typeof body.formLoadTime === 'number') {
      if (isSuspiciousSpeed(Date.now(), body.formLoadTime)) {
        // Bot pattern - pretend success
        return NextResponse.json({ ok: true, refNumber: 'SPEED-FILTERED' })
      }
    }

    // === SPAM-SCHUTZ Schicht 4 (optional): Cloudflare Turnstile ===
    if (TURNSTILE_ENABLED && body.turnstileToken) {
      const turnstileOk = await verifyTurnstile(body.turnstileToken, ip)
      if (!turnstileOk) {
        return NextResponse.json(
          { ok: false, error: 'Sicherheits-Check fehlgeschlagen.' },
          { status: 403 },
        )
      }
    }

    const source =
      req.headers.get('referer') ?? req.headers.get('origin') ?? 'direct'

    const refNumber = generateRefNumber()

    // === Persist to Supabase ===
    const { data: inserted, error: dbError } = await supabaseAdmin
      .from('leads')
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone ?? null,
        company: data.company ?? null,
        topic: data.topic,
        message: data.message,
        source,
        ref_number: refNumber,
      })
      .select()
      .single()

    if (dbError) {
      console.error('Supabase insert error:', dbError)
      // Continue anyway - mail ist der primäre Channel
    }

    const lead = {
      id: inserted?.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      topic: data.topic,
      message: data.message,
      source,
    }

    // === Mails parallel senden ===
    const [notificationResult, autoReplyResult] = await Promise.allSettled([
      sendLeadNotification(lead, refNumber),
      sendLeadAutoReply(lead, refNumber),
    ])

    if (notificationResult.status === 'rejected') {
      console.error('Notification mail failed:', notificationResult.reason)
      return NextResponse.json(
        {
          ok: false,
          error:
            'E-Mail-Versand fehlgeschlagen. Bitte versuchen Sie es noch einmal oder rufen Sie direkt an.',
        },
        { status: 500 },
      )
    }

    if (autoReplyResult.status === 'rejected') {
      console.error('Auto-reply failed (non-critical):', autoReplyResult.reason)
      // Bestätigungsmail-Failure ist nicht kritisch - Notification an Robert ist raus
    }

    return NextResponse.json({ ok: true, refNumber })
  } catch (err) {
    console.error('Lead API error:', err)
    return NextResponse.json(
      {
        ok: false,
        error: 'Technischer Fehler. Bitte versuchen Sie es erneut.',
      },
      { status: 500 },
    )
  }
}

/**
 * Cloudflare Turnstile Verification
 * Aktiv nur wenn TURNSTILE_SECRET_KEY in env gesetzt ist
 */
async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return true

  try {
    const formData = new FormData()
    formData.append('secret', secret)
    formData.append('response', token)
    formData.append('remoteip', ip)

    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        body: formData,
      },
    )

    const result = (await response.json()) as { success?: boolean }
    return result.success === true
  } catch (err) {
    console.error('Turnstile verification error:', err)
    return false
  }
}
