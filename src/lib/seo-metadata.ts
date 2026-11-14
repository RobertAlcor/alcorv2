import type { Metadata } from 'next'
import { SITE } from './site'

export function pageMetadata(args: {
  title: string
  description: string
  path: string
  keywords?: string[]
  ogImage?: string
}): Metadata {
  const image = args.ogImage || `${SITE.url}/opengraph-image`
  return {
    title: args.title,
    description: args.description,
    alternates: { canonical: args.path },
    openGraph: {
      type: 'website',
      locale: 'de_AT',
      url: `${SITE.url}${args.path}`,
      siteName: SITE.name,
      title: args.title,
      description: args.description,
      images: [{ url: image, width: 1200, height: 630, alt: args.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: args.title,
      description: args.description,
      images: [image],
    },
  }
}

export const PAGE_META = {
  home: pageMetadata({
    title: 'Webdesign Wien | Individuelle Websites von ALCOR',
    description:
      'Individuelles Webdesign aus Wien. Basis 599 €, Business ab 1.490 €, Premium ab 2.490 €. Persönliche Entwicklung, klare Pakete und technische SEO.',
    path: '/',
  }),
  leistungen: pageMetadata({
    title: 'Webdesign, SEO & IT-Service Wien | ALCOR',
    description:
      'Website-Erstellung, Relaunch, technische SEO und persönliche PC-Hilfe in Wien. Klar vereinbarter Umfang, transparente Einstiegspreise und direkter Kontakt.',
    path: '/leistungen',
  }),
  websiteErstellung: pageMetadata({
    title: 'Website erstellen lassen Wien | Ab 599 € | ALCOR',
    description:
      'Basis-Homepage 599 €, Business ab 1.490 €, Premium ab 2.490 €. Individuelle Websites für Unternehmen in Wien mit transparentem Umfang.',
    path: '/leistungen/website-erstellung',
  }),
  relaunch: pageMetadata({
    title: 'Website-Relaunch Wien | Neuer Auftritt mit ALCOR',
    description:
      'Struktur, Inhalte und Gestaltung Ihrer Website neu denken. Persönliche Umsetzung mit Live-Vorschau und klar vereinbartem Umfang.',
    path: '/leistungen/relaunch',
  }),
  seoWien: pageMetadata({
    title: 'Technische SEO Wien | Struktur & Sichtbarkeit | ALCOR',
    description:
      'Technische Suchmaschinenoptimierung: verständliche Inhalte, interne Verlinkung, Metadaten und Performance. Nachvollziehbare Maßnahmen statt Ranking-Garantien.',
    path: '/leistungen/seo-wien',
  }),
  itService: pageMetadata({
    title: 'PC-Hilfe Wien & IT-Service vor Ort | ALCOR',
    description:
      'PC-Hilfe in Wien: Windows installieren, PC einrichten, E-Mail, Office, WLAN, Drucker, Backup und Fernwartung. Anfahrt in Wien kostenlos.',
    path: '/it-service-wien',
  }),
  preise: pageMetadata({
    title: 'Webdesign Preise Wien | Pakete ab 599 € | ALCOR',
    description:
      'Webdesign-Preise in Wien: Basis 599 €, Business ab 1.490 €, Premium ab 2.490 €. Leistungen, Zusatzkosten und Zahlungsablauf transparent vergleichen.',
    path: '/preise',
  }),
  referenzen: pageMetadata({
    title: 'Ausgewählte Webdesign-Projekte & Anwendungen | ALCOR',
    description:
      'Einblicke in Psychotherapie Hrdlicka, schmerzfrei.wien, Umzugsmeister, TAKT und weitere Projekte. Mit Screenshots, Aufgaben und Live-Links.',
    path: '/referenzen',
  }),
  uebermich: pageMetadata({
    title: 'Robert Alchimowicz | Unabhängige Webentwicklung Wien',
    description:
      'Die Person hinter ALCOR. Persönliche Konzeption, Gestaltung und Entwicklung für ausgewählte Projekte. Direkte Zusammenarbeit aus Wien.',
    path: '/ueber-mich',
  }),
  blog: pageMetadata({
    title: 'ALCOR Journal | Webdesign, SEO & Entwicklung',
    description:
      'Gedanken und Fachbeiträge zu Websites, Gestaltung, technischer SEO und Zusammenarbeit. Das Journal von Webdesign Alcor aus Wien.',
    path: '/blog',
  }),
  termin: pageMetadata({
    title: '15 Minuten: Passen wir zusammen? | ALCOR',
    description:
      'Kostenloses, unverbindliches Kennenlernen mit Robert Alchimowicz. Projekt, Anspruch und Zusammenarbeit persönlich besprechen.',
    path: '/termin',
  }),
  kontakt: pageMetadata({
    title: 'Kontakt & Projektanfrage | Webdesign Alcor Wien',
    description:
      'Direkter Kontakt zu ALCOR: Telefon, E-Mail oder Formular. Beschreiben Sie Ihr Webdesign-, SEO- oder IT-Anliegen und erhalten Sie eine persönliche Rückmeldung.',
    path: '/kontakt',
  }),
  impressum: pageMetadata({
    title: 'Impressum',
    description:
      'Angaben zum Anbieter Webdesign Alcor – Robert Alchimowicz, Wien.',
    path: '/impressum',
  }),
  datenschutz: pageMetadata({
    title: 'Datenschutzerklärung',
    description:
      'Informationen zur Verarbeitung personenbezogener Daten bei Webdesign Alcor.',
    path: '/datenschutz',
  }),
} as const
