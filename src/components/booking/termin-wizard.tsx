'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowLeft, ArrowRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { StepIndicator } from './step-indicator'
import { Calendar } from './calendar'
import { SlotPicker } from './slot-picker'
import { BookingFormStep, type BookingStepData } from './booking-form'
import { BookingReview } from './booking-review'
import { SuccessState } from './success-state'
import { getBookableDates } from '@/lib/booking'

type ConflictAlt = {
  isoStart: string
  isoEnd: string
  label: string
  date: string
}

type SubmitState =
  | { status: 'idle' }
  | { status: 'submitting' }
  | {
      status: 'success'
      refNumber: string
      slotStart: string
      slotEnd: string
    }
  | { status: 'error'; message: string; alternatives?: ConflictAlt[] }

const STEP_LABELS = ['Tag', 'Uhrzeit', 'Daten', 'Bestätigen']

export function TerminWizard() {
  const dates = useMemo(() => getBookableDates(), [])

  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [formData, setFormData] = useState<BookingStepData>({
    name: '',
    email: '',
    phone: '',
    topic: '',
    message: '',
    channel: 'phone',
    externalAddress: '',
  })
  const [errors, setErrors] = useState<
    Partial<Record<keyof BookingStepData, string>>
  >({})
  const [submit, setSubmit] = useState<SubmitState>({ status: 'idle' })
  const formLoadTimeRef = useRef<number>(0)
  const wizardTopRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    formLoadTimeRef.current = Date.now()
  }, [])

  // Beim Step-Wechsel zum Wizard-Anfang scrollen
  useEffect(() => {
    wizardTopRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }, [step, submit.status])

  // === Step Navigation ===
  function goNext() {
    if (step === 1 && !selectedDate) return
    if (step === 2 && !selectedSlot) return
    if (step === 3) {
      const e = validateStep3()
      setErrors(e)
      if (Object.keys(e).length > 0) return
    }
    setStep((s) => Math.min(4, s + 1))
  }

  function goBack() {
    setStep((s) => Math.max(1, s - 1))
  }

  function validateStep3(): typeof errors {
    const e: typeof errors = {}
    if (formData.name.trim().length < 2) e.name = 'Bitte Namen eingeben'
    if (!/^\S+@\S+\.\S+$/.test(formData.email))
      e.email = 'Bitte gültige E-Mail eingeben'
    if (formData.phone.trim().length < 5)
      e.phone = 'Bitte Telefonnummer eingeben'
    if (formData.topic.trim().length < 2) e.topic = 'Bitte Anliegen kurz nennen'
    if (
      formData.channel === 'on-site-external' &&
      formData.externalAddress.trim().length < 5
    )
      e.externalAddress = 'Bitte Adresse eingeben'
    return e
  }

  function handleDateSelect(d: Date) {
    setSelectedDate(d)
    setSelectedSlot(null)
    // Sofort zu Step 2 weiterspringen für Speed
    setStep(2)
  }

  function handleSlotSelect(iso: string) {
    setSelectedSlot(iso)
    // Sofort zu Step 3
    setStep(3)
  }

  function handlePickAlternative(slotIso: string) {
    const slotDate = new Date(slotIso)
    const dayOnly = new Date(slotDate)
    dayOnly.setHours(0, 0, 0, 0)
    setSelectedDate(dayOnly)
    setSelectedSlot(slotIso)
    setSubmit({ status: 'idle' })
    setStep(4) // direkt zurück zur Review
  }

  // === Submit auf Step 4 ===
  async function handleSubmit() {
    if (!selectedSlot) return
    setSubmit({ status: 'submitting' })

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          slotStart: selectedSlot,
          source: 'termin-wizard',
          formLoadTime: formLoadTimeRef.current,
        }),
      })

      if (res.status === 409) {
        const body = await res.json().catch(() => ({}))
        setSubmit({
          status: 'error',
          message:
            'Dieser Termin wurde gerade von jemand anderem gebucht. Hier sind die nächsten freien Slots:',
          alternatives: Array.isArray(body?.alternatives)
            ? (body.alternatives as ConflictAlt[])
            : [],
        })
        return
      }

      if (res.status === 429) {
        const body = await res.json().catch(() => ({}))
        setSubmit({
          status: 'error',
          message:
            body?.error ??
            'Zu viele Anfragen. Bitte versuchen Sie es später wieder oder rufen Sie direkt an.',
        })
        return
      }

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        setSubmit({
          status: 'error',
          message:
            body?.error ??
            'Buchung fehlgeschlagen. Bitte versuchen Sie es noch einmal oder rufen Sie direkt an.',
        })
        return
      }

      const body = await res.json()
      setSubmit({
        status: 'success',
        refNumber: body.refNumber,
        slotStart: body.slotStart,
        slotEnd: body.slotEnd,
      })
    } catch {
      setSubmit({
        status: 'error',
        message:
          'Es gab ein technisches Problem. Bitte rufen Sie direkt an.',
      })
    }
  }

  // === SUCCESS STATE ===
  if (submit.status === 'success') {
    return (
      <SuccessState
        refNumber={submit.refNumber}
        slotStart={submit.slotStart}
        slotEnd={submit.slotEnd}
        name={formData.name}
      />
    )
  }

  return (
    <div ref={wizardTopRef}>
      <StepIndicator
        currentStep={step}
        totalSteps={4}
        labels={STEP_LABELS}
      />

      {/* Honeypot - global im Wizard */}
      <div
        className="absolute -left-[9999px] w-px h-px overflow-hidden"
        aria-hidden
      >
        <label htmlFor="hp-website">Website (leer lassen)</label>
        <input type="text" id="hp-website" name="website" tabIndex={-1} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {step === 1 && (
            <Calendar
              dates={dates}
              selectedDate={selectedDate}
              onSelect={handleDateSelect}
            />
          )}

          {step === 2 && selectedDate && (
            <SlotPicker
              date={selectedDate}
              selectedSlot={selectedSlot}
              onSelect={handleSlotSelect}
            />
          )}

          {step === 3 && (
            <BookingFormStep
              data={formData}
              onChange={setFormData}
              errors={errors}
            />
          )}

          {step === 4 && selectedSlot && (
            <>
              <BookingReview
                slotStart={selectedSlot}
                slotEnd={
                  // 60 Min später
                  new Date(
                    new Date(selectedSlot).getTime() + 60 * 60 * 1000,
                  ).toISOString()
                }
                data={formData}
                onEditDate={() => setStep(1)}
                onEditSlot={() => setStep(2)}
                onEditDetails={() => setStep(3)}
              />

              {/* Submit-Errors */}
              {submit.status === 'error' && (
                <div
                  className="mt-6 bg-deep-2 border border-error/40 rounded-sm p-5"
                  role="alert"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <AlertCircle
                      className="w-5 h-5 text-error shrink-0 mt-0.5"
                      strokeWidth={1.75}
                    />
                    <p className="text-sm text-paper leading-relaxed">
                      {submit.message}
                    </p>
                  </div>

                  {submit.alternatives && submit.alternatives.length > 0 && (
                    <div className="mt-4 ml-8">
                      <div className="grid sm:grid-cols-3 gap-2 mb-3">
                        {submit.alternatives.map((alt) => (
                          <button
                            key={alt.isoStart}
                            type="button"
                            onClick={() => handlePickAlternative(alt.isoStart)}
                            className="p-3 bg-deep border border-signal-2/40 rounded-sm text-left hover:border-signal-2 hover:bg-signal/10 transition-all"
                          >
                            <div className="text-[0.65rem] font-mono uppercase tracking-wider text-signal-2 mb-1">
                              {alt.date}
                            </div>
                            <div className="font-mono text-sm text-paper">
                              {alt.label}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Bar */}
      <div className="mt-10 pt-6 border-t border-line flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={goBack}
          disabled={step === 1 || submit.status === 'submitting'}
          className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 text-paper-mute font-medium text-sm rounded-sm hover:text-paper transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={1.75} />
          Zurück
        </button>

        {step < 4 && (
          <button
            type="button"
            onClick={goNext}
            disabled={
              (step === 1 && !selectedDate) ||
              (step === 2 && !selectedSlot)
            }
            className="inline-flex items-center gap-2 min-h-[48px] px-7 py-3.5 bg-signal text-deep font-medium text-sm rounded-sm hover:bg-signal-2 transition-colors shadow-[0_4px_20px_-8px_rgba(var(--signal-rgb),0.6)] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Weiter
            <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
          </button>
        )}

        {step === 4 && (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submit.status === 'submitting'}
            className="inline-flex items-center gap-2 min-h-[48px] px-7 py-3.5 bg-signal text-deep font-medium text-sm rounded-sm hover:bg-signal-2 transition-colors shadow-[0_8px_30px_-8px_rgba(var(--signal-rgb),0.5)] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submit.status === 'submitting' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Wird gebucht …
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" strokeWidth={1.75} />
                Jetzt verbindlich buchen
              </>
            )}
          </button>
        )}
      </div>

      {/* Datenschutz-Hinweis nur auf Step 4 */}
      {step === 4 && submit.status !== 'success' && (
        <p className="mt-4 text-xs text-paper-mute leading-relaxed">
          Mit dem Buchen stimmen Sie der Verarbeitung Ihrer Daten gemäß{' '}
          <a href="/datenschutz" className="text-signal-2 hover:underline">
            Datenschutzerklärung
          </a>{' '}
          zu. Sie erhalten eine Bestätigungs-E-Mail mit Kalender-Eintrag und
          allen Infos zum Stornieren.
        </p>
      )}
    </div>
  )
}
