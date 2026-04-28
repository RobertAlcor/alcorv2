'use client'

import { Pencil, Calendar, Clock, MapPin, User, Mail, Phone, MessageSquare } from 'lucide-react'
import { formatSlotForDisplay } from '@/lib/booking'
import type { BookingStepData, Channel } from './booking-form'

const CHANNEL_LABEL: Record<Channel, string> = {
  phone: 'Telefon (Robert ruft an)',
  'on-site-office': 'Im Büro (1220 Wien, Berresgasse 11)',
  'on-site-external': 'Vor Ort beim Kunden',
}

type Props = {
  slotStart: string
  slotEnd: string
  data: BookingStepData
  onEditDate: () => void
  onEditSlot: () => void
  onEditDetails: () => void
}

export function BookingReview({
  slotStart,
  slotEnd,
  data,
  onEditDate,
  onEditSlot,
  onEditDetails,
}: Props) {
  const formatted = formatSlotForDisplay({ start: slotStart, end: slotEnd })

  return (
    <div className="space-y-5">
      <div className="mb-6">
        <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-signal-2 mb-2">
          Bitte prüfen
        </h3>
        <p className="text-sm text-paper-mute leading-relaxed">
          Stimmt alles? Dann unten verbindlich buchen. Sie können jeden Punkt
          mit dem Stift-Symbol noch bearbeiten.
        </p>
      </div>

      {/* Termin */}
      <ReviewItem
        icon={<Calendar className="w-4 h-4" strokeWidth={1.75} />}
        label="Tag"
        value={formatted.date}
        onEdit={onEditDate}
      />

      <ReviewItem
        icon={<Clock className="w-4 h-4" strokeWidth={1.75} />}
        label="Uhrzeit"
        value={`${formatted.time} (60 Min reserviert)`}
        onEdit={onEditSlot}
      />

      <ReviewItem
        icon={<MapPin className="w-4 h-4" strokeWidth={1.75} />}
        label="Ort"
        value={
          data.channel === 'on-site-external' && data.externalAddress
            ? `${CHANNEL_LABEL[data.channel]} – ${data.externalAddress}`
            : CHANNEL_LABEL[data.channel]
        }
        onEdit={onEditDetails}
      />

      <ReviewItem
        icon={<User className="w-4 h-4" strokeWidth={1.75} />}
        label="Name"
        value={data.name}
        onEdit={onEditDetails}
      />

      <ReviewItem
        icon={<Mail className="w-4 h-4" strokeWidth={1.75} />}
        label="E-Mail"
        value={data.email}
        onEdit={onEditDetails}
      />

      <ReviewItem
        icon={<Phone className="w-4 h-4" strokeWidth={1.75} />}
        label="Telefon"
        value={data.phone}
        onEdit={onEditDetails}
      />

      <ReviewItem
        icon={<MessageSquare className="w-4 h-4" strokeWidth={1.75} />}
        label="Anliegen"
        value={data.topic}
        onEdit={onEditDetails}
      />

      {data.message && (
        <ReviewItem
          icon={<MessageSquare className="w-4 h-4" strokeWidth={1.75} />}
          label="Notizen"
          value={data.message}
          onEdit={onEditDetails}
          multiline
        />
      )}
    </div>
  )
}

function ReviewItem({
  icon,
  label,
  value,
  onEdit,
  multiline,
}: {
  icon: React.ReactNode
  label: string
  value: string
  onEdit: () => void
  multiline?: boolean
}) {
  return (
    <div className="bg-deep-2 border border-paper-dim/30 rounded-sm p-4 flex items-start gap-3">
      <div className="text-signal-2 shrink-0 mt-0.5">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="text-[0.65rem] font-mono uppercase tracking-wider text-paper-mute mb-1">
          {label}
        </div>
        <div
          className={`text-paper text-sm ${multiline ? 'whitespace-pre-wrap' : 'truncate'}`}
        >
          {value}
        </div>
      </div>
      <button
        type="button"
        onClick={onEdit}
        aria-label={`${label} bearbeiten`}
        className="shrink-0 w-9 h-9 flex items-center justify-center rounded-sm text-paper-mute hover:text-signal-2 hover:bg-deep transition-colors"
      >
        <Pencil className="w-3.5 h-3.5" strokeWidth={1.75} />
      </button>
    </div>
  )
}
