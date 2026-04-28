import { Resend } from 'resend'
import { SITE } from './site'
import type { Lead } from './supabase'

const resendKey = process.env.RESEND_API_KEY
const fromEmail = process.env.RESEND_FROM_EMAIL ?? `office@${SITE.domain}`
const notifyEmail = process.env.NOTIFY_EMAIL ?? SITE.contact.email

if (!resendKey) {
  throw new Error('Missing RESEND_API_KEY env var')
}

const resend = new Resend(resendKey)

const TOPIC_LABEL: Record<Lead['topic'], string> = {
  'new-website': 'Neue Website erstellen',
  relaunch: 'Bestehende Website überarbeiten',
  seo: 'SEO-Beratung',
  other: 'Etwas anderes',
}

const CHANNEL_LABEL = {
  phone: 'Telefon',
  'on-site-office': 'Im Büro (1220 Wien)',
  'on-site-external': 'Vor Ort beim Kunden',
} as const

type Channel = keyof typeof CHANNEL_LABEL

const COLORS = {
  bg: '#161618',
  bg2: '#232327',
  paper: '#fafaf9',
  mute: '#c8b8a8',
  dim: '#998a7c',
  signal: '#cf8755',
  signal2: '#e09f6f',
} as const

export function generateRefNumber(): string {
  const d = new Date()
  const date = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`
  const rand = Math.floor(Math.random() * 0xffff)
    .toString(16)
    .padStart(4, '0')
    .toUpperCase()
  return `${date}-${rand}`
}

// === LEAD MAILS ===
export async function sendLeadNotification(lead: Lead, refNumber: string) {
  return resend.emails.send({
    from: `Webdesign Alcor <${fromEmail}>`,
    to: notifyEmail,
    replyTo: lead.email,
    subject: `[#${refNumber}] Neue Anfrage: ${TOPIC_LABEL[lead.topic]} – ${lead.name}`,
    html: leadNotificationTemplate(lead, refNumber),
  })
}

export async function sendLeadAutoReply(lead: Lead, refNumber: string) {
  return resend.emails.send({
    from: `Robert Alchimowicz <${fromEmail}>`,
    to: lead.email,
    subject: `Ihre Anfrage bei Webdesign Alcor (Ref. #${refNumber})`,
    html: leadAutoReplyTemplate(lead, refNumber),
  })
}

// === BOOKING MAILS ===
export type BookingMailData = {
  refNumber: string
  name: string
  email: string
  phone: string
  topic: string
  message: string
  channel: Channel
  externalAddress: string
  slotStart: Date
  slotEnd: Date
}

export async function sendBookingNotification(
  booking: BookingMailData,
  ics: string,
) {
  const slot = formatSlot(booking.slotStart, booking.slotEnd)
  const whatsappReply = booking.phone
    ? `https://wa.me/${booking.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hallo ${booking.name.split(' ')[0]}, danke für die Buchung des Termins am ${slot.date}, ${slot.time} (Ref. #${booking.refNumber}). `)}`
    : null

  return resend.emails.send({
    from: `Webdesign Alcor <${fromEmail}>`,
    to: notifyEmail,
    replyTo: booking.email,
    subject: `[#${booking.refNumber}] Neuer Termin: ${slot.date} ${slot.time} – ${booking.name}`,
    html: bookingNotificationTemplate(booking, slot, whatsappReply),
    attachments: [
      { filename: `termin-${booking.refNumber}.ics`, content: ics },
    ],
  })
}

export async function sendBookingAutoReply(
  booking: BookingMailData,
  ics: string,
) {
  const slot = formatSlot(booking.slotStart, booking.slotEnd)
  return resend.emails.send({
    from: `Robert Alchimowicz <${fromEmail}>`,
    to: booking.email,
    subject: `Termin bestätigt: ${slot.date}, ${slot.time} (Ref. #${booking.refNumber})`,
    html: bookingAutoReplyTemplate(booking, slot),
    attachments: [
      { filename: `termin-${booking.refNumber}.ics`, content: ics },
    ],
  })
}

// === TEMPLATES ===

