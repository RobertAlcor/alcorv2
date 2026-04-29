'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { BookingRow, type AdminBooking } from './booking-row'

type Props = {
  bookings: AdminBooking[]
}

type Tab = 'pending' | 'confirmed' | 'declined' | 'cancelled'

const TAB_LABELS: Record<Tab, string> = {
  pending: 'Ausstehend',
  confirmed: 'Bestätigt',
  declined: 'Abgelehnt',
  cancelled: 'Storniert',
}

export function AdminDashboard({ bookings }: Props) {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('pending')
  const [loggingOut, setLoggingOut] = useState(false)

  const counts = useMemo(() => {
    return {
      pending: bookings.filter((b) => b.status === 'pending').length,
      confirmed: bookings.filter((b) => b.status === 'confirmed').length,
      declined: bookings.filter((b) => b.status === 'declined').length,
      cancelled: bookings.filter((b) => b.status === 'cancelled').length,
    }
  }, [bookings])

  const filtered = useMemo(() => {
    return bookings.filter((b) => b.status === tab)
  }, [bookings, tab])

  async function handleLogout() {
    setLoggingOut(true)
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <div>
      <header className="flex items-center justify-between mb-8 pb-6 border-b border-line">
        <div>
          <p className="text-[0.65rem] font-mono uppercase tracking-[0.2em] text-signal-2 mb-1">
            Admin
          </p>
          <h1 className="font-serif text-3xl text-paper">Buchungen</h1>
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
        aria-label="Buchungs-Status"
        className="flex flex-wrap gap-1 mb-8 border-b border-line"
      >
        {(Object.keys(TAB_LABELS) as Tab[]).map((t) => {
          const active = tab === t
          const count = counts[t]
          return (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(t)}
              className={`min-h-[44px] px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
                active
                  ? 'text-signal border-signal'
                  : 'text-paper-mute border-transparent hover:text-paper'
              }`}
            >
              {TAB_LABELS[t]}{' '}
              <span
                className={`ml-1 text-xs ${active ? 'text-signal-2' : 'text-paper-mute/70'}`}
              >
                ({count})
              </span>
            </button>
          )
        })}
      </nav>

      {filtered.length === 0 ? (
        <p className="text-paper-mute text-sm py-8 text-center">
          Keine Einträge.
        </p>
      ) : (
        <ul className="space-y-3">
          {filtered.map((b) => (
            <li key={b.id}>
              <BookingRow
                booking={b}
                onChange={() => router.refresh()}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
