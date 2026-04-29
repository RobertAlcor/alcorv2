'use client'

import { useEffect, useState } from 'react'
import { X, Check } from 'lucide-react'
import { useConsent } from './consent-provider'
import {
  type ConsentState,
  CONSENT_CATEGORY_INFO,
  type ConsentCategory,
} from '@/lib/consent'

const CATEGORY_ORDER: ConsentCategory[] = ['necessary', 'statistics', 'marketing']

export function ConsentModal() {
  const { isModalOpen, closeSettings, consent, setConsent } = useConsent()
  const [draft, setDraft] = useState<ConsentState>(consent)

  // Wenn Modal aufgeht: aktuellen Stand als Draft setzen
  useEffect(() => {
    if (isModalOpen) setDraft(consent)
  }, [isModalOpen, consent])

  // ESC-Key zum Schließen
  useEffect(() => {
    if (!isModalOpen) return
    function onEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') closeSettings()
    }
    window.addEventListener('keydown', onEsc)
    return () => window.removeEventListener('keydown', onEsc)
  }, [isModalOpen, closeSettings])

  if (!isModalOpen) return null

  function toggle(cat: ConsentCategory) {
    if (cat === 'necessary') return // nicht änderbar
    setDraft((d) => ({ ...d, [cat]: !d[cat] }))
  }

  function handleSave() {
    setConsent(draft)
    closeSettings()
  }

  function handleAcceptAll() {
    setConsent({ necessary: true, statistics: true, marketing: true })
    closeSettings()
  }

  function handleRejectAll() {
    setConsent({ necessary: true, statistics: false, marketing: false })
    closeSettings()
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="consent-modal-title"
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center px-4 py-8 overflow-y-auto"
    >
      <div
        className="fixed inset-0 bg-deep/80 backdrop-blur-sm"
        onClick={closeSettings}
        aria-hidden
      />
      <div className="relative w-full max-w-2xl bg-deep-2 border border-line rounded-sm p-6 md:p-8 shadow-2xl">
        <button
          type="button"
          onClick={closeSettings}
          className="absolute top-3 right-3 w-9 h-9 inline-flex items-center justify-center text-paper-mute hover:text-paper rounded-sm hover:bg-deep transition-colors"
          aria-label="Schließen"
        >
          <X className="w-4 h-4" strokeWidth={1.75} />
        </button>

        <h2
          id="consent-modal-title"
          className="font-serif text-2xl text-paper mb-2"
        >
          Cookie-Einstellungen
        </h2>
        <p className="text-sm text-paper-mute leading-relaxed mb-6">
          Wählen Sie, welche Kategorien Sie zulassen möchten. Sie können diese
          Einstellung jederzeit über den Cookie-Button unten links ändern.
        </p>

        <ul className="space-y-3 mb-6">
          {CATEGORY_ORDER.map((cat) => {
            const info = CONSENT_CATEGORY_INFO[cat]
            const checked = draft[cat]
            const disabled = info.required
            return (
              <li
                key={cat}
                className="bg-deep border border-line rounded-sm p-4"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-paper">{info.label}</h3>
                      {disabled && (
                        <span className="text-[0.65rem] font-mono uppercase tracking-wider text-paper-mute bg-paper-dim/10 px-2 py-0.5 rounded-sm">
                          Immer aktiv
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-paper-mute leading-relaxed">
                      {info.description}
                    </p>
                  </div>
                  <Toggle
                    checked={checked}
                    disabled={disabled}
                    onClick={() => toggle(cat)}
                    label={info.label}
                  />
                </div>
              </li>
            )
          })}
        </ul>

        <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 sm:items-center pt-4 border-t border-line">
          <button
            type="button"
            onClick={handleRejectAll}
            className="min-h-[44px] px-4 py-2.5 text-sm text-paper-mute rounded-sm hover:text-paper hover:bg-deep transition-colors"
          >
            Nur notwendige
          </button>
          <button
            type="button"
            onClick={handleAcceptAll}
            className="min-h-[44px] px-4 py-2.5 text-sm text-paper-mute rounded-sm hover:text-paper hover:bg-deep transition-colors"
          >
            Alle akzeptieren
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="min-h-[44px] px-5 py-2.5 inline-flex items-center justify-center gap-2 bg-signal text-deep text-sm font-medium rounded-sm hover:bg-signal-2 transition-colors sm:ml-auto"
          >
            <Check className="w-4 h-4" strokeWidth={2.5} />
            Auswahl speichern
          </button>
        </div>
      </div>
    </div>
  )
}

function Toggle({
  checked,
  disabled,
  onClick,
  label,
}: {
  checked: boolean
  disabled?: boolean
  onClick: () => void
  label: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={`${label} ${checked ? 'aktiv' : 'inaktiv'}`}
      onClick={onClick}
      disabled={disabled}
      className={`relative shrink-0 w-11 h-6 rounded-full transition-colors ${
        disabled
          ? checked
            ? 'bg-paper-dim/20 cursor-not-allowed'
            : 'bg-deep cursor-not-allowed'
          : checked
            ? 'bg-signal cursor-pointer'
            : 'bg-deep border border-paper-dim/40 cursor-pointer'
      }`}
    >
      <span
        className={`absolute top-0.5 w-5 h-5 rounded-full transition-all ${
          checked
            ? 'left-[22px] bg-deep'
            : 'left-0.5 bg-paper-mute'
        } ${disabled ? 'opacity-50' : ''}`}
      />
    </button>
  )
}