function leadNotificationTemplate(lead: Lead, refNumber: string): string {
  const whatsappReply = lead.phone
    ? `https://wa.me/${lead.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hallo ${lead.name.split(' ')[0]}, danke für Ihre Anfrage (Ref. #${refNumber}). `)}`
    : null
  return `<!DOCTYPE html><html><body style="font-family:system-ui,-apple-system,sans-serif;max-width:600px;margin:0 auto;padding:0;background:${COLORS.bg};color:${COLORS.paper}">
    <div style="padding:32px 28px">
      <div style="font-family:Georgia,serif;font-size:14px;color:${COLORS.signal2};letter-spacing:0.1em;text-transform:uppercase;margin-bottom:8px">Webdesign Alcor</div>
      <h2 style="font-family:Georgia,serif;color:${COLORS.paper};font-size:28px;font-weight:400;margin:0 0 4px">Neue Anfrage</h2>
      <div style="font-family:monospace;font-size:13px;color:${COLORS.dim};margin-bottom:24px">Ref. #${refNumber}</div>
      <table style="width:100%;border-collapse:collapse;background:${COLORS.bg2};border-radius:4px">
        ${row('Name', escape(lead.name))}
        ${row('E-Mail', `<a href="mailto:${escape(lead.email)}" style="color:${COLORS.signal2};text-decoration:none">${escape(lead.email)}</a>`)}
        ${lead.phone ? row('Telefon', `<a href="tel:${escape(lead.phone)}" style="color:${COLORS.signal2};text-decoration:none">${escape(lead.phone)}</a>`) : ''}
        ${lead.company ? row('Firma', escape(lead.company)) : ''}
        ${row('Thema', TOPIC_LABEL[lead.topic])}
        ${row('Quelle', `<span style="font-size:13px;color:${COLORS.dim}">${escape(lead.source)}</span>`)}
      </table>
      <div style="background:${COLORS.bg2};border-left:3px solid ${COLORS.signal};padding:18px 22px;margin:24px 0;border-radius:0 4px 4px 0">
        <div style="font-size:11px;color:${COLORS.signal2};text-transform:uppercase;letter-spacing:0.12em;margin-bottom:10px">Nachricht</div>
        <div style="white-space:pre-wrap;line-height:1.65;color:${COLORS.paper}">${escape(lead.message)}</div>
      </div>
      ${
        whatsappReply
          ? `<div style="margin-top:28px;padding:18px 22px;background:${COLORS.bg2};border-radius:4px">
          <div style="font-size:11px;color:${COLORS.signal2};text-transform:uppercase;letter-spacing:0.12em;margin-bottom:12px">Schnellaktion</div>
          <a href="${whatsappReply}" style="display:inline-block;background:${COLORS.signal};color:${COLORS.bg};padding:10px 18px;border-radius:4px;text-decoration:none;font-weight:500;font-size:14px;margin-right:8px">WhatsApp antworten</a>
          <a href="tel:${escape(lead.phone || '')}" style="display:inline-block;background:transparent;color:${COLORS.signal2};padding:10px 18px;border:1px solid rgba(207,135,85,0.4);border-radius:4px;text-decoration:none;font-weight:500;font-size:14px">Anrufen</a>
        </div>`
          : ''
      }
      <p style="font-size:12px;color:${COLORS.dim};margin-top:32px">Eingegangen ${new Date().toLocaleString('de-AT', { timeZone: 'Europe/Vienna' })}</p>
    </div>
  </body></html>`
}

function leadAutoReplyTemplate(lead: Lead, refNumber: string): string {
  const firstName = escape(lead.name.split(' ')[0] ?? lead.name)
  return `<!DOCTYPE html><html><body style="font-family:system-ui,-apple-system,sans-serif;max-width:600px;margin:0 auto;padding:0;background:${COLORS.bg};color:${COLORS.paper};line-height:1.6">
    <div style="padding:36px 28px">
      <div style="font-family:Georgia,serif;font-size:14px;color:${COLORS.signal2};letter-spacing:0.1em;text-transform:uppercase;margin-bottom:8px">Webdesign Alcor</div>
      <h2 style="font-family:Georgia,serif;color:${COLORS.paper};font-size:32px;font-weight:400;margin:0 0 4px">Danke, ${firstName}.</h2>
      <div style="font-family:monospace;font-size:13px;color:${COLORS.dim};margin-bottom:28px">Ihre Referenznummer: <strong style="color:${COLORS.signal2}">#${refNumber}</strong></div>
      <p style="color:${COLORS.paper};font-size:16px">Ihre Anfrage ist bei mir eingegangen. Ich melde mich <strong style="color:${COLORS.signal2}">binnen 24 Stunden</strong> persönlich bei Ihnen zurück.</p>
      <div style="background:${COLORS.bg2};padding:18px 22px;border-radius:4px;margin:24px 0;border-left:3px solid ${COLORS.signal}">
        <div style="font-size:11px;color:${COLORS.signal2};text-transform:uppercase;letter-spacing:0.12em;margin-bottom:10px">Ihre Nachricht</div>
        <div style="white-space:pre-wrap;color:${COLORS.mute}">${escape(lead.message)}</div>
      </div>
      <p style="color:${COLORS.paper}">Falls es eilt:</p>
      <ul style="padding-left:20px;color:${COLORS.mute}">
        <li>Telefon: <a href="tel:${SITE.contact.phoneRaw}" style="color:${COLORS.signal2};text-decoration:none">${SITE.contact.phoneFormatted}</a></li>
        <li>WhatsApp: <a href="${SITE.contact.whatsapp}" style="color:${COLORS.signal2};text-decoration:none">direkt schreiben</a></li>
      </ul>
      <p style="color:${COLORS.paper};margin-top:32px">Bis bald,<br><strong style="color:${COLORS.paper}">Robert Alchimowicz</strong><br><span style="color:${COLORS.dim};font-size:13px">${SITE.name} · ${SITE.address.city}</span></p>
      <div style="margin-top:40px;padding-top:24px;border-top:1px solid rgba(207,135,85,0.14)">
        <div style="font-size:11px;color:${COLORS.signal2};text-transform:uppercase;letter-spacing:0.12em;margin-bottom:8px">Übrigens</div>
        <p style="font-size:13px;color:${COLORS.dim};line-height:1.6;margin:0">
          Falls Sie jemanden kennen, der ebenfalls eine Website braucht – ich freue mich über jede Empfehlung. Kein Provisions-System, keine Newsletter. Nur, falls es passt.
        </p>
      </div>
    </div>
  </body></html>`
}

function bookingNotificationTemplate(
  booking: BookingMailData,
  slot: { date: string; time: string },
  whatsappReply: string | null,
): string {
  return `<!DOCTYPE html><html><body style="font-family:system-ui,-apple-system,sans-serif;max-width:600px;margin:0 auto;padding:0;background:${COLORS.bg};color:${COLORS.paper}">
    <div style="padding:32px 28px">
      <div style="font-family:Georgia,serif;font-size:14px;color:${COLORS.signal2};letter-spacing:0.1em;text-transform:uppercase;margin-bottom:8px">Webdesign Alcor</div>
      <h2 style="font-family:Georgia,serif;color:${COLORS.paper};font-size:28px;font-weight:400;margin:0 0 4px">Neuer Termin gebucht</h2>
      <div style="font-family:monospace;font-size:13px;color:${COLORS.dim};margin-bottom:24px">Ref. #${booking.refNumber}</div>

      <div style="background:${COLORS.signal};color:${COLORS.bg};padding:20px 24px;border-radius:4px;margin-bottom:24px">
        <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.12em;margin-bottom:6px;opacity:0.7">Termin</div>
        <div style="font-family:Georgia,serif;font-size:22px;line-height:1.2;margin-bottom:4px">${slot.date}</div>
        <div style="font-family:monospace;font-size:16px">${slot.time}</div>
        <div style="font-size:13px;margin-top:10px;opacity:0.85">Ort: ${CHANNEL_LABEL[booking.channel]}</div>
      </div>

      <table style="width:100%;border-collapse:collapse;background:${COLORS.bg2};border-radius:4px">
        ${row('Name', escape(booking.name))}
        ${row('E-Mail', `<a href="mailto:${escape(booking.email)}" style="color:${COLORS.signal2};text-decoration:none">${escape(booking.email)}</a>`)}
        ${row('Telefon', `<a href="tel:${escape(booking.phone)}" style="color:${COLORS.signal2};text-decoration:none">${escape(booking.phone)}</a>`)}
        ${row('Anliegen', escape(booking.topic))}
        ${booking.channel === 'on-site-external' && booking.externalAddress ? row('Adresse', escape(booking.externalAddress)) : ''}
      </table>

      ${
        booking.message
          ? `<div style="background:${COLORS.bg2};border-left:3px solid ${COLORS.signal};padding:18px 22px;margin:24px 0;border-radius:0 4px 4px 0">
        <div style="font-size:11px;color:${COLORS.signal2};text-transform:uppercase;letter-spacing:0.12em;margin-bottom:10px">Vorab-Notizen</div>
        <div style="white-space:pre-wrap;line-height:1.65;color:${COLORS.paper}">${escape(booking.message)}</div>
      </div>`
          : ''
      }

      ${
        whatsappReply
          ? `<div style="margin-top:28px;padding:18px 22px;background:${COLORS.bg2};border-radius:4px">
          <div style="font-size:11px;color:${COLORS.signal2};text-transform:uppercase;letter-spacing:0.12em;margin-bottom:12px">Schnellaktion</div>
          <a href="${whatsappReply}" style="display:inline-block;background:${COLORS.signal};color:${COLORS.bg};padding:10px 18px;border-radius:4px;text-decoration:none;font-weight:500;font-size:14px;margin-right:8px">WhatsApp antworten</a>
          <a href="tel:${escape(booking.phone)}" style="display:inline-block;background:transparent;color:${COLORS.signal2};padding:10px 18px;border:1px solid rgba(207,135,85,0.4);border-radius:4px;text-decoration:none;font-weight:500;font-size:14px">Anrufen</a>
        </div>`
          : ''
      }

      <p style="font-size:12px;color:${COLORS.dim};margin-top:32px">ICS-Datei ist im Anhang. Eingegangen ${new Date().toLocaleString('de-AT', { timeZone: 'Europe/Vienna' })}</p>
    </div>
  </body></html>`
}

function bookingAutoReplyTemplate(
  booking: BookingMailData,
  slot: { date: string; time: string },
): string {
  const firstName = escape(booking.name.split(' ')[0] ?? booking.name)
  const channelText = CHANNEL_LABEL[booking.channel]

  let channelDetail = ''
  if (booking.channel === 'phone') {
    channelDetail = `Robert ruft Sie zur vereinbarten Zeit unter <strong>${escape(booking.phone)}</strong> an.`
  } else if (booking.channel === 'on-site-office') {
    channelDetail = `Treffpunkt: <strong>${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city}</strong> (${SITE.address.district}).<br><br>Falls Sie sich verspäten: <strong>${SITE.contact.phoneFormatted}</strong>`
  } else if (booking.channel === 'on-site-external') {
    channelDetail = `Robert kommt zu Ihnen unter:<br><strong>${escape(booking.externalAddress)}</strong><br><br>Falls etwas dazwischenkommt, erreichen Sie ihn unter <strong>${SITE.contact.phoneFormatted}</strong>.`
  }

  return `<!DOCTYPE html><html><body style="font-family:system-ui,-apple-system,sans-serif;max-width:600px;margin:0 auto;padding:0;background:${COLORS.bg};color:${COLORS.paper};line-height:1.6">
    <div style="padding:36px 28px">
      <div style="font-family:Georgia,serif;font-size:14px;color:${COLORS.signal2};letter-spacing:0.1em;text-transform:uppercase;margin-bottom:8px">Webdesign Alcor</div>
      <h2 style="font-family:Georgia,serif;color:${COLORS.paper};font-size:32px;font-weight:400;margin:0 0 4px">Termin bestätigt, ${firstName}.</h2>
      <div style="font-family:monospace;font-size:13px;color:${COLORS.dim};margin-bottom:28px">Referenznummer: <strong style="color:${COLORS.signal2}">#${booking.refNumber}</strong></div>

      <div style="background:${COLORS.signal};color:${COLORS.bg};padding:24px 28px;border-radius:4px;margin-bottom:24px">
        <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.12em;margin-bottom:8px;opacity:0.7">Ihr Termin</div>
        <div style="font-family:Georgia,serif;font-size:24px;line-height:1.2;margin-bottom:6px">${slot.date}</div>
        <div style="font-family:monospace;font-size:18px;margin-bottom:14px">${slot.time}</div>
        <div style="font-size:14px;border-top:1px solid rgba(0,0,0,0.15);padding-top:12px;margin-top:14px"><strong>${channelText}</strong></div>
      </div>

      <p style="color:${COLORS.paper};font-size:16px">${channelDetail}</p>

      <p style="color:${COLORS.mute};font-size:14px">Pro Termin reserviere ich eine Stunde. Falls das Gespräch kürzer wird – auch gut. Die Zeit gehört Ihnen.</p>

      <p style="color:${COLORS.paper}">Im Anhang finden Sie eine Kalender-Datei (.ics), die Sie in Apple Calendar, Outlook, Google Calendar oder Thunderbird importieren können.</p>

      <div style="background:${COLORS.bg2};padding:18px 22px;border-radius:4px;margin:24px 0;border-left:3px solid ${COLORS.signal}">
        <div style="font-size:11px;color:${COLORS.signal2};text-transform:uppercase;letter-spacing:0.12em;margin-bottom:10px">Ihr Anliegen</div>
        <div style="color:${COLORS.paper};margin-bottom:8px"><strong>${escape(booking.topic)}</strong></div>
        ${booking.message ? `<div style="white-space:pre-wrap;color:${COLORS.mute};font-size:14px">${escape(booking.message)}</div>` : ''}
      </div>

      <!-- ABSAGE / VERSCHIEBEN - klar und einfach -->
      <div style="margin-top:32px;padding:24px;background:${COLORS.bg2};border-radius:4px">
        <h3 style="font-family:Georgia,serif;font-size:20px;color:${COLORS.paper};margin:0 0 14px">Sie können nicht kommen?</h3>
        <p style="color:${COLORS.mute};margin:0 0 14px;font-size:14px">Kein Problem – das passiert. So gehen Sie vor:</p>

        <div style="margin-bottom:18px">
          <div style="font-size:12px;color:${COLORS.signal2};text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">Termin verschieben</div>
          <p style="color:${COLORS.mute};margin:0;font-size:14px">Antworten Sie einfach auf diese E-Mail mit zwei oder drei Wunsch-Terminen, oder buchen Sie direkt einen neuen unter <a href="${SITE.url}/termin" style="color:${COLORS.signal2};text-decoration:none">${SITE.url}/termin</a>. Den alten storniere ich dann.</p>
        </div>

        <div style="margin-bottom:18px">
          <div style="font-size:12px;color:${COLORS.signal2};text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">Termin absagen</div>
          <p style="color:${COLORS.mute};margin:0;font-size:14px">Kurze Mail oder Anruf reicht – nennen Sie einfach Ihre Referenznummer <strong style="color:${COLORS.paper}">#${booking.refNumber}</strong>. Bitte möglichst <strong style="color:${COLORS.paper}">spätestens 24 Stunden vorher</strong>, damit ich den Slot wieder freigeben kann.</p>
        </div>

        <div>
          <div style="font-size:12px;color:${COLORS.signal2};text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">Ich erreiche Sie nicht?</div>
          <p style="color:${COLORS.mute};margin:0;font-size:14px">Wenn ich am Termintag niemanden unter <strong style="color:${COLORS.paper}">${escape(booking.phone)}</strong> erreichen kann, melde ich mich per E-Mail. Eine Wartezeit von 10 Minuten ist okay – danach buchen wir neu.</p>
        </div>
      </div>

      <div style="margin-top:24px;text-align:center">
        <a href="tel:${SITE.contact.phoneRaw}" style="display:inline-block;background:${COLORS.signal};color:${COLORS.bg};padding:12px 22px;border-radius:4px;text-decoration:none;font-weight:500;font-size:14px;margin-right:8px;margin-bottom:8px">${SITE.contact.phoneFormatted}</a>
        <a href="mailto:${SITE.contact.email}?subject=Termin%20%23${booking.refNumber}" style="display:inline-block;background:transparent;color:${COLORS.signal2};padding:12px 22px;border:1px solid rgba(207,135,85,0.4);border-radius:4px;text-decoration:none;font-weight:500;font-size:14px;margin-bottom:8px">${SITE.contact.email}</a>
      </div>

      <p style="color:${COLORS.paper};margin-top:32px">Bis bald,<br><strong style="color:${COLORS.paper}">Robert Alchimowicz</strong><br><span style="color:${COLORS.dim};font-size:13px">${SITE.name} · ${SITE.address.city}</span></p>
    </div>
  </body></html>`
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:14px 20px;color:${COLORS.dim};width:120px;font-size:13px;border-bottom:1px solid rgba(207,135,85,0.12);vertical-align:top">${label}</td>
    <td style="padding:14px 20px;color:${COLORS.paper};font-weight:500;border-bottom:1px solid rgba(207,135,85,0.12)">${value}</td>
  </tr>`
}

function formatSlot(start: Date, end: Date): { date: string; time: string } {
  const date = new Intl.DateTimeFormat('de-AT', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Vienna',
  }).format(start)
  const startTime = new Intl.DateTimeFormat('de-AT', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Vienna',
  }).format(start)
  const endTime = new Intl.DateTimeFormat('de-AT', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Vienna',
  }).format(end)
  return { date, time: `${startTime} – ${endTime}` }
}

function escape(s: string): string {
  return s.replace(
    /[&<>"']/g,
    (c) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      })[c] ?? c,
  )
}
