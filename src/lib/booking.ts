/**
 * 15-minute introductory calls. All public times are Europe/Vienna,
 * independent of the Vercel runtime and the visitor's browser timezone.
 */
export const BOOKING_CONFIG = {
  slotMinutes: 15,
  durationMinutes: 15,
  workingDays: [1, 2, 3, 4, 5],
  workingHourStart: 9,
  workingHourEnd: 18,
  minLeadHours: 24,
  maxAdvanceDays: 30,
  timezone: 'Europe/Vienna',
} as const

export type Slot = {
  isoStart: string
  isoEnd: string
  label: string
  available: boolean
}

export type BookingHourConfig = {
  workingHourStart?: number
  workingHourEnd?: number
}

const viennaPartsFormatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: BOOKING_CONFIG.timezone,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
})

export function getViennaDateParts(date: Date) {
  const parts = Object.fromEntries(
    viennaPartsFormatter
      .formatToParts(date)
      .filter((part) => part.type !== 'literal')
      .map((part) => [part.type, Number(part.value)]),
  )
  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    hour: Number(parts.hour),
    minute: Number(parts.minute),
  }
}

/** Convert a Vienna wall-clock time to an unambiguous UTC instant. */
export function viennaDateTimeToUtc(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute = 0,
): Date {
  const target = Date.UTC(year, month - 1, day, hour, minute)
  let instant = new Date(target)
  // Working hours are 09:00–18:00, outside the ambiguous DST switch.
  for (let i = 0; i < 3; i++) {
    const actual = getViennaDateParts(instant)
    const actualAsUtc = Date.UTC(
      actual.year,
      actual.month - 1,
      actual.day,
      actual.hour,
      actual.minute,
    )
    const difference = target - actualAsUtc
    if (!difference) break
    instant = new Date(instant.getTime() + difference)
  }
  return instant
}

export function generateSlotsForDate(
  date: Date,
  busySlots: { slot_start: string; slot_end: string }[],
  config?: BookingHourConfig,
): Slot[] {
  const workingHourStart =
    config?.workingHourStart ?? BOOKING_CONFIG.workingHourStart
  const workingHourEnd =
    config?.workingHourEnd ?? BOOKING_CONFIG.workingHourEnd
  const { year, month, day } = getViennaDateParts(date)
  const weekday = new Date(Date.UTC(year, month - 1, day)).getUTCDay()
  if (!(BOOKING_CONFIG.workingDays as readonly number[]).includes(weekday)) {
    return []
  }

  const now = Date.now()
  const minBookableTime =
    now + BOOKING_CONFIG.minLeadHours * 60 * 60 * 1000
  const maxBookableTime =
    now + BOOKING_CONFIG.maxAdvanceDays * 24 * 60 * 60 * 1000
  const startOfWork = viennaDateTimeToUtc(
    year,
    month,
    day,
    workingHourStart,
  ).getTime()
  const endOfWork = viennaDateTimeToUtc(
    year,
    month,
    day,
    workingHourEnd,
  ).getTime()
  const durationMs = BOOKING_CONFIG.durationMinutes * 60 * 1000
  const stepMs = BOOKING_CONFIG.slotMinutes * 60 * 1000
  const occupied = busySlots.map((slot) => ({
    start: new Date(slot.slot_start).getTime(),
    end: new Date(slot.slot_end).getTime(),
  }))

  const slots: Slot[] = []
  for (
    let timestamp = startOfWork;
    timestamp + durationMs <= endOfWork;
    timestamp += stepMs
  ) {
    const end = timestamp + durationMs
    const overlaps = occupied.some(
      (item) => timestamp < item.end && end > item.start,
    )
    slots.push({
      isoStart: new Date(timestamp).toISOString(),
      isoEnd: new Date(end).toISOString(),
      label: formatTimeLabel(new Date(timestamp)),
      available:
        timestamp >= minBookableTime &&
        timestamp <= maxBookableTime &&
        !overlaps,
    })
  }
  return slots
}

function formatTimeLabel(date: Date): string {
  const { hour, minute } = getViennaDateParts(date)
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
}

export function getBookableDates(): Date[] {
  const dates: Date[] = []
  const now = getViennaDateParts(new Date())
  for (let i = 0; i < BOOKING_CONFIG.maxAdvanceDays; i++) {
    // Calendar buttons represent Vienna dates, displayed in the browser's
    // local calendar without depending on the server's UTC clock.
    const date = new Date(now.year, now.month - 1, now.day + i)
    if (
      (BOOKING_CONFIG.workingDays as readonly number[]).includes(
        date.getDay(),
      )
    ) {
      dates.push(date)
    }
  }
  return dates
}

