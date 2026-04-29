'use client'

import {
  Calendar,
  Clock,
  MessageSquare,
  TrendingUp,
  ArrowRight,
} from 'lucide-react'
import type { AdminBooking } from './booking-row'
import type { AdminLead } from '@/lib/lead-status'

type Props = {
  bookings: AdminBooking[]
  leads: AdminLead[]
  onJumpToBookings: () => void
  onJumpToLeads: () => void
}

export function OverviewView({
  bookings,
  leads,
  onJumpToBookings,
  onJumpToLeads,
}: Props) {
  const now = new Date()
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0,
    0,
    0,
  )
  const endOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    59,
  )
  const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

  const todaysBookings = bookings.filter((b) => {
    const start = new Date(b.slot_start)
    return (
      start >= startOfToday &&
      start <= endOfToday &&
      b.status === 'confirmed'
    )
  })

  const upcomingWeek = bookings.filter((b) => {
    const start = new Date(b.slot_start)
    return (
      start >= now && start <= weekFromNow && b.status === 'confirmed'
    )
  })

  const pendingBookings = bookings.filter((b) => b.status === 'pending')

  const newLeads = leads.filter((l) => l.status === 'new')

  // Stats letzte 30 Tage
  const last30Bookings = bookings.filter(
    (b) => new Date(b.created_at) >= thirtyDaysAgo,
  )
  const last30Confirmed = last30Bookings.filter(
    (b) => b.status === 'confirmed' || b.status === 'completed',
  ).length
  const last30Total = last30Bookings.filter(
    (b) => b.status !== 'pending',
  ).length
  const confirmRate =
    last30Total > 0 ? Math.round((last30Confirmed / last30Total) * 100) : null

  const last30Leads = leads.filter(
    (l) => new Date(l.created_at) >= thirtyDaysAgo,
  ).length

  return (
    <div className="space-y-8">
      {/* TOP-CARDS: Action-relevant */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ActionCard
          icon={Clock}
          title="Anfragen prüfen"
          count={pendingBookings.length}
          subtitle={
            pendingBookings.length === 0
              ? 'Alles erledigt'
              : pendingBookings.length === 1
                ? 'Termin wartet auf Bestätigung'
                : `${pendingBookings.length} Termine warten auf Bestätigung`
          }
          ctaLabel="Zu den Terminen"
          onClick={onJumpToBookings}
          highlight={pendingBookings.length > 0}
        />
        <ActionCard
          icon={MessageSquare}
          title="Neue Anfragen"
          count={newLeads.length}
          subtitle={
            newLeads.length === 0
              ? 'Alles bearbeitet'
              : newLeads.length === 1
                ? 'Anfrage noch nicht kontaktiert'
                : `${newLeads.length} Anfragen noch nicht kontaktiert`
          }
          ctaLabel="Zu den Anfragen"
          onClick={onJumpToLeads}
          highlight={newLeads.length > 0}
        />
      </div>

      {/* HEUTIGE TERMINE */}
      <section>
        <SectionHeader
          icon={Calendar}
          title="Heute"
          subtitle={
            todaysBookings.length === 0
              ? 'Keine Termine heute'
              : `${todaysBookings.length} ${todaysBookings.length === 1 ? 'Termin' : 'Termine'}`
          }
        />
        {todaysBookings.length > 0 ? (
          <div className="space-y-2">
            {todaysBookings.map((b) => (
              <BookingMini key={b.id} booking={b} />
            ))}
          </div>
        ) : (
          <EmptyHint text="Heute steht nichts an." />
        )}
      </section>

      {/* DIESE WOCHE */}
      <section>
        <SectionHeader
          icon={Calendar}
          title="Diese Woche"
          subtitle={
            upcomingWeek.length === 0
              ? 'Keine Termine'
              : `${upcomingWeek.length} bestätigte ${upcomingWeek.length === 1 ? 'Termin' : 'Termine'}`
          }
        />
        {upcomingWeek.length > 0 ? (
          <div className="space-y-2">
            {upcomingWeek.slice(0, 5).map((b) => (
              <BookingMini key={b.id} booking={b} />
            ))}
            {upcomingWeek.length > 5 && (
              <button
                type="button"
                onClick={onJumpToBookings}
                className="w-full text-center text-xs text-paper-mute hover:text-paper py-2 rounded-sm hover:bg-deep-2 transition-colors"
              >
                {upcomingWeek.length - 5} weitere anzeigen →
              </button>
            )}
          </div>
        ) : (
          <EmptyHint text="Keine bestätigten Termine in den nächsten 7 Tagen." />
        )}
      </section>

      {/* STATS */}
      <section>
        <SectionHeader
          icon={TrendingUp}
          title="Letzte 30 Tage"
          subtitle="Aktivität auf einen Blick"
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard label="Termine" value={last30Bookings.length} />
          <StatCard label="Bestätigt" value={last30Confirmed} />
          <StatCard
            label="Bestätigungsrate"
            value={confirmRate !== null ? `${confirmRate}%` : '–'}
          />
          <StatCard label="Anfragen" value={last30Leads} />
        </div>
      </section>
    </div>
  )
}

