'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  Phone,
  MessageCircle,
  Mail,
} from 'lucide-react'
import { leadSchema, type LeadInput } from '@/lib/validation'
import { SITE } from '@/lib/site'

type FormState = {
  status: 'idle' | 'submitting' | 'success' | 'error'
  errors: Partial<Record<keyof LeadInput, string>>
  message?: string
  refNumber?: string
}

const TOPICS: { value: LeadInput['topic']; label: string }[] = [
  { value: 'new-website', label: 'Neue Website erstellen' },
  { value: 'relaunch', label: 'Bestehende Website überarbeiten' },
  { value: 'seo', label: 'SEO-Beratung' },
  { value: 'other', label: 'Etwas anderes' },
]

// === Form-Klassen für konsistente Lesbarkeit ===
const LABEL_CLASS =
  'block text-xs font-semibold tracking-[0.12em] uppercase text-paper-mute mb-2'

const INPUT_CLASS =
  'w-full min-h-[48px] px-4 py-3 bg-deep-2 border border-paper-dim/30 rounded-sm text-paper placeholder:text-paper-mute/70 focus:border-signal-2 focus:bg-deep-2 focus:outline-none transition-colors'

const TEXTAREA_CLASS =
  'w-full px-4 py-3 bg-deep-2 border border-paper-dim/30 rounded-sm text-paper placeholder:text-paper-mute/70 focus:border-signal-2 focus:outline-none transition-colors resize-y min-h-[140px]'

const HINT_CLASS = 'mt-3 text-xs text-paper-mute leading-relaxed'

