'use client'

import { useState } from 'react'
import {
  Check,
  X,
  Phone,
  Mail,
  MapPin,
  Loader2,
  ChevronDown,
  ChevronUp,
  Clock,
  Calendar as CalIcon,
  StickyNote,
} from 'lucide-react'
import { DeclineModal } from './decline-modal'
import { NotesEditor } from './notes-editor'

export type AdminBooking = {
  id: string
  ref_number: string
  name: string
  email: string
  phone: string
  topic: string
  message: string | null
  channel: 'phone' | 'on-site-office' | 'on-site-external'
  external_address: string | null
  duration_minutes: number
  slot_start: string
  slot_end: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'declined'
  decline_reason: string | null
  approved_at: string | null
  declined_at: string | null
  admin_notes: string | null
  created_at: string
}

const CHANNEL_LABEL: Record<AdminBooking['channel'], string> = {
  phone: 'Telefon',
  'on-site-office': 'Büro (1220)',
  'on-site-external': 'Vor Ort',
}

const STATUS_BADGE: Record<
  AdminBooking['status'],
  { label: string; cls: string }
> = {
  pending: {
    label: 'Wartet',
    cls: 'bg-signal/15 text-signal-2 border-signal/30',
  },
  confirmed: {
    label: 'Bestätigt',
    cls: 'bg-success/15 text-success border-success/30',
  },
  cancelled: {
    label: 'Storniert',
    cls: 'bg-paper-mute/10 text-paper-mute border-paper-mute/20',
  },
  completed: {
    label: 'Abgeschlossen',
    cls: 'bg-paper-mute/10 text-paper-mute border-paper-mute/20',
  },
  declined: {
    label: 'Abgelehnt',
    cls: 'bg-error/10 text-error border-error/30',
  },
}

type Props = {
  booking: AdminBooking
  onChange: () => void
}

