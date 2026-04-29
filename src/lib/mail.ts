import { Resend } from 'resend'
import { SITE } from './site'
import type { Lead } from './supabase'

const resendKey = process.env.RESEND_API_KEY
const fromEmail = process.env.RESEND_FROM_EMAIL ?? `office@${SITE.domain}`
const notifyEmail = process.env.NOTIFY_EMAIL ?? SITE.contact.email
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? SITE.url

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

// ============================================================
// DESIGN TOKENS — minimal, weiß, eine Schrift
// ============================================================
const FONT =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"

const C = {
  bg: '#ffffff',
  bgSubtle: '#f7f7f5',
  text: '#1a1a1a',
  textBody: '#333333',
  textMute: '#666666',
  textDim: '#999999',
  border: '#e5e5e0',
  borderStrong: '#d0d0c8',
  accent: '#cf8755',
  accentDark: '#a86838',
} as const

// ============================================================
// REF NUMBER
// ============================================================
export function generateRefNumber(): string {
  const d = new Date()
  const date = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`
  const rand = Math.floor(Math.random() * 0xffff)
    .toString(16)
    .padStart(4, '0')
    .toUpperCase()
  return `${date}-${rand}`
}

// ============================================================
// PUBLIC SEND FUNCTIONS
// ============================================================

// LEAD MAILS

export async function sendLeadNotification(lead: Lead, refNumber: string) {
  return resend.emails.send({
    from: `Webdesign Alcor <${fromEmail}>`,
    to: notifyEmail,
    replyTo: lead.email,
    subject: `[#${refNumber}] Neue Anfrage: ${TOPIC_LABEL[lead.topic]} – ${lead.name}`,
    html: leadNotificationTemplate(lead, refNumber),
  })
}

export async function sendLeadCopyToCustomer(lead: Lead, refNumber: string) {
  return resend.emails.send({
    from: `Robert Alchimowicz <${fromEmail}>`,
    to: lead.email,
    subject: `Kopie Ihrer Anfrage bei Webdesign Alcor (#${refNumber})`,
    html: leadCopyTemplate(lead, refNumber),
  })
}

// BOOKING MAILS

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

export async function sendBookingPendingToAdmin(booking: BookingMailData) {
  const slot = formatSlot(booking.slotStart, booking.slotEnd)
  return resend.emails.send({
    from: `Webdesign Alcor <${fromEmail}>`,
    to: notifyEmail,
    replyTo: booking.email,
    subject: `[#${booking.refNumber}] Anfrage zu prüfen: ${slot.date} ${slot.time} – ${booking.name}`,
    html: bookingPendingTemplate(booking, slot),
  })
}

export async function sendBookingConfirmedToCustomer(
  booking: BookingMailData,
  ics: string,
) {
  const slot = formatSlot(booking.slotStart, booking.slotEnd)
  return resend.emails.send({
    from: `Robert Alchimowicz <${fromEmail}>`,
    to: booking.email,
    subject: `Termin bestätigt: ${slot.date}, ${slot.time} (#${booking.refNumber})`,
    html: bookingConfirmedTemplate(booking, slot),
    attachments: [
      { filename: `termin-${booking.refNumber}.ics`, content: ics },
    ],
  })
}

export async function sendBookingDeclinedToCustomer(args: {
  refNumber: string
  name: string
  email: string
  topic: string
  slotStart: Date
  slotEnd: Date
  reason: string
}) {
  const slot = formatSlot(args.slotStart, args.slotEnd)
  return resend.emails.send({
    from: `Robert Alchimowicz <${fromEmail}>`,
    to: args.email,
    subject: `Termin nicht möglich: ${slot.date}, ${slot.time} (#${args.refNumber})`,
    html: bookingDeclinedTemplate(args, slot),
  })
}

// ============================================================
// SHARED LAYOUT
// ============================================================

