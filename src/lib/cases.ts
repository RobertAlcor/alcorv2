export type Case = {
  slug: string
  client: string
  initials: string
  industry: string
  url: string
  liveUrl: string
  year: number
  brandColor: string
  brandColorAccent: string
  shortDescription: string
  tags: string[]
  task: string
  solution: string
  results: { label: string; value: string }[]
  metaTitle: string
  metaDescription: string
}

export const CASES: Case[] = [
  {
    slug: 'schmerzfrei-wien',
    client: 'schmerzfrei.wien',
    initials: 'SW',
    industry: 'Gesundheit · Therapie',
    url: '/referenzen/schmerzfrei-wien',
    liveUrl: 'https://schmerzfrei.wien',
    year: 2026,
    brandColor: '#0F766E',
    brandColorAccent: '#5EEAD4',
    shortDescription:
      'Praxis-Website für Schmerzbehandlung mit Online-Terminbuchung und Patienten-Datenbank.',
    tags: ['Next.js', 'Supabase', 'Online-Booking'],
    task: 'Eine Schmerz-Therapie-Praxis brauchte eine vertrauensbildende Website mit Online-Terminbuchung. Die alte Lösung war ein einfaches WordPress-Theme ohne Booking-Funktion.',
    solution:
      'Komplette Neuentwicklung in Next.js mit Supabase-Backend für Termin-Storage. Eigene Booking-Logik mit Bestätigungsmails über Resend. Beruhigendes Farbschema, klare Informationsarchitektur, schnelle Ladezeit.',
    results: [
      { label: 'PageSpeed Score', value: '98' },
      { label: 'Ladezeit', value: '< 1s' },
      { label: 'Buchungs-Conversion', value: '+340%' },
    ],
    metaTitle: 'Case Study: schmerzfrei.wien – Praxis-Website mit Online-Booking',
    metaDescription:
      'Wie eine Schmerztherapie-Praxis mit handgeschriebener Next.js-Website ihre Online-Buchungen verdreifachte.',
  },
  {
    slug: 'buero-reinigung',
    client: 'Büroreinigung Wien',
    initials: 'BR',
    industry: 'Dienstleistung · Reinigung',
    url: '/referenzen/buero-reinigung',
    liveUrl: 'https://reinigung.webdesign-alcor.at',
    year: 2025,
    brandColor: '#1E40AF',
    brandColorAccent: '#60A5FA',
    shortDescription:
      'Komplettes Management-System für Büroreinigung: CRM, Personalplanung, Besichtigungs-App, Mitarbeiter-Check-in.',
    tags: ['PHP', 'PWA', 'Custom CRM'],
    task: 'Eine Reinigungsfirma brauchte mehr als eine Website: ein vollständiges digitales Backoffice für Kunden-Verwaltung, Personal-Disposition, Lohnabrechnung mit Kollektivvertrag und mobile Apps für Besichtigungen und Check-in.',
    solution:
      'Eigene Plattform mit drei Komponenten: Admin-Dashboard für Bürobetrieb, Tablet-PWA für Vor-Ort-Besichtigungen mit Live-Pricing und Foto-Capture, Mitarbeiter-App für GPS-Check-in. Alles handgeschrieben, DSGVO-konform.',
    results: [
      { label: 'Verwaltungsaufwand', value: '−65%' },
      { label: 'Angebots-Zeit', value: '15 min statt 2h' },
      { label: 'Software-Kosten/Monat', value: '€ 0' },
    ],
    metaTitle: 'Case Study: Büroreinigung Wien – Custom Management-Plattform',
    metaDescription:
      'Vollständiges Backoffice-System für eine Wiener Reinigungsfirma. CRM, Personalplanung, Besichtigungs-App und mobile Check-in.',
  },
  {
    slug: 'psychologen-webdesign',
    client: 'psychologen-webdesign.at',
    initials: 'PW',
    industry: 'B2B · Nischen-Webdesign',
    url: '/referenzen/psychologen-webdesign',
    liveUrl: 'https://psychologen-webdesign.at',
    year: 2026,
    brandColor: '#65A30D',
    brandColorAccent: '#BEF264',
    shortDescription:
      'Spezialisierte Landingpage für Psychologen und Psychotherapeuten in Wien mit Lead-Funnel.',
    tags: ['Next.js', 'TypeScript', 'Lead-Funnel'],
    task: 'Eine Spezialisierungs-Marke für Psychologen-Websites brauchte eine eigene Landingpage. Ziel: Vertrauen aufbauen, Berufsordnung respektieren, qualifizierte Anfragen generieren.',
    solution:
      'Therapeutisch-warme Farbpalette in Sage und Cream. Klare Informationsarchitektur. Lead-Formular mit Supabase-Storage und Resend-Notifications. Vollständige SEO-Optimierung mit allen 23 Wiener Bezirken im Footer für Local SEO.',
    results: [
      { label: 'Lighthouse Score', value: '100/100' },
      { label: 'Anfragen pro Monat', value: '12+' },
      { label: 'Lokale Rankings', value: 'Top 3' },
    ],
    metaTitle: 'Case Study: psychologen-webdesign.at – Nischen-Landingpage',
    metaDescription:
      'Spezialisierte Landingpage für Psychologen und Psychotherapeuten in Wien. Vollständige SEO-Optimierung und Lead-Funnel.',
  },
]

export function getCaseBySlug(slug: string): Case | undefined {
  return CASES.find((c) => c.slug === slug)
}
