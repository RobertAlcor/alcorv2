'use client'

import { useEffect, useState } from 'react'
import { Loader2, Plus, Trash2, X } from 'lucide-react'

type BusySlot = {
  id: string
  slot_start: string
  slot_end: string
  reason: string | null
  created_at: string
}

const INPUT =
  'min-h-[44px] px-3 py-2.5 bg-deep border border-paper-dim/30 rounded-sm text-paper placeholder:text-paper-mute/70 focus:border-signal-2 focus:outline-none transition-colors text-sm'
const LABEL =
  'block text-xs font-semibold tracking-[0.12em] uppercase text-paper-mute mb-2'

const HOUR_OPTIONS = Array.from({ length: 24 }, (_, h) => h)

export function BusySlotsManager() {
  const [slots, setSlots] = useState<BusySlot[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    void loadSlots()
  }, [])

  async function loadSlots() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/busy-slots')
      if (!res.ok) {
        setError('Laden fehlgeschlagen')
        return
      }
      const body = await res.json()
      setSlots((body?.slots as BusySlot[]) ?? [])
    } catch {
      setError('Netzwerkfehler')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Diesen blockierten Slot wirklich löschen?')) return
    try {
      const res = await fetch(`/api/admin/busy-slots/${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        await loadSlots()
      } else {
        setError('Löschen fehlgeschlagen')
      }
    } catch {
      setError('Netzwerkfehler')
    }
  }

  return (
    <div>
      {!showForm && (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="mb-4 inline-flex items-center gap-2 min-h-[44px] px-4 py-2.5 bg-signal/15 text-signal border border-signal/30 text-sm font-medium rounded-sm hover:bg-signal/25 transition-colors"
        >
          <Plus className="w-4 h-4" strokeWidth={2} />
          Neue Blockierung
        </button>
      )}

      {showForm && (
        <BusySlotForm
          onCancel={() => setShowForm(false)}
          onSaved={() => {
            setShowForm(false)
            void loadSlots()
          }}
        />
      )}

      {loading && (
        <p className="text-sm text-paper-mute inline-flex items-center gap-2">
          <Loader2 className="w-3 h-3 animate-spin" />
          Lädt …
        </p>
      )}

      {error && <p className="text-sm text-error mb-4">{error}</p>}

      {!loading && slots.length === 0 && !showForm && (
        <p className="text-sm text-paper-mute">
          Keine zukünftigen Blockierungen.
        </p>
      )}

      {!loading && slots.length > 0 && (
        <ul className="space-y-2">
          {slots.map((s) => (
            <li
              key={s.id}
              className="flex items-center gap-4 bg-deep-2 border border-line rounded-sm px-4 py-3"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm text-paper">{formatRange(s)}</p>
                {s.reason && (
                  <p className="text-xs text-paper-mute mt-0.5">{s.reason}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => handleDelete(s.id)}
                className="text-paper-mute hover:text-error p-2 rounded-sm hover:bg-deep transition-colors"
                aria-label="Löschen"
              >
                <Trash2 className="w-4 h-4" strokeWidth={1.75} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function BusySlotForm({
  onCancel,
  onSaved,
}: {
  onCancel: () => void
  onSaved: () => void
}) {
  const today = new Date()
  const todayIso = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

  const [mode, setMode] = useState<'single' | 'range'>('single')

  // Single
  const [date, setDate] = useState(todayIso)
  const [startHour, setStartHour] = useState(9)
  const [endHour, setEndHour] = useState(18)
  const [wholeDay, setWholeDay] = useState(true)

  // Range
  const [rangeStart, setRangeStart] = useState(todayIso)
  const [rangeEnd, setRangeEnd] = useState(todayIso)

  const [reason, setReason] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (submitting) return
    setError(null)

    let payload: {
      startIso: string
      endIso: string
      reason: string
      rangeMode: boolean
    }

    if (mode === 'single') {
      const start = new Date(date)
      const end = new Date(date)
      if (wholeDay) {
        start.setHours(0, 0, 0, 0)
        end.setHours(23, 59, 59, 999)
      } else {
        if (startHour >= endHour) {
          setError('Anfang muss vor Ende liegen.')
          return
        }
        start.setHours(startHour, 0, 0, 0)
        end.setHours(endHour, 0, 0, 0)
      }
      payload = {
        startIso: start.toISOString(),
        endIso: end.toISOString(),
        reason: reason.trim(),
        rangeMode: false,
      }
    } else {
      const start = new Date(rangeStart)
      const end = new Date(rangeEnd)
      if (start > end) {
        setError('Start-Datum nach End-Datum.')
        return
      }
      start.setHours(0, 0, 0, 0)
      end.setHours(23, 59, 59, 999)
      payload = {
        startIso: start.toISOString(),
        endIso: end.toISOString(),
        reason: reason.trim(),
        rangeMode: true,
      }
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/admin/busy-slots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(body?.error ?? 'Speichern fehlgeschlagen')
        setSubmitting(false)
        return
      }
      onSaved()
    } catch {
      setError('Netzwerkfehler')
      setSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-deep-2 border border-line rounded-sm p-5 mb-6 relative"
    >
      <button
        type="button"
        onClick={onCancel}
        className="absolute top-3 right-3 w-9 h-9 inline-flex items-center justify-center text-paper-mute hover:text-paper rounded-sm hover:bg-deep transition-colors"
        aria-label="Schließen"
      >
        <X className="w-4 h-4" strokeWidth={1.75} />
      </button>

      <h4 className="font-serif text-lg text-paper mb-4">Neue Blockierung</h4>

      {/* Mode-Switch */}
      <div className="flex gap-2 mb-4">
        <button
          type="button"
          onClick={() => setMode('single')}
          className={`min-h-[36px] px-3 py-1.5 text-xs font-medium rounded-sm transition-colors ${
            mode === 'single'
              ? 'bg-signal/15 text-signal border border-signal/30'
              : 'text-paper-mute border border-line hover:text-paper'
          }`}
        >
          Einzelner Tag
        </button>
        <button
          type="button"
          onClick={() => setMode('range')}
          className={`min-h-[36px] px-3 py-1.5 text-xs font-medium rounded-sm transition-colors ${
            mode === 'range'
              ? 'bg-signal/15 text-signal border border-signal/30'
              : 'text-paper-mute border border-line hover:text-paper'
          }`}
        >
          Zeitraum (Urlaub)
        </button>
      </div>

      {mode === 'single' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="bs-date" className={LABEL}>
                Datum
              </label>
              <input
                id="bs-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className={`${INPUT} w-full`}
              />
            </div>
          </div>

          <label className="flex items-center gap-2 mb-4 cursor-pointer">
            <input
              type="checkbox"
              checked={wholeDay}
              onChange={(e) => setWholeDay(e.target.checked)}
              className="w-5 h-5 rounded-sm border border-paper-dim/40 bg-deep accent-signal cursor-pointer"
            />
            <span className="text-sm text-paper-mute">Ganzen Tag blockieren</span>
          </label>

          {!wholeDay && (
            <div className="flex flex-wrap items-end gap-3 mb-4">
              <div>
                <label htmlFor="bs-start-hour" className={LABEL}>
                  Von
                </label>
                <select
                  id="bs-start-hour"
                  value={startHour}
                  onChange={(e) => setStartHour(Number(e.target.value))}
                  className={INPUT}
                >
                  {HOUR_OPTIONS.map((h) => (
                    <option key={h} value={h}>
                      {String(h).padStart(2, '0')}:00
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-paper-mute pb-3">bis</div>
              <div>
                <label htmlFor="bs-end-hour" className={LABEL}>
                  Bis
                </label>
                <select
                  id="bs-end-hour"
                  value={endHour}
                  onChange={(e) => setEndHour(Number(e.target.value))}
                  className={INPUT}
                >
                  {HOUR_OPTIONS.map((h) => (
                    <option key={h} value={h}>
                      {String(h).padStart(2, '0')}:00
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </>
      )}

      {mode === 'range' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="bs-range-start" className={LABEL}>
              Von
            </label>
            <input
              id="bs-range-start"
              type="date"
              value={rangeStart}
              onChange={(e) => setRangeStart(e.target.value)}
              required
              className={`${INPUT} w-full`}
            />
          </div>
          <div>
            <label htmlFor="bs-range-end" className={LABEL}>
              Bis
            </label>
            <input
              id="bs-range-end"
              type="date"
              value={rangeEnd}
              onChange={(e) => setRangeEnd(e.target.value)}
              required
              className={`${INPUT} w-full`}
            />
          </div>
        </div>
      )}

      <div className="mb-5">
        <label htmlFor="bs-reason" className={LABEL}>
          Grund{' '}
          <span className="normal-case text-paper-mute/70">(optional)</span>
        </label>
        <input
          id="bs-reason"
          type="text"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="z.B. Urlaub, Termin extern, Schule …"
          maxLength={200}
          className={`${INPUT} w-full`}
        />
      </div>

      {error && <p className="text-sm text-error mb-4">{error}</p>}

      <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          disabled={submitting}
          className="min-h-[44px] px-5 py-2.5 text-sm text-paper-mute rounded-sm hover:text-paper hover:bg-deep transition-colors disabled:opacity-50"
        >
          Abbrechen
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="min-h-[44px] px-5 py-2.5 inline-flex items-center justify-center gap-2 bg-signal text-deep text-sm font-medium rounded-sm hover:bg-signal-2 transition-colors disabled:opacity-50"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Wird angelegt …
            </>
          ) : (
            'Blockieren'
          )}
        </button>
      </div>
    </form>
  )
}

function formatRange(s: BusySlot): string {
  const start = new Date(s.slot_start)
  const end = new Date(s.slot_end)
  const startDate = formatDate(start)
  const endDate = formatDate(end)

  // Ganzer Tag (00:00 - 23:59:59)
  const startMidnight = start.getHours() === 0 && start.getMinutes() === 0
  const endNearMidnight = end.getHours() === 23 && end.getMinutes() >= 59

  if (startMidnight && endNearMidnight) {
    if (startDate === endDate) {
      return `${startDate} (ganzer Tag)`
    }
    return `${startDate} bis ${endDate}`
  }

  // Stunden-Slot
  if (startDate === endDate) {
    const sh = String(start.getHours()).padStart(2, '0')
    const sm = String(start.getMinutes()).padStart(2, '0')
    const eh = String(end.getHours()).padStart(2, '0')
    const em = String(end.getMinutes()).padStart(2, '0')
    return `${startDate}, ${sh}:${sm}–${eh}:${em}`
  }

  return `${formatDateTime(start)} bis ${formatDateTime(end)}`
}

function formatDate(d: Date): string {
  return new Intl.DateTimeFormat('de-AT', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'Europe/Vienna',
  }).format(d)
}

function formatDateTime(d: Date): string {
  return new Intl.DateTimeFormat('de-AT', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Vienna',
  }).format(d)
}
