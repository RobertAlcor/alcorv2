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

export async function sendLeadNotification(lead: Lead) {
  return resend.emails.send({
    from: `Webdesign Alcor <${fromEmail}>`,
    to: notifyEmail,
    replyTo: lead.email,
    subject: `Neue Anfrage: ${TOPIC_LABEL[lead.topic]} - ${lead.name}`,
    html: notificationTemplate(lead),
  })
}

export async function sendLeadAutoReply(lead: Lead) {
  return resend.emails.send({
    from: `Robert Alchimowicz <${fromEmail}>`,
    to: lead.email,
    subject: 'Ihre Anfrage bei Webdesign Alcor',
    html: autoReplyTemplate(lead),
  })
}

function notificationTemplate(lead: Lead): string {
  return `
    <!DOCTYPE html>
    <html><body style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:24px;background:#fdf8f3;color:#0f172a">
      <h2 style="font-family:Georgia,serif;color:#1a0d10;border-bottom:2px solid #d4a574;padding-bottom:8px">Neue Anfrage</h2>
      <table style="width:100%;border-collapse:collapse;margin:24px 0">
        <tr><td style="padding:8px 0;color:#9a8a78;width:120px">Name</td><td style="padding:8px 0;font-weight:500">${escape(lead.name)}</td></tr>
        <tr><td style="padding:8px 0;color:#9a8a78">E-Mail</td><td style="padding:8px 0"><a href="mailto:${escape(lead.email)}" style="color:#d4a574">${escape(lead.email)}</a></td></tr>
        ${lead.phone ? `<tr><td style="padding:8px 0;color:#9a8a78">Telefon</td><td style="padding:8px 0"><a href="tel:${escape(lead.phone)}" style="color:#d4a574">${escape(lead.phone)}</a></td></tr>` : ''}
        ${lead.company ? `<tr><td style="padding:8px 0;color:#9a8a78">Firma</td><td style="padding:8px 0">${escape(lead.company)}</td></tr>` : ''}
        <tr><td style="padding:8px 0;color:#9a8a78">Thema</td><td style="padding:8px 0;font-weight:500">${TOPIC_LABEL[lead.topic]}</td></tr>
        <tr><td style="padding:8px 0;color:#9a8a78">Quelle</td><td style="padding:8px 0;font-size:13px;color:#9a8a78">${escape(lead.source)}</td></tr>
      </table>
      <div style="background:white;border-left:3px solid #d4a574;padding:16px 20px;margin:24px 0">
        <div style="font-size:12px;color:#9a8a78;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:8px">Nachricht</div>
        <div style="white-space:pre-wrap;line-height:1.6">${escape(lead.message)}</div>
      </div>
      <p style="font-size:13px;color:#9a8a78;margin-top:32px">Eingegangen ${new Date().toLocaleString('de-AT', { timeZone: 'Europe/Vienna' })}</p>
    </body></html>
  `
}

function autoReplyTemplate(lead: Lead): string {
  return `
    <!DOCTYPE html>
    <html><body style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:24px;background:#fdf8f3;color:#0f172a;line-height:1.6">
      <h2 style="font-family:Georgia,serif;color:#1a0d10;font-weight:400;font-size:28px">Danke, ${escape(lead.name.split(' ')[0] ?? lead.name)}.</h2>
      <p>Ihre Anfrage ist bei mir eingegangen. Ich melde mich <strong>binnen 24 Stunden</strong> bei Ihnen zurück, üblicherweise schneller.</p>
      <div style="background:white;padding:16px 20px;border-radius:4px;margin:24px 0;border:1px solid #e2e8f0">
        <div style="font-size:12px;color:#9a8a78;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:8px">Ihre Nachricht</div>
        <div style="white-space:pre-wrap">${escape(lead.message)}</div>
      </div>
      <p>Falls es eilt, erreichen Sie mich auch direkt:</p>
      <ul style="padding-left:20px">
        <li>Telefon: <a href="tel:${SITE.contact.phoneRaw}" style="color:#d4a574">${SITE.contact.phoneFormatted}</a></li>
        <li>WhatsApp: <a href="${SITE.contact.whatsapp}" style="color:#d4a574">direkt schreiben</a></li>
      </ul>
      <p style="margin-top:32px">Bis bald,<br><strong>Robert Alchimowicz</strong><br><span style="color:#9a8a78;font-size:13px">${SITE.name} · ${SITE.address.city}</span></p>
    </body></html>
  `
}

function escape(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[c] ?? c)
}
