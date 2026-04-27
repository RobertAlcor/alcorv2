export type Service = {
  slug: string
  title: string
  shortTitle: string
  tagline: string
  description: string
  href: string
  features: string[]
  metaTitle: string
  metaDescription: string
  intro: string
  process: { step: string; description: string }[]
  forWhom: string[]
  notForWhom: string[]
}

export const SERVICES: Service[] = [
  {
    slug: 'website-erstellung',
    title: 'Website-Erstellung',
    shortTitle: 'Neue Website',
    tagline: 'Handgeschrieben in 7 Tagen',
    description:
      'Eine neue Website von Grund auf. Strategie, Design, handgeschriebener Code. Lieferung in einer Woche, ab 599 Euro.',
    href: '/leistungen/website-erstellung',
    features: [
      'Bis zu 5 Seiten im Starter-Paket',
      'Mobile zuerst, Desktop perfekt',
      'Technisches SEO inkludiert',
      'DSGVO-konform out of the box',
      'Lieferung in 7 Tagen',
    ],
    metaTitle: 'Website erstellen lassen in Wien',
    metaDescription:
      'Handgeschriebene Website-Erstellung aus Wien. Ohne WordPress, ohne Plugin-Chaos. Lieferung in 7 Tagen ab 599 Euro.',
    intro:
      'Sie brauchen eine neue Website. Schnell, sicher, ohne Wartungsalbtraum. Genau das mache ich seit 2002 – und ich mache es selbst, von der ersten Strategie-Skizze bis zum letzten Deploy.',
    process: [
      {
        step: 'Erstgespräch',
        description:
          'Wir besprechen, was Sie brauchen. Ziele, Budget, Inhalte. Kostenlos und unverbindlich.',
      },
      {
        step: 'Konzept und Angebot',
        description:
          'Sie bekommen einen schriftlichen Vorschlag mit Seitenstruktur, Design-Richtung und Festpreis.',
      },
      {
        step: 'Bau und Abstimmung',
        description:
          'Ich baue. Sie sehen den Live-Stand jederzeit. Anpassungen klären wir direkt.',
      },
      {
        step: 'Launch und Übergabe',
        description:
          'Live-Schaltung, Suchmaschinen-Anmeldung, Übergabe aller Zugänge. Code gehört Ihnen.',
      },
    ],
    forWhom: [
      'Wiener KMU mit klarer Vorstellung',
      'Selbständige, die professionell auftreten wollen',
      'Praxen, Kanzleien, Handwerk',
      'Wer eine Website will, die in 5 Jahren noch funktioniert',
    ],
    notForWhom: [
      'E-Commerce mit 1000+ Produkten',
      'Wer einen WordPress-Adminbereich erwartet',
      'Wer mit dem billigsten Angebot vergleicht',
    ],
  },
  {
    slug: 'relaunch',
    title: 'Website-Relaunch',
    shortTitle: 'Relaunch',
    tagline: 'Raus aus WordPress',
    description:
      'Ihre bestehende Website neu aufgebaut. Schneller, sicherer, ohne Plugin-Wartung. Inkl. Migration und 301-Redirects.',
    href: '/leistungen/relaunch',
    features: [
      'Komplette Neuentwicklung',
      'Migration aller Inhalte',
      'SEO-Rankings bleiben erhalten',
      '301-Redirects sauber gesetzt',
      'WordPress-Abschaltung inkludiert',
    ],
    metaTitle: 'Website-Relaunch Wien',
    metaDescription:
      'Relaunch Ihrer bestehenden Website. Migration von WordPress zu handgeschriebenem Code. SEO-Rankings bleiben erhalten.',
    intro:
      'Ihre Website ist langsam, unsicher oder einfach in die Jahre gekommen. Ein Relaunch macht sie schneller, sicherer und befreit Sie von monatlicher Plugin-Wartung – ohne dass Sie Ihre Google-Rankings verlieren.',
    process: [
      {
        step: 'Audit',
        description:
          'Ich analysiere Ihre aktuelle Seite: Performance, SEO, Sicherheit, Inhalte. Sie bekommen einen ehrlichen Befund.',
      },
      {
        step: 'Migrations-Plan',
        description:
          'Welche Inhalte bleiben, was wird neu? URL-Struktur und Redirect-Map werden vorab geplant.',
      },
      {
        step: 'Parallel-Bau',
        description:
          'Neue Seite wird auf einer Subdomain gebaut. Ihre alte Seite läuft währenddessen weiter.',
      },
      {
        step: 'Cutover',
        description:
          'An einem Tag wird die neue Seite scharfgeschaltet. 301-Redirects greifen sofort, Rankings bleiben.',
      },
    ],
    forWhom: [
      'Bestehende WordPress-Sites mit Performance-Problemen',
      'Wer monatliche Wartungskosten loswerden will',
      'Wer eine modernere, schnellere Website braucht',
      'Wer Google-Rankings nicht verlieren darf',
    ],
    notForWhom: [
      'Wer einfach nur ein neues Theme will',
      'Wer am bestehenden CMS festhalten muss',
    ],
  },
  {
    slug: 'seo-wien',
    title: 'SEO und GEO',
    shortTitle: 'SEO + GEO',
    tagline: 'Gefunden werden – auf Google und in ChatGPT',
    description:
      'Klassisches SEO plus Optimierung für AI-Suchmaschinen wie ChatGPT, Perplexity und Google AI Overviews.',
    href: '/leistungen/seo-wien',
    features: [
      'Technisches SEO',
      'Lokales SEO Wien',
      'GEO – Generative Engine Optimization',
      'Schema.org strukturierte Daten',
      'Performance-Optimierung',
    ],
    metaTitle: 'SEO Wien – plus GEO für ChatGPT',
    metaDescription:
      'SEO aus Wien für KMU. Klassisches SEO plus GEO-Optimierung für ChatGPT, Perplexity und Google AI Overviews. Mit messbaren Ergebnissen.',
    intro:
      'Suchmaschinen sind 2026 nicht mehr nur Google. Ihre Kunden fragen ChatGPT, Perplexity, Claude und Google AI Overviews. SEO funktioniert anders. Ich optimiere für beide Welten.',
    process: [
      {
        step: 'Audit',
        description:
          'Status-Quo-Analyse: Rankings, technische Mängel, Content-Lücken. Inkl. AI-Sichtbarkeits-Test.',
      },
      {
        step: 'Strategie',
        description:
          'Konkrete Maßnahmenliste mit Aufwand, Priorität und erwarteter Wirkung.',
      },
      {
        step: 'Umsetzung',
        description:
          'Technische SEO-Fixes, Content-Optimierung, Schema.org, GEO-Maßnahmen.',
      },
      {
        step: 'Messung',
        description:
          'Monatliche Reports zu Rankings, Traffic und AI-Erwähnungen. Keine Vertragsbindung.',
      },
    ],
    forWhom: [
      'Wiener KMU mit eigener Website',
      'Wer in Google + ChatGPT sichtbar sein will',
      'Wer messbare Ergebnisse erwartet',
    ],
    notForWhom: [
      'Wer Garantien für Platz 1 verlangt (gibt es nicht)',
      'Wer ohne saubere Website-Basis SEO will',
    ],
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug)
}
