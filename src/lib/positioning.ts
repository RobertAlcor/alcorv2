export const POSITIONING = {
  applicationHref: '/bewerbung',
  callHref: '/termin',
  callLabel: '15 Minuten: Passen wir zusammen?',
  taxNote:
    'Umsatzsteuerfrei aufgrund der Kleinunternehmerregelung gemäß § 6 Abs. 1 Z 27 UStG.',
  paymentNote:
    '60 % Anzahlung sofort bei Auftragserteilung. 40 % nach erfolgreicher Abnahme.',
  portrait: null as string | null,
} as const

export const PRICE_POINTS = {
  starter: 599,
  businessFrom: 1490,
  premiumFrom: 2490,
  customFrom: 3900,
  additionalPageFrom: 150,
  simpleFormFrom: 150,
  careMonthlyFrom: 59,
} as const

export const PACKAGES = [
  {
    id: 'starter',
    name: 'Basis',
    price: '599 €',
    eyebrow: 'Die einfache Homepage',
    description:
      'Eine reduzierte Homepage auf einer Seite. Für einen klaren digitalen Auftritt mit bereits vorhandenen Inhalten.',
    features: [
      'Eine einfache Homepage auf einer Seite',
      'Anpassung mit Ihren bereitgestellten Texten und Bildern',
      'Responsive Darstellung für Smartphone und Desktop',
      'Basis-SEO: Seitentitel, Beschreibung und saubere Struktur',
    ],
    excluded: [
      'Kein Kontaktformular',
      'Keine Animationen oder individuellen Zusatzfunktionen',
      'Keine Erstellung einer Datenschutzerklärung oder anderer Rechtstexte',
    ],
    detail:
      'Fixpreis für den beschriebenen Umfang. Domain, Hosting und spätere Änderungen sind getrennte Leistungen.',
  },
  {
    id: 'business',
    name: 'Business',
    price: 'ab 1.490 €',
    eyebrow: 'Empfohlen für KMU',
    description:
      'Der individuelle Unternehmensauftritt für Betriebe, die Leistungen verständlich erklären und Anfragen gezielt ermöglichen möchten.',
    features: [
      'Individuelles Design und bis zu fünf vereinbarte Seiten',
      'Kontaktformular mit serverseitiger Validierung',
      'Technische SEO, Local-SEO-Grundlagen und strukturierte Daten',
      'Aufbereitete Projektbilder und klare Anfragewege',
      'Einbindung bereitgestellter Rechtstexte',
    ],
    excluded: [] as string[],
    detail:
      'Startpreis bei bereitgestellten Inhalten. Seitenanzahl, Funktionen und endgültiger Projektpreis werden vor Beginn schriftlich festgelegt.',
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 'ab 2.490 €',
    eyebrow: 'Für umfangreichere Vorhaben',
    description:
      'Für Unternehmen, die Strategie, individuelles Design, mehr Inhalte und einen erweiterten digitalen Ablauf verbinden möchten.',
    features: [
      'Strategie, Inhaltsstruktur und umfassendes Individualdesign',
      'Bis zu zehn vereinbarte Seiten',
      'Ein erweiterter Funktionsbereich nach Vereinbarung, zum Beispiel Journal, Buchungs- oder Anfrageablauf',
      'Vertiefte technische SEO, GEO und Performance-Abstimmung',
      'Qualitätssicherung, Übergabe und vereinbarte Einweisung',
    ],
    excluded: [] as string[],
    detail:
      'Kein unbegrenztes Funktionspaket. Externe Dienste, Lizenzen und zusätzliche Sonderentwicklungen werden separat ausgewiesen.',
  },
] as const
