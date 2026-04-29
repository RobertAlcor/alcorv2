'use client'

import { useState, useEffect, useRef } from 'react'
import {
  Search,
  Loader2,
  Calendar,
  MessageSquare,
  Mail,
  Phone,
} from 'lucide-react'

type Hit = {
  source: 'lead' | 'booking'
  id: string
  ref_number: string
  name: string
  email: string
  phone: string | null
  topic: string
  status: string
  created_at: string
  slot_start?: string
}

export function CustomersView() {
  const [query, setQuery] = useState('')
  const [hits, setHits] = useState<Hit[]>([])
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)

    if (query.trim().length < 2) {
      setHits([])
      setBusy(false)
      return
    }

    debounceRef.current = setTimeout(() => {
      void search(query.trim())
    }, 300)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query])

  async function search(q: string) {
    setBusy(true)
    setError(null)
    try {
      const res = await fetch(
        `/api/admin/customers?q=${encodeURIComponent(q)}`,
      )
      if (!res.ok) {
        setError('Suche fehlgeschlagen')
        setHits([])
        return
      }
      const body = await res.json()
      setHits((body?.hits as Hit[]) ?? [])
    } catch {
      setError('Netzwerkfehler')
      setHits([])
    } finally {
      setBusy(false)
    }
  }

  // Group by email für besseres Erkennen wiederkehrender Kunden
  const grouped = groupByEmail(hits)

  return (
    <div>
      <div className="relative mb-6">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-paper-mute pointer-events-none"
          strokeWidth={1.75}
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Suche nach Name oder E-Mail ..."
          className="w-full min-h-[48px] pl-11 pr-12 py-3 bg-deep-2 border border-paper-dim/30 rounded-sm text-paper placeholder:text-paper-mute/70 focus:border-signal-2 focus:outline-none transition-colors"
        />
        {busy && (
          <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-paper-mute" />
        )}
      </div>

      {error && (
        <p className="text-sm text-error mb-4" role="alert">
          {error}
        </p>
      )}

      {query.trim().length < 2 && (
        <p className="text-sm text-paper-mute py-8 text-center">
          Mindestens 2 Zeichen eingeben.
        </p>
      )}

      {query.trim().length >= 2 && !busy && hits.length === 0 && !error && (
        <p className="text-sm text-paper-mute py-8 text-center">
          Keine Treffer für „{query}".
        </p>
      )}

      {grouped.length > 0 && (
        <div className="space-y-4">
          {grouped.map((group) => (
            <CustomerGroup key={group.email} group={group} />
          ))}
        </div>
      )}
    </div>
  )
}

function CustomerGroup({
  group,
}: {
  group: { email: string; name: string; hits: Hit[] }
}) {
  return (
    <article className="bg-deep-2 border border-line rounded-sm overflow-hidden">
      <div className="p-4 md:p-5 border-b border-line">
        <h3 className="font-serif text-xl text-paper mb-1">{group.name}</h3>
        <p className="text-xs text-paper-mute">
          {group.email} · {group.hits.length}{' '}
          {group.hits.length === 1 ? 'Eintrag' : 'Einträge'}
        </p>
      </div>
      <ul className="divide-y divide-line">
        {group.hits.map((h) => (
          <li key={`${h.source}-${h.id}`}>
            <HitRow hit={h} />
          </li>
        ))}
      </ul>
    </article>
  )
}

function HitRow({ hit }: { hit: Hit }) {
  const created = new Date(hit.created_at)
  const created_label = new Intl.DateTimeFormat('de-AT', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'Europe/Vienna',
  }).format(created)

  let slotLabel: string | null = null
  if (hit.slot_start) {
    slotLabel = new Intl.DateTimeFormat('de-AT', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Vienna',
    }).format(new Date(hit.slot_start))
  }

  return (
    <div className="px-4 md:px-5 py-3 flex flex-wrap items-center gap-3 text-sm">
      <span
        className={`inline-flex items-center gap-1 text-[0.65rem] font-mono uppercase tracking-wider px-2 py-1 rounded-sm border ${
          hit.source === 'booking'
            ? 'bg-signal/10 text-signal-2 border-signal/30'
            : 'bg-blue-500/10 text-blue-400 border-blue-500/30'
        }`}
      >
        {hit.source === 'booking' ? (
          <Calendar className="w-3 h-3" strokeWidth={2} />
        ) : (
          <MessageSquare className="w-3 h-3" strokeWidth={2} />
        )}
        {hit.source === 'booking' ? 'Termin' : 'Anfrage'}
      </span>
      <span className="font-mono text-xs text-paper-mute">
        #{hit.ref_number || '–'}
      </span>
      <span className="text-paper">{hit.topic}</span>
      <span className="text-xs text-paper-mute">
        {slotLabel ? `Termin: ${slotLabel}` : `Eingang: ${created_label}`}
      </span>
      <span className="ml-auto text-[0.65rem] font-mono uppercase tracking-wider text-paper-mute">
        {hit.status}
      </span>
    </div>
  )
}

function groupByEmail(
  hits: Hit[],
): { email: string; name: string; hits: Hit[] }[] {
  const map = new Map<string, { email: string; name: string; hits: Hit[] }>()
  for (const h of hits) {
    const key = h.email.toLowerCase()
    if (!map.has(key)) {
      map.set(key, { email: h.email, name: h.name, hits: [] })
    }
    map.get(key)!.hits.push(h)
  }
  // Innerhalb jeder Gruppe nach created_at desc
  for (const g of map.values()) {
    g.hits.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
  }
  // Gruppen nach jüngstem Eintrag desc
  return Array.from(map.values()).sort((a, b) => {
    const aLatest = a.hits[0]
      ? new Date(a.hits[0].created_at).getTime()
      : 0
    const bLatest = b.hits[0]
      ? new Date(b.hits[0].created_at).getTime()
      : 0
    return bLatest - aLatest
  })
}
