import { getStoredConsent } from './consent'

type LeadForm = 'contact-form' | 'project-application-form' | 'booking-form'

const trackedReferences = new Set<string>()

export function trackConfirmedLead(formId: LeadForm, response: unknown): void {
  if (
    process.env.NODE_ENV !== 'production' ||
    typeof window === 'undefined' ||
    !response ||
    typeof response !== 'object'
  ) return

  const result = response as { ok?: unknown; refNumber?: unknown }
  // Spamfilter antworten ebenfalls mit HTTP 200, erzeugen aber keine Anfrage.
  if (
    result.ok !== true ||
    typeof result.refNumber !== 'string' ||
    !/^\d{6}-[A-F0-9]{4}$/.test(result.refNumber) ||
    getStoredConsent()?.state.statistics !== true ||
    !window.gtag
  ) return

  const key = `${formId}:${result.refNumber}`
  if (trackedReferences.has(key)) return

  try {
    window.gtag('event', 'generate_lead', {
      form_id: formId,
      lead_source: formId,
    })
    trackedReferences.add(key)
  } catch {
    // Die Anfrage bleibt auch bei blockierter Statistik erfolgreich.
  }
}
