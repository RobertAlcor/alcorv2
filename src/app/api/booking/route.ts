import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { randomBytes } from 'crypto'
import {
  validateSlot,
  findAlternativeSlots,
  BOOKING_CONFIG,
} from '@/lib/booking'
import { supabaseAdmin } from '@/lib/supabase'
import {
  sendBookingPendingToAdmin,
  generateRefNumber,
} from '@/lib/mail'
import {
  checkRateLimit,
  getClientIp,
  isSuspiciousSpeed,
} from '@/lib/spam-protection'
import { getWorkingHours } from '@/lib/settings'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const bookingSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(200),
  phone: z.string().min(5).max(40),
  topic: z.string().min(2).max(120),
  message: z.string().max(2000).optional().or(z.literal('')),
  channel: z.enum(['phone', 'on-site-office', 'on-site-external']),
  externalAddress: z.string().max(200).optional().or(z.literal('')),
  slotStart: z.string(),
  source: z.string().max(80).default('termin-page'),
  website: z.string().max(0).optional().or(z.literal('')),
  formLoadTime: z.number().optional(),
})

function generateApprovalToken(): string {
  return randomBytes(24).toString('hex')
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req.headers)
    const rl = checkRateLimit(`booking:${ip}`)
    if (!rl.allowed) {
      return NextResponse.json(
        {
          ok: false,
          error: `Zu viele Buchungsversuche. Bitte versuchen Sie es in ${Math.ceil(rl.retryAfterSeconds / 60)} Minuten wieder, oder rufen Sie direkt an.`,
        },
        {
          status: 429,
          headers: { 'Retry-After': String(rl.retryAfterSeconds) },
        },
      )
    }

    const body = await req.json()
    const parsed = bookingSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: 'Ungültige Eingaben.' },
        { status: 400 },
      )
    }

    const data = parsed.data

    if (data.website && data.website.length > 0) {
      return NextResponse.json({ ok: true, refNumber: 'BOT-FILTERED' })
    }
    if (
      typeof data.formLoadTime === 'number' &&
      isSuspiciousSpeed(Date.now(), data.formLoadTime)
    ) {
      return NextResponse.json({ ok: true, refNumber: 'SPEED-FILTERED' })
    }

    if (
      data.channel === 'on-site-external' &&
      (!data.externalAddress || data.externalAddress.trim().length < 5)
    ) {
      return NextResponse.json(
        { ok: false, error: 'Bitte geben Sie die Adresse für den Termin ein.' },
        { status: 400 },
      )
    }

    // Working-Hours aus DB laden (mit Fallback auf BOOKING_CONFIG)
    const wh = await getWorkingHours()
    const slotConfig = {
      workingHourStart: wh.start,
      workingHourEnd: wh.end,
    }

    const slotCheck = validateSlot(data.slotStart, slotConfig)
    if (!slotCheck.valid || !slotCheck.start || !slotCheck.end) {
      return NextResponse.json(
        { ok: false, error: slotCheck.reason ?? 'Ungültiger Slot.' },
        { status: 400 },
      )
    }

    // Konflikt-Check (überlappende non-cancelled bookings)
    const { data: overlapping } = await supabaseAdmin
      .from('bookings')
      .select('slot_start, slot_end')
      .lt('slot_start', slotCheck.end.toISOString())
      .gt('slot_end', slotCheck.start.toISOString())
      .not('status', 'in', '(cancelled,declined)')
      .limit(1)

    if (overlapping && overlapping.length > 0) {
      const alternatives = await findAlternativeSlots(
        slotCheck.start,
        async (dayStart: Date, dayEnd: Date) => {
          const [bRes, sRes] = await Promise.all([
            supabaseAdmin
              .from('bookings')
              .select('slot_start, slot_end')
              .gte('slot_start', dayStart.toISOString())
              .lte('slot_start', dayEnd.toISOString())
              .not('status', 'in', '(cancelled,declined)'),
            supabaseAdmin
              .from('busy_slots')
              .select('slot_start, slot_end')
              .gte('slot_start', dayStart.toISOString())
              .lte('slot_start', dayEnd.toISOString()),
          ])
          return [...(bRes.data ?? []), ...(sRes.data ?? [])]
        },
        3,
        slotConfig,
      )
      return NextResponse.json(
        { ok: false, error: 'Slot bereits vergeben.', alternatives },
        { status: 409 },
      )
    }

    const refNumber = generateRefNumber()
    const approvalToken = generateApprovalToken()

    // Persist mit pending-Status
    const { error: dbError } = await supabaseAdmin.from('bookings').insert({
      ref_number: refNumber,
      name: data.name,
      email: data.email,
      phone: data.phone,
      topic: data.topic,
      message: data.message || null,
      channel: data.channel,
      external_address:
        data.channel === 'on-site-external' ? data.externalAddress : null,
      duration_minutes: BOOKING_CONFIG.durationMinutes,
      slot_start: slotCheck.start.toISOString(),
      slot_end: slotCheck.end.toISOString(),
      status: 'pending',
      approval_token: approvalToken,
      source: data.source,
    })

    if (dbError) {
      const code = (dbError as { code?: string }).code
      if (code === '23505') {
        return NextResponse.json(
          { ok: false, error: 'Slot bereits vergeben.' },
          { status: 409 },
        )
      }
      console.error('Booking DB insert failed:', dbError)
      return NextResponse.json(
        { ok: false, error: 'Speichern fehlgeschlagen.' },
        { status: 500 },
      )
    }

    // NUR Notification an Robert - Kunden-Mail kommt nach Approval
    try {
      await sendBookingPendingToAdmin({
        refNumber,
        name: data.name,
        email: data.email,
        phone: data.phone,
        topic: data.topic,
        message: data.message || '',
        channel: data.channel,
        externalAddress: data.externalAddress || '',
        slotStart: slotCheck.start,
        slotEnd: slotCheck.end,
      })
    } catch (err) {
      console.error('Pending notification failed:', err)
    }

    return NextResponse.json({
      ok: true,
      refNumber,
      slotStart: slotCheck.start.toISOString(),
      slotEnd: slotCheck.end.toISOString(),
    })
  } catch (err) {
    console.error('Booking API error:', err)
    return NextResponse.json(
      { ok: false, error: 'Technischer Fehler.' },
      { status: 500 },
    )
  }
}