function emailShell(content: string, options?: { preheader?: string }): string {
  const preheader = options?.preheader
    ? `<div style="display:none;max-height:0;overflow:hidden;font-size:1px;line-height:1px;color:#ffffff;opacity:0">${escape(options.preheader)}</div>`
    : ''

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="de" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>Webdesign Alcor</title>
<!--[if mso]>
<style type="text/css">table {border-collapse:collapse;border:0;border-spacing:0;margin:0;} div, td {padding:0;} div {margin:0 !important;}</style>
<![endif]-->
</head>
<body style="margin:0;padding:0;background:${C.bgSubtle};font-family:${FONT};color:${C.textBody};line-height:1.6;-webkit-font-smoothing:antialiased;-webkit-text-size-adjust:100%;width:100% !important">
${preheader}
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${C.bgSubtle};margin:0;padding:0">
  <tr>
    <td align="center" style="padding:40px 16px">

      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;background:${C.bg};border:1px solid ${C.border};border-radius:8px">

        <!-- HEADER -->
        <tr>
          <td style="padding:32px 40px 8px;border-bottom:1px solid ${C.border}">
            <p style="margin:0;font-family:${FONT};font-size:11px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:${C.accentDark}">Webdesign Alcor</p>
          </td>
        </tr>

        <!-- CONTENT -->
        <tr>
          <td style="padding:32px 40px 40px;font-family:${FONT}">
            ${content}
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="padding:24px 40px 32px;border-top:1px solid ${C.border};font-family:${FONT}">
            <p style="margin:0 0 6px;font-size:12px;color:${C.textMute};line-height:1.6">
              ${SITE.brand} · ${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city}
            </p>
            <p style="margin:0;font-size:12px;color:${C.textMute};line-height:1.6">
              <a href="mailto:${SITE.contact.email}" style="color:${C.accentDark};text-decoration:none">${SITE.contact.email}</a>
              &nbsp;·&nbsp;
              <a href="tel:${SITE.contact.phoneRaw}" style="color:${C.accentDark};text-decoration:none">${SITE.contact.phoneFormatted}</a>
              &nbsp;·&nbsp;
              <a href="${siteUrl}" style="color:${C.accentDark};text-decoration:none">${siteUrl.replace(/https?:\/\//, '')}</a>
            </p>
          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>
</body>
</html>`
}

// ============================================================
// LAYOUT BUILDING BLOCKS
// ============================================================

function h1(text: string): string {
  return `<h1 style="margin:0 0 8px;font-family:${FONT};font-size:24px;font-weight:600;line-height:1.3;color:${C.text}">${text}</h1>`
}

function refLine(refNumber: string): string {
  return `<p style="margin:0 0 32px;font-family:${FONT};font-size:13px;color:${C.textMute}">Referenz: <strong style="color:${C.accentDark};font-weight:600;font-family:${FONT}">#${refNumber}</strong></p>`
}

function paragraph(text: string): string {
  return `<p style="margin:0 0 16px;font-family:${FONT};font-size:15px;line-height:1.65;color:${C.textBody}">${text}</p>`
}

function smallParagraph(text: string): string {
  return `<p style="margin:0 0 16px;font-family:${FONT};font-size:13px;line-height:1.6;color:${C.textMute}">${text}</p>`
}

function sectionLabel(text: string): string {
  return `<p style="margin:32px 0 12px;font-family:${FONT};font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:${C.textMute}">${text}</p>`
}

function divider(): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:24px 0"><tr><td style="border-top:1px solid ${C.border};font-size:0;line-height:0">&nbsp;</td></tr></table>`
}

/**
 * Info-Box mit Label-Value-Reihen.
 * Pro Reihe Border-Top außer beim ersten.
 */
function infoBox(rows: { label: string; value: string }[]): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${C.bgSubtle};border:1px solid ${C.border};border-radius:6px;margin:0 0 8px">
${rows
  .map(
    (r, i) => `<tr>
<td valign="top" style="padding:14px 18px;width:120px;font-family:${FONT};font-size:12px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:${C.textMute};${i > 0 ? `border-top:1px solid ${C.border};` : ''}">${r.label}</td>
<td valign="top" style="padding:14px 18px;font-family:${FONT};font-size:14px;color:${C.text};line-height:1.5;${i > 0 ? `border-top:1px solid ${C.border};` : ''}">${r.value}</td>
</tr>`,
  )
  .join('')}
</table>`
}

/**
 * Highlight-Box für freie Textinhalte (z.B. Nachricht, Notizen)
 */
function quoteBox(text: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${C.bgSubtle};border:1px solid ${C.border};border-radius:6px;margin:0 0 8px">
<tr><td style="padding:18px 20px;font-family:${FONT};font-size:14px;line-height:1.65;color:${C.textBody};white-space:pre-wrap;word-break:break-word">${text}</td></tr>
</table>`
}

