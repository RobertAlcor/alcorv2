import type { RelatedPage } from '@/components/sections/related-pages'

/**
 * Cross-Link-Definitionen pro Seite.
 * An einer Stelle gepflegt, von allen Pages importiert.
 * Vermeidet, dass man auf jeder Seite einzeln Links pflegen muss.
 */
export const RELATED_FOR = {
  // Startseite verlinkt auf Hauptseiten
  home: [
    {
      href: '/leistungen',
      label: 'Leistungen',
      description: 'Was ich für Sie baue – Website, Relaunch, SEO.',
    },
    {
      href: '/referenzen',
      label: 'Referenzen',
      description: 'Drei reale Projekte, ausführlich dokumentiert.',
    },
    {
      href: '/preise',
      label: 'Preise',
      description: 'Klare Pakete, transparente Stundensätze.',
    },
    {
      href: '/blog',
      label: 'Blog',
      description: 'Artikel zu Webentwicklung und SEO aus Wien.',
    },
  ] as RelatedPage[],

  // Leistungen verlinkt auf Beispiele und Preise
  leistungen: [
    {
      href: '/referenzen',
      label: 'Referenzen ansehen',
      description:
        'Konkrete Projekte: schmerzfrei.wien, Büro-Reinigung, psychologen-webdesign.',
    },
    {
      href: '/preise',
      label: 'Preise & Pakete',
      description:
        'Ab € 599 für eine kompakte Website. Hosting € 99/Jahr.',
    },
    {
      href: '/ueber-mich',
      label: 'Wer ist Robert?',
      description: 'Über 10 Jahre Webentwicklung in Wien, eine Person.',
    },
    {
      href: '/termin',
      label: 'Termin vereinbaren',
      description: '15 bis 60 Minuten Erstgespräch, kostenlos.',
    },
  ] as RelatedPage[],

  // Referenzen verlinkt auf Leistungen, Preise, Termin
  referenzen: [
    {
      href: '/leistungen',
      label: 'Mein Leistungsangebot',
      description:
        'Website-Erstellung, Relaunch, SEO – was für Sie passt.',
    },
    {
      href: '/preise',
      label: 'Was kostet das?',
      description: 'Transparente Pakete und Stundensätze.',
    },
    {
      href: '/ueber-mich',
      label: 'Wer baut das?',
      description: 'Ein Mensch in Wien, 10+ Jahre Erfahrung.',
    },
  ] as RelatedPage[],

  // Preise verlinkt auf Leistungen, Referenzen
  preise: [
    {
      href: '/leistungen',
      label: 'Was ist im Preis enthalten?',
      description: 'Detaillierte Leistungsbeschreibung.',
    },
    {
      href: '/referenzen',
      label: 'Beispiele in dieser Preisklasse',
      description: 'Drei reale Projekte als Orientierung.',
    },
    {
      href: '/termin',
      label: 'Festpreis-Gespräch',
      description: 'Im Erstgespräch klären wir den genauen Festpreis.',
    },
  ] as RelatedPage[],

  // Über mich verlinkt auf Beispiele, Leistungen, Preise
  uebermich: [
    {
      href: '/referenzen',
      label: 'Was ich gebaut habe',
      description: 'Drei Projekte mit Vorher/Nachher und Tech-Stack.',
    },
    {
      href: '/leistungen',
      label: 'Wie ich helfe',
      description: 'Drei klare Wege zu einer besseren Website.',
    },
    {
      href: '/blog',
      label: 'Wie ich denke',
      description: 'Artikel zu Architektur, SEO und Wartungsfreiheit.',
    },
  ] as RelatedPage[],

  // Blog → Termin/Kontakt
  blog: [
    {
      href: '/leistungen',
      label: 'Leistungen',
      description: 'Was theoretisch besprochen wird, baue ich praktisch.',
    },
    {
      href: '/referenzen',
      label: 'Referenzen',
      description: 'Praktische Anwendung der Theorie.',
    },
    {
      href: '/termin',
      label: 'Konkret werden',
      description: '15-Minuten-Erstgespräch, ehrliche Einschätzung.',
    },
  ] as RelatedPage[],

  // Termin → falls man nochmal browsen will
  termin: [
    {
      href: '/leistungen',
      label: 'Leistungen ansehen',
      description: 'Was Robert für Sie umsetzen kann.',
    },
    {
      href: '/referenzen',
      label: 'Bisherige Projekte',
      description: 'So sieht das Ergebnis aus.',
    },
    {
      href: '/preise',
      label: 'Preise prüfen',
      description: 'Schon vor dem Gespräch eine Idee zum Budget.',
    },
  ] as RelatedPage[],

  // Kontakt → Termin als Alternative
  kontakt: [
    {
      href: '/termin',
      label: 'Direkt Termin buchen',
      description: '15 bis 60 Minuten Erstgespräch online vereinbaren.',
    },
    {
      href: '/leistungen',
      label: 'Leistungen ansehen',
      description: 'Falls Sie noch unsicher sind, was Sie brauchen.',
    },
    {
      href: '/preise',
      label: 'Preise prüfen',
      description: 'Damit Sie eine Vorstellung vom Budget haben.',
    },
  ] as RelatedPage[],
} as const
