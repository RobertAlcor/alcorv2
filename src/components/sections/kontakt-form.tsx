'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { leadSchema, type LeadInput } from '@/lib/validation'

type FormState = {
  status: 'idle' | 'submitting' | 'success' | 'error'
  errors: Partial<Record<keyof LeadInput, string>>
  message?: string
}

const TOPICS: { value: LeadInput['topic']; label: string }[] = [
  { value: 'new-website', label: 'Neue Website erstellen' },
  { value: 'relaunch', label: 'Bestehende Website überarbeiten' },
  { value: 'seo', label: 'SEO-Beratung' },
  { value: 'other', label: 'Etwas anderes' },
]

export function KontaktForm() {
  const [state, setState] = useState<FormState>({ status: 'idle', errors: {} })

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState({ status: 'submitting', errors: {} })

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    const parsed = leadSchema.safeParse(data)
    if (!parsed.success) {
      const errors: FormState['errors'] = {}
      for (const [key, msgs] of Object.entries(parsed.error.flatten().fieldErrors)) {
        if (msgs?.[0]) errors[key as keyof LeadInput] = msgs[0]
      }
      setState({ status: 'error', errors, message: 'Bitte überprüfen Sie Ihre Eingaben.' })
      return
    }

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      })

      if (!res.ok) {
        throw new Error('Server error')
      }

      setState({ status: 'success', errors: {} })
    } catch {
      setState({
        status: 'error',
        errors: {},
        message: 'Etwas ist schiefgelaufen. Bitte rufen Sie kurz an.',
      })
    }
  }

  if (state.status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-10 bg-deep-2 border border-line rounded-sm"
      >
        <h3 className="font-serif text-3xl text-paper mb-3">
          Danke. Ich melde mich.
        </h3>
        <p className="text-paper-mute leading-relaxed">
          Ihre Anfrage ist eingegangen. Sie bekommen binnen weniger Minuten eine
          Bestätigungs-E-Mail. Persönlich melde ich mich binnen 24 Stunden – meistens
          schneller.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Honeypot - hidden from users */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] w-px h-px overflow-hidden"
        aria-hidden="true"
      />

      <div className="grid md:grid-cols-2 gap-6">
        <Field label="Name" name="name" required error={state.errors.name} />
        <Field label="E-Mail" name="email" type="email" required error={state.errors.email} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Field label="Telefon" name="phone" type="tel" optional error={state.errors.phone} />
        <Field label="Firma" name="company" optional error={state.errors.company} />
      </div>

      <div>
        <label htmlFor="topic" className="block text-xs font-semibold tracking-[0.12em] uppercase text-paper-dim mb-2">
          Worum geht es? <span className="text-error">*</span>
        </label>
        <select
          id="topic"
          name="topic"
          required
          defaultValue=""
          className="w-full px-4 py-3.5 bg-deep-2 border border-line rounded-sm text-paper focus:border-signal-2 focus:outline-none transition-colors"
        >
          <option value="" disabled>Bitte auswählen</option>
          {TOPICS.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
        {state.errors.topic && (
          <p className="mt-2 text-sm text-error">{state.errors.topic}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-semibold tracking-[0.12em] uppercase text-paper-dim mb-2">
          Ihre Nachricht <span className="text-error">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="Was haben Sie vor? Welche Ziele hat das Projekt? Gibt es Beispiele, die Ihnen gefallen?"
          className="w-full px-4 py-3.5 bg-deep-2 border border-line rounded-sm text-paper placeholder:text-paper-dim focus:border-signal-2 focus:outline-none transition-colors resize-y min-h-[140px]"
        />
        {state.errors.message && (
          <p className="mt-2 text-sm text-error">{state.errors.message}</p>
        )}
      </div>

      {state.status === 'error' && state.message && (
        <p className="text-sm text-error">{state.message}</p>
      )}

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={state.status === 'submitting'}
          className="inline-flex items-center gap-2 px-7 py-4 bg-signal text-paper font-medium text-sm rounded-sm hover:bg-signal-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_8px_30px_-8px_rgba(37,99,235,0.5)]"
        >
          {state.status === 'submitting' ? 'Wird gesendet…' : 'Anfrage senden'}
          {state.status !== 'submitting' && (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          )}
        </button>
        <p className="text-xs text-paper-dim">
          Antwort binnen 24 Stunden · Kein Verkaufsdruck
        </p>
      </div>
    </form>
  )
}

function Field({
  label,
  name,
  type = 'text',
  required,
  optional,
  error,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  optional?: boolean
  error?: string
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs font-semibold tracking-[0.12em] uppercase text-paper-dim mb-2">
        {label} {required && <span className="text-error">*</span>}
        {optional && <span className="text-paper-dim font-normal normal-case tracking-normal text-[0.7rem] ml-1">(optional)</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full px-4 py-3.5 bg-deep-2 border border-line rounded-sm text-paper placeholder:text-paper-dim focus:border-signal-2 focus:outline-none transition-colors"
      />
      {error && <p className="mt-2 text-sm text-error">{error}</p>}
    </div>
  )
}
