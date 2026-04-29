'use client'

import { useEffect, useState } from 'react'
import { Loader2, X } from 'lucide-react'

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

const HOUR_OPTIONS = Array.from({ length: 24 }, (_, h) => h)
const MINUTE_OPTIONS = [0, 15, 30, 45]

export function ManualBookingModal({ onCancel, onCreated }: Props) {
  const today = new Date()
  const todayIso = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

  const [date, setDate] = useState(todayIso)
  const [hour, setHour] = useState(10)
  const [minute, setMinute] = useState(0)
  const [duration, setDuration] = useState(60)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [topic, setTopic] = useState('')
  const [message, setMessage] = useState('')
  const [channel, setChannel] = useState<
    'phone' | 'on-site-office' | 'on-site-external'
  >('phone')
  const [externalAddress, setExternalAddress] = useState('')
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

    // ISO-Datetime im lokalen Browser, wird auf Server in UTC konvertiert
    const start = new Date(date)
    if (isNaN(start.getTime())) {
      setError('Ungültiges Datum')
      return
    }
    start.setHours(hour, minute, 0, 0)

    setSubmitting(true)
    try {
      const res = await fetch('/api/admin/bookings/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          topic,
          message,
          channel,
          externalAddress: channel === 'on-site-external' ? externalAddress : '',
          slotStart: start.toISOString(),
          durationMinutes: duration,
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
      aria-labelledby="manual-booking-title"
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
          id="manual-booking-title"
          className="font-serif text-2xl text-paper mb-1"
        >
          Termin manuell anlegen
        </h2>
        <p className="text-sm text-paper-mute mb-6">
          Direkt als bestätigt eingetragen. Mail an Kunde optional.
        </p>

        {/* Datum + Zeit */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div className="sm:col-span-1">
            <label htmlFor="mb-date" className={LABEL}>
              Datum
            </label>
            <input
              id="mb-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className={INPUT}
            />
          </div>
          <div>
            <label htmlFor="mb-hour" className={LABEL}>
              Uhrzeit
            </label>
            <div className="flex gap-2">
              <select
                id="mb-hour"
                value={hour}
                onChange={(e) => setHour(Number(e.target.value))}
                className={INPUT}
              >
                {HOUR_OPTIONS.map((h) => (
                  <option key={h} value={h}>
                    {String(h).padStart(2, '0')}
                  </option>
                ))}
              </select>
              <select
                value={minute}
                onChange={(e) => setMinute(Number(e.target.value))}
                aria-label="Minuten"
                className={INPUT}
              >
                {MINUTE_OPTIONS.map((m) => (
                  <option key={m} value={m}>
                    :{String(m).padStart(2, '0')}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="mb-duration" className={LABEL}>
              Dauer
            </label>
            <select
              id="mb-duration"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className={INPUT}
            >
              <option value={15}>15 Min</option>
              <option value={30}>30 Min</option>
              <option value={45}>45 Min</option>
              <option value={60}>60 Min</option>
              <option value={90}>90 Min</option>
              <option value={120}>120 Min</option>
            </select>
          </div>
        </div>

        {/* Name + E-Mail + Telefon */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="sm:col-span-2">
            <label htmlFor="mb-name" className={LABEL}>
              Name
            </label>
            <input
              id="mb-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength={2}
              className={INPUT}
            />
          </div>
          <div>
            <label htmlFor="mb-email" className={LABEL}>
              E-Mail
            </label>
            <input
              id="mb-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={INPUT}
            />
          </div>
          <div>
            <label htmlFor="mb-phone" className={LABEL}>
              Telefon
            </label>
            <input
              id="mb-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              minLength={5}
              className={INPUT}
            />
          </div>
        </div>

        {/* Anliegen */}
        <div className="mb-4">
          <label htmlFor="mb-topic" className={LABEL}>
            Anliegen
          </label>
          <input
            id="mb-topic"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
            minLength={2}
            placeholder="z.B. Webseite Relaunch"
            className={INPUT}
          />
        </div>

        {/* Channel */}
        <div className="mb-4">
          <label htmlFor="mb-channel" className={LABEL}>
            Termin-Art
          </label>
          <select
            id="mb-channel"
            value={channel}
            onChange={(e) =>
              setChannel(
                e.target.value as
                  | 'phone'
                  | 'on-site-office'
                  | 'on-site-external',
              )
            }
            className={INPUT}
          >
            <option value="phone">Telefon</option>
            <option value="on-site-office">Im Büro (1220 Wien)</option>
            <option value="on-site-external">Vor Ort beim Kunden</option>
          </select>
        </div>

        {channel === 'on-site-external' && (
          <div className="mb-4">
            <label htmlFor="mb-address" className={LABEL}>
              Adresse Kunde
            </label>
            <input
              id="mb-address"
              type="text"
              value={externalAddress}
              onChange={(e) => setExternalAddress(e.target.value)}
              required
              minLength={5}
              className={INPUT}
            />
          </div>
        )}

        {/* Vorab-Notiz vom Kunden (sichtbar in Mail) */}
        <div className="mb-4">
          <label htmlFor="mb-message" className={LABEL}>
            Vorab-Notiz vom Kunden{' '}
            <span className="normal-case text-paper-mute/70">(optional)</span>
          </label>
          <textarea
            id="mb-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={2}
            placeholder="Wenn der Kunde was vorab erwähnt hat ..."
            className={TEXTAREA}
          />
        </div>

        {/* Admin-Notizen (intern) */}
        <div className="mb-5">
          <label htmlFor="mb-admin-notes" className={LABEL}>
            Deine Notizen{' '}
            <span className="normal-case text-paper-mute/70">
              (intern, nicht in Mail)
            </span>
          </label>
          <textarea
            id="mb-admin-notes"
            value={adminNotes}
            onChange={(e) => setAdminNotes(e.target.value)}
            rows={2}
            placeholder="Eigene Notizen für später ..."
            className={TEXTAREA}
          />
        </div>

        {/* Mail-Optionen */}
        <label className="flex items-start gap-3 mb-5 cursor-pointer">
          <input
            type="checkbox"
            checked={sendCustomerMail}
            onChange={(e) => setSendCustomerMail(e.target.checked)}
            className="mt-0.5 w-5 h-5 rounded-sm border border-paper-dim/40 bg-deep accent-signal cursor-pointer"
          />
          <span className="text-sm text-paper-mute leading-relaxed">
            <strong className="text-paper">
              Bestätigungs-Mail an Kunde senden
            </strong>{' '}
            (mit Kalender-Eintrag)
          </span>
        </label>

        {error && (
          <p className="text-sm text-error mb-4" role="alert">
            {error}
          </p>
        )}

        {/* Buttons */}
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
              'Termin anlegen'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
