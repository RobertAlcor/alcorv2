'use client'

import { useEffect, useState } from 'react'
import { Loader2, X } from 'lucide-react'
import {
  type LeadStatus,
  LEAD_STATUS_ORDER,
  LEAD_STATUS_LABEL,
} from '@/lib/lead-status'

type Props = {
  onCancel: () => void
  onCreated: () => void
}

const LABEL =
  'block text-xs font-semibold tracking-[0.12em] uppercase text-paper-mute mb-2'
const INPUT =
  'w-full min-h-[44px] px-3 py-2.5 bg-deep border border-paper-dim/30 rounded-sm text-paper placeholder:text-paper-mute/70 focus:border-signal-2 focus:outline-none transition-colors text-sm'
const TEXTAREA =
  'w-full px-3 py-2.5 bg-deep border border-paper-dim/30 rounded-sm text-paper placeholder:text-paper-mute/70 focus:border-signal-2 focus:outline-none transition-colors resize-y min-h-[80px] text-sm'

const TOPIC_OPTIONS: { value: 'new-website' | 'relaunch' | 'seo' | 'other'; label: string }[] = [
  { value: 'new-website', label: 'Neue Website erstellen' },
  { value: 'relaunch', label: 'Bestehende Website überarbeiten' },
  { value: 'seo', label: 'SEO-Beratung' },
  { value: 'other', label: 'Etwas anderes' },
]

export function ManualLeadModal({ onCancel, onCreated }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [company, setCompany] = useState('')
  const [topic, setTopic] = useState<
    'new-website' | 'relaunch' | 'seo' | 'other'
  >('new-website')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<LeadStatus>('new')
  const [adminNotes, setAdminNotes] = useState('')
  const [sendCustomerMail, setSendCustomerMail] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    function onEsc(e: KeyboardEvent) {
      if (e.key === 'Escape' && !submitting) onCancel()
    }
    window.addEventListener('keydown', onEsc)
    return () => window.removeEventListener('keydown', onEsc)
  }, [onCancel, submitting])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (submitting) return
    setError(null)
    setSubmitting(true)
    try {
      const res = await fetch('/api/admin/leads/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          company,
          topic,
          message,
          status,
          adminNotes,
          sendCustomerMail,
        }),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(body?.error ?? 'Anlegen fehlgeschlagen')
        setSubmitting(false)
        return
      }
      onCreated()
    } catch {
      setError('Netzwerkfehler')
      setSubmitting(false)
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="manual-lead-title"
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center px-4 py-8 overflow-y-auto"
    >
      <div
        className="fixed inset-0 bg-deep/80 backdrop-blur-sm"
        onClick={() => !submitting && onCancel()}
        aria-hidden
      />
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-2xl bg-deep-2 border border-line rounded-sm p-6 md:p-8 shadow-2xl"
      >
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
          id="manual-lead-title"
          className="font-serif text-2xl text-paper mb-1"
        >
          Anfrage manuell anlegen
        </h2>
        <p className="text-sm text-paper-mute mb-6">
          Z.B. wenn jemand telefonisch angefragt hat.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="sm:col-span-2">
            <label htmlFor="ml-name" className={LABEL}>
              Name
            </label>
            <input
              id="ml-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength={2}
              className={INPUT}
            />
          </div>
          <div>
            <label htmlFor="ml-email" className={LABEL}>
              E-Mail
            </label>
            <input
              id="ml-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={INPUT}
            />
          </div>
          <div>
            <label htmlFor="ml-phone" className={LABEL}>
              Telefon{' '}
              <span className="normal-case text-paper-mute/70">(optional)</span>
            </label>
            <input
              id="ml-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={INPUT}
            />
          </div>
          <div>
            <label htmlFor="ml-company" className={LABEL}>
              Firma{' '}
              <span className="normal-case text-paper-mute/70">(optional)</span>
            </label>
            <input
              id="ml-company"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className={INPUT}
            />
          </div>
          <div>
            <label htmlFor="ml-topic" className={LABEL}>
              Thema
            </label>
            <select
              id="ml-topic"
              value={topic}
              onChange={(e) =>
                setTopic(
                  e.target.value as
                    | 'new-website'
                    | 'relaunch'
                    | 'seo'
                    | 'other',
                )
              }
              className={INPUT}
            >
              {TOPIC_OPTIONS.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="ml-message" className={LABEL}>
            Nachricht / Notiz vom Gespräch{' '}
            <span className="normal-case text-paper-mute/70">(optional)</span>
          </label>
          <textarea
            id="ml-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            placeholder="Was hat der Kunde am Telefon erzählt ..."
            className={TEXTAREA}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="ml-status" className={LABEL}>
              Status
            </label>
            <select
              id="ml-status"
              value={status}
              onChange={(e) => setStatus(e.target.value as LeadStatus)}
              className={INPUT}
            >
              {LEAD_STATUS_ORDER.map((s) => (
                <option key={s} value={s}>
                  {LEAD_STATUS_LABEL[s]}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="ml-admin-notes" className={LABEL}>
            Deine Notizen{' '}
            <span className="normal-case text-paper-mute/70">
              (intern, nicht in Mail)
            </span>
          </label>
          <textarea
            id="ml-admin-notes"
            value={adminNotes}
            onChange={(e) => setAdminNotes(e.target.value)}
            rows={2}
            placeholder="Folgekontakte, Notizen ..."
            className={TEXTAREA}
          />
        </div>

        <label className="flex items-start gap-3 mb-5 cursor-pointer">
          <input
            type="checkbox"
            checked={sendCustomerMail}
            onChange={(e) => setSendCustomerMail(e.target.checked)}
            className="mt-0.5 w-5 h-5 rounded-sm border border-paper-dim/40 bg-deep accent-signal cursor-pointer"
          />
          <span className="text-sm text-paper-mute leading-relaxed">
            <strong className="text-paper">
              Auto-Reply-Mail an Kunde senden
            </strong>{' '}
            (Bestätigung der Anfrage)
          </span>
        </label>

        {error && (
          <p className="text-sm text-error mb-4" role="alert">
            {error}
          </p>
        )}

        <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end pt-4 border-t border-line">
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
              'Anfrage anlegen'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
