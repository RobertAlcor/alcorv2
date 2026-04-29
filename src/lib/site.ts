export const SITE = {
  name: 'Webdesign Alcor',
  brand: 'ALCOR Group',
  domain: 'webdesign-alcor.at',
  url: 'https://webdesign-alcor.at',
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
    hostingIncluded:
      'Hosting, kleinere Updates, Inhaltspflege bis 15 Min/Vorgang',
    hourlyRate: 85,
    hourlyRateUnit: '€/h netto',
  },
  /**
   * Öffnungszeiten (für LocalBusiness Schema und Mikrodaten).
   */
  openingHours: {
    weekdays: { open: '09:00', close: '18:00' }, // Mo-Fr
    weekend: null, // Sa/So geschlossen
  },
  /**
   * Alle 23 Wiener Bezirke - für SEO-Reichweite (LocalBusiness areaServed,
   * Footer-Erwähnung, Schema.org). Reihenfolge nach Bezirksnummer.
   */
  viennaDistricts: [
    { num: 1, name: 'Innere Stadt', plz: '1010' },
    { num: 2, name: 'Leopoldstadt', plz: '1020' },
    { num: 3, name: 'Landstraße', plz: '1030' },
    { num: 4, name: 'Wieden', plz: '1040' },
    { num: 5, name: 'Margareten', plz: '1050' },
    { num: 6, name: 'Mariahilf', plz: '1060' },
    { num: 7, name: 'Neubau', plz: '1070' },
    { num: 8, name: 'Josefstadt', plz: '1080' },
    { num: 9, name: 'Alsergrund', plz: '1090' },
    { num: 10, name: 'Favoriten', plz: '1100' },
    { num: 11, name: 'Simmering', plz: '1110' },
    { num: 12, name: 'Meidling', plz: '1120' },
    { num: 13, name: 'Hietzing', plz: '1130' },
    { num: 14, name: 'Penzing', plz: '1140' },
    { num: 15, name: 'Rudolfsheim-Fünfhaus', plz: '1150' },
    { num: 16, name: 'Ottakring', plz: '1160' },
    { num: 17, name: 'Hernals', plz: '1170' },
    { num: 18, name: 'Währing', plz: '1180' },
    { num: 19, name: 'Döbling', plz: '1190' },
    { num: 20, name: 'Brigittenau', plz: '1200' },
    { num: 21, name: 'Floridsdorf', plz: '1210' },
    { num: 22, name: 'Donaustadt', plz: '1220' },
    { num: 23, name: 'Liesing', plz: '1230' },
  ],
  /**
   * Primäre SEO-Keywords - werden in metadata.keywords und
   * für Schema.org genutzt.
   */
  seo: {
    primaryKeywords: [
      'Webdesign Wien',
      'Webagentur Wien',
      'Website erstellen Wien',
      'Webentwicklung Wien',
      'SEO Wien',
    ],
    secondaryKeywords: [
      'Webdesigner Wien',
      'Webseiten erstellen Wien',
      'Homepage erstellen Wien',
      'Webdesign 1220',
      'Webdesign Donaustadt',
      'Programmierer Wien',
      'Webdesign ohne WordPress',
      'handgeschriebene Websites',
      'Next.js Entwickler Wien',
    ],
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
