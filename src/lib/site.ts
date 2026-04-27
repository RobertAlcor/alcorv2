export const SITE = {
  name: 'Webdesign Alcor',
  brand: 'Alcor Group',
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
  },
} as const

export const NAV = {
  main: [
    { label: 'Leistungen', href: '/leistungen' },
    { label: 'Referenzen', href: '/referenzen' },
    { label: 'Über mich', href: '/ueber-mich' },
    { label: 'Blog', href: '/blog' },
    { label: 'Kontakt', href: '/kontakt' },
  ],
  legal: [
    { label: 'Impressum', href: '/impressum' },
    { label: 'Datenschutz', href: '/datenschutz' },
  ],
} as const

export type NavItem = (typeof NAV.main)[number]
