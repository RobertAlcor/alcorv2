export const POSITIONING = {
  applicationHref: '/bewerbung',
  callHref: '/termin',
  callLabel: '15 Minuten: Passen wir zusammen?',
  taxNote: 'Umsatzsteuerfrei aufgrund der Kleinunternehmerregelung gemäß § 6 Abs. 1 Z 27 UStG.',
  paymentNote: '60 % Anzahlung sofort bei Auftragserteilung. 40 % nach erfolgreicher Abnahme.',
  portrait: null as string | null,
} as const

export const PACKAGES = [
  {
    id: 'starter', name: 'Basis', price: '599 €', eyebrow: 'Die einfache Homepage',
    description: 'Eine reduzierte, fertige Basis-Homepage. Für einen klaren digitalen Auftritt ohne zusätzliche Funktionen.',
    features: ['Eine einfache Homepage auf einer Seite', 'Anpassung mit Ihren bereitgestellten Texten und Bildern', 'Responsive Darstellung für Smartphone und Desktop', 'Basis-SEO: Seitentitel, Beschreibung und saubere Struktur'],
    excluded: ['Kein Kontaktformular', 'Keine Animationen oder individuellen Zusatzfunktionen', 'Keine Erstellung einer Datenschutzerklärung oder anderer Rechtstexte'],
    detail: 'Kein individuelles Komplettdesign. Rechtlich erforderliche Inhalte stellt der Auftraggeber bereit.',
  },
  {
    id: 'business', name: 'Business', price: 'Auf Anfrage', eyebrow: 'Der individuelle Unternehmensauftritt',
    description: 'Für Unternehmen, deren Website mehr erklären, mehr zeigen und Anfragen gezielt ermöglichen soll.',
    features: ['Individuelles Design und vereinbarte Unterseiten', 'Kontaktformular mit serverseitiger Validierung', 'Technische SEO und strukturierte Inhalte', 'Ausgewählte Animationen und aufbereitete Projektbilder', 'Einbindung bereitgestellter Rechtstexte'],
    excluded: [] as string[], detail: 'Umfang, Seitenanzahl und Funktionen werden im Angebot verbindlich festgelegt.',
  },
  {
    id: 'premium', name: 'Premium', price: 'Auf Anfrage', eyebrow: 'Das umfassende, abgestimmte Projekt',
    description: 'Für anspruchsvolle Auftritte und Web-Anwendungen, bei denen Strategie, Design und Entwicklung zusammengehören.',
    features: ['Strategie, Konzeption und umfassendes Individualdesign', 'Erweiterte Funktionen nach Vereinbarung', 'Zum Beispiel Buchung, Journal oder geschützter Bereich', 'Vertiefte technische SEO und Performance-Abstimmung', 'Qualitätssicherung, Übergabe und vereinbarte Einweisung'],
    excluded: [] as string[], detail: 'Komplett im schriftlich vereinbarten Leistungsumfang. Kein unbegrenztes Funktionspaket.',
  },
] as const
