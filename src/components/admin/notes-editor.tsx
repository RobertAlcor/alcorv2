'use client'

import { useState, useEffect, useRef } from 'react'
import { Check, Loader2 } from 'lucide-react'

type Props = {
  initialValue: string
  endpoint: string
  placeholder?: string
}

type SaveState = 'idle' | 'saving' | 'saved' | 'error'

export function NotesEditor({
  initialValue,
  endpoint,
  placeholder = 'Notizen ...',
}: Props) {
  const [value, setValue] = useState(initialValue)
  const [savedValue, setSavedValue] = useState(initialValue)
  const [state, setState] = useState<SaveState>('idle')
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const savedStateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Auto-save bei Änderung (debounced 1.2s)
  useEffect(() => {
    if (value === savedValue) return

    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current)

    debounceTimerRef.current = setTimeout(() => {
      void save(value)
    }, 1200)

    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  async function save(text: string) {
    setState('saving')
    try {
      const res = await fetch(endpoint, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: text }),
      })
      if (!res.ok) {
        setState('error')
        return
      }
      setSavedValue(text)
      setState('saved')
      // Reset auf "idle" nach 2s
      if (savedStateTimerRef.current) clearTimeout(savedStateTimerRef.current)
      savedStateTimerRef.current = setTimeout(() => setState('idle'), 2000)
    } catch {
      setState('error')
    }
  }

  const dirty = value !== savedValue

  return (
    <div>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={4}
        maxLength={5000}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 bg-deep border border-paper-dim/30 rounded-sm text-paper placeholder:text-paper-mute/70 focus:border-signal-2 focus:outline-none transition-colors resize-y min-h-[100px] text-sm leading-relaxed"
      />
      <div className="flex items-center justify-between mt-1.5 text-[0.65rem]">
        <span className="text-paper-mute">{value.length} / 5000</span>
        <SaveStatus state={state} dirty={dirty} />
      </div>
    </div>
  )
}

function SaveStatus({ state, dirty }: { state: SaveState; dirty: boolean }) {
  if (state === 'saving') {
    return (
      <span className="inline-flex items-center gap-1 text-paper-mute">
        <Loader2 className="w-3 h-3 animate-spin" /> Speichert ...
      </span>
    )
  }
  if (state === 'saved') {
    return (
      <span className="inline-flex items-center gap-1 text-success">
        <Check className="w-3 h-3" strokeWidth={2.5} /> Gespeichert
      </span>
    )
  }
  if (state === 'error') {
    return <span className="text-error">Fehler beim Speichern</span>
  }
  if (dirty) {
    return <span className="text-paper-mute">Wird automatisch gespeichert ...</span>
  }
  return <span className="text-paper-mute">&nbsp;</span>
}
