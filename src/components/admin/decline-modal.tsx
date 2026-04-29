'use client'

import { useEffect, useState } from 'react'
import { Loader2, X } from 'lucide-react'

type Props = {
  bookingName: string
  submitting: boolean
  onCancel: () => void
  onConfirm: (reason: string) => void
}

export function DeclineModal({
  bookingName,
  submitting,
  onCancel,
  onConfirm,
}: Props) {
  const [reason, setReason] = useState('')

  useEffect(() => {
    function onEsc(e: KeyboardEvent) {
      if (e.key === 'Escape' && !submitting) onCancel()
    }
    window.addEventListener('keydown', onEsc)
    return () => window.removeEventListener('keydown', onEsc)
  }, [onCancel, submitting])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="decline-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
    >
      <div
        className="absolute inset-0 bg-deep/80 backdrop-blur-sm"
        onClick={() => !submitting && onCancel()}
        aria-hidden
      />
      <div className="relative w-full max-w-md bg-deep-2 border border-line rounded-sm p-6 md:p-7 shadow-2xl">
        <button
          type="button"
          onClick={() => !submitting && onCancel()}
          disabled={submitting}
          className="absolute top-3 right-3 w-9 h-9 inline-flex items-center justify-center text-paper-mute hover:text-paper rounded-sm hover:bg-deep transition-colors disabled:opacity-50"
          aria-label="Schließen"
        >
          <X className="w-4 h-4" strokeWidth={1.75} />
        </button>

        <h2
          id="decline-modal-title"
          className="font-serif text-xl text-paper mb-2"
        >
          Termin ablehnen
        </h2>
        <p className="text-sm text-paper-mute mb-5 leading-relaxed">
          Anfrage von <strong className="text-paper">{bookingName}</strong>{' '}
          wird abgelehnt. Der Kunde erhält eine E-Mail mit Hinweis auf einen
          alternativen Termin.
        </p>

        <label
          htmlFor="decline-reason"
          className="block text-xs font-semibold tracking-[0.12em] uppercase text-paper-mute mb-2"
        >
          Begründung{' '}
          <span className="text-paper-mute/70 normal-case">(optional)</span>
        </label>
        <textarea
          id="decline-reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          maxLength={500}
          rows={4}
          placeholder="Grund für die Ablehnung – wird dem Kunden in der Mail mitgeteilt."
          className="w-full px-3 py-2.5 bg-deep border border-paper-dim/30 rounded-sm text-paper placeholder:text-paper-mute/70 focus:border-signal-2 focus:outline-none transition-colors resize-y min-h-[100px] text-sm"
        />
        <p className="mt-1 text-[0.65rem] text-paper-mute">
          {reason.length} / 500
        </p>

        <div className="mt-6 flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={submitting}
            className="min-h-[44px] px-5 py-2.5 text-sm text-paper-mute rounded-sm hover:text-paper hover:bg-deep transition-colors disabled:opacity-50"
          >
            Abbrechen
          </button>
          <button
            type="button"
            onClick={() => onConfirm(reason.trim())}
            disabled={submitting}
            className="min-h-[44px] px-5 py-2.5 inline-flex items-center justify-center gap-2 bg-error text-paper text-sm font-medium rounded-sm hover:bg-error/80 transition-colors disabled:opacity-50"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Wird abgelehnt …
              </>
            ) : (
              'Termin ablehnen'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
