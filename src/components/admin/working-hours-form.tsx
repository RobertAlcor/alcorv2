'use client'

import { useEffect, useState } from 'react'
import { Loader2, Check } from 'lucide-react'

const INPUT =
  'min-h-[44px] px-3 py-2.5 bg-deep border border-paper-dim/30 rounded-sm text-paper focus:border-signal-2 focus:outline-none transition-colors text-sm'

export function WorkingHoursForm() {
  const [start, setStart] = useState(9)
  const [end, setEnd] = useState(18)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [savedAt, setSavedAt] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    void loadCurrent()
  }, [])

  async function loadCurrent() {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/settings/working-hours')
      if (res.ok) {
        const body = await res.json()
        if (body?.hours) {
          setStart(body.hours.start)
          setEnd(body.hours.end)
        }
      }
    } catch {
      /* ignore */
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (saving) return
    setError(null)

    if (start >= end) {
      setError('Anfang muss vor Ende liegen.')
      return
    }

    setSaving(true)
    try {
      const res = await fetch('/api/admin/settings/working-hours', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ start, end }),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(body?.error ?? 'Speichern fehlgeschlagen')
        return
      }
      setSavedAt(Date.now())
    } catch {
      setError('Netzwerkfehler')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <p className="text-sm text-paper-mute inline-flex items-center gap-2">
        <Loader2 className="w-3 h-3 animate-spin" />
        Lädt …
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-deep-2 border border-line rounded-sm p-5">
      <div className="flex flex-wrap items-end gap-4 mb-4">
        <div>
          <label
            htmlFor="wh-start"
            className="block text-xs font-semibold tracking-[0.12em] uppercase text-paper-mute mb-2"
          >
            Anfang
          </label>
          <select
            id="wh-start"
            value={start}
            onChange={(e) => setStart(Number(e.target.value))}
            className={INPUT}
          >
            {Array.from({ length: 24 }, (_, h) => h).map((h) => (
              <option key={h} value={h}>
                {String(h).padStart(2, '0')}:00
              </option>
            ))}
          </select>
        </div>
        <div className="text-paper-mute pb-3">bis</div>
        <div>
          <label
            htmlFor="wh-end"
            className="block text-xs font-semibold tracking-[0.12em] uppercase text-paper-mute mb-2"
          >
            Ende
          </label>
          <select
            id="wh-end"
            value={end}
            onChange={(e) => setEnd(Number(e.target.value))}
            className={INPUT}
          >
            {Array.from({ length: 24 }, (_, h) => h + 1).map((h) => (
              <option key={h} value={h}>
                {String(h).padStart(2, '0')}:00
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="text-xs text-paper-mute mb-4 leading-relaxed">
        Termine können nur innerhalb dieser Zeit gebucht werden. Termine müssen
        bis zum Ende-Wert abgeschlossen sein. Z.B. „09:00 bis 18:00" → spätester
        Termin-Start ist 17:00 (60-Min-Termine).
      </p>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="min-h-[44px] px-5 py-2.5 inline-flex items-center justify-center gap-2 bg-signal text-deep text-sm font-medium rounded-sm hover:bg-signal-2 transition-colors disabled:opacity-50"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Speichert …
            </>
          ) : (
            'Speichern'
          )}
        </button>

        {savedAt && Date.now() - savedAt < 5000 && (
          <span className="inline-flex items-center gap-1 text-sm text-success">
            <Check className="w-4 h-4" strokeWidth={2.5} />
            Gespeichert
          </span>
        )}
        {error && <span className="text-sm text-error">{error}</span>}
      </div>
    </form>
  )
}
