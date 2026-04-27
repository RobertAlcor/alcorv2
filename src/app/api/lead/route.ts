import { NextRequest, NextResponse } from 'next/server'
import { leadSchema } from '@/lib/validation'
import { supabaseAdmin } from '@/lib/supabase'
import { sendLeadNotification, sendLeadAutoReply } from '@/lib/mail'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = leadSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const data = parsed.data

    // Honeypot check
    if (data.website && data.website.length > 0) {
      // Pretend success to fool bots
      return NextResponse.json({ ok: true })
    }

    const source =
      req.headers.get('referer') ?? req.headers.get('origin') ?? 'direct'

    // Persist to Supabase
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
      })
      .select()
      .single()

    if (dbError) {
      console.error('Supabase insert error:', dbError)
      // Continue anyway - mail is the primary delivery channel
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

    // Fire mails in parallel, don't block on auto-reply failure
    const [notificationResult, autoReplyResult] = await Promise.allSettled([
      sendLeadNotification(lead),
      sendLeadAutoReply(lead),
    ])

    if (notificationResult.status === 'rejected') {
      console.error('Notification mail failed:', notificationResult.reason)
      return NextResponse.json(
        { ok: false, error: 'Mail delivery failed' },
        { status: 500 }
      )
    }

    if (autoReplyResult.status === 'rejected') {
      console.error('Auto-reply failed (non-critical):', autoReplyResult.reason)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Lead API error:', err)
    return NextResponse.json(
      { ok: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
