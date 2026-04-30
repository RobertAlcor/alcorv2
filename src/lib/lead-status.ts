export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'won' | 'lost'

export const LEAD_STATUS_ORDER: LeadStatus[] = [
  'new',
  'contacted',
  'qualified',
  'won',
  'lost',
]

export const LEAD_STATUS_LABEL: Record<LeadStatus, string> = {
  new: 'Neu',
  contacted: 'Kontaktiert',
  qualified: 'Qualifiziert',
  won: 'Kunde',
  lost: 'Verloren',
}

export const LEAD_STATUS_COLOR: Record<
  LeadStatus,
  { bg: string; text: string; border: string }
> = {
  new: {
    bg: 'bg-signal/15',
    text: 'text-signal-2',
    border: 'border-signal/30',
  },
  contacted: {
    bg: 'bg-blue-500/15',
    text: 'text-blue-400',
    border: 'border-blue-500/30',
  },
  qualified: {
    bg: 'bg-purple-500/15',
    text: 'text-purple-400',
    border: 'border-purple-500/30',
  },
  won: {
    bg: 'bg-success/15',
    text: 'text-success',
    border: 'border-success/30',
  },
  lost: {
    bg: 'bg-paper-mute/10',
    text: 'text-paper-mute',
    border: 'border-paper-mute/20',
  },
}

export type LeadPackageInterest =
  | 'starter'
  | 'business'
  | 'premium'
  | 'unsure'

export type AdminLead = {
  id: string
  ref_number: string | null
  name: string
  email: string
  phone: string | null
  company: string | null
  topic: 'general' | 'pricing' | 'new-website' | 'relaunch' | 'seo' | 'other'
  message: string
  source: string | null
  status: LeadStatus
  admin_notes: string | null
  last_contact_at: string | null
  created_at: string
  updated_at: string
  // Felder aus v23-Migration
  package_interest: LeadPackageInterest | null
  existing_website: string | null
}

export const LEAD_TOPIC_LABEL: Record<AdminLead['topic'], string> = {
  general: 'Allgemeine Anfrage',
  pricing: 'Preisinformation',
  'new-website': 'Neue Website',
  relaunch: 'Relaunch',
  seo: 'SEO-Beratung',
  other: 'Sonstiges',
}

export const LEAD_PACKAGE_LABEL: Record<LeadPackageInterest, string> = {
  starter: 'Starter',
  business: 'Business',
  premium: 'Premium',
  unsure: 'Weiß noch nicht',
}
