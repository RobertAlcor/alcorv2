'use client'

import { motion } from 'motion/react'
import {
  CheckCircle2,
  Download,
  Phone,
  Mail,
  Calendar,
  Mailbox,
} from 'lucide-react'
import { SITE } from '@/lib/site'
import { formatSlotForDisplay } from '@/lib/booking'

type Props = {
  refNumber: string
  slotStart: string
  slotEnd: string
  name: string
}

export function SuccessState({ refNumber, slotStart, slotEnd, name }: Props) {
  const formatted = formatSlotForDisplay({ start: slotStart, end: slotEnd })
  const firstName = name.split(' ')[0] ?? name
  const icsUrl = `/api/booking/ics?ref=${encodeURIComponent(refNumber)}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="bg-deep-2 border border-success/40 rounded-sm p-8 md:p-10 max-w-2xl mx-auto"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start gap-4 mb-6">
        <CheckCircle2
          className="w-10 h-10 text-success shrink-0 mt-1"
          strokeWidth={1.5}
        />
        <div>
          <h2 className="font-serif text-3xl md:text-4xl text-paper mb-2 leading-tight">
            Termin gebucht, {firstName}.
          </h2>
          <p className="font-mono text-xs text-paper-mute">
            Referenznummer:{' '}
            <strong className="text-signal-2">#{refNumber}</strong>
          </p>
        </div>
      </div>

      <div className="bg-deep border border-line rounded-sm p-6 mb-6">
        <p className="text-[0.7rem] font-mono uppercase tracking-wider text-signal-2 mb-3">
          Ihr Termin
        </p>
        <div className="flex items-start gap-3">
          <Calendar
            className="w-5 h-5 text-signal-2 shrink-0 mt-1"
            strokeWidth={1.5}
          />
          <div>
            <div className="font-serif text-xl text-paper leading-tight mb-1">
              {formatted.date}
            </div>
            <div className="font-mono text-sm text-paper-mute">
              {formatted.time} (Europe/Vienna)
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-3 p-4 bg-deep border border-line rounded-sm mb-6">
        <Mailbox
          className="w-5 h-5 text-signal-2 shrink-0 mt-0.5"
          strokeWidth={1.5}
        />
        <p className="text-sm text-paper-mute leading-relaxed">
          Eine Bestätigung mit allen Details und einer Kalender-Datei (.ics)
          ist gerade unterwegs an Ihre E-Mail-Adresse. In der Mail steht auch,
          wie Sie den Termin verschieben oder absagen können.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        <a
          href={icsUrl}
          download={`termin-${refNumber}.ics`}
          className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 bg-signal text-deep font-medium text-sm rounded-sm hover:bg-signal-2 transition-colors"
        >
          <Download className="w-4 h-4" strokeWidth={1.75} />
          Termin in Kalender speichern
        </a>
      </div>

      <div className="border-t border-line pt-6">
        <p className="text-[0.7rem] font-mono uppercase tracking-wider text-signal-2 mb-3">
          Stornieren oder verschieben?
        </p>
        <p className="text-sm text-paper-mute leading-relaxed mb-4">
          Falls etwas dazwischenkommt, melden Sie sich kurz mit Ihrer
          Referenznummer:
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={`tel:${SITE.contact.phoneRaw}`}
            className="inline-flex items-center gap-2 min-h-[40px] px-4 py-2 bg-deep border border-line text-paper text-sm rounded-sm hover:border-paper-mute transition-colors"
          >
            <Phone className="w-3.5 h-3.5" strokeWidth={1.75} />
            {SITE.contact.phoneFormatted}
          </a>
          <a
            href={`mailto:${SITE.contact.email}?subject=Termin%20%23${refNumber}`}
            className="inline-flex items-center gap-2 min-h-[40px] px-4 py-2 bg-deep border border-line text-paper text-sm rounded-sm hover:border-paper-mute transition-colors"
          >
            <Mail className="w-3.5 h-3.5" strokeWidth={1.75} />
            {SITE.contact.email}
          </a>
        </div>
      </div>
    </motion.div>
  )
}
