'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowUpRight, CheckCircle2, Loader2 } from 'lucide-react'
import {
  leadSchema,
  TOPIC_LABELS,
  PACKAGE_LABELS,
  type LeadInput,
} from '@/lib/validation'
import { getWebsiteService } from '@/lib/website-service'
import { SITE } from '@/lib/site'
import { requestedProject } from '@/lib/project-access'
import { trackConfirmedLead } from '@/lib/lead-analytics'

type Errors = Partial<Record<keyof LeadInput | 'privacy', string>>
const inputClass =
  'w-full min-h-[52px] rounded-md border border-paper-dim/40 bg-deep px-4 py-3 text-base text-paper focus:border-signal-2'

export function KontaktForm({ application = false }: { application?: boolean }) {
  return (
    <>
      <noscript>
        <p className="border-line text-paper-mute mb-6 rounded-md border p-4">
          Für das Formular ist JavaScript erforderlich. Schreiben Sie stattdessen direkt
          an{' '}
          <a className="underline" href={`mailto:${SITE.contact.email}`}>
            {SITE.contact.email}
          </a>{' '}
          oder rufen Sie{' '}
          <a className="underline" href={`tel:${SITE.contact.phoneRaw}`}>
            {SITE.contact.phoneFormatted}
          </a>{' '}
          an.
        </p>
      </noscript>
      <Suspense fallback={<p role="status">Formular wird geladen …</p>}>
        <FormWithSelection application={application} />
      </Suspense>
    </>
  )
}

function FormWithSelection({ application }: { application: boolean }) {
  const params = useSearchParams()
  const selection = [
    application,
    params.get('service'),
    params.get('thema'),
    params.get('paket'),
    params.get('anliegen'),
    params.get('projekt'),
  ].join(':')
  return <Form key={selection} application={application} />
}

