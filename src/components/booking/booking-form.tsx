'use client'

import { Phone, Building2, MapPin, User } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

export type Channel = 'phone' | 'on-site-office' | 'on-site-external'

export type BookingStepData = {
  name: string
  email: string
  phone: string
  topic: string
  message: string
  channel: Channel
  externalAddress: string
}

type Props = {
  data: BookingStepData
  onChange: (data: BookingStepData) => void
  errors?: Partial<Record<keyof BookingStepData, string>>
}

const CHANNELS: {
  value: Channel
  label: string
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  hint: string
}[] = [
  { value: 'phone', label: 'Telefon', icon: Phone, hint: 'Robert ruft an' },
  {
    value: 'on-site-office',
    label: 'Im Büro',
    icon: Building2,
    hint: '1220 Wien, Berresgasse 11',
  },
  {
    value: 'on-site-external',
    label: 'Außerhalb',
    icon: MapPin,
    hint: 'Robert kommt zu Ihnen',
  },
]

const LABEL_CLASS =
  'block text-xs font-semibold tracking-[0.12em] uppercase text-paper-mute mb-2'

const INPUT_CLASS =
  'w-full min-h-[48px] px-4 py-3 bg-deep-2 border border-paper-dim/30 rounded-sm text-paper placeholder:text-paper-mute/70 focus:border-signal-2 focus:outline-none transition-colors'

const TEXTAREA_CLASS =
  'w-full px-4 py-3 bg-deep-2 border border-paper-dim/30 rounded-sm text-paper placeholder:text-paper-mute/70 focus:border-signal-2 focus:outline-none transition-colors resize-y min-h-[100px]'

export function BookingFormStep({ data, onChange, errors }: Props) {
  function update<K extends keyof BookingStepData>(
    key: K,
    value: BookingStepData[K],
  ) {
    onChange({ ...data, [key]: value })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <User className="w-4 h-4 text-signal-2" strokeWidth={1.75} />
        <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-signal-2">
          Wo soll das Gespräch stattfinden?
        </h3>
      </div>

      {/* Channel */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {CHANNELS.map((c) => {
          const Icon = c.icon
          const isActive = data.channel === c.value
          return (
            <button
              key={c.value}
              type="button"
              onClick={() => update('channel', c.value)}
              aria-pressed={isActive}
              className={`min-h-[72px] p-3 rounded-sm border text-left transition-all ${
                isActive
                  ? 'bg-signal/10 border-signal-2 text-paper'
                  : 'bg-deep-2 border-paper-dim/30 text-paper-mute hover:border-paper-mute'
              }`}
            >
              <Icon
                className={`w-4 h-4 mb-1.5 ${isActive ? 'text-signal-2' : ''}`}
                strokeWidth={1.75}
              />
              <div className="text-sm font-medium leading-tight mb-0.5">
                {c.label}
              </div>
              <div className="text-[0.65rem] text-paper-mute leading-tight">
                {c.hint}
              </div>
            </button>
          )
        })}
      </div>

      {/* External Address */}
      <AnimatePresence>
        {data.channel === 'on-site-external' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <label htmlFor="bk-address" className={LABEL_CLASS}>
              Adresse für den Termin <span className="text-signal-2">*</span>
            </label>
            <input
              type="text"
              id="bk-address"
              value={data.externalAddress}
              onChange={(e) => update('externalAddress', e.target.value)}
              maxLength={200}
              placeholder="Straße, Hausnummer, PLZ, Ort"
              autoComplete="street-address"
              className={INPUT_CLASS}
            />
            {errors?.externalAddress && (
              <p className="mt-2 text-sm text-error">
                {errors.externalAddress}
              </p>
            )}
            <p className="text-xs text-paper-mute mt-2 leading-relaxed">
              Außerhalb Wiens fällt eine Anfahrtspauschale an – wird vorab
              transparent geklärt.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Name */}
      <div>
        <label htmlFor="bk-name" className={LABEL_CLASS}>
          Ihr Name <span className="text-signal-2">*</span>
        </label>
        <input
          type="text"
          id="bk-name"
          value={data.name}
          onChange={(e) => update('name', e.target.value)}
          autoComplete="name"
          className={INPUT_CLASS}
        />
        {errors?.name && (
          <p className="mt-2 text-sm text-error">{errors.name}</p>
        )}
      </div>

      {/* Email + Phone */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="bk-email" className={LABEL_CLASS}>
            E-Mail <span className="text-signal-2">*</span>
          </label>
          <input
            type="email"
            id="bk-email"
            value={data.email}
            onChange={(e) => update('email', e.target.value)}
            autoComplete="email"
            className={INPUT_CLASS}
          />
          {errors?.email && (
            <p className="mt-2 text-sm text-error">{errors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="bk-phone" className={LABEL_CLASS}>
            Telefon (am besten erreichbar){' '}
            <span className="text-signal-2">*</span>
          </label>
          <input
            type="tel"
            id="bk-phone"
            value={data.phone}
            onChange={(e) => update('phone', e.target.value)}
            autoComplete="tel"
            placeholder="z. B. 0664 123 4567"
            className={INPUT_CLASS}
          />
          {errors?.phone && (
            <p className="mt-2 text-sm text-error">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* Topic */}
      <div>
        <label htmlFor="bk-topic" className={LABEL_CLASS}>
          Worum geht es? <span className="text-signal-2">*</span>
        </label>
        <input
          type="text"
          id="bk-topic"
          value={data.topic}
          onChange={(e) => update('topic', e.target.value)}
          maxLength={120}
          placeholder="z. B. Neue Praxis-Website mit Online-Booking"
          className={INPUT_CLASS}
        />
        {errors?.topic && (
          <p className="mt-2 text-sm text-error">{errors.topic}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="bk-message" className={LABEL_CLASS}>
          Vorab-Notizen{' '}
          <span className="text-paper-mute/70 normal-case">(optional)</span>
        </label>
        <textarea
          id="bk-message"
          value={data.message}
          onChange={(e) => update('message', e.target.value)}
          rows={4}
          maxLength={1500}
          placeholder="Was sollte Robert vor dem Gespräch wissen?"
          className={TEXTAREA_CLASS}
        />
      </div>
    </div>
  )
}