function SectionHeader({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: typeof Calendar
  title: string
  subtitle: string
}) {
  return (
    <div className="flex items-baseline gap-3 mb-4">
      <Icon className="w-4 h-4 text-signal-2" strokeWidth={1.75} />
      <h2 className="font-serif text-xl text-paper">{title}</h2>
      <span className="text-xs text-paper-mute">{subtitle}</span>
    </div>
  )
}

function ActionCard({
  icon: Icon,
  title,
  count,
  subtitle,
  ctaLabel,
  onClick,
  highlight,
}: {
  icon: typeof Calendar
  title: string
  count: number
  subtitle: string
  ctaLabel: string
  onClick: () => void
  highlight: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left bg-deep-2 border rounded-sm p-5 hover:border-signal-2 transition-colors group ${
        highlight ? 'border-signal/40' : 'border-line'
      }`}
    >
      <div className="flex items-start gap-3 mb-2">
        <Icon
          className={`w-5 h-5 shrink-0 mt-0.5 ${highlight ? 'text-signal' : 'text-paper-mute'}`}
          strokeWidth={1.75}
        />
        <div className="flex-1">
          <p className="text-[0.65rem] font-mono uppercase tracking-wider text-paper-mute mb-1">
            {title}
          </p>
          <p className="font-serif text-3xl text-paper leading-none">
            {count}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-line">
        <p className="text-xs text-paper-mute">{subtitle}</p>
        <span className="inline-flex items-center gap-1 text-xs font-medium text-signal-2 group-hover:text-signal transition-colors">
          {ctaLabel}
          <ArrowRight className="w-3 h-3" strokeWidth={2} />
        </span>
      </div>
    </button>
  )
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-deep-2 border border-line rounded-sm p-4">
      <p className="text-[0.65rem] font-mono uppercase tracking-wider text-paper-mute mb-2">
        {label}
      </p>
      <p className="font-serif text-2xl text-paper">{value}</p>
    </div>
  )
}

function BookingMini({ booking }: { booking: AdminBooking }) {
  const start = new Date(booking.slot_start)
  const time = new Intl.DateTimeFormat('de-AT', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Vienna',
  }).format(start)
  const date = new Intl.DateTimeFormat('de-AT', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone: 'Europe/Vienna',
  }).format(start)
  return (
    <div className="bg-deep-2 border border-line rounded-sm px-4 py-3 flex items-center gap-4">
      <div className="font-mono text-sm text-signal-2 w-12 shrink-0">
        {time}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-paper font-medium truncate">{booking.name}</p>
        <p className="text-xs text-paper-mute truncate">{booking.topic}</p>
      </div>
      <div className="text-right text-xs text-paper-mute shrink-0">{date}</div>
    </div>
  )
}

function EmptyHint({ text }: { text: string }) {
  return (
    <div className="bg-deep-2/50 border border-dashed border-line rounded-sm p-6 text-center">
      <p className="text-sm text-paper-mute">{text}</p>
    </div>
  )
}
