import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { leadSchema } from '@/lib/validation'
import { supabaseAdmin } from '@/lib/supabase'
import {
  sendLeadNotification,
  sendLeadCopyToCustomer,
  generateRefNumber,
} from '@/lib/mail'
import {
  checkRateLimit,
  getClientIp,
  isSuspiciousSpeed,
} from '@/lib/spam-protection'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

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
        { status: 429 },
      )
    }

    const body = await req.json()
    const parsed = extendedSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 },
      )
    }
    const data = parsed.data

    if (data.website && data.website.length > 0) {
      return NextResponse.json({ ok: true, refNumber: 'BOT-FILTERED' })
    }

    const formLoadTime = (body as { formLoadTime?: number })?.formLoadTime
    if (
      typeof formLoadTime === 'number' &&
      isSuspiciousSpeed(Date.now(), formLoadTime)
    ) {
      return NextResponse.json({ ok: true, refNumber: 'SPEED-FILTERED' })
    }

    const source =
      req.headers.get('referer') ?? req.headers.get('origin') ?? 'direct'
    const refNumber = generateRefNumber()

    const { error: dbError } = await supabaseAdmin.from('leads').insert({
      ref_number: refNumber,
      name: data.name,
      email: data.email,
      phone: data.phone ?? null,
      company: data.company ?? null,
      topic: data.topic,
      message: data.message,
      package_interest: data.package_interest ?? null,
      existing_website: data.existing_website ?? null,
      source,
    })
    if (dbError) {
      console.error('Supabase insert error:', dbError)
    }

    // Die bestehende Mailvorlage verwendet einen engeren Themenkatalog.
    // IT-Service bleibt in der Datenbank separat auswertbar; in der Mail
    // identifiziert der vorausgefüllte Angebotstitel die konkrete Leistung.
    const mailTopic = data.topic === 'it-service' ? 'other' : data.topic
    const leadForMail = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      topic: mailTopic,
      message: data.message,
      website: data.website,
      package_interest: data.package_interest,
      existing_website: data.existing_website,
      source,
    }

    const promises = [sendLeadNotification(leadForMail, refNumber)]

    if (data.copyToCustomer) {
      promises.push(sendLeadCopyToCustomer(leadForMail, refNumber))
    }

    const results = await Promise.allSettled(promises)
    for (const result of results) {
      if (result.status === 'rejected') {
        console.error('Lead mail failed:', result.reason)
      } else if (result.value.error) {
        console.error('Lead mail failed:', result.value.error)
      }
    }

    const ownerMail = results[0]
    const ownerMailAccepted =
      ownerMail?.status === 'fulfilled' &&
      !ownerMail.value.error &&
      Boolean(ownerMail.value.data?.id)

    if (dbError && !ownerMailAccepted) {
      return NextResponse.json(
        {
          ok: false,
          error:
            'Ihre Anfrage konnte nicht sicher übermittelt werden. Bitte rufen Sie uns an oder versuchen Sie es später erneut.',
        },
        { status: 503 },
      )
    }

    return NextResponse.json({ ok: true, refNumber })
  } catch (error) {
    console.error('Lead API error:', error)
    return NextResponse.json(
      { ok: false, error: 'Technischer Fehler.' },
      { status: 500 },
    )
  }
}