/**
 * Termin-Hero-Box: Datum + Uhrzeit prominent
 */
function appointmentBox(args: {
  date: string
  time: string
  meta?: string
}): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${C.bgSubtle};border:1px solid ${C.border};border-radius:6px;margin:0 0 8px">
<tr><td style="padding:24px 24px 20px;font-family:${FONT}">
<p style="margin:0 0 4px;font-size:11px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:${C.accentDark}">Termin</p>
<p style="margin:0 0 4px;font-family:${FONT};font-size:20px;font-weight:600;line-height:1.3;color:${C.text}">${args.date}</p>
<p style="margin:0 0 0;font-family:${FONT};font-size:16px;color:${C.textBody}">${args.time}</p>
${args.meta ? `<p style="margin:12px 0 0;padding-top:12px;border-top:1px solid ${C.border};font-family:${FONT};font-size:13px;color:${C.textMute}">${args.meta}</p>` : ''}
</td></tr>
</table>`
}

/**
 * Action-Buttons mit echtem TD-bgcolor (Outlook-safe, ohne VML).
 *
 * Wie das Styling angepasst werden kann:
 * - PADDING_V / PADDING_H = Polster innen (Höhe / Breite vom Text-Rand)
 * - SPACING = Abstand zwischen Buttons
 * - BORDER_PX = Border-Stärke
 * - FONT_SIZE / FONT_WEIGHT = Text-Stil
 * - C.accent / C.accentDark / C.bg = Farben (oben in der Datei änderbar)
 *
 * Primary: gefüllt (Akzent-BG, weißer Text).
 * Secondary: weißer BG, Akzent-Border, Akzent-Text.
 */
function buttonRow(
  buttons: { href: string; label: string; primary?: boolean }[],
): string {
  if (buttons.length === 0) return ''

  // Stelschrauben für das Button-Styling:
  const PADDING_V = '14px'
  const PADDING_H = '24px'
  const SPACING = '14px'
  const BORDER_PX = '2px'
  const FONT_SIZE = '14px'
  const FONT_WEIGHT = '600'
  const RADIUS = '6px'

  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 8px;border-collapse:separate">
<tr>
${buttons
  .map((b, i) => {
    const isPrimary = b.primary !== false
    const bgColor = isPrimary ? C.accent : '#ffffff'
    const textColor = isPrimary ? '#ffffff' : C.accentDark
    const padR = i < buttons.length - 1 ? `padding-right:${SPACING};` : ''
    return `<td style="${padR}font-family:${FONT}" valign="top">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate">
<tr>
<td bgcolor="${bgColor}" align="center" style="background-color:${bgColor};border:${BORDER_PX} solid ${C.accent};border-radius:${RADIUS};padding:${PADDING_V} ${PADDING_H};mso-padding-alt:${PADDING_V} ${PADDING_H} ${PADDING_V} ${PADDING_H}">
<a href="${b.href}" style="display:inline-block;font-family:${FONT};font-size:${FONT_SIZE};font-weight:${FONT_WEIGHT};color:${textColor};text-decoration:none;line-height:1;white-space:nowrap;mso-line-height-rule:exactly">${b.label}</a>
</td>
</tr>
</table>
</td>`
  })
  .join('')}
</tr>
</table>`
}

// ============================================================
// TEMPLATES
// ============================================================