function Form({ application }: { application: boolean }) {
  const params = useSearchParams()
  const started = useRef(0)
  const formRef = useRef<HTMLFormElement>(null)
  const [busy, setBusy] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  const [message, setMessage] = useState('')
  const [refNumber, setRefNumber] = useState<string | null>(null)
  const service = application ? undefined : getWebsiteService(params.get('service'))
  const demoProject = application ? undefined : requestedProject(params.get('projekt'))
  const demoMessage = demoProject
    ? `Guten Tag Robert, ich möchte einen Einblick in ${demoProject} anfragen.

Mein Vorhaben / gewünschter Einsatz: `
    : undefined
  const messagePrefix = service ? `[Angebot: ${service.title}]\n\n` : ''
  const maxMessageLength = 4000 - messagePrefix.length
  const pkg = params.get('paket') || ''
  const initialPackage =
    !service && ['starter', 'business', 'premium', 'unsure'].includes(pkg) ? pkg : ''
  const topic =
    params.get('thema') ||
    service?.topic ||
    (params.get('anliegen') === 'website-check'
      ? 'seo'
      : application
        ? 'new-website'
        : 'general')
  const initialTopic = Object.keys(TOPIC_LABELS).includes(topic) ? topic : 'general'

  useEffect(() => {
    started.current = Date.now()
  }, [])

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (busy) return

    const data = new FormData(event.currentTarget)
    const raw = Object.fromEntries(data.entries())
    const parsed = leadSchema.safeParse(raw)
    const next: Errors = {}

    if (!parsed.success) {
      for (const [key, items] of Object.entries(parsed.error.flatten().fieldErrors)) {
        if (items?.[0]) next[key as keyof LeadInput] = items[0]
      }
    }

    if (parsed.success && parsed.data.message.length > maxMessageLength) {
      next.message = `Bitte kürzen Sie Ihre Nachricht auf höchstens ${maxMessageLength} Zeichen.`
    }

    if (data.get('privacy') !== 'on') {
      next.privacy =
        'Bitte bestätigen Sie, dass Sie die Datenschutzhinweise gelesen haben.'
    }

    if (Object.keys(next).length) {
      setErrors(next)
      setMessage('Bitte prüfen Sie die markierten Felder.')
      requestAnimationFrame(() =>
        formRef.current
          ?.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)
          ?.focus()
      )
      return
    }

    if (!parsed.success) return

    setErrors({})
    setMessage('')
    setBusy(true)

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...parsed.data,
          message: messagePrefix + parsed.data.message,
          copyToCustomer: data.get('copyToCustomer') === 'on',
          formLoadTime: started.current,
        }),
      })
      const result = await response.json().catch(() => null)
      if (!response.ok || !result?.ok) {
        throw new Error(
          typeof result?.error === 'string'
            ? result.error
            : 'Die Anfrage konnte nicht übermittelt werden. Bitte versuchen Sie es erneut oder rufen Sie direkt an.'
        )
      }
      trackConfirmedLead(
        application ? 'project-application-form' : 'contact-form',
        result
      )
      setRefNumber(
        typeof result.refNumber === 'string' ? result.refNumber : 'eingegangen'
      )
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : 'Verbindung fehlgeschlagen. Bitte versuchen Sie es erneut.'
      )
    } finally {
      setBusy(false)
    }
  }

  if (refNumber) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="border-success/40 bg-deep rounded-lg border p-7"
      >
        <CheckCircle2 className="text-success mb-5" size={32} aria-hidden="true" />
        <h2 className="mb-4 text-2xl font-semibold">Ihre Anfrage ist eingegangen.</h2>
        <p className="text-paper-mute">
          Ich prüfe Ihr Vorhaben persönlich und melde mich mit den nächsten Schritten. Ein
          Auftrag entsteht erst durch eine gesonderte Vereinbarung.
        </p>
        <p className="text-signal-2 mt-5 text-sm">Referenz: {refNumber}</p>
        <a className="alcor-text-link mt-5" href={`tel:${SITE.contact.phoneRaw}`}>
          {SITE.contact.phoneFormatted}
        </a>
      </div>
    )
  }

  const errorText = (name: keyof Errors) =>
    errors[name] ? (
      <p id={`error-${name}`} className="text-error mt-2 text-sm">
        {errors[name]}
      </p>
    ) : null

  return (
    <form
      id={application ? 'project-application-form' : 'contact-form'}
      ref={formRef}
      onSubmit={submit}
      noValidate
      className="space-y-6"
    >
      {message && (
        <div
          role="alert"
          className="border-error/40 bg-error/10 rounded-md border p-4 text-base"
        >
          <p>{message}</p>
          <a
            href={`tel:${SITE.contact.phoneRaw}`}
            className="mt-2 inline-block underline"
          >
            Direkt anrufen: {SITE.contact.phoneFormatted}
          </a>
        </div>
      )}

      <fieldset disabled={busy} className="space-y-6">
        <legend className="mb-5 text-xl font-semibold">
          {application
            ? 'Ihre Projektanfrage'
            : service
              ? `Ihre Anfrage: ${service.title}`
              : demoProject
                ? `Zugang anfragen: ${demoProject}`
                : 'Ihr Anliegen'}
        </legend>

        {demoProject && (
          <p className="border-line bg-deep-2 text-paper-mute rounded-md border p-4 text-base">
            Sie fragen Robert Alchimowicz persönlich nach einer Demonstration von{' '}
            {demoProject}. Ein Zugang oder eine APK wird erst nach gesonderter Freigabe
            bereitgestellt. Bitte beschreiben Sie kurz Ihr Vorhaben.
          </p>
        )}

        {service && (
          <p className="border-line bg-deep-2 text-paper-mute rounded-md border p-4 text-base">
            {service.title}: {service.price} {service.unit}. Umfang und Machbarkeit werden
            vorab geprüft. Keine automatische Beauftragung und kein automatisches Abo.
          </p>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          {[
            {
              name: 'name' as const,
              label: 'Ihr Name *',
              type: 'text',
              auto: 'name',
            },
            {
              name: 'email' as const,
              label: 'E-Mail-Adresse *',
              type: 'email',
              auto: 'email',
            },
            {
              name: 'company' as const,
              label: 'Unternehmen (optional)',
              type: 'text',
              auto: 'organization',
            },
            {
              name: 'phone' as const,
              label: 'Telefon (optional)',
              type: 'tel',
              auto: 'tel',
            },
          ].map((field) => (
            <div key={field.name}>
              <label
                htmlFor={`contact-${field.name}`}
                className="text-paper-mute mb-2 block text-sm font-medium"
              >
                {field.label}
              </label>
              <input
                id={`contact-${field.name}`}
                name={field.name}
                type={field.type}
                autoComplete={field.auto}
                required={field.name === 'name' || field.name === 'email'}
                maxLength={
                  field.name === 'email' ? 254 : field.name === 'phone' ? 40 : 120
                }
                className={inputClass}
                aria-invalid={!!errors[field.name]}
                aria-describedby={errors[field.name] ? `error-${field.name}` : undefined}
              />
              {errorText(field.name)}
            </div>
          ))}
        </div>

        <div>
          <label
            htmlFor="contact-topic"
            className="text-paper-mute mb-2 block text-sm font-medium"
          >
            Worum geht es? *
          </label>
          <select
            id="contact-topic"
            name="topic"
            defaultValue={initialTopic}
            className={inputClass}
            required
            aria-invalid={!!errors.topic}
            aria-describedby={errors.topic ? 'error-topic' : undefined}
          >
            {Object.entries(TOPIC_LABELS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
          {errorText('topic')}
        </div>

        {!service && (
          <div>
            <label
              htmlFor="contact-package"
              className="text-paper-mute mb-2 block text-sm font-medium"
            >
              Gewünschter Rahmen (optional)
            </label>
            <select
              id="contact-package"
              name="package_interest"
              defaultValue={initialPackage}
              className={inputClass}
            >
              <option value="">Bitte auswählen (optional)</option>
              {Object.entries(PACKAGE_LABELS).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
            {errorText('package_interest')}
          </div>
        )}

        <div>
          <label
            htmlFor="contact-website"
            className="text-paper-mute mb-2 block text-sm font-medium"
          >
            Bestehende Website (optional)
          </label>
          <input
            id="contact-website"
            name="existing_website"
            type="url"
            placeholder="https://…"
            maxLength={500}
            className={inputClass}
            aria-invalid={!!errors.existing_website}
            aria-describedby={
              errors.existing_website ? 'error-existing_website' : undefined
            }
          />
          {errorText('existing_website')}
        </div>

        <div>
          <label
            htmlFor="contact-message"
            className="text-paper-mute mb-2 block text-sm font-medium"
          >
            {application ? 'Ihre Idee, Ziele und Ihr Zeitrahmen *' : 'Ihre Nachricht *'}
          </label>
          <textarea
            id="contact-message"
            name="message"
            defaultValue={demoMessage}
            rows={6}
            minLength={10}
            maxLength={maxMessageLength}
            required
            className={inputClass}
            placeholder={
              service?.message ||
              (application
                ? 'Was möchten Sie mit der Website erreichen? Was ist Ihnen wichtig? Welchen Rahmen stellen Sie sich vor?'
                : 'Wobei darf ich Ihnen helfen?')
            }
            aria-invalid={!!errors.message}
            aria-describedby={
              [errors.message ? 'error-message' : null, 'contact-access-note']
                .filter(Boolean)
                .join(' ') || undefined
            }
          />
          {errorText('message')}
          <p id="contact-access-note" className="text-paper-mute mt-2 text-sm">
            Stichpunkte reichen. Bitte keine Passwörter, Zugangscodes oder vertraulichen
            Kundenunterlagen mitsenden.
          </p>
        </div>

        <div className="hidden" aria-hidden="true">
          <label htmlFor="contact-honeypot">Bitte leer lassen</label>
          <input id="contact-honeypot" name="website" autoComplete="off" tabIndex={-1} />
        </div>

        <div>
          <label className="text-paper-mute flex items-start gap-3 text-sm leading-relaxed">
            <input
              type="checkbox"
              name="privacy"
              required
              className="accent-signal mt-1 h-5 w-5 shrink-0"
              aria-invalid={!!errors.privacy}
              aria-describedby={errors.privacy ? 'error-privacy' : undefined}
            />
            <span>
              Ich habe die{' '}
              <Link href="/datenschutz" className="text-signal-2 underline">
                Datenschutzhinweise
              </Link>{' '}
              gelesen. Meine Angaben werden zur Bearbeitung meiner Anfrage verwendet. *
            </span>
          </label>
          {errorText('privacy')}
        </div>

        <label className="text-paper-mute flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            name="copyToCustomer"
            className="accent-signal mt-1 h-5 w-5 shrink-0"
          />
          <span>Eine Kopie meiner Anfrage per E-Mail erhalten.</span>
        </label>

        <button type="submit" className="alcor-button w-full disabled:opacity-60">
          {busy ? (
            <>
              <Loader2 size={20} className="animate-spin" aria-hidden="true" />
              Wird gesendet …
            </>
          ) : (
            <>
              {application
                ? 'Projektanfrage absenden'
                : service
                  ? `${service.title} anfragen`
                  : 'Anfrage absenden'}
              <ArrowUpRight size={20} aria-hidden="true" />
            </>
          )}
        </button>
        <p className="text-paper-mute text-sm leading-relaxed">
          Kostenlos und unverbindlich. Keine automatische Beauftragung. * Pflichtfelder
        </p>
      </fieldset>
    </form>
  )
}
