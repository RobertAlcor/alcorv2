import { SITE } from './site'

/**
 * Generiert eine ICS-Datei nach RFC 5545.
 * Kompatibel mit Apple Calendar, Outlook, Google Calendar, Thunderbird.
 */

export type IcsEvent = {
  uid: string
  start: Date
  end: Date
  summary: string
  description?: string
  location?: string
  organizer?: { name: string; email: string }
  attendees?: { name: string; email: string }[]
  url?: string
}

export function generateIcs(event: IcsEvent): string {
  const lines: string[] = []
  lines.push('BEGIN:VCALENDAR')
  lines.push('VERSION:2.0')
  lines.push(`PRODID:-//${SITE.brand}//Booking//DE`)
  lines.push('CALSCALE:GREGORIAN')
  lines.push('METHOD:REQUEST')

  lines.push('BEGIN:VEVENT')
  lines.push(`UID:${event.uid}`)
  lines.push(`DTSTAMP:${formatDate(new Date())}`)
  lines.push(`DTSTART:${formatDate(event.start)}`)
  lines.push(`DTEND:${formatDate(event.end)}`)
  lines.push(`SUMMARY:${escapeIcs(event.summary)}`)

  if (event.description) {
    lines.push(`DESCRIPTION:${escapeIcs(event.description)}`)
  }

  if (event.location) {
    lines.push(`LOCATION:${escapeIcs(event.location)}`)
  }

  if (event.organizer) {
    lines.push(
      `ORGANIZER;CN=${escapeIcs(event.organizer.name)}:mailto:${event.organizer.email}`,
    )
  }

  if (event.attendees) {
    for (const attendee of event.attendees) {
      lines.push(
        `ATTENDEE;CN=${escapeIcs(attendee.name)};RSVP=TRUE:mailto:${attendee.email}`,
      )
    }
  }

  if (event.url) {
    lines.push(`URL:${event.url}`)
  }

  lines.push('STATUS:CONFIRMED')
  lines.push('SEQUENCE:0')
  lines.push('END:VEVENT')
  lines.push('END:VCALENDAR')

  return lines.join('\r\n')
}

/**
 * Formatiert ein Date als UTC im ICS-Format: 20260427T143000Z
 */
function formatDate(d: Date): string {
  return (
    d.getUTCFullYear().toString() +
    String(d.getUTCMonth() + 1).padStart(2, '0') +
    String(d.getUTCDate()).padStart(2, '0') +
    'T' +
    String(d.getUTCHours()).padStart(2, '0') +
    String(d.getUTCMinutes()).padStart(2, '0') +
    String(d.getUTCSeconds()).padStart(2, '0') +
    'Z'
  )
}

/**
 * Escaped Sonderzeichen für ICS:
 * - Backslash zu \\
 * - Komma zu \,
 * - Semikolon zu \;
 * - Newline zu \n
 */
function escapeIcs(s: string): string {
  return s
    .replace(/\\/g, '\\\\')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;')
    .replace(/\r?\n/g, '\\n')
}
