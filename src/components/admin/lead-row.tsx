'use client'

import { useState } from 'react'
import {
  Phone,
  Mail,
  MessageCircle,
  Building2,
  Loader2,
  ChevronDown,
  ChevronUp,
  StickyNote,
  Globe,
  Tag,
} from 'lucide-react'
import { NotesEditor } from './notes-editor'
import {
  type AdminLead,
  type LeadStatus,
  LEAD_STATUS_LABEL,
  LEAD_STATUS_ORDER,
  LEAD_STATUS_COLOR,
  LEAD_TOPIC_LABEL,
  LEAD_PACKAGE_LABEL,
} from '@/lib/lead-status'

type Props = {
  lead: AdminLead
  onChange: () => void
}

export function LeadRow({ lead, onChange }: Props) {
  const [expanded, setExpanded] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentStatus, setCurrentStatus] = useState<LeadStatus>(lead.status)

  const statusColor = LEAD_STATUS_COLOR[currentStatus]
  const hasNotes = Boolean(lead.admin_notes)
  const created = new Date(lead.created_at)
  const dateLabel = formatDateTime(created)

  const whatsappLink = lead.phone
    ? `https://wa.me/${lead.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hallo ${lead.name.split(' ')[0]}, danke für Ihre Anfrage. `)}`
    : null

  // Bestehende Website hübsch anzeigen (ohne https://)
  const websiteDisplay = lead.existing_website
    ? lead.existing_website.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : null

  async function handleStatusChange(newStatus: LeadStatus) {
    if (busy || newStatus === currentStatus) return
    const previous = currentStatus
    setCurrentStatus(newStatus) // optimistic
    setBusy(true)
    setError(null)
    try {
      const res = await fetch(`/api/admin/leads/${lead.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (!res.ok) {
        setCurrentStatus(previous)
        const body = await res.json().catch(() => ({}))
        setError(body?.error ?? 'Status konnte nicht geändert werden')
      } else {
        onChange()
      }
    } catch {
      setCurrentStatus(previous)
      setError('Netzwerkfehler')
    } finally {
      setBusy(false)
    }
  }

  return (
    <article className="bg-deep-2 border border-line rounded-sm overflow-hidden">
      <div className="p-4 md:p-5">
        <div className="flex flex-wrap items-start gap-3 mb-3">
          <span
            className={`inline-flex items-center text-[0.65rem] font-mono uppercase tracking-wider px-2 py-1 rounded-sm border ${statusColor.bg} ${statusColor.text} ${statusColor.border}`}
          >
            {LEAD_STATUS_LABEL[currentStatus]}
          </span>
          {lead.ref_number && (
            <span className="font-mono text-xs text-paper-mute">
              #{lead.ref_number}
            </span>
          )}
          {hasNotes && (
            <span
              className="inline-flex items-center gap-1 text-xs text-signal-2"
              title="Notizen vorhanden"
            >
              <StickyNote className="w-3 h-3" strokeWidth={2} />
              Notiz
            </span>
          )}
          <span className="ml-auto text-[0.65rem] text-paper-mute/70">
            {dateLabel}
          </span>
        </div>

        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-2">
          <h3 className="font-serif text-xl text-paper">{lead.name}</h3>
          {lead.company && (
            <p className="text-xs text-paper-mute inline-flex items-center gap-1">
              <Building2 className="w-3 h-3" strokeWidth={1.75} />
              {lead.company}
            </p>
          )}
        </div>

        {/* Topic + Paket-Interesse */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-sm text-paper">
            {LEAD_TOPIC_LABEL[lead.topic]}
          </span>
          {lead.package_interest && (
            <span
              className="inline-flex items-center gap-1 text-[0.65rem] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-signal/15 text-signal-2 border border-signal/30"
              title="Vom Kunden ausgewähltes Paket-Interesse"
            >
              <Tag className="w-3 h-3" strokeWidth={2} />
              Paket: {LEAD_PACKAGE_LABEL[lead.package_interest]}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-3 mb-3">
          <a
            href={`mailto:${lead.email}`}
            className="inline-flex items-center gap-1.5 text-xs text-paper-mute hover:text-signal-2 transition-colors"
          >
            <Mail className="w-3 h-3" strokeWidth={1.75} />
            {lead.email}
          </a>
          {lead.phone && (
            <a
              href={`tel:${lead.phone}`}
              className="inline-flex items-center gap-1.5 text-xs text-paper-mute hover:text-signal-2 transition-colors"
            >
              <Phone className="w-3 h-3" strokeWidth={1.75} />
              {lead.phone}
            </a>
          )}
          {whatsappLink && (
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1.5 text-xs text-paper-mute hover:text-signal-2 transition-colors"
            >
              <MessageCircle className="w-3 h-3" strokeWidth={1.75} />
              WhatsApp
            </a>
          )}
          {lead.existing_website && websiteDisplay && (
            <a
              href={lead.existing_website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-paper-mute hover:text-signal-2 transition-colors"
              title={lead.existing_website}
            >
              <Globe className="w-3 h-3" strokeWidth={1.75} />
              {websiteDisplay}
            </a>
          )}
        </div>

        {/* Status-Picker */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          <span className="text-[0.65rem] font-mono uppercase tracking-wider text-paper-mute self-center mr-1">
            Status:
          </span>
          {LEAD_STATUS_ORDER.map((s) => {
            const active = s === currentStatus
            const c = LEAD_STATUS_COLOR[s]
            return (
              <button
                key={s}
                type="button"
                onClick={() => handleStatusChange(s)}
                disabled={busy}
                className={`min-h-[28px] px-2.5 py-1 text-[0.7rem] font-medium rounded-sm transition-colors disabled:opacity-50 ${
                  active
                    ? `${c.bg} ${c.text} ${c.border} border`
                    : 'text-paper-mute border border-line hover:text-paper hover:border-paper-mute/40'
                }`}
              >
                {LEAD_STATUS_LABEL[s]}
              </button>
            )
          })}
          {busy && (
            <Loader2 className="w-3 h-3 animate-spin text-paper-mute self-center ml-1" />
          )}
        </div>

        {error && (
          <p className="text-xs text-error mb-2" role="alert">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="mt-2 inline-flex items-center gap-1 text-xs text-paper-mute hover:text-paper transition-colors"
        >
          {expanded ? (
            <>
              <ChevronUp className="w-3 h-3" strokeWidth={2} /> Weniger
            </>
          ) : (
            <>
              <ChevronDown className="w-3 h-3" strokeWidth={2} /> Nachricht
              & Notizen
            </>
          )}
        </button>

        {expanded && (
          <div className="mt-4 pt-4 border-t border-line space-y-4">
            <div>
              <p className="text-[0.65rem] font-mono uppercase tracking-wider text-signal-2 mb-2">
                Nachricht
              </p>
              <p className="text-sm text-paper whitespace-pre-wrap leading-relaxed">
                {lead.message}
              </p>
            </div>

            <div>
              <p className="text-[0.65rem] font-mono uppercase tracking-wider text-signal-2 mb-2">
                Deine Notizen
              </p>
              <NotesEditor
                initialValue={lead.admin_notes ?? ''}
                endpoint={`/api/admin/leads/${lead.id}/notes`}
                placeholder="Letzter Kontakt: ..., nächster Schritt: ..."
              />
            </div>

            {lead.last_contact_at && (
              <p className="text-xs text-paper-mute">
                Letzter Kontakt:{' '}
                {new Date(lead.last_contact_at).toLocaleString('de-AT', {
                  timeZone: 'Europe/Vienna',
                })}
              </p>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

function formatDateTime(d: Date): string {
  return new Intl.DateTimeFormat('de-AT', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Vienna',
  }).format(d)
}