function leadNotificationTemplate(lead: Lead, refNumber: string): string {
  const whatsappReply = lead.phone
    ? `https://wa.me/${lead.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hallo ${lead.name.split(' ')[0]}, danke für Ihre Anfrage (Ref. #${refNumber}). `)}`
    : null

  const buttons: { href: string; label: string; primary?: boolean }[] = []
  if (lead.phone) buttons.push({ href: `tel:${escape(lead.phone)}`, label: 'Anrufen' })
  buttons.push({
    href: `mailto:${escape(lead.email)}?subject=${encodeURIComponent(`Re: Ihre Anfrage (#${refNumber})`)}`,
    label: 'E-Mail antworten',
    primary: false,
  })
  if (whatsappReply)
    buttons.push({ href: whatsappReply, label: 'WhatsApp', primary: false })

  const eingangText = `Eingegangen am ${new Date().toLocaleString('de-AT', { timeZone: 'Europe/Vienna', dateStyle: 'medium', timeStyle: 'short' })}`

  const content = `
${h1('Neue Anfrage')}
${refLine(refNumber)}

${sectionLabel('Kontakt')}
${infoBox([
  { label: 'Name', value: escape(lead.name) },
  {
    label: 'E-Mail',
    value: `<a href="mailto:${escape(lead.email)}" style="color:${C.accentDark};text-decoration:none">${escape(lead.email)}</a>`,
  },
  ...(lead.phone
    ? [
        {
          label: 'Telefon',
          value: `<a href="tel:${escape(lead.phone)}" style="color:${C.accentDark};text-decoration:none">${escape(lead.phone)}</a>`,
        },
      ]
    : []),
  ...(lead.company
    ? [{ label: 'Firma', value: escape(lead.company) }]
    : []),
  { label: 'Thema', value: TOPIC_LABEL[lead.topic] },
])}

${sectionLabel('Nachricht')}
${quoteBox(escape(lead.message))}

${sectionLabel('Schnell antworten')}
${buttonRow(buttons)}

<p style="margin:32px 0 0;font-family:${FONT};font-size:12px;color:${C.textDim}">${eingangText}</p>
`
  return emailShell(content, {
    preheader: `Neue Anfrage von ${lead.name} – ${TOPIC_LABEL[lead.topic]}`,
  })
}

function leadCopyTemplate(lead: Lead, refNumber: string): string {
  const firstName = escape(lead.name.split(' ')[0] ?? lead.name)
  const content = `
${h1(`Hallo ${firstName},`)}
${refLine(refNumber)}

${paragraph(`anbei die Kopie Ihrer Anfrage bei Webdesign Alcor. Ich melde mich <strong>binnen 24 Stunden</strong> persönlich bei Ihnen zurück, üblicherweise deutlich schneller.`)}

${sectionLabel('Ihre Angaben')}
${infoBox([
  { label: 'Name', value: escape(lead.name) },
  ...(lead.phone
    ? [{ label: 'Telefon', value: escape(lead.phone) }]
    : []),
  ...(lead.company
    ? [{ label: 'Firma', value: escape(lead.company) }]
    : []),
  { label: 'Thema', value: TOPIC_LABEL[lead.topic] },
])}

${sectionLabel('Ihre Nachricht')}
${quoteBox(escape(lead.message))}

${sectionLabel('Falls es eilt')}
${smallParagraph(`Telefon: <a href="tel:${SITE.contact.phoneRaw}" style="color:${C.accentDark};text-decoration:none">${SITE.contact.phoneFormatted}</a> &nbsp;·&nbsp; WhatsApp: <a href="${SITE.contact.whatsapp}" style="color:${C.accentDark};text-decoration:none">direkt schreiben</a>`)}

${divider()}

<p style="margin:0;font-family:${FONT};font-size:15px;color:${C.textBody}">Bis bald,<br><strong style="color:${C.text}">Robert Alchimowicz</strong></p>
`
  return emailShell(content, {
    preheader: `Kopie Ihrer Anfrage – Ref. #${refNumber}`,
  })
}

