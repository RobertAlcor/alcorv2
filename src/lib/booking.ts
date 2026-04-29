/**
 * Booking-Logik - feste Dauer 60 Min pro Termin.
 * Egal ob das Gespräch nur 15 Min dauert: der Slot ist mit 1h reserviert.
 * Macht es für den Kunden simpel und gibt Robert Puffer.
 */

export const BOOKING_CONFIG = {
  slotMinutes: 15, // Raster für Slot-Starts
  durationMinutes: 60, // Termin blockt immer 1h
  workingDays: [1, 2, 3, 4, 5], // Mo-Fr
  workingHourStart: 9, // 09:00
  workingHourEnd: 18, // Termin muss bis 18:00 zu Ende sein
  minLeadHours: 24,
  maxAdvanceDays: 30,
  timezone: 'Europe/Vienna',
} as const

export type Slot = {
  isoStart: string
  isoEnd: string
  label: string // "09:15"
  available: boolean
}

/**
 * Optionaler Config-Override für Working-Hours.
 * Wenn nicht übergeben werden BOOKING_CONFIG-Defaults verwendet.
 */
export type BookingHourConfig = {
  workingHourStart?: number
  workingHourEnd?: number
}

/**
 * Generiert Slots für ein Datum.
 * Slot-Starts im 15-Min-Raster, jeder blockt aber 60 Min.
 * Slot ist nur "available", wenn die ganze Stunde frei ist und noch in Arbeitszeit.
 */
export function generateSlotsForDate(
  date: Date,
  busySlots: { slot_start: string; slot_end: string }[],
  config?: BookingHourConfig,
): Slot[] {
  const workingHourStart =
    config?.workingHourStart ?? BOOKING_CONFIG.workingHourStart
  const workingHourEnd =
    config?.workingHourEnd ?? BOOKING_CONFIG.workingHourEnd

  const day = date.getDay()
  if (!(BOOKING_CONFIG.workingDays as readonly number[]).includes(day)) {
    return []
  }

  const now = new Date()
  const minBookableTime = new Date(
    now.getTime() + BOOKING_CONFIG.minLeadHours * 60 * 60 * 1000,
  )
  const maxBookableTime = new Date(
    now.getTime() + BOOKING_CONFIG.maxAdvanceDays * 24 * 60 * 60 * 1000,
  )
  if (date > maxBookableTime) return []

  const slots: Slot[] = []
  const dayStart = new Date(date)
  dayStart.setHours(workingHourStart, 0, 0, 0)
  const dayEnd = new Date(date)
  dayEnd.setHours(workingHourEnd, 0, 0, 0)

  // Alle besetzten 15-Min-Sub-Slots ermitteln
  const busyMinutes = new Set<number>()
  for (const b of busySlots) {
    const start = new Date(b.slot_start).getTime()
    const end = new Date(b.slot_end).getTime()
    let cursor = start
    while (cursor < end) {
      busyMinutes.add(cursor)
      cursor += BOOKING_CONFIG.slotMinutes * 60 * 1000
    }
  }

  let cursor = new Date(dayStart)
  while (cursor < dayEnd) {
    const slotEnd = new Date(
      cursor.getTime() + BOOKING_CONFIG.durationMinutes * 60 * 1000,
    )

    if (slotEnd > dayEnd) break // letzter 60-Min Slot startet 17:00

    // Prüfe ob alle 15-Min-Sub-Slots im Stunden-Range frei sind
    let allFree = true
    let subCursor = cursor.getTime()
    while (subCursor < slotEnd.getTime()) {
      if (busyMinutes.has(subCursor)) {
        allFree = false
        break
      }
      subCursor += BOOKING_CONFIG.slotMinutes * 60 * 1000
    }

    const isPast = cursor < minBookableTime

    slots.push({
      isoStart: cursor.toISOString(),
      isoEnd: slotEnd.toISOString(),
      label: formatTimeLabel(cursor),
      available: !isPast && allFree,
    })

    cursor = new Date(cursor.getTime() + BOOKING_CONFIG.slotMinutes * 60 * 1000)
  }

  return slots
}

function formatTimeLabel(d: Date): string {
  const h = String(d.getHours()).padStart(2, '0')
  const m = String(d.getMinutes()).padStart(2, '0')
  return `${h}:${m}`
}

export function getBookableDates(): Date[] {
  const dates: Date[] = []
  const now = new Date()
  for (let i = 0; i < BOOKING_CONFIG.maxAdvanceDays; i++) {
    const d = new Date(now)
    d.setDate(now.getDate() + i)
    d.setHours(0, 0, 0, 0)
    if (
      (BOOKING_CONFIG.workingDays as readonly number[]).includes(d.getDay())
    ) {
      dates.push(d)
    }
  }
  return dates
}

/**
 * Server-side Slot-Validation.
 */
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
  if (isNaN(start.getTime())) {
    return { valid: false, reason: 'Ungültiges Datum' }
  }

  const day = start.getDay()
  if (!(BOOKING_CONFIG.workingDays as readonly number[]).includes(day)) {
    return { valid: false, reason: 'Termin nur an Werktagen möglich' }
  }

  const minutes = start.getMinutes()
  if (minutes % BOOKING_CONFIG.slotMinutes !== 0) {
    return { valid: false, reason: 'Slot-Raster verletzt' }
  }

  const end = new Date(
    start.getTime() + BOOKING_CONFIG.durationMinutes * 60 * 1000,
  )

  const dayEnd = new Date(start)
  dayEnd.setHours(workingHourEnd, 0, 0, 0)
  if (end > dayEnd) {
    return { valid: false, reason: 'Termin würde nach Arbeitszeit enden' }
  }

  const dayStart = new Date(start)
  dayStart.setHours(workingHourStart, 0, 0, 0)
  if (start < dayStart) {
    return { valid: false, reason: 'Termin vor Arbeitszeit' }
  }

  const now = new Date()
  const minBookableTime = new Date(
    now.getTime() + BOOKING_CONFIG.minLeadHours * 60 * 60 * 1000,
  )
  if (start < minBookableTime) {
    return { valid: false, reason: 'Termin zu kurzfristig (min. 24h Vorlauf)' }
  }

  const maxBookableTime = new Date(
    now.getTime() + BOOKING_CONFIG.maxAdvanceDays * 24 * 60 * 60 * 1000,
  )
  if (start > maxBookableTime) {
    return { valid: false, reason: 'Termin zu weit in der Zukunft' }
  }

  return { valid: true, start, end }
}

/**
 * Findet die nächsten freien Slots als Ausweich-Vorschläge.
 */
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

  let dayCursor = new Date(preferredStart)
  dayCursor.setHours(0, 0, 0, 0)

  for (let i = 0; i < 14 && found.length < limit; i++) {
    if (
      !(BOOKING_CONFIG.workingDays as readonly number[]).includes(
        dayCursor.getDay(),
      )
    ) {
      dayCursor = new Date(dayCursor.getTime() + 24 * 60 * 60 * 1000)
      continue
    }

    const dayStart = new Date(dayCursor)
    dayStart.setHours(0, 0, 0, 0)
    const dayEnd = new Date(dayCursor)
    dayEnd.setHours(23, 59, 59, 999)

    const busy = await fetchBusy(dayStart, dayEnd)
    const slots = generateSlotsForDate(dayCursor, busy, config)

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

    dayCursor = new Date(dayCursor.getTime() + 24 * 60 * 60 * 1000)
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
