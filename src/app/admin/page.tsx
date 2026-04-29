import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { isAdminLoggedIn } from '@/lib/admin-auth'
import { supabaseAdmin } from '@/lib/supabase'
import { AdminShell } from '@/components/admin/admin-shell'
import type { AdminBooking } from '@/components/admin/booking-row'
import type { AdminLead } from '@/lib/lead-status'

export const metadata: Metadata = {
  title: 'Admin · Dashboard',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  if (!(await isAdminLoggedIn())) {
    redirect('/admin/login')
  }

  const ninetyDaysAgo = new Date()
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90)

  const [bookingsRes, leadsRes] = await Promise.all([
    supabaseAdmin
      .from('bookings')
      .select('*')
      .gte('created_at', ninetyDaysAgo.toISOString())
      .order('slot_start', { ascending: true })
      .returns<AdminBooking[]>(),
    supabaseAdmin
      .from('leads')
      .select('*')
      .gte('created_at', ninetyDaysAgo.toISOString())
      .order('created_at', { ascending: false })
      .returns<AdminLead[]>(),
  ])

  if (bookingsRes.error || leadsRes.error) {
    return (
      <main className="px-4 py-12 max-w-5xl mx-auto">
        <h1 className="font-serif text-3xl text-paper mb-4">Fehler</h1>
        <p className="text-paper-mute">
          Daten konnten nicht geladen werden:{' '}
          {bookingsRes.error?.message || leadsRes.error?.message}
        </p>
      </main>
    )
  }

  return (
    <main className="px-4 py-10 max-w-6xl mx-auto">
      <AdminShell
        bookings={bookingsRes.data ?? []}
        leads={leadsRes.data ?? []}
      />
    </main>
  )
}
