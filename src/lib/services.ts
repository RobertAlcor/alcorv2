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
  /** Überschrift der Detailseite mit Suchbegriff; fehlt sie, wird title verwendet */
  h1?: string
  faqs?: { question: string; answer: string }[]
}

export const SERVICES: Service[] = [
  {
    slug: 'website-erstellung',
    title: 'Website-Erstellung', shortTitle: 'Neue Website',
    h1: 'Website erstellen lassen in Wien',
    tagline: 'Basis, Business oder Premium',
    description: 'Die einfache Basis-Homepage kostet 599 € einmalig. Individuelles Design, weitere Seiten und Funktionen werden im Business- oder Premium-Projekt vereinbart.',
    href: '/leistungen/website-erstellung',
    features: ['Basis: eine einfache Homepage auf einer Seite', 'Responsive Darstellung und Basis-SEO', 'Business: individuelles Design und Kontaktformular', 'Premium: umfassender vereinbarter Leistungsumfang', 'Schriftlicher Vertrag und Live-Vorschau'],
    metaTitle: 'Website erstellen lassen | Basis 599 €, Business & Premium | ALCOR',
    metaDescription: 'Einfache Basis-Homepage für 599 € ohne Kontaktformular oder Animationen. Business und Premium nach Vereinbarung. Einmalig, ohne Umsatzsteuer.',
    intro: 'Ich entwickle Websites für ausgewählte Projekte. Ihre Ziele und der vereinbarte Umfang bestimmen, ob eine einfache Basis oder ein individueller Unternehmensauftritt passt.',
    process: [
      { step: 'Kennenlernen', description: 'In 15 Minuten besprechen wir Ihre Aufgabe und klären, ob eine Zusammenarbeit passt.' },
      { step: 'Vertrag', description: 'Leistungen, Dauer, Preis und bis zu fünf vereinbarte Korrekturrunden stehen vor dem Start fest. 60 % Anzahlung bei Auftragserteilung.' },
      { step: 'Entwicklung', description: 'Sie verfolgen die Umsetzung in einer Live-Vorschau. Feedback erfolgt innerhalb des vereinbarten Konzepts.' },
      { step: 'Abnahme', description: 'Nach erfolgreicher Abnahme werden 40 % Restzahlung fällig. Veröffentlichung und Übergabe erfolgen wie vereinbart.' },
    ],
    forWhom: ['Unternehmen mit klarer Aufgabe', 'Praxen und Dienstleistungsbetriebe', 'Direkte Zusammenarbeit mit dem Entwickler'],
    notForWhom: ['Unbegrenzte Funktionen zum Basispreis', 'Beliebig viele Redesigns ohne neue Vereinbarung'],
    faqs: [
      { question: 'Was umfasst die Homepage für 599 €?', answer: 'Eine einfache Basis-Homepage auf einer Seite mit bereitgestellten Inhalten, responsiver Darstellung und Basis-SEO. Kein Kontaktformular, keine Animationen, keine Erstellung von Datenschutzerklärung oder anderen Rechtstexten. Erforderliche Inhalte stellt der Auftraggeber bereit. Der Preis ist einmalig; aufgrund der Kleinunternehmerregelung wird keine Umsatzsteuer verrechnet.' },
      { question: 'Was ist in Business und Premium enthalten?', answer: 'Business bietet individuelles Design, vereinbarte Unterseiten und Kontaktformular. Premium umfasst das individuell vereinbarte Gesamtprojekt einschließlich zusätzlicher Funktionen. Den konkreten Umfang und den einmaligen Preis halten wir vorab schriftlich fest.' },
      { question: 'Wie lange dauert die Umsetzung?', answer: 'Den Zeitplan vereinbaren wir anhand des Umfangs und der Bereitstellung Ihrer Inhalte. Es gibt keine pauschale Sieben-Tage-Zusage für sämtliche Projekte.' },
      { question: 'Wie funktionieren Zahlung und Korrekturen?', answer: '60 % sofort bei Auftragserteilung, 40 % nach erfolgreicher Abnahme. Im Vertrag stehen bis zu fünf vereinbarte Korrekturrunden. Ein vollständiges Redesign oder zusätzliche Funktionen werden separat vereinbart.' },
      { question: 'Kann ich die Website live verfolgen?', answer: 'Ja. Sie erhalten während der Entwicklung eine Vorschau. So stimmen wir Gestaltung und Inhalte früh ab.' },
    ],
  },
  {
    slug: 'relaunch', title: 'Website-Relaunch', shortTitle: 'Relaunch',
    h1: 'Website-Relaunch in Wien', tagline: 'Ein neuer Auftritt mit klarer Richtung',
    description: 'Inhalte, Struktur und Gestaltung Ihrer Website überarbeiten. Bestehende Adressen und vereinbarte Weiterleitungen berücksichtige ich im Projekt.',
    href: '/leistungen/relaunch',
    features: ['Bestandsaufnahme', 'Abgestimmtes Konzept', 'Vereinbarte Inhalte und Funktionen', 'URL- und Weiterleitungsplanung', 'Live-Vorschau und Abnahme'],
    metaTitle: 'Website-Relaunch Wien | ALCOR',
    metaDescription: 'Website-Relaunch mit individuell vereinbartem Umfang, Preis und Zeitplan. Direkte Zusammenarbeit und Live-Vorschau.',
    intro: 'Ein Relaunch ist kein pauschales Basis-Paket. Welche Seiten, Inhalte und Funktionen überarbeitet werden, halten wir gemeinsam fest.',
    process: [
      { step: 'Bestandsaufnahme', description: 'Wir prüfen Ziele, Inhalte und technische Voraussetzungen.' },
      { step: 'Vereinbarung', description: 'Konzept, Migration, Weiterleitungen, Zeitplan und Preis werden schriftlich festgelegt.' },
      { step: 'Live-Vorschau', description: 'Die neue Website wird parallel entwickelt und in vereinbarten Feedbackrunden abgestimmt.' },
      { step: 'Veröffentlichung', description: 'Nach der Abnahme folgen die vereinbarte Umschaltung und technische Kontrollen.' },
    ],
    forWhom: ['Bestehende Websites mit Änderungsbedarf', 'Unternehmen mit neuer Positionierung', 'Vereinbarte Migration von Inhalten und Funktionen'],
    notForWhom: ['Garantien für unveränderte Rankings', 'Unbegrenzte Migration zum Basispreis'],
    faqs: [
      { question: 'Was kostet ein Relaunch?', answer: 'Der einmalige Preis wird anhand der bestehenden Website und des gewünschten Umfangs schriftlich vereinbart. Die einfache Basis-Homepage für 599 € ist kein mehrseitiger Komplett-Relaunch.' },
      { question: 'Bleibt meine Website währenddessen online?', answer: 'Die neue Version wird zunächst getrennt entwickelt. Zeitpunkt und Ablauf der Umschaltung stimmen wir ab.' },
      { question: 'Bleiben meine Rankings erhalten?', answer: 'Bestehende Inhalte, URLs und erforderliche Weiterleitungen werden berücksichtigt. Unveränderte Rankings oder vollständige Sichtbarkeitserhaltung können nicht garantiert werden.' },
    ],
  },
  {
    slug: 'seo-wien', title: 'Technische SEO', shortTitle: 'SEO',
    h1: 'Technische SEO in Wien', tagline: 'Verstanden werden. Gefunden werden.',
    description: 'Nachvollziehbare technische Grundlagen und klare Inhalte. Maßnahmen werden nach Relevanz und vereinbartem Umfang umgesetzt.',
    href: '/leistungen/seo-wien',
    features: ['Indexierbarkeit prüfen', 'Metadaten und Überschriften', 'Interne Verlinkung', 'Strukturierte Daten nach Bedarf', 'Bildauslieferung und Performance'],
    metaTitle: 'Technische SEO Wien | ALCOR',
    metaDescription: 'Technische SEO und klare Website-Inhalte aus Wien. Nachvollziehbare Maßnahmen, ohne Ranking-Garantie.',
    intro: 'Ich optimiere die technische Basis und die vereinbarten Inhalte. Suchmaschinen entscheiden selbst, ob und wo eine Seite erscheint.',
    process: [
      { step: 'Prüfung', description: 'Wir erfassen die relevanten technischen und inhaltlichen Voraussetzungen.' },
      { step: 'Prioritäten', description: 'Sie erhalten den vereinbarten Maßnahmenplan mit Aufwand und Reihenfolge.' },
      { step: 'Umsetzung', description: 'Die beauftragten Anpassungen werden nachvollziehbar umgesetzt.' },
      { step: 'Kontrolle', description: 'Technische Ergebnisse werden geprüft. Laufende Betreuung ist eine gesonderte Vereinbarung.' },
    ],
    forWhom: ['Unternehmen mit bestehender Website', 'Neue Business- und Premium-Projekte', 'Klare Ziele und realistische Erwartungen'],
    notForWhom: ['Garantierte Platzierungen', 'Garantierte Neukundenzahlen'],
    faqs: [
      { question: 'Ist umfassende SEO im Basispreis enthalten?', answer: 'Die Basis-Homepage für 599 € enthält Basis-SEO wie Seitentitel, Beschreibung und eine saubere Struktur. Umfangreiche Analysen, zusätzliche Inhalte und laufende Betreuung sind nicht enthalten.' },
      { question: 'Garantieren Sie Platz 1?', answer: 'Nein. Ich vereinbare konkrete Leistungen, keine Suchmaschinenplatzierungen oder Anzahl von Anfragen.' },
    ],
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug)
}
