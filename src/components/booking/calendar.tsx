'use client'

import { Calendar as CalendarIcon } from 'lucide-react'

type Props = {
  dates: Date[]
  selectedDate: Date | null
  onSelect: (d: Date) => void
}

export function Calendar({ dates, selectedDate, onSelect }: Props) {
  const weeks = groupByWeek(dates)

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <CalendarIcon className="w-4 h-4 text-signal-2" strokeWidth={1.75} />
        <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-signal-2">
          Tag wählen
        </h3>
      </div>
      <p className="text-sm text-paper-mute mb-6 leading-relaxed">
        Mo – Fr, 9 bis 18 Uhr · pro Termin reserviere ich eine Stunde.
      </p>

      <div className="space-y-6">
        {weeks.map((week, idx) => (
          <div key={idx}>
            <p className="font-mono text-[0.65rem] uppercase tracking-wider text-paper-mute mb-3">
              {weekLabel(week)}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {week.map((date) => {
                const isSelected =
                  selectedDate?.toDateString() === date.toDateString()
                return (
                  <button
                    key={date.toISOString()}
                    type="button"
                    onClick={() => onSelect(date)}
                    aria-pressed={isSelected}
                    className={`group relative min-h-[64px] p-3 rounded-sm border text-left transition-all ${
                      isSelected
                        ? 'bg-signal text-deep border-signal'
                        : 'bg-deep-2 border-paper-dim/30 text-paper hover:border-signal-2/60'
                    }`}
                  >
                    <div
                      className={`text-[0.65rem] font-mono uppercase tracking-wider mb-1 ${
                        isSelected ? 'text-deep/70' : 'text-paper-mute'
                      }`}
                    >
                      {weekdayShort(date)}
                    </div>
                    <div className="font-serif text-xl leading-none">
                      {date.getDate()}.{' '}
                      <span className="text-base">{monthShort(date)}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function groupByWeek(dates: Date[]): Date[][] {
  const groups: Date[][] = []
  let currentWeek: Date[] = []
  let currentWeekNumber = -1

  for (const d of dates) {
    const wn = getWeekNumber(d)
    if (wn !== currentWeekNumber) {
      if (currentWeek.length > 0) groups.push(currentWeek)
      currentWeek = []
      currentWeekNumber = wn
    }
    currentWeek.push(d)
  }
  if (currentWeek.length > 0) groups.push(currentWeek)
  return groups
}

function getWeekNumber(d: Date): number {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
  const dayNum = date.getUTCDay() || 7
  date.setUTCDate(date.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1))
  return Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
}

function weekLabel(week: Date[]): string {
  const wn = getWeekNumber(week[0]!)
  const first = week[0]!
  const last = week[week.length - 1]!
  return `KW ${wn} · ${first.getDate()}.${first.getMonth() + 1}. – ${last.getDate()}.${last.getMonth() + 1}.`
}

function weekdayShort(d: Date): string {
  return new Intl.DateTimeFormat('de-AT', { weekday: 'short' }).format(d)
}

function monthShort(d: Date): string {
  return new Intl.DateTimeFormat('de-AT', { month: 'short' }).format(d)
}