export function validateSlot(
  slotStart: string,
  config?: BookingHourConfig,
): {
  valid: boolean
  reason?: string
  start?: Date
  end?: Date
} {
  const workingHourStart =
    config?.workingHourStart ?? BOOKING_CONFIG.workingHourStart
  const workingHourEnd =
    config?.workingHourEnd ?? BOOKING_CONFIG.workingHourEnd
  const start = new Date(slotStart)
  if (Number.isNaN(start.getTime())) {
    return { valid: false, reason: 'Ungültiges Datum' }
  }

  const { year, month, day, minute } = getViennaDateParts(start)
  const weekday = new Date(Date.UTC(year, month - 1, day)).getUTCDay()
  if (!(BOOKING_CONFIG.workingDays as readonly number[]).includes(weekday)) {
    return { valid: false, reason: 'Termin nur an Werktagen möglich' }
  }

  if (
    minute % BOOKING_CONFIG.slotMinutes !== 0 ||
    start.getUTCSeconds() !== 0 ||
    start.getUTCMilliseconds() !== 0
  ) {
    return { valid: false, reason: 'Slot-Raster verletzt' }
  }

  const dayStart = viennaDateTimeToUtc(year, month, day, workingHourStart)
  const dayEnd = viennaDateTimeToUtc(year, month, day, workingHourEnd)
  const end = new Date(
    start.getTime() + BOOKING_CONFIG.durationMinutes * 60 * 1000,
  )
  if (end > dayEnd) {
    return { valid: false, reason: 'Termin würde nach Arbeitszeit enden' }
  }
  if (start < dayStart) {
    return { valid: false, reason: 'Termin vor Arbeitszeit' }
  }

  const now = Date.now()
  if (
    start.getTime() <
    now + BOOKING_CONFIG.minLeadHours * 60 * 60 * 1000
  ) {
    return { valid: false, reason: 'Termin zu kurzfristig (min. 24h Vorlauf)' }
  }
  if (
    start.getTime() >
    now + BOOKING_CONFIG.maxAdvanceDays * 24 * 60 * 60 * 1000
  ) {
    return { valid: false, reason: 'Termin zu weit in der Zukunft' }
  }
  return { valid: true, start, end }
}

export async function findAlternativeSlots(
  preferredStart: Date,
  fetchBusy: (
    dayStart: Date,
    dayEnd: Date,
  ) => Promise<{ slot_start: string; slot_end: string }[]>,
  limit = 3,
  config?: BookingHourConfig,
): Promise<{ isoStart: string; isoEnd: string; label: string; date: string }[]> {
  const found: {
    isoStart: string
    isoEnd: string
    label: string
    date: string
  }[] = []
  const dateParts = getViennaDateParts(preferredStart)
  const firstDay = Date.UTC(
    dateParts.year,
    dateParts.month - 1,
    dateParts.day,
  )

  for (let i = 0; i < 14 && found.length < limit; i++) {
    const day = new Date(firstDay + i * 24 * 60 * 60 * 1000)
    if (
      !(BOOKING_CONFIG.workingDays as readonly number[]).includes(
        day.getUTCDay(),
      )
    ) continue

    const year = day.getUTCFullYear()
    const month = day.getUTCMonth() + 1
    const dayOfMonth = day.getUTCDate()
    const nextDay = new Date(day.getTime() + 24 * 60 * 60 * 1000)
    const dayStart = viennaDateTimeToUtc(year, month, dayOfMonth, 0)
    const dayEnd = new Date(
      viennaDateTimeToUtc(
        nextDay.getUTCFullYear(),
        nextDay.getUTCMonth() + 1,
        nextDay.getUTCDate(),
        0,
      ).getTime() - 1,
    )
    const busy = await fetchBusy(dayStart, dayEnd)
    const slots = generateSlotsForDate(
      new Date(Date.UTC(year, month - 1, dayOfMonth, 12)),
      busy,
      config,
    )
    for (const slot of slots) {
      if (found.length >= limit) break
      if (!slot.available) continue
      if (i === 0 && new Date(slot.isoStart) <= preferredStart) continue
      found.push({
        isoStart: slot.isoStart,
        isoEnd: slot.isoEnd,
        label: slot.label,
        date: formatDateOnly(new Date(slot.isoStart)),
      })
    }
  }
  return found
}

function formatDateOnly(d: Date): string {
  return new Intl.DateTimeFormat('de-AT', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    timeZone: BOOKING_CONFIG.timezone,
  }).format(d)
}

export function formatSlotForDisplay(slot: {
  start: Date | string
  end?: Date | string
}): {
  date: string
  time: string
  full: string
} {
  const start = slot.start instanceof Date ? slot.start : new Date(slot.start)
  const end = slot.end
    ? slot.end instanceof Date
      ? slot.end
      : new Date(slot.end)
    : new Date(start.getTime() + BOOKING_CONFIG.durationMinutes * 60 * 1000)

  const date = new Intl.DateTimeFormat('de-AT', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: BOOKING_CONFIG.timezone,
  }).format(start)
  const startTime = new Intl.DateTimeFormat('de-AT', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: BOOKING_CONFIG.timezone,
  }).format(start)
  const endTime = new Intl.DateTimeFormat('de-AT', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: BOOKING_CONFIG.timezone,
  }).format(end)

  return {
    date,
    time: `${startTime} – ${endTime}`,
    full: `${date}, ${startTime} – ${endTime}`,
  }
}