function bookingPendingTemplate(
  booking: BookingMailData,
  slot: { date: string; time: string },
): string {
  const adminUrl = `${siteUrl}/admin`
  const whatsappReply = booking.phone
    ? `https://wa.me/${booking.phone.replace(/\D/g, '')}`
    : null

  const buttons: { href: string; label: string; primary?: boolean }[] = [
    { href: adminUrl, label: 'Im Admin öffnen' },
  ]
  if (booking.phone)
    buttons.push({
      href: `tel:${escape(booking.phone)}`,
      label: 'Anrufen',
      primary: false,
    })
  if (whatsappReply)
    buttons.push({ href: whatsappReply, label: 'WhatsApp', primary: false })

  const channelText =
    booking.channel === 'on-site-external' && booking.externalAddress
      ? `${CHANNEL_LABEL[booking.channel]} · ${escape(booking.externalAddress)}`
      : CHANNEL_LABEL[booking.channel]

  const content = `
${h1('Neue Anfrage zu prüfen')}
${refLine(booking.refNumber)}

${paragraph(`<strong>Status:</strong> wartet auf Bestätigung. Der Slot ist bis dahin für andere Kunden blockiert.`)}

${sectionLabel('Wunschtermin')}
${appointmentBox({ date: slot.date, time: slot.time, meta: channelText })}

${sectionLabel('Kontakt')}
${infoBox([
  { label: 'Name', value: escape(booking.name) },
  {
    label: 'E-Mail',
    value: `<a href="mailto:${escape(booking.email)}" style="color:${C.accentDark};text-decoration:none">${escape(booking.email)}</a>`,
  },
  {
    label: 'Telefon',
    value: `<a href="tel:${escape(booking.phone)}" style="color:${C.accentDark};text-decoration:none">${escape(booking.phone)}</a>`,
  },
  { label: 'Anliegen', value: escape(booking.topic) },
])}

${
  booking.message
    ? `${sectionLabel('Vorab-Notizen')}${quoteBox(escape(booking.message))}`
    : ''
}

${sectionLabel('Aktion')}
${buttonRow(buttons)}
${smallParagraph(`Im Admin-Bereich kannst du den Termin bestätigen oder ablehnen. Erst nach deiner Bestätigung erhält der Kunde eine Bestätigungs-Mail mit Kalender-Eintrag.`)}

<p style="margin:24px 0 0;font-family:${FONT};font-size:12px;color:${C.textDim}">Eingegangen am ${new Date().toLocaleString('de-AT', { timeZone: 'Europe/Vienna', dateStyle: 'medium', timeStyle: 'short' })}</p>
`
  return emailShell(content, {
    preheader: `Anfrage von ${booking.name} – ${slot.date}, ${slot.time}`,
  })
}

