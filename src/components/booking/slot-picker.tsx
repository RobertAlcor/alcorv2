'use client'

import { useEffect, useState } from 'react'
import { Clock, Loader2 } from 'lucide-react'

type FetchSlot = {
  isoStart: string
  isoEnd: string
  label: string
  available: boolean
}

type Props = {
  date: Date
  selectedSlot: string | null
  onSelect: (slotIso: string) => void
}

export function SlotPicker({ date, selectedSlot, onSelect }: Props) {
  const [slots, setSlots] = useState<FetchSlot[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const dateStr = formatDateParam(date)
        const res = await fetch(`/api/booking/availability?date=${dateStr}`)
        if (!res.ok) throw new Error('Server-Antwort fehlerhaft')
        const data = (await res.json()) as { slots: FetchSlot[] }
        if (!cancelled) setSlots(data.slots)
      } catch {
        if (!cancelled)
          setError('Verfügbare Zeiten konnten nicht geladen werden.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [date])

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Clock className="w-4 h-4 text-signal-2" strokeWidth={1.75} />
        <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-signal-2">
          Uhrzeit für {formatGermanDate(date)}
        </h3>
      </div>
      <p className="text-sm text-paper-mute mb-6 leading-relaxed">
        Pro Termin reserviere ich eine Stunde. Falls das Gespräch kürzer wird,
        ist auch alles gut – die Zeit gehört Ihnen.
      </p>

      {loading && (
        <div className="flex items-center gap-2 text-sm text-paper-mute py-4">
          <Loader2 className="w-4 h-4 animate-spin" />
          Verfügbare Zeiten werden geladen …
        </div>
      )}

      {error && (
        <div className="text-sm text-error bg-deep-2 border border-error/40 p-4 rounded-sm">
          {error}
        </div>
      )}

      {slots && slots.length === 0 && !loading && (
        <p className="text-sm text-paper-mute">
          An diesem Tag sind keine Termine mehr frei. Bitte wählen Sie einen
          anderen Tag.
        </p>
      )}

      {slots && slots.length > 0 && (
        <div>
          {groupByHour(slots).map(({ hour, items }) => (
            <div key={hour} className="mb-5 last:mb-0">
              <div className="text-[0.65rem] font-mono uppercase tracking-wider text-paper-mute mb-2">
                {String(hour).padStart(2, '0')}:00 Uhr
              </div>
              <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                {items.map((slot) => {
                  const isSelected = selectedSlot === slot.isoStart
                  return (
                    <button
                      key={slot.isoStart}
                      type="button"
                      disabled={!slot.available}
                      onClick={() => onSelect(slot.isoStart)}
                      aria-pressed={isSelected}
                      className={`min-h-[44px] py-2 px-2 rounded-sm border text-sm font-mono transition-all ${
                        !slot.available
                          ? 'bg-deep-2 border-paper-dim/15 text-paper-mute/40 line-through cursor-not-allowed'
                          : isSelected
                            ? 'bg-signal text-deep border-signal'
                            : 'bg-deep-2 border-paper-dim/30 text-paper hover:border-signal-2/60'
                      }`}
                    >
                      {slot.label}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function formatDateParam(d: Date): string {
  return (
    d.getFullYear() +
    '-' +
    String(d.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(d.getDate()).padStart(2, '0')
  )
}

function formatGermanDate(d: Date): string {
  return new Intl.DateTimeFormat('de-AT', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(d)
}

function groupByHour(
  slots: FetchSlot[],
): { hour: number; items: FetchSlot[] }[] {
  const groups = new Map<number, FetchSlot[]>()
  for (const s of slots) {
    const hour = new Date(s.isoStart).getHours()
    if (!groups.has(hour)) groups.set(hour, [])
    groups.get(hour)!.push(s)
  }
  return Array.from(groups.entries()).map(([hour, items]) => ({ hour, items }))
}
