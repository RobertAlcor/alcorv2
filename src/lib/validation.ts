import { z } from 'zod'

export const leadSchema = z.object({
  name: z
    .string()
    .min(2, 'Name muss mindestens 2 Zeichen haben')
    .max(120, 'Name ist zu lang'),
  email: z
    .string()
    .email('Bitte eine gültige E-Mail-Adresse eingeben')
    .max(254),
  phone: z
    .string()
    .max(40)
    .optional()
    .or(z.literal('').transform(() => undefined)),
  company: z
    .string()
    .max(160)
    .optional()
    .or(z.literal('').transform(() => undefined)),
  /**
   * Topic — erweitert um 'general' (Default) und 'pricing' (für Preisinformation
   * z.B. wenn Kunde aus /preise kommt).
   */
  topic: z.enum(
    ['general', 'pricing', 'relaunch', 'new-website', 'seo', 'other'],
    { message: 'Bitte ein Thema auswählen' },
  ),
  message: z
    .string()
    .min(10, 'Bitte beschreiben Sie Ihr Anliegen kurz (mind. 10 Zeichen)')
    .max(4000, 'Nachricht ist zu lang'),
  /**
   * Paket-Interesse — gesetzt wenn Kunde aus /preise auf einen Paket-Button
   * geklickt hat. Optional, kann auch im Form selbst gewählt werden.
   */
  package_interest: z
    .enum(['starter', 'business', 'premium', 'unsure'])
    .optional()
    .or(z.literal('').transform(() => undefined)),
  /**
   * Bestehende Website — optional. Validierung als URL.
   * Leerstring wird zu undefined gemappt.
   */
  existing_website: z
    .string()
    .max(500, 'URL ist zu lang')
    .url('Bitte eine gültige URL eingeben (z.B. https://example.at)')
    .optional()
    .or(z.literal('').transform(() => undefined)),
  // Honeypot - muss leer sein
  website: z.string().max(0).optional().or(z.literal('')),
})

export type LeadInput = z.infer<typeof leadSchema>

/**
 * Topic-Labels für UI (Form-Dropdown, Email-Template, Admin-Panel).
 * Quelle der Wahrheit für die Anzeige.
 */
export const TOPIC_LABELS: Record<LeadInput['topic'], string> = {
  general: 'Allgemeine Anfrage',
  pricing: 'Preisinformation',
  relaunch: 'Bestehende Website überarbeiten',
  'new-website': 'Neue Website',
  seo: 'SEO / Sichtbarkeit',
  other: 'Sonstiges',
}

/**
 * Paket-Labels für UI.
 */
export const PACKAGE_LABELS: Record<NonNullable<LeadInput['package_interest']>, string> = {
  starter: 'Starter',
  business: 'Business',
  premium: 'Premium',
  unsure: 'Weiß noch nicht',
}