function bookingConfirmedTemplate(
  booking: BookingMailData,
  slot: { date: string; time: string },
): string {
  const firstName = escape(booking.name.split(' ')[0] ?? booking.name)

  let channelDetail = ''
  if (booking.channel === 'phone') {
    channelDetail = paragraph(
      `Robert ruft Sie zur vereinbarten Zeit unter <strong>${escape(booking.phone)}</strong> an.`,
    )
  } else if (booking.channel === 'on-site-office') {
    channelDetail = paragraph(
      `Treffpunkt: <strong>${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city}</strong> (${SITE.address.district}).`,
    )
  } else if (booking.channel === 'on-site-external') {
    channelDetail = paragraph(
      `Robert kommt zu Ihnen unter:<br><strong>${escape(booking.externalAddress)}</strong>`,
    )
  }

  const buttons: { href: string; label: string; primary?: boolean }[] = [
    { href: `tel:${SITE.contact.phoneRaw}`, label: 'Anrufen' },
    {
      href: `mailto:${SITE.contact.email}?subject=${encodeURIComponent(`Termin #${booking.refNumber}`)}`,
      label: 'E-Mail',
      primary: false,
    },
  ]

  const content = `
${h1(`Termin bestätigt, ${firstName}.`)}
${refLine(booking.refNumber)}

${paragraph('Ich habe Ihren Termin in den Kalender eingetragen und freue mich auf das Gespräch.')}

${appointmentBox({
  date: slot.date,
  time: slot.time,
  meta: CHANNEL_LABEL[booking.channel],
})}

${channelDetail}

${smallParagraph('Pro Termin reserviere ich eine Stunde. Falls das Gespräch kürzer wird, ist auch alles gut – die Zeit gehört Ihnen.')}

${smallParagraph('Im Anhang finden Sie eine Kalender-Datei (.ics) für Apple Calendar, Outlook, Google Calendar oder Thunderbird.')}

${
  booking.message
    ? `${sectionLabel('Ihr Anliegen')}<p style="margin:0 0 8px;font-family:${FONT};font-size:14px;font-weight:500;color:${C.text}">${escape(booking.topic)}</p>${quoteBox(escape(booking.message))}`
    : ''
}

${sectionLabel('Sie können nicht kommen?')}
${smallParagraph(`<strong style="color:${C.text}">Verschieben:</strong> Antworten Sie auf diese E-Mail mit zwei oder drei Wunsch-Terminen, oder buchen Sie direkt einen neuen unter <a href="${siteUrl}/termin" style="color:${C.accentDark};text-decoration:none">${siteUrl.replace(/https?:\/\//, '')}/termin</a>.`)}
${smallParagraph(`<strong style="color:${C.text}">Absagen:</strong> Kurze Mail oder Anruf reicht – nennen Sie Ihre Referenznummer <strong style="color:${C.text}">#${booking.refNumber}</strong>. Bitte möglichst <strong>spätestens 24 Stunden vorher</strong>.`)}

${sectionLabel('Kontakt')}
${buttonRow(buttons)}

${divider()}

<p style="margin:0;font-family:${FONT};font-size:15px;color:${C.textBody}">Bis bald,<br><strong style="color:${C.text}">Robert Alchimowicz</strong></p>
`
  return emailShell(content, {
    preheader: `Termin bestätigt: ${slot.date}, ${slot.time}`,
  })
}

function bookingDeclinedTemplate(
  args: {
    refNumber: string
    name: string
    topic: string
    reason: string
  },
  slot: { date: string; time: string },
): string {
  const firstName = escape(args.name.split(' ')[0] ?? args.name)
  const buttons: { href: string; label: string; primary?: boolean }[] = [
    { href: `${siteUrl}/termin`, label: 'Anderen Termin wählen' },
    {
      href: `mailto:${SITE.contact.email}`,
      label: 'E-Mail schreiben',
      primary: false,
    },
  ]

  const content = `
${h1(`Hallo ${firstName},`)}
${refLine(args.refNumber)}

${paragraph(`vielen Dank für Ihre Anfrage. Leider kann ich den Wunschtermin am <strong>${slot.date}, ${slot.time}</strong> nicht annehmen.`)}

${
  args.reason
    ? `${sectionLabel('Begründung')}${quoteBox(escape(args.reason))}`
    : ''
}

${paragraph('Ich freue mich aber, wenn Sie einen anderen Termin buchen möchten:')}

${buttonRow(buttons)}

${smallParagraph(`Oder direkt: <a href="tel:${SITE.contact.phoneRaw}" style="color:${C.accentDark};text-decoration:none">${SITE.contact.phoneFormatted}</a> &nbsp;·&nbsp; <a href="mailto:${SITE.contact.email}" style="color:${C.accentDark};text-decoration:none">${SITE.contact.email}</a>`)}

${divider()}

<p style="margin:0;font-family:${FONT};font-size:15px;color:${C.textBody}">Beste Grüße,<br><strong style="color:${C.text}">Robert Alchimowicz</strong></p>
`
  return emailShell(content, {
    preheader: `Termin nicht möglich – andere Optionen`,
  })
}

// ============================================================
// HELPERS
// ============================================================

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
