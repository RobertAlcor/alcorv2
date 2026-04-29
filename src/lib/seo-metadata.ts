import type { Metadata } from 'next'
import { SITE } from './site'

/**
 * Helper um konsistente Metadata pro Page zu erzeugen.
 * Wird in jeder page.tsx als `export const metadata = pageMetadata({...})` genutzt.
 */
export function pageMetadata(args: {
  title: string
  description: string
  path: string
  keywords?: string[]
  ogImage?: string
}): Metadata {
  const fullUrl = `${SITE.url}${args.path}`
  const keywords = args.keywords ?? []

  return {
    title: args.title,
    description: args.description,
    keywords: [...SITE.seo.primaryKeywords, ...keywords].join(', '),
    alternates: {
      canonical: args.path,
    },
    openGraph: {
      type: 'website',
      locale: 'de_AT',
      url: fullUrl,
      siteName: SITE.name,
      title: args.title,
      description: args.description,
      ...(args.ogImage && {
        images: [{ url: args.ogImage, width: 1200, height: 630, alt: args.title }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: args.title,
      description: args.description,
    },
  }
}

/**
 * Vordefinierte SEO-optimierte Metadata für jede Page.
 * Import in page.tsx:
 *
 *   import { PAGE_META } from '@/lib/seo-metadata'
 *   export const metadata = PAGE_META.home
 *
 * Title-Konvention: <Hauptkeyword> | <USP/Subtitle> | <Brand>
 * 50-60 Zeichen optimal. Description 140-160 Zeichen.
 */
export const PAGE_META = {
  home: pageMetadata({
    title: 'Webdesign Wien | Webagentur ohne WordPress | Webdesign Alcor',
    description:
      'Handgeschriebene Websites aus Wien — schnell, sicher, ohne Plugin-Chaos. Eine Person, 10+ Jahre Erfahrung. Lieferung in 7 Tagen ab €599.',
    path: '/',
    keywords: ['Webdesign 1220', 'Webdesigner Wien', 'Webagentur Wien'],
  }),

  leistungen: pageMetadata({
    title: 'Webdesign Leistungen Wien | Website, Relaunch, SEO | Alcor',
    description:
      'Website-Erstellung, Relaunch und lokale SEO aus Wien. Handcodiert mit Next.js. Persönlich, transparent, mit Festpreis. Erstgespräch kostenlos.',
    path: '/leistungen',
    keywords: ['Webdesign Leistungen', 'Website-Erstellung Wien', 'Webentwicklung Wien'],
  }),

  websiteErstellung: pageMetadata({
    title: 'Website erstellen Wien | Ab €599 in 7 Tagen | Webdesign Alcor',
    description:
      'Neue Website für Ihr Wiener Unternehmen — handgeschrieben statt WordPress. Festpreis ab €599, fertig in 7 Tagen. Mobiloptimiert, schnell, SEO-fertig.',
    path: '/leistungen/website-erstellung',
    keywords: [
      'Website erstellen Wien',
      'Homepage erstellen Wien',
      'Webseite erstellen lassen Wien',
    ],
  }),

  relaunch: pageMetadata({
    title: 'Website Relaunch Wien | Modernisierung & Performance | Alcor',
    description:
      'Bestehende Website neu aufgesetzt — schneller, modern, SEO-stark. Vom Wiener Webentwickler mit 10+ Jahren Erfahrung. Festpreis nach Erstgespräch.',
    path: '/leistungen/relaunch',
    keywords: ['Website Relaunch Wien', 'Website überarbeiten Wien', 'Homepage modernisieren'],
  }),

  seoWien: pageMetadata({
    title: 'SEO Wien | Lokale Suchmaschinenoptimierung | Webdesign Alcor',
    description:
      'Bei Google in Wien sichtbar werden — mit ehrlicher, technischer SEO statt Backlink-Tricks. Lokale Optimierung für alle 23 Bezirke.',
    path: '/leistungen/seo-wien',
    keywords: [
      'SEO Wien',
      'Suchmaschinenoptimierung Wien',
      'Local SEO Wien',
      'Google Ranking Wien',
    ],
  }),

  preise: pageMetadata({
    title: 'Webdesign Preise Wien | Festpreise ab €599 | Webdesign Alcor',
    description:
      'Transparente Festpreise für Websites in Wien. Starter-Paket ab €599 inkl. Lieferung in 7 Tagen. Hosting €99/Jahr. Keine versteckten Kosten.',
    path: '/preise',
    keywords: ['Webdesign Preise Wien', 'Website Kosten Wien', 'Webdesign Festpreis'],
  }),

  referenzen: pageMetadata({
    title: 'Webdesign Referenzen Wien | Praxen, Reinigung, Therapeuten',
    description:
      'Echte Wiener Projekte: Reinigungsfirma, Schmerztherapie, Psychotherapie. Vor/Nach-Ergebnisse, Performance-Werte, Kundenstimmen.',
    path: '/referenzen',
    keywords: ['Webdesign Referenzen', 'Webdesign Beispiele Wien', 'Webagentur Portfolio'],
  }),

  uebermich: pageMetadata({
    title: 'Robert Alchimowicz | Webentwickler Wien | Webdesign Alcor',
    description:
      'Wer ich bin, was ich kann, wie ich arbeite. Robert Alchimowicz — Webentwickler in Wien seit 2014. Eine Person, voller Code-Besitz, Festpreise.',
    path: '/ueber-mich',
    keywords: ['Webentwickler Wien', 'Webdesigner Wien', 'Robert Alchimowicz'],
  }),

  blog: pageMetadata({
    title: 'Blog | Webdesign, SEO und Webentwicklung aus Wien | Alcor',
    description:
      'Praxis-Wissen aus 10+ Jahren Webentwicklung in Wien. Tipps zu SEO, Performance, Website-Erstellung und der Wahl der richtigen Webagentur.',
    path: '/blog',
    keywords: ['Webdesign Blog', 'SEO Tipps Wien', 'Webentwicklung Blog'],
  }),

  termin: pageMetadata({
    title: 'Termin buchen | Kostenloses Erstgespräch | Webdesign Alcor Wien',
    description:
      'In 60 Sekunden zum kostenlosen Erstgespräch — telefonisch, im Büro (1220 Wien) oder bei Ihnen vor Ort. Unverbindlich, ehrlich, ohne Verkaufsdruck.',
    path: '/termin',
    keywords: ['Webdesign Termin Wien', 'Webdesign Beratung Wien', 'Erstgespräch Webagentur'],
  }),

  kontakt: pageMetadata({
    title: 'Kontakt | Webdesign Wien | Robert Alchimowicz · Webdesign Alcor',
    description:
      'Direkter Draht zum Webentwickler in Wien: Telefon, WhatsApp, E-Mail oder Kontaktformular. Antwort binnen 24 Stunden, üblicherweise schneller.',
    path: '/kontakt',
    keywords: ['Kontakt Webdesign Wien', 'Webagentur Wien Kontakt'],
  }),

  impressum: pageMetadata({
    title: 'Impressum',
    description:
      'Impressum gemäß §5 ECG und §25 MedienG für Webdesign Alcor (Robert Alchimowicz, Wien).',
    path: '/impressum',
  }),

  datenschutz: pageMetadata({
    title: 'Datenschutzerklärung',
    description:
      'Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO bei Webdesign Alcor.',
    path: '/datenschutz',
  }),
} as const
