export const SITE = {
  name: 'Webdesign Alcor',
  brand: 'ALCOR Group',
  domain: 'webdesign-alcor.at',
  url: 'https://www.webdesign-alcor.at',
  tagline: 'Inhabergeführte Webentwicklung aus Wien',

  founder: {
    name: 'Robert Alchimowicz',
    role: 'Webentwickler & SEO-Spezialist',
    yearsActive: 10,
    foundedIn: 2014,
  },

  contact: {
    email: 'office@webdesign-alcor.at',
    phone: '+43 664 99 124 999',
    phoneFormatted: '0664 99 124 999',
    phoneRaw: '+4366499124999',
    whatsapp: 'https://wa.me/4366499124999',
    whatsappPrefilled:
      'https://wa.me/4366499124999?text=Hallo%20Robert%2C%20ich%20interessiere%20mich%20f%C3%BCr%20Ihre%20Webdesign-Leistungen.',
  },

  address: {
    street: 'Berresgasse 11/3/1',
    postalCode: '1220',
    city: 'Wien',
    district: '22. Bezirk',
    country: 'AT',
    countryName: 'Österreich',
    geo: { lat: 48.2454, lng: 16.4847 },
  },

  social: {
    linkedin: '',
    xing: '',
  },

  pricing: {
    starter: 599,
    business: 'auf Anfrage',
    premium: 'auf Anfrage',
    currency: 'EUR',
    deliveryDays: 7,
    hostingYearly: 99,
    hostingIncluded: 'Hosting, kleinere Updates, Inhaltspflege bis 15 Min/Vorgang',
    hourlyRate: 85,
    hourlyRateUnit: '€/h netto',
  },
} as const

export const SISTER_SITES = [
  {
    name: 'website-erstellen.wien',
    url: 'https://website-erstellen.wien',
    role: 'SEO-Funnel & Pricing-Vergleich',
  },
  {
    name: 'psychologen-webdesign.wien',
    url: 'https://psychologen-webdesign.wien',
    role: 'Niche: Praxis-Websites für Therapeuten',
  },
  {
    name: 'webdesign-liesing.wien',
    url: 'https://webdesign-liesing.wien',
    role: 'Niche: 23. Wiener Bezirk',
  },
] as const

/**
 * Hauptnavigation - Reihenfolge folgt User-Journey:
 * Was tue ich → Beweise → Kosten → Wer bin ich → Inhalte → Aktion → Kontakt
 */
export const NAV = {
  main: [
    { label: 'Leistungen', href: '/leistungen' },
    { label: 'Referenzen', href: '/referenzen' },
    { label: 'Preise', href: '/preise' },
    { label: 'Über mich', href: '/ueber-mich' },
    { label: 'Blog', href: '/blog' },
    { label: 'Termin', href: '/termin' },
    { label: 'Kontakt', href: '/kontakt' },
  ],
  legal: [
    { label: 'Impressum', href: '/impressum' },
    { label: 'Datenschutz', href: '/datenschutz' },
  ],
} as const

export type NavItem = (typeof NAV.main)[number]