export function BookingRow({ booking, onChange }: Props) {
  const [expanded, setExpanded] = useState(false)
  const [busy, setBusy] = useState<'approve' | 'decline' | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showDeclineModal, setShowDeclineModal] = useState(false)

  const start = new Date(booking.slot_start)
  const end = new Date(booking.slot_end)
  const dateLabel = formatDate(start)
  const timeLabel = `${formatTime(start)} – ${formatTime(end)}`
  const badge = STATUS_BADGE[booking.status]
  const hasNotes = Boolean(booking.admin_notes)

  async function handleApprove() {
    if (busy) return
    setBusy('approve')
    setError(null)
    try {
      const res = await fetch(
        `/api/admin/bookings/${booking.id}/approve`,
        { method: 'POST' },
      )
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        setError(body?.error ?? 'Bestätigen fehlgeschlagen.')
      } else {
        onChange()
      }
    } catch {
      setError('Netzwerkfehler.')
    } finally {
      setBusy(null)
    }
  }

  async function handleDecline(reason: string) {
    if (busy) return
    setBusy('decline')
    setError(null)
    try {
      const res = await fetch(
        `/api/admin/bookings/${booking.id}/decline`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reason }),
        },
      )
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        setError(body?.error ?? 'Ablehnen fehlgeschlagen.')
      } else {
        setShowDeclineModal(false)
        onChange()
      }
    } catch {
      setError('Netzwerkfehler.')
    } finally {
      setBusy(null)
    }
  }

  return (
    <>
      <article className="bg-deep-2 border border-line rounded-sm overflow-hidden">
        <div className="p-4 md:p-5">
          <div className="flex flex-wrap items-start gap-3 mb-3">
            <span
              className={`inline-flex items-center text-[0.65rem] font-mono uppercase tracking-wider px-2 py-1 rounded-sm border ${badge.cls}`}
            >
              {badge.label}
            </span>
            <span className="font-mono text-xs text-paper-mute">
              #{booking.ref_number}
            </span>
            {hasNotes && (
              <span
                className="inline-flex items-center gap-1 text-xs text-signal-2"
                title="Notizen vorhanden"
              >
                <StickyNote className="w-3 h-3" strokeWidth={2} />
                Notiz
              </span>
            )}
            <span className="ml-auto font-mono text-[0.65rem] text-paper-mute/70 uppercase">
              {CHANNEL_LABEL[booking.channel]}
            </span>
          </div>

          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-3">
            <h3 className="font-serif text-xl text-paper">{booking.name}</h3>
            <p className="font-mono text-xs text-paper-mute">
              <CalIcon className="inline w-3 h-3 mr-1" strokeWidth={2} />
              {dateLabel} ·{' '}
              <Clock className="inline w-3 h-3 mr-1" strokeWidth={2} />
              {timeLabel}
            </p>
          </div>

          <p className="text-sm text-paper-mute mb-3">
            <span className="text-paper">{booking.topic}</span>
          </p>

          <div className="flex flex-wrap gap-2 mb-1">
            <a
              href={`mailto:${booking.email}`}
              className="inline-flex items-center gap-1.5 text-xs text-paper-mute hover:text-signal-2 transition-colors"
            >
              <Mail className="w-3 h-3" strokeWidth={1.75} />
              {booking.email}
            </a>
            <a
              href={`tel:${booking.phone}`}
              className="inline-flex items-center gap-1.5 text-xs text-paper-mute hover:text-signal-2 transition-colors"
            >
              <Phone className="w-3 h-3" strokeWidth={1.75} />
              {booking.phone}
            </a>
            {booking.channel === 'on-site-external' &&
              booking.external_address && (
                <span className="inline-flex items-center gap-1.5 text-xs text-paper-mute">
                  <MapPin className="w-3 h-3" strokeWidth={1.75} />
                  {booking.external_address}
                </span>
              )}
          </div>

          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="mt-3 inline-flex items-center gap-1 text-xs text-paper-mute hover:text-paper transition-colors"
          >
            {expanded ? (
              <>
                <ChevronUp className="w-3 h-3" strokeWidth={2} /> Weniger
              </>
            ) : (
              <>
                <ChevronDown className="w-3 h-3" strokeWidth={2} /> Details &
                Notizen
              </>
            )}
          </button>

          {expanded && (
            <div className="mt-4 pt-4 border-t border-line space-y-4 text-sm">
              {booking.message && (
                <div>
                  <p className="text-[0.65rem] font-mono uppercase tracking-wider text-signal-2 mb-1">
                    Vorab-Notizen vom Kunden
                  </p>
                  <p className="text-paper whitespace-pre-wrap">
                    {booking.message}
                  </p>
                </div>
              )}

              {/* Admin-Notizen Editor */}
              <div>
                <p className="text-[0.65rem] font-mono uppercase tracking-wider text-signal-2 mb-2">
                  Deine Notizen
                </p>
                <NotesEditor
                  initialValue={booking.admin_notes ?? ''}
                  endpoint={`/api/admin/bookings/${booking.id}/notes`}
                  placeholder="Gesprächsnotizen, To-Dos, Folgekontakte ..."
                />
              </div>

              {booking.approved_at && (
                <p className="text-xs text-paper-mute">
                  Bestätigt:{' '}
                  {new Date(booking.approved_at).toLocaleString('de-AT', {
                    timeZone: 'Europe/Vienna',
                  })}
                </p>
              )}
              {booking.declined_at && (
                <div>
                  <p className="text-xs text-paper-mute mb-1">
                    Abgelehnt:{' '}
                    {new Date(booking.declined_at).toLocaleString('de-AT', {
                      timeZone: 'Europe/Vienna',
                    })}
                  </p>
                  {booking.decline_reason && (
                    <p className="text-sm text-paper-mute italic">
                      „{booking.decline_reason}"
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {error && (
            <p className="mt-3 text-xs text-error" role="alert">
              {error}
            </p>
          )}
        </div>

        {booking.status === 'pending' && (
          <div className="flex border-t border-line">
            <button
              type="button"
              onClick={handleApprove}
              disabled={busy !== null}
              className="flex-1 min-h-[48px] inline-flex items-center justify-center gap-2 text-sm font-medium text-success hover:bg-success/10 transition-colors disabled:opacity-50"
            >
              {busy === 'approve' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Check className="w-4 h-4" strokeWidth={2} />
              )}
              Bestätigen
            </button>
            <div className="w-px bg-line" aria-hidden />
            <button
              type="button"
              onClick={() => setShowDeclineModal(true)}
              disabled={busy !== null}
              className="flex-1 min-h-[48px] inline-flex items-center justify-center gap-2 text-sm font-medium text-error hover:bg-error/10 transition-colors disabled:opacity-50"
            >
              <X className="w-4 h-4" strokeWidth={2} />
              Ablehnen
            </button>
          </div>
        )}
      </article>

      {showDeclineModal && (
        <DeclineModal
          bookingName={booking.name}
          submitting={busy === 'decline'}
          onCancel={() => setShowDeclineModal(false)}
          onConfirm={handleDecline}
        />
      )}
    </>
  )
}

function formatDate(d: Date): string {
  return new Intl.DateTimeFormat('de-AT', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'Europe/Vienna',
  }).format(d)
}

function formatTime(d: Date): string {
  return new Intl.DateTimeFormat('de-AT', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Vienna',
  }).format(d)
}
