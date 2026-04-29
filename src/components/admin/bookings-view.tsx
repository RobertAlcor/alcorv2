'use client'

import { useState, useMemo } from 'react'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { BookingRow, type AdminBooking } from './booking-row'
import { ManualBookingModal } from './manual-booking-modal'

type Props = {
  bookings: AdminBooking[]
  onChange: () => void
}

type SubTab = 'pending' | 'confirmed' | 'declined' | 'cancelled'

const SUBTAB_LABELS: Record<SubTab, string> = {
  pending: 'Ausstehend',
  confirmed: 'Bestätigt',
  declined: 'Abgelehnt',
  cancelled: 'Storniert',
}

export function BookingsView({ bookings, onChange }: Props) {
  const router = useRouter()
  const [subTab, setSubTab] = useState<SubTab>('pending')
  const [showModal, setShowModal] = useState(false)

  const counts = useMemo(() => {
    return {
      pending: bookings.filter((b) => b.status === 'pending').length,
      confirmed: bookings.filter(
        (b) => b.status === 'confirmed' || b.status === 'completed',
      ).length,
      declined: bookings.filter((b) => b.status === 'declined').length,
      cancelled: bookings.filter((b) => b.status === 'cancelled').length,
    }
  }, [bookings])

  const filtered = useMemo(() => {
    if (subTab === 'confirmed') {
      return bookings.filter(
        (b) => b.status === 'confirmed' || b.status === 'completed',
      )
    }
    return bookings.filter((b) => b.status === subTab)
  }, [bookings, subTab])

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <nav
          role="tablist"
          aria-label="Buchungs-Status"
          className="flex flex-wrap gap-1"
        >
          {(Object.keys(SUBTAB_LABELS) as SubTab[]).map((t) => {
            const active = subTab === t
            const count = counts[t]
            return (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSubTab(t)}
                className={`min-h-[40px] px-4 py-2 text-sm font-medium rounded-sm transition-colors ${
                  active
                    ? 'bg-signal/15 text-signal border border-signal/30'
                    : 'text-paper-mute border border-line hover:text-paper hover:border-paper-mute/40'
                }`}
              >
                {SUBTAB_LABELS[t]}{' '}
                <span
                  className={`ml-1 text-xs ${active ? 'text-signal-2' : 'text-paper-mute/70'}`}
                >
                  ({count})
                </span>
              </button>
            )
          })}
        </nav>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 min-h-[40px] px-4 py-2 bg-signal/15 text-signal border border-signal/30 text-sm font-medium rounded-sm hover:bg-signal/25 transition-colors"
        >
          <Plus className="w-4 h-4" strokeWidth={2} />
          Termin anlegen
        </button>
      </div>

      {filtered.length === 0 ? (
        <p className="text-paper-mute text-sm py-8 text-center">
          Keine Einträge.
        </p>
      ) : (
        <ul className="space-y-3">
          {filtered.map((b) => (
            <li key={b.id}>
              <BookingRow booking={b} onChange={onChange} />
            </li>
          ))}
        </ul>
      )}

      {showModal && (
        <ManualBookingModal
          onCancel={() => setShowModal(false)}
          onCreated={() => {
            setShowModal(false)
            router.refresh()
          }}
        />
      )}
    </div>
  )
}
