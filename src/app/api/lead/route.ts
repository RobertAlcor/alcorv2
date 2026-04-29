import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { leadSchema, type LeadInput } from '@/lib/validation'
import { supabaseAdmin } from '@/lib/supabase'
import {
  sendLeadNotification,
  sendLeadCopyToCustomer,
  generateRefNumber,
} from '@/lib/mail'
import { checkRateLimit, getClientIp, isSuspiciousSpeed } from '@/lib/spam-protection'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Erweiterung: copyToCustomer flag (optional)
const extendedSchema = leadSchema.extend({
  copyToCustomer: z.boolean().optional().default(false),
})

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req.headers)
    const rl = checkRateLimit(`lead:${ip}`)
    if (!rl.allowed) {
      return NextResponse.json(
        {
          ok: false,
          error: `Zu viele Anfragen. Bitte versuchen Sie es in ${Math.ceil(rl.retryAfterSeconds / 60)} Minuten wieder.`,
        },
        { status: 429 }
      )
    }

    const body = await req.json()
    const parsed = extendedSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const data = parsed.data

    // Honeypot
    if (data.website && data.website.length > 0) {
      return NextResponse.json({ ok: true, refNumber: 'BOT-FILTERED' })
    }

    // Speed-Check
    const formLoadTime = (body as { formLoadTime?: number })?.formLoadTime
    if (typeof formLoadTime === 'number' && isSuspiciousSpeed(Date.now(), formLoadTime)) {
      return NextResponse.json({ ok: true, refNumber: 'SPEED-FILTERED' })
    }

    const source = req.headers.get('referer') ?? req.headers.get('origin') ?? 'direct'

    const refNumber = generateRefNumber()

    // Persist
    const { error: dbError } = await supabaseAdmin.from('leads').insert({
      ref_number: refNumber,
      name: data.name,
      email: data.email,
      phone: data.phone ?? null,
      company: data.company ?? null,
      topic: data.topic,
      message: data.message,
      source,
    })

    if (dbError) {
      console.error('Supabase insert error:', dbError)
    }

    const leadForMail = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      topic: data.topic,
      message: data.message,
      website: data.website,
      source,
    }

    // Notification an Robert - immer
    const promises: Promise<unknown>[] = [sendLeadNotification(leadForMail, refNumber)]

    // Kopie an Kunde - NUR wenn explizit gewünscht
    if (data.copyToCustomer) {
      promises.push(sendLeadCopyToCustomer(leadForMail, refNumber))
    }

    const results = await Promise.allSettled(promises)
    for (const r of results) {
      if (r.status === 'rejected') {
        console.error('Lead mail failed:', r.reason)
      }
    }

    return NextResponse.json({ ok: true, refNumber })
  } catch (err) {
    console.error('Lead API error:', err)
    return NextResponse.json({ ok: false, error: 'Technischer Fehler.' }, { status: 500 })
  }
}
