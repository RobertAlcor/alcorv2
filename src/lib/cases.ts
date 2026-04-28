export type CaseTestimonial = {
  quote: string
  author: string
  role?: string
  verified?: boolean
}

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

  // Card / Übersicht
  shortDescription: string
  tags: string[]

  // Detail-Seite
  challenge: string // Was war das Problem
  approach: string[] // Wie ich vorgegangen bin (Bullet-Points)
  highlights: { label: string; description: string }[] // Besondere technische Lösungen
  techStack: string[]
  results: { label: string; value: string; hint?: string }[]
  before?: { description: string; problems: string[] } // Vorher-Zustand
  testimonial?: CaseTestimonial

  // Optional: Business-Modell-Hinweis (wichtig für Büro-Reinigung)
  businessNote?: string

  // Meta
  metaTitle: string
  metaDescription: string
}

export const CASES: Case[] = [
  // === SCHMERZFREI.WIEN ===
  {
    slug: 'schmerzfrei-wien',
    client: 'schmerzfrei.wien',
    initials: 'SW',
    industry: 'Gesundheit · Heilmassage · Schmerztherapie',
    url: '/referenzen/schmerzfrei-wien',
    liveUrl: 'https://schmerzfrei.wien',
    year: 2026,
    brandColor: '#0F766E',
    brandColorAccent: '#5EEAD4',

    shortDescription:
      'Komplette Neuentwicklung der Praxis-Website für Heilmasseurin Monika Bestereimer in Wien Brigittenau. Von langsamer WordPress-Site zu Lighthouse 100 in unter 7 Tagen.',
    tags: ['Next.js 15', 'TypeScript', 'Supabase', 'Tailwind 4'],

    challenge:
      'Die bestehende WordPress-Site war langsam, sah aus wie tausend andere Therapie-Sites und brachte praktisch keine Anfragen. Monika wollte eine Website, die ihrer fachlichen Kompetenz und ihrer ruhigen, persönlichen Arbeitsweise gerecht wird – und Patienten direkt zur Terminbuchung führt.',

    approach: [
      'Tiefgreifendes Erstgespräch zur Positionierung: Was unterscheidet Monikas Arbeit von Standard-Massagen?',
      'Komplette Inhaltsneuerstellung mit Fokus auf die drei Kernbehandlungen: Heilmassage, Liebscher & Bracht, Sculptural Facelift',
      'Eigene Booking-Logik mit Verfügbarkeits-Prüfung und automatischer E-Mail-Bestätigung',
      'Ruhiges, vertrauensbildendes Design – Cremeweiß auf Tannengrün, klare Typografie, viel Atemraum',
      'Vollständige WCAG 2.2 AA Konformität – wichtig für Patienten mit eingeschränkter Mobilität',
    ],

    highlights: [
      {
        label: 'Eigene Booking-Engine',
        description:
          'Statt eines fertigen Plugins habe ich eine schlanke Booking-Logik in Next.js gebaut: Verfügbarkeit, Zeitfenster, Bestätigungsmail – alles in eigenem Code, kein externes Tool nötig.',
      },
      {
        label: 'Lighthouse 100/100/100/100',
        description:
          'Performance, Accessibility, Best Practices, SEO – alle vier Kategorien voll. Gemessen auf Mobile mit 4G-Throttling.',
      },
      {
        label: 'Strukturierte Daten für Google',
        description:
          'Schema.org MedicalBusiness, Service, FAQPage – damit Google die Praxis als lokales Gesundheitsangebot korrekt indexiert und in lokalen Suchen prominent anzeigt.',
      },
      {
        label: 'WhatsApp-Quick-Contact',
        description:
          'Für Patienten, die schnell eine Frage haben, ohne Termin zu buchen – ein vorausgefüllter WhatsApp-Link auf jeder Seite.',
      },
    ],

    techStack: [
      'Next.js 15 (App Router)',
      'React 19',
      'TypeScript 5 (strict)',
      'Tailwind CSS 4',
      'Supabase (Datenbank für Termine)',
      'Resend (Bestätigungsmails)',
      'Vercel (Hosting, Region Frankfurt)',
      'Plausible (DSGVO-konforme Analytics)',
    ],

    results: [
      {
        label: 'Lighthouse Score',
        value: '100/100/100/100',
        hint: 'Performance · A11y · BP · SEO',
      },
      { label: 'Ladezeit', value: '< 0.8s', hint: 'LCP auf Mobile 4G' },
      {
        label: 'Lieferzeit',
        value: '6 Tage',
        hint: 'Vom Briefing zum Live-Gang',
      },
      {
        label: 'Anfragen-Steigerung',
        value: '+340 %',
        hint: 'Vergleich erste 30 Tage zur alten Site',
      },
    ],

    before: {
      description:
        'Vorher lief die Site auf WordPress mit einem gekauften Theme. Die Ladezeit lag bei über 4 Sekunden, das Design wirkte austauschbar, und es gab keine direkte Buchungsmöglichkeit – Patienten mussten anrufen oder ein Standard-Kontaktformular nutzen.',
      problems: [
        'Ladezeit über 4 Sekunden auf Mobile',
        'Kein Online-Booking, nur Anruf möglich',
        'Generisches Theme-Design ohne Wiedererkennung',
        '14 aktive Plugins mit wöchentlichen Update-Zyklen',
        'Keine strukturierten Daten für Google',
      ],
    },

    testimonial: {
      quote:
        'Robert hat innerhalb von einer Woche etwas geliefert, was meine alte Agentur in vier Monaten nicht geschafft hat. Die Site sieht aus, wie ich mich fühle – ruhig, professionell, ohne Schnickschnack. Und die Anfragen kommen.',
      author: 'Monika Bestereimer',
      role: 'Diplomierte Heilmasseurin',
      verified: true,
    },

    metaTitle:
      'Case Study: schmerzfrei.wien – Praxis-Website mit Online-Booking',
    metaDescription:
      'Wie ich aus einer langsamen WordPress-Site eine performante Next.js-Praxis-Website mit eigener Booking-Logik gebaut habe. Lighthouse 100 in 6 Tagen.',
  },

  // === BÜRO-REINIGUNG ===
  {
    slug: 'buero-reinigung',
    client: 'Büroreinigung Wien',
    initials: 'BR',
    industry: 'Gewerbliche Reinigung · Plattform',
    url: '/referenzen/buero-reinigung',
    liveUrl: 'https://reinigung.webdesign-alcor.at',
    year: 2025,
    brandColor: '#1E40AF',
    brandColorAccent: '#60A5FA',

    shortDescription:
      'Komplettes digitales Backoffice für eine Reinigungsfirma: CRM, Personalplanung, Tablet-PWA für Vor-Ort-Besichtigungen, Mitarbeiter-Check-in mit GPS. Verwaltungsaufwand um 65 % reduziert.',
    tags: ['PHP', 'MySQL', 'PWA', 'CRM', 'Custom-System'],

    challenge:
      'Die Reinigungsfirma verwaltete Kunden, Mitarbeiter, Touren, Angebote und Stundenabrechnungen mit Excel-Listen, WhatsApp-Nachrichten und händischen Notizen. Angebotserstellung dauerte zwei Stunden pro Kunde. Das Wachstum war durch die Verwaltung gebremst – nicht durch fehlende Aufträge.',

    approach: [
      'Drei separate, aber verbundene Anwendungen entwickelt: Admin-Dashboard, Besichtigungs-App (Tablet-PWA), Mitarbeiter-App',
      'Komplette Datenbank-Struktur: Kunden, Standorte, Mitarbeiter, Touren, Angebote, Stunden, Rechnungen',
      'Live-Pricing-Engine im Besichtigungs-Wizard: Kunde sieht den Preis sofort vor Ort',
      'Offline-Sync für Tablet-App: funktioniert auch in Kellern und Tiefgaragen ohne Empfang',
      'Austrian Kollektivvertrag-Compliance bei Lohnberechnungen',
    ],

    highlights: [
      {
        label: '6-Schritt Besichtigungs-Wizard',
        description:
          'Tablet-PWA für Vor-Ort-Termine: Räume vermessen, Foto aufnehmen, Reinigungsfrequenz festlegen, Sonderwünsche erfassen, Live-Preis berechnen, Angebot direkt vor Ort als PDF mailen.',
      },
      {
        label: 'GPS-Check-in für Mitarbeiter',
        description:
          'Mitarbeiter checken am Einsatzort ein und aus. Stundenerfassung automatisch, DSGVO-konform mit individueller Einwilligung nach § 10 AVRAG.',
      },
      {
        label: 'Custom-Pricing nach Kunden-Vereinbarung',
        description:
          'Jeder Kunde kann individuelle Stundensätze, Pauschalen oder Frequenz-Rabatte haben. Die Engine berechnet alles korrekt und konsistent.',
      },
      {
        label: 'SevDesk-Integration',
        description:
          'Erstellte Angebote landen direkt in SevDesk – kein doppeltes Abtippen. Buchhaltung und Operations sind synchron.',
      },
    ],

    techStack: [
      'PHP 8.2',
      'MySQL 5.7',
      'Vanilla JS (PWA-Architektur)',
      'IndexedDB (Offline-Sync)',
      'Geolocation API',
      'PDF-Generation (TCPDF)',
      'SevDesk API',
      'Service Worker',
    ],

    results: [
      { label: 'Verwaltungsaufwand', value: '−65 %' },
      {
        label: 'Angebotserstellung',
        value: '15 Min',
        hint: 'vorher 2 Stunden',
      },
      {
        label: 'Mitarbeiterzahl',
        value: '2 → 8',
        hint: 'Wachstum nach Einführung',
      },
      { label: 'Plattform-Größe', value: '3 Apps + DB' },
    ],

    before: {
      description:
        'Vorher lief alles über Excel, WhatsApp und Zettel. Angebote brauchten Stunden, Stundenerfassung war fehleranfällig, Mitarbeiterplanung war nur im Kopf des Inhabers.',
      problems: [
        'Angebotserstellung manuell pro Kunde, durchschnittlich 2 Stunden',
        'Stundenabrechnungen über handschriftliche Zettel',
        'Keine zentrale Übersicht über laufende Aufträge',
        'Doppelte Datenpflege in Excel und Buchhaltungs-Tool',
      ],
    },

    businessNote:
      'Das System ist als Plattform konzipiert und kann von anderen Reinigungsfirmen lizenziert werden. Drei Modelle möglich: Kauf mit einmaliger Lizenzgebühr, monatliche Miete, oder vollständig auf den Kunden zugeschnittene Custom-Variante. Anfragen über das Kontaktformular.',

    metaTitle:
      'Case Study: Büroreinigung Wien – Komplette Custom-Plattform',
    metaDescription:
      'Wie ich eine Reinigungsfirma von Excel auf eine eigene Plattform mit CRM, PWA und GPS-Tracking gebracht habe. Verwaltungsaufwand um 65 % reduziert.',
  },

  // === PSYCHOLOGEN-WEBDESIGN ===
  {
    slug: 'psychologen-webdesign',
    client: 'psychologen-webdesign.at',
    initials: 'PW',
    industry: 'Niche-Marketing · Eigene Marke',
    url: '/referenzen/psychologen-webdesign',
    liveUrl: 'https://psychologen-webdesign.at',
    year: 2026,
    brandColor: '#7C3AED',
    brandColorAccent: '#C4B5FD',

    shortDescription:
      'Spezialisierte Landing-Page für Psychologen und Psychotherapeuten in Wien. Eigenes Niche-Projekt von ALCOR Group mit klarem Starter-Paket € 599,–.',
    tags: ['Next.js 15', 'Niche-SEO', 'Lead-Generation', 'Vienna-Local'],

    challenge:
      'Psychotherapeuten haben spezielle Anforderungen an ihre Website: hohe Vertraulichkeit, ruhige Bildsprache, klare Termin-Strukturen, Krankenkassen-Hinweise. Generische Webdesign-Anbieter kennen diese Besonderheiten nicht. Es brauchte eine spezialisierte Marke, die sich genau an diese Zielgruppe richtet.',

    approach: [
      'Niche-Recherche: Was suchen Psychologen wirklich, wenn sie eine Website wollen?',
      'Eigene Best-of-Kombination der Texte aus mehreren AI-gestützten Drafts',
      'Therapeutische Sage/Cream-Farbpalette – beruhigend, vertrauensbildend',
      'Footer mit allen 23 Wiener Bezirken für Local SEO',
      'Lead-Storage in Supabase, Bestätigungsmails über Resend',
      'Klares €599 Starter-Paket als Einstieg, persönliches Erstgespräch als Conversion-Punkt',
    ],

    highlights: [
      {
        label: 'CSS-only Browser-Mockups',
        description:
          'Die Portfolio-Sektion zeigt fiktive Psychologen-Websites in Browser-Frames – komplett mit CSS gebaut, keine Bilder. Lädt sofort und sieht trotzdem hochwertig aus.',
      },
      {
        label: 'Lokales SEO mit allen Bezirken',
        description:
          'Footer-Liste aller 23 Wiener Bezirke verlinkt – wenn jemand "Psychologe Webdesign Hietzing" sucht, taucht die Site auf.',
      },
      {
        label: 'Branchenspezifische FAQs',
        description:
          'FAQ-Sektion adressiert Therapeuten-spezifische Sorgen: Datenschutz für Klienten, Krankenkassen-Hinweise, Online-Termin-Scheu. Spricht die Zielgruppe direkt an.',
      },
      {
        label: 'Schema.org Service-Markup',
        description:
          'Strukturierte Daten als „WebDesignService für Therapeuten in Wien" – Google versteht die Niche und zeigt die Site bei spezifischen Anfragen.',
      },
    ],

    techStack: [
      'Next.js 15 (App Router)',
      'React 19',
      'TypeScript 5 (strict, noUncheckedIndexedAccess)',
      'Tailwind CSS 4 mit Custom Theme',
      'Supabase (Lead-Storage)',
      'Resend (Lead-Notifications)',
      'Zod (Form-Validation)',
      'Plausible Analytics',
    ],

    results: [
      { label: 'Lighthouse Score', value: '100/100/100/100' },
      { label: 'Ladezeit', value: '< 0.7s' },
      { label: 'JS Bundle (initial)', value: '< 80 KB' },
      { label: 'Vienna-District-Pages', value: '23' },
    ],

    businessNote:
      'Die Marke psychologen-webdesign.at ist Teil der ALCOR Group und richtet sich gezielt an Therapeut:innen mit eigener Praxis. Das Starter-Paket (€ 599,–) ist auf die typischen Anforderungen abgestimmt – Therapie-Spektrum, Termine, Anfahrt, Krankenkassen-Info.',

    metaTitle:
      'Case Study: psychologen-webdesign.at – Niche-Marke für Therapeuten',
    metaDescription:
      'Spezialisierte Landing-Page für Psychologen in Wien. Eigenes ALCOR-Group-Projekt mit klarer Positionierung und €599 Starter-Paket.',
  },
]

export function getCaseBySlug(slug: string): Case | undefined {
  return CASES.find((c) => c.slug === slug)
}
