'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut, LayoutDashboard, Calendar, MessageSquare, Search } from 'lucide-react'
import { OverviewView } from './overview-view'
import { BookingsView } from './bookings-view'
import { LeadsView } from './leads-view'
import { CustomersView } from './customers-view'
import type { AdminBooking } from './booking-row'
import type { AdminLead } from '@/lib/lead-status'

type Props = {
  bookings: AdminBooking[]
  leads: AdminLead[]
}

type Tab = 'overview' | 'bookings' | 'leads' | 'customers'

const TABS: { id: Tab; label: string; Icon: typeof LayoutDashboard }[] = [
  { id: 'overview', label: 'Übersicht', Icon: LayoutDashboard },
  { id: 'bookings', label: 'Termine', Icon: Calendar },
  { id: 'leads', label: 'Anfragen', Icon: MessageSquare },
  { id: 'customers', label: 'Kunden', Icon: Search },
]

export function AdminShell({ bookings, leads }: Props) {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('overview')
  const [loggingOut, setLoggingOut] = useState(false)

  const counts = useMemo(() => {
    return {
      pendingBookings: bookings.filter((b) => b.status === 'pending').length,
      newLeads: leads.filter((l) => l.status === 'new').length,
    }
  }, [bookings, leads])

  async function handleLogout() {
    setLoggingOut(true)
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <div>
      <header className="flex items-center justify-between mb-6 pb-6 border-b border-line">
        <div>
          <p className="text-[0.65rem] font-mono uppercase tracking-[0.2em] text-signal-2 mb-1">
            Admin
          </p>
          <h1 className="font-serif text-3xl text-paper">Dashboard</h1>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="inline-flex items-center gap-2 min-h-[40px] px-4 py-2 text-paper-mute text-sm rounded-sm hover:text-paper hover:bg-deep-2 transition-colors disabled:opacity-50"
        >
          <LogOut className="w-4 h-4" strokeWidth={1.75} />
          Abmelden
        </button>
      </header>

      <nav
        role="tablist"
        aria-label="Admin-Bereiche"
        className="flex flex-wrap gap-1 mb-8 border-b border-line"
      >
        {TABS.map((t) => {
          const active = tab === t.id
          let badge: number | null = null
          if (t.id === 'bookings' && counts.pendingBookings > 0)
            badge = counts.pendingBookings
          if (t.id === 'leads' && counts.newLeads > 0)
            badge = counts.newLeads
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(t.id)}
              className={`inline-flex items-center gap-2 min-h-[44px] px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
                active
                  ? 'text-signal border-signal'
                  : 'text-paper-mute border-transparent hover:text-paper'
              }`}
            >
              <t.Icon className="w-4 h-4" strokeWidth={1.75} />
              {t.label}
              {badge !== null && (
                <span
                  className={`ml-0.5 inline-flex items-center justify-center min-w-[20px] h-[20px] px-1.5 text-[0.65rem] font-mono rounded-full ${
                    active
                      ? 'bg-signal text-deep'
                      : 'bg-signal/20 text-signal-2'
                  }`}
                >
                  {badge}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {tab === 'overview' && (
        <OverviewView
          bookings={bookings}
          leads={leads}
          onJumpToBookings={() => setTab('bookings')}
          onJumpToLeads={() => setTab('leads')}
        />
      )}
      {tab === 'bookings' && (
        <BookingsView
          bookings={bookings}
          onChange={() => router.refresh()}
        />
      )}
      {tab === 'leads' && (
        <LeadsView leads={leads} onChange={() => router.refresh()} />
      )}
      {tab === 'customers' && <CustomersView />}
    </div>
  )
}
