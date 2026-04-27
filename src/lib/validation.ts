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
  topic: z.enum(['new-website', 'relaunch', 'seo', 'other'], {
    message: 'Bitte ein Thema auswählen',
  }),
  message: z
    .string()
    .min(10, 'Bitte beschreiben Sie Ihr Anliegen kurz (mind. 10 Zeichen)')
    .max(4000, 'Nachricht ist zu lang'),
  // Honeypot - muss leer sein
  website: z.string().max(0).optional().or(z.literal('')),
})

export type LeadInput = z.infer<typeof leadSchema>