export function KontaktForm() {
  const [state, setState] = useState<FormState>({ status: 'idle', errors: {} })
  const formLoadTimeRef = useRef<number>(0)

  useEffect(() => {
    formLoadTimeRef.current = Date.now()
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState({ status: 'submitting', errors: {} })

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    const parsed = leadSchema.safeParse(data)
    if (!parsed.success) {
      const errors: FormState['errors'] = {}
      for (const [key, msgs] of Object.entries(
        parsed.error.flatten().fieldErrors,
      )) {
        if (msgs?.[0]) errors[key as keyof LeadInput] = msgs[0]
      }
      setState({
        status: 'error',
        errors,
        message: 'Bitte überprüfen Sie Ihre Eingaben.',
      })
      return
    }

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...parsed.data,
          formLoadTime: formLoadTimeRef.current,
        }),
      })

      if (res.status === 429) {
        const body = await res.json().catch(() => ({}))
        setState({
          status: 'error',
          errors: {},
          message:
            body?.error ??
            'Zu viele Anfragen in kurzer Zeit. Bitte rufen Sie direkt an.',
        })
        return
      }

      if (!res.ok) throw new Error('Server error')

      const body = await res.json().catch(() => ({}))
      setState({
        status: 'success',
        errors: {},
        refNumber: body?.refNumber as string | undefined,
      })

      setTimeout(() => {
        document
          .getElementById('kontakt-form-result')
          ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 100)
    } catch {
      setState({
        status: 'error',
        errors: {},
        message:
          'Es gab ein technisches Problem. Bitte versuchen Sie es noch einmal – oder rufen Sie direkt an.',
      })
    }
  }

  // === SUCCESS ===
  if (state.status === 'success') {
    return (
      <motion.div
        id="kontakt-form-result"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="bg-deep-2 border border-success/40 rounded-sm p-8 md:p-10"
        role="status"
        aria-live="polite"
      >
        <div className="flex items-start gap-4 mb-5">
          <CheckCircle2
            className="w-8 h-8 text-success shrink-0 mt-1"
            strokeWidth={1.75}
          />
          <div>
            <h3 className="font-serif text-2xl md:text-3xl text-paper mb-2">
              Anfrage erfolgreich versendet.
            </h3>
            {state.refNumber && (
              <p className="font-mono text-xs text-paper-mute">
                Ihre Referenznummer:{' '}
                <strong className="text-signal-2">#{state.refNumber}</strong>
              </p>
            )}
          </div>
        </div>

        <p className="text-paper-mute leading-relaxed mb-6">
          Eine Bestätigung mit Ihren Angaben ist gerade an Ihre E-Mail-Adresse
          unterwegs. Ich melde mich binnen 24 Stunden persönlich bei Ihnen
          zurück, üblicherweise deutlich schneller.
        </p>

        <div className="border-t border-line pt-6">
          <p className="text-[0.7rem] font-mono uppercase tracking-wider text-signal-2 mb-3">
            Falls es eilt – direkt erreichbar
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={`tel:${SITE.contact.phoneRaw}`}
              className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 bg-signal text-deep font-medium text-sm rounded-sm hover:bg-signal-2 transition-colors"
            >
              <Phone className="w-4 h-4" strokeWidth={1.75} />
              {SITE.contact.phoneFormatted}
            </a>
            <a
              href={SITE.contact.whatsapp}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 bg-deep border border-paper-dim/30 text-paper font-medium text-sm rounded-sm hover:border-signal-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4" strokeWidth={1.75} />
              WhatsApp
            </a>
          </div>
        </div>
      </motion.div>
    )
  }

  // === FORM ===
  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <AnimatePresence>
        {state.status === 'error' && state.message && (
          <motion.div
            id="kontakt-form-result"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="bg-deep-2 border border-error/40 rounded-sm p-5"
            role="alert"
            aria-live="assertive"
          >
            <div className="flex items-start gap-3 mb-3">
              <AlertCircle
                className="w-5 h-5 text-error shrink-0 mt-0.5"
                strokeWidth={1.75}
              />
              <div>
                <p className="text-paper font-medium mb-1">
                  Versand nicht möglich
                </p>
                <p className="text-paper-mute text-sm leading-relaxed">
                  {state.message}
                </p>
              </div>
            </div>
            <div className="ml-8 mt-4 flex flex-wrap gap-2">
              <a
                href={`tel:${SITE.contact.phoneRaw}`}
                className="inline-flex items-center gap-2 min-h-[40px] px-4 py-2 bg-signal text-deep text-sm font-medium rounded-sm hover:bg-signal-2 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" strokeWidth={1.75} />
                {SITE.contact.phoneFormatted}
              </a>
              <a
                href={`mailto:${SITE.contact.email}`}
                className="inline-flex items-center gap-2 min-h-[40px] px-4 py-2 bg-deep border border-paper-dim/30 text-paper text-sm rounded-sm hover:border-signal-2 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" strokeWidth={1.75} />
                {SITE.contact.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Honeypot */}
      <div
        className="absolute -left-[9999px] w-px h-px overflow-hidden"
        aria-hidden
      >
        <label htmlFor="website">Website (leer lassen)</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <input type="hidden" name="source" value="kontakt-form" />

      {/* Name */}
      <div>
        <label htmlFor="name" className={LABEL_CLASS}>
          Ihr Name <span className="text-signal-2">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          autoComplete="name"
          aria-invalid={Boolean(state.errors.name)}
          className={INPUT_CLASS}
        />
        {state.errors.name && (
          <p className="mt-2 text-sm text-error">{state.errors.name}</p>
        )}
      </div>

      {/* Email + Phone Row */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className={LABEL_CLASS}>
            E-Mail <span className="text-signal-2">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            autoComplete="email"
            aria-invalid={Boolean(state.errors.email)}
            className={INPUT_CLASS}
          />
          {state.errors.email && (
            <p className="mt-2 text-sm text-error">{state.errors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="phone" className={LABEL_CLASS}>
            Telefon{' '}
            <span className="text-paper-mute/70 normal-case">(optional)</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            autoComplete="tel"
            className={INPUT_CLASS}
          />
        </div>
      </div>

      {/* Company */}
      <div>
        <label htmlFor="company" className={LABEL_CLASS}>
          Firma{' '}
          <span className="text-paper-mute/70 normal-case">(optional)</span>
        </label>
        <input
          type="text"
          id="company"
          name="company"
          autoComplete="organization"
          className={INPUT_CLASS}
        />
      </div>

      {/* Topic */}
      <div>
        <label htmlFor="topic" className={LABEL_CLASS}>
          Worum geht es? <span className="text-signal-2">*</span>
        </label>
        <select
          id="topic"
          name="topic"
          required
          defaultValue=""
          className={INPUT_CLASS}
        >
          <option value="" disabled>
            Bitte auswählen
          </option>
          {TOPICS.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
        {state.errors.topic && (
          <p className="mt-2 text-sm text-error">{state.errors.topic}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className={LABEL_CLASS}>
          Worum geht es konkret? <span className="text-signal-2">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          minLength={10}
          maxLength={2000}
          placeholder="Beschreiben Sie kurz, was Sie vorhaben oder welches Problem Sie lösen möchten."
          className={TEXTAREA_CLASS}
        />
        {state.errors.message && (
          <p className="mt-2 text-sm text-error">{state.errors.message}</p>
        )}
      </div>

      {/* Submit */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={state.status === 'submitting'}
          className="inline-flex items-center justify-center gap-2 min-h-[48px] px-7 py-4 bg-signal text-deep font-medium text-sm rounded-sm hover:bg-signal-2 transition-colors shadow-[0_8px_30px_-8px_rgba(var(--signal-rgb),0.5)] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {state.status === 'submitting' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Wird gesendet …
            </>
          ) : (
            <>Anfrage senden</>
          )}
        </button>
        <p className={HINT_CLASS}>
          Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Daten gemäß{' '}
          <a href="/datenschutz" className="text-signal-2 hover:underline">
            Datenschutzerklärung
          </a>{' '}
          zu.
        </p>
      </div>
    </form>
  )
}
