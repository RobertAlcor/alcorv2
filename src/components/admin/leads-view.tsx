'use client'

import { useState, useMemo } from 'react'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { LeadRow } from './lead-row'
import { ManualLeadModal } from './manual-lead-modal'
import {
  type AdminLead,
  type LeadStatus,
  LEAD_STATUS_ORDER,
  LEAD_STATUS_LABEL,
} from '@/lib/lead-status'

type Props = {
  leads: AdminLead[]
  onChange: () => void
}

type Filter = LeadStatus | 'all'

export function LeadsView({ leads, onChange }: Props) {
  const router = useRouter()
  const [filter, setFilter] = useState<Filter>('all')
  const [showModal, setShowModal] = useState(false)

  const counts = useMemo(() => {
    const c: Record<LeadStatus, number> = {
      new: 0,
      contacted: 0,
      qualified: 0,
      won: 0,
      lost: 0,
    }
    for (const l of leads) c[l.status]++
    return c
  }, [leads])

  const filtered = useMemo(() => {
    if (filter === 'all') return leads
    return leads.filter((l) => l.status === filter)
  }, [leads, filter])

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <nav
          role="tablist"
          aria-label="Lead-Status"
          className="flex flex-wrap gap-1"
        >
          <FilterChip
            label="Alle"
            count={leads.length}
            active={filter === 'all'}
            onClick={() => setFilter('all')}
          />
          {LEAD_STATUS_ORDER.map((s) => (
            <FilterChip
              key={s}
              label={LEAD_STATUS_LABEL[s]}
              count={counts[s]}
              active={filter === s}
              onClick={() => setFilter(s)}
            />
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 min-h-[40px] px-4 py-2 bg-signal/15 text-signal border border-signal/30 text-sm font-medium rounded-sm hover:bg-signal/25 transition-colors"
        >
          <Plus className="w-4 h-4" strokeWidth={2} />
          Anfrage anlegen
        </button>
      </div>

      {filtered.length === 0 ? (
        <p className="text-paper-mute text-sm py-8 text-center">
          Keine Anfragen in diesem Status.
        </p>
      ) : (
        <ul className="space-y-3">
          {filtered.map((l) => (
            <li key={l.id}>
              <LeadRow lead={l} onChange={onChange} />
            </li>
          ))}
        </ul>
      )}

      {showModal && (
        <ManualLeadModal
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

function FilterChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string
  count: number
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`min-h-[40px] px-4 py-2 text-sm font-medium rounded-sm transition-colors ${
        active
          ? 'bg-signal/15 text-signal border border-signal/30'
          : 'text-paper-mute border border-line hover:text-paper hover:border-paper-mute/40'
      }`}
    >
      {label}{' '}
      <span
        className={`ml-1 text-xs ${active ? 'text-signal-2' : 'text-paper-mute/70'}`}
      >
        ({count})
      </span>
    </button>
  )
}
