'use client'

import { Clock, Phone, Mail, Calendar as CalIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { SITE } from '@/lib/site'

type Props = {
  refNumber: string
  slotStart: string
  slotEnd: string
  name: string
}

export function SuccessState({ refNumber, slotStart, slotEnd, name }: Props) {
  const start = new Date(slotStart)
  const end = new Date(slotEnd)

  const dateLabel = new Intl.DateTimeFormat('de-AT', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Vienna',
  }).format(start)

  const timeLabel = `${formatTime(start)} – ${formatTime(end)}`
  const firstName = name.split(' ')[0] ?? name

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="text-center"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-signal/15 border border-signal/30 mb-6">
        <Clock className="w-7 h-7 text-signal" strokeWidth={1.5} />
      </div>

      <h2 className="font-serif text-3xl md:text-4xl text-paper mb-3 leading-tight">
        Anfrage erhalten, {firstName}.
      </h2>
      <p className="font-mono text-xs text-paper-mute mb-2">
        Referenznummer: <span className="text-signal-2">#{refNumber}</span>
      </p>

      <p className="text-paper-mute max-w-lg mx-auto mb-8 leading-relaxed">
        Vielen Dank! Robert prüft Ihren Wunschtermin und bestätigt ihn{' '}
        <strong className="text-paper">binnen 24 Stunden</strong>. Sie
        erhalten dann eine E-Mail mit Kalender-Eintrag und allen Details.
      </p>

      <div className="max-w-md mx-auto bg-deep-2 border border-line rounded-sm p-6 mb-8 text-left">
        <p className="text-[0.65rem] font-mono uppercase tracking-[0.2em] text-signal-2 mb-3">
          Ihr Wunschtermin
        </p>
        <div className="flex items-start gap-3 mb-3">
          <CalIcon
            className="w-5 h-5 text-signal shrink-0 mt-0.5"
            strokeWidth={1.5}
          />
          <div>
            <p className="font-serif text-xl text-paper leading-tight">
              {dateLabel}
            </p>
            <p className="font-mono text-sm text-paper-mute mt-1">
              {timeLabel}
            </p>
          </div>
        </div>
        <p className="text-xs text-paper-mute mt-4 pt-4 border-t border-line/60 leading-relaxed">
          Der Slot ist für Sie reserviert, bis Robert Ihre Anfrage bearbeitet
          hat. Andere Kunden können diesen Termin in der Zwischenzeit nicht
          buchen.
        </p>
      </div>

      <div className="border-t border-line pt-6 max-w-md mx-auto">
        <p className="text-[0.65rem] font-mono uppercase tracking-[0.2em] text-paper-mute mb-3">
          Sie haben Fragen oder es eilt?
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={`tel:${SITE.contact.phoneRaw}`}
            className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 bg-deep-2 border border-line text-paper text-sm rounded-sm hover:border-signal-2 transition-colors"
          >
            <Phone className="w-4 h-4 text-signal" strokeWidth={1.5} />
            {SITE.contact.phoneFormatted}
          </a>
          <a
            href={`mailto:${SITE.contact.email}?subject=Termin%20%23${refNumber}`}
            className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 bg-deep-2 border border-line text-paper text-sm rounded-sm hover:border-signal-2 transition-colors"
          >
            <Mail className="w-4 h-4 text-signal" strokeWidth={1.5} />
            {SITE.contact.email}
          </a>
        </div>
      </div>
    </motion.div>
  )
}

function formatTime(d: Date): string {
  return new Intl.DateTimeFormat('de-AT', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Vienna',
  }).format(d)
}
