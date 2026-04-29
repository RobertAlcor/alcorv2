import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { isAdminLoggedIn } from '@/lib/admin-auth'
import { supabaseAdmin } from '@/lib/supabase'
import {
  sendLeadCopyToCustomer,
  generateRefNumber,
} from '@/lib/mail'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const schema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(200),
  phone: z.string().max(40).optional().or(z.literal('')),
  company: z.string().max(120).optional().or(z.literal('')),
  topic: z.enum(['new-website', 'relaunch', 'seo', 'other']),
  message: z.string().max(2000).optional().or(z.literal('')),
  status: z
    .enum(['new', 'contacted', 'qualified', 'won', 'lost'])
    .default('new'),
  adminNotes: z.string().max(5000).optional().or(z.literal('')),
  sendCustomerMail: z.boolean().default(false),
})

export async function POST(req: NextRequest) {
  if (!(await isAdminLoggedIn())) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'Ungültige Eingaben', details: parsed.error.flatten() },
      { status: 400 },
    )
  }
  const data = parsed.data

  const refNumber = generateRefNumber()

  const { error: dbError } = await supabaseAdmin.from('leads').insert({
    ref_number: refNumber,
    name: data.name,
    email: data.email,
    phone: data.phone || null,
    company: data.company || null,
    topic: data.topic,
    message: data.message || '–',
    source: 'admin-manual',
    status: data.status,
    admin_notes: data.adminNotes || null,
    last_contact_at: data.status !== 'new' ? new Date().toISOString() : null,
  })

  if (dbError) {
    console.error('Manual lead insert failed:', dbError)
    return NextResponse.json(
      { ok: false, error: 'Speichern fehlgeschlagen.' },
      { status: 500 },
    )
  }

  if (data.sendCustomerMail) {
    try {
      await sendLeadCopyToCustomer(
        {
          name: data.name,
          email: data.email,
          phone: data.phone || undefined,
          company: data.company || undefined,
          topic: data.topic,
          message: data.message || '–',
          source: 'admin-manual',
        },
        refNumber,
      )
    } catch (err) {
      console.error('Manual lead mail failed:', err)
    }
  }

  return NextResponse.json({ ok: true, refNumber })
}
