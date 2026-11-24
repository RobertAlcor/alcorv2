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
  /** Optionaler Screenshot unter /public (1200×750). Fehlt er, wird das Farb-Mockup gezeigt. */
  screenshot?: string
  screenshotAlt?: string
  screenshotCaption?: string
  access?: 'on-request'

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
  {
    slug: 'psychotherapie-hrdlicka',
    client: 'Psychotherapie Hrdlicka',
    initials: 'GH',
    industry: 'Gesundheit · Psychotherapie · Mödling',
    url: '/referenzen/psychotherapie-hrdlicka',
    liveUrl: 'https://psychotherapie-hrdlicka.at',
    year: 2026,
    brandColor: '#1F3A4D',
    brandColorAccent: '#9DB4C0',
    screenshot: '/referenzen/psychotherapie-hrdlicka.webp',
    shortDescription:
      'Praxis-Website für Psychotherapeut Mag. Gerald Hrdlicka in Mödling: zehn ruhig gestaltete Seiten zu Psychotherapie, Lebensberatung, Supervision und Mediation – handgeschrieben, ohne CMS-Ballast.',
    tags: ['PHP', 'Semantisches HTML', 'Schema.org', 'Bunny Fonts'],
    challenge:
      'Eine Praxis mit vier Angeboten – Psychotherapie, Lebensberatung, Supervision und Mediation – für Kinder, Jugendliche und Erwachsene. Wer eine solche Seite besucht, ist oft in einer belastenden Situation. Die Website darf deshalb nicht überfordern: Sie muss in wenigen Klicks beantworten, ob das Angebot passt, wie eine Therapie abläuft, was sie kostet und wie man zu einem Termin kommt.',
    approach: [
      'Seitenstruktur entlang der Fragen von Klient:innen: Angebot, Methode, Ablauf und Kosten, Praxis und Anfahrt, Kontakt',
      'Eigene Seite zur Integrativen Gestalttherapie – verständlich erklärt statt Fachjargon',
      'Ruhige Bildsprache und eine gut lesbare Serifenschrift für Überschriften, klare Groteskschrift für Fließtext',
      'Bereich „Interviews“ für Presse- und Medienbeiträge',
      'Hinweis auf Online-Termine per Zoom und Telefon direkt beim Angebot',
      'Terminanfrage als durchgängiger Hauptweg auf jeder Seite',
    ],
    highlights: [
      {
        label: 'Strukturierte Daten für die lokale Suche',
        description:
          'Schema.org-Auszeichnung als MedicalBusiness mit Adresse, Geodaten und Einzugsgebiet – damit Google die Praxis als lokales Gesundheitsangebot in Mödling einordnen kann.',
      },
      {
        label: 'Keine externen Skripte',
        description:
          'Die Startseite lädt ein einziges, eigenes JavaScript. Kein Tag-Manager, kein Baukasten-Framework, keine Plugin-Bibliotheken.',
      },
      {
        label: 'Schriften über Bunny Fonts',
        description:
          'Newsreader und Source Sans 3 werden über Bunny Fonts statt Google Fonts eingebunden. Eine einzelne technische Entscheidung ersetzt keine Datenschutzprüfung des gesamten Auftritts.',
      },
      {
        label: 'Sprechende URLs',
        description:
          'Kurze, lesbare Adressen wie /ablauf-und-kosten und /praxis-und-anfahrt, dazu Sitemap und Canonical-Tags auf jeder Seite.',
      },
    ],
    techStack: [
      'PHP',
      'Semantisches HTML5',
      'CSS (ohne Framework)',
      'Vanilla JavaScript',
      'Bunny Fonts',
      'Schema.org MedicalBusiness',
      'Apache mit HSTS',
    ],
    results: [
      {
        label: 'Umfang',
        value: '10 Seiten',
        hint: 'inkl. Impressum und Datenschutz',
      },
      {
        label: 'Angebote',
        value: '4',
        hint: 'Psychotherapie, Lebensberatung, Supervision, Mediation',
      },
      {
        label: 'Externe Skripte',
        value: '0',
        hint: 'auf der Startseite',
      },
      {
        label: 'Standort',
        value: 'Mödling',
        hint: 'Niederösterreich',
      },
    ],
    metaTitle: 'Referenz: Praxis-Website Psychotherapie Hrdlicka, Mödling',
    metaDescription:
      'Handgeschriebene Praxis-Website für einen Psychotherapeuten in Mödling: zehn Seiten, strukturierte Daten, klare Leistungsinformationen und direkte Kontaktwege.',
  },
  {
    slug: 'umzugsmeister',
    client: 'Umzugsmeister',
    initials: 'UM',
    industry: 'Umzug · Entrümpelung · Wien',
    url: '/referenzen/umzugsmeister',
    liveUrl: 'https://www.umzugsmeister.at/',
    year: 2026,
    brandColor: '#232327',
    brandColorAccent: '#CF8755',
    screenshot: '/media/umzugsmeister-2026-11.webp',
    screenshotAlt:
      'Original-Screenshot der Umzugsmeister-Startseite mit Leistungsnavigation und Einstieg zum Umzugsangebot',
    screenshotCaption:
      'Original-Screenshot des öffentlichen Webauftritts, aktualisiert am 24. November 2026.',
    shortDescription:
      'Aktualisierter Webauftritt für ein Wiener Umzugsunternehmen: klare Leistungsseiten, mobile Kontaktwege und ein mehrstufiger Anfrage-Assistent mit optionalen Fotos. Ergänzt um regionale Inhalte und praktische Umzugsratgeber.',
    tags: ['PHP', 'Anfrage-Assistent', 'Local SEO'],
    challenge:
      'Ein Privatumzug, ein Büroumzug und eine Entrümpelung benötigen unterschiedliche Informationen. Die Website soll das passende Angebot verständlich erklären und die Eckdaten für eine persönliche Prüfung erfassen. Gleichzeitig muss klar bleiben: Die Online-Anfrage ist noch keine Buchung und kein verbindlicher Endpreis.',
    approach: [
      'Startseite und Leistungsnavigation überarbeiten: vom konkreten Vorhaben zur passenden Leistungsseite oder Angebotsanfrage.',
      'Den vorhandenen PHP-Anfrageweg erhalten und um nachvollziehbare Anfragekennungen und Bestätigungszustände ergänzen.',
      'Im Assistenten Start, Ziel, Wunschtermin, Umfang und Zusatzleistungen erfassen; Fotos als freiwillige Ergänzung kennzeichnen.',
      'Telefon und Angebotsanfrage auch auf kleinen Bildschirmen direkt erreichbar machen.',
      'Bestehende URLs, Canonicals und Sitemap im Rahmen der Aktualisierung berücksichtigen.',
      'Bezirksinhalte und Ratgeber zu praktischen Umzugsfragen gezielt ergänzen.',
    ],
    highlights: [
      {
        label: 'Orientierung nach Leistung',
        description:
          'Privatumzug, Büroumzug, Entrümpelung und weitere Leistungen erhalten eigene Einstiege. Die Startseite erklärt den Weg von der ersten Schilderung zur persönlichen Abstimmung.',
      },
      {
        label: 'Anfragen mit optionalen Fotos',
        description:
          'Ein mehrstufiger Assistent strukturiert die benötigten Angaben. Fotos können ergänzen, was sich mit Worten schwer beschreiben lässt; sie sind keine Voraussetzung für eine Anfrage.',
      },
      {
        label: 'Anfrage und Auftrag unterscheiden',
        description:
          'Nach der Übermittlung werden Umfang und Besonderheiten persönlich geklärt. Verbindliche Leistungen und Preis gehören in das schriftliche Angebot, nicht in eine pauschale Zusage des Formulars.',
      },
      {
        label: 'Laufende Weiterentwicklung',
        description:
          'Die Aktualisierung vom November 2026 ergänzt mobile Bedienung, regionale Inhalte und Umzugsratgeber. Diese Referenz zeigt umgesetzte Funktionen; sie behauptet keine gemessene Ranking-, Umsatz- oder Anfrageverbesserung.',
      },
    ],
    techStack: [
      'PHP',
      'Semantisches HTML',
      'CSS',
      'JavaScript',
      'XML-Sitemap',
      'Strukturierte Daten',
      'Transaktions-E-Mails',
    ],
    results: [
      {
        label: 'Anfrageweg',
        value: 'Schrittweise',
        hint: 'Leistung, Eckdaten und Kontakt',
      },
      {
        label: 'Fotos',
        value: 'Optional',
        hint: 'Zur Einschätzung des Vorhabens',
      },
      {
        label: 'Schwerpunkt',
        value: 'Wien & Umgebung',
        hint: 'Mit regionalen Informationsseiten',
      },
      {
        label: 'Aktualisierung',
        value: 'November 2026',
        hint: 'Website, Anfrageweg und Ratgeber',
      },
    ],
    metaTitle: 'Umzugsmeister: Website & Anfrage-Assistent | ALCOR',
    metaDescription:
      'Aktualisierte ALCOR-Referenz Umzugsmeister: Leistungsseiten, mobiler Anfrage-Assistent mit optionalen Fotos sowie regionale Inhalte und Umzugsratgeber.',
  },
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
    screenshot: '/referenzen/schmerzfrei-wien.webp',
    shortDescription:
      'Komplette Neuentwicklung der Praxis-Website für Heilmasseurin Monika Bestereimer in Wien Brigittenau – mit eigener Terminbuchung statt Baukasten-Plugin.',
    tags: ['Next.js', 'TypeScript', 'Terminbuchung'],
    challenge:
      'Die bestehende WordPress-Site war langsam, sah aus wie viele andere Therapie-Sites und bot keine direkte Buchungsmöglichkeit. Gefragt war eine Website, die der fachlichen Kompetenz und der ruhigen, persönlichen Arbeitsweise gerecht wird – und Patient:innen direkt zur Terminbuchung führt.',
    approach: [
      'Erstgespräch zur Positionierung: Was unterscheidet die Arbeit der Praxis von Standard-Massagen?',
      'Inhalte neu erstellt mit Fokus auf die drei Kernbehandlungen: Heilmassage, Liebscher & Bracht, Sculptural Facelift',
      'Eigene Buchungslogik mit Verfügbarkeitsprüfung und automatischer E-Mail-Bestätigung',
      'Ruhiges, vertrauensbildendes Design mit klarer Typografie und viel Weißraum',
      'Barrierearme Bedienung als Projektziel: lesbare Inhalte, nachvollziehbare Navigation und zugängliche Kontaktwege',
    ],
    highlights: [
      {
        label: 'Eigene Terminbuchung',
        description:
          'Statt eines fertigen Plugins eine schlanke Buchungslogik: Verfügbarkeit, Zeitfenster, Bestätigungsmail – alles in eigenem Code, kein externes Buchungstool.',
      },
      {
        label: 'Strukturierte Daten für Google',
        description:
          'Schema.org-Auszeichnung für Praxis, Leistungen und häufige Fragen – damit Google die Praxis als lokales Gesundheitsangebot korrekt einordnet.',
      },
      {
        label: 'WhatsApp-Schnellkontakt',
        description:
          'Für Patient:innen mit einer kurzen Frage: ein vorausgefüllter WhatsApp-Link auf jeder Seite.',
      },
    ],
    techStack: [
      'Next.js (App Router)',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Datenbank für Termine',
      'Transaktions-E-Mails',
    ],
    results: [
      {
        label: 'Kernbehandlungen',
        value: '3',
        hint: 'Heilmassage, Liebscher & Bracht, Sculptural Facelift',
      },
      {
        label: 'Terminbuchung',
        value: 'Eigenbau',
        hint: 'ohne externes Buchungstool',
      },
      {
        label: 'Barrierefreiheit',
        value: 'WCAG 2.2 AA',
        hint: 'als Projektziel',
      },
      {
        label: 'Standort',
        value: '1200 Wien',
        hint: 'Brigittenau',
      },
    ],
    before: {
      description:
        'Vorher lief die Site auf WordPress mit einem gekauften Theme. Patient:innen mussten anrufen oder ein Standard-Kontaktformular nutzen.',
      problems: [
        'Lange Ladezeit am Handy',
        'Kein Online-Booking, nur Anruf möglich',
        'Theme-Design ohne Wiedererkennung',
        'Viele Plugins mit laufenden Update-Zyklen',
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
    metaTitle: 'Referenz: schmerzfrei.wien – Praxis-Website mit Online-Booking',
    metaDescription:
      'Von der WordPress-Site zur eigenständigen Praxis-Website mit selbst entwickelter Terminbuchung – für eine Heilmasseurin in Wien Brigittenau.',
  },
  {
    slug: 'buero-reinigung',
    client: 'Takt – Software für Reinigungsbetriebe',
    initials: 'T',
    industry: 'Eigenes Produkt · Branchensoftware',
    url: '/referenzen/buero-reinigung',
    liveUrl: 'https://reinigung.webdesign-alcor.at',
    year: 2025,
    brandColor: '#1E40AF',
    brandColorAccent: '#60A5FA',
    screenshot: '/referenzen/buero-reinigung.webp',
    shortDescription:
      'Branchensoftware für Reinigungsbetriebe mit 5 bis 50 Kräften: Dienstplan, Zeiterfassung per QR-Code am Objekt, Mitarbeiter-App, Kundenportal mit Fotonachweis und Monatsrechnung – in einem System.',
    tags: ['PHP', 'MySQL', 'Web-App', 'Eigenes Produkt'],
    challenge:
      'In vielen Reinigungsbetrieben laufen Dienstplan, Stunden und Reklamationen über Zettel, WhatsApp-Gruppen und Anrufe beim Vorarbeiter. Gleichzeitig verlangt § 26 AZG lückenlose Arbeitszeitaufzeichnungen, und Kunden wollen einen Nachweis, dass gereinigt wurde. Die meisten Programme am Markt kommen aus Deutschland oder den USA und sind auf österreichische Vorschriften nur angepasst.',
    approach: [
      'Fünf Bausteine, ein Login: Büro, Mitarbeiter-App, Kundenportal, Besichtigung und Angebot, Rechnungen',
      'Durchgängiger Datenfluss: Aus der Besichtigung wird das Angebot, aus dem Angebot das Objekt, aus dem Objekt der Dienstplan, aus dem Dienstplan die Rechnung',
      'Anwesenheit ausschließlich über den QR-Code am Objekt – bewusst ohne Ortung',
      'Mitarbeiter-App als Link am Handy, ohne App-Store und ohne Installation',
      'Rechtliche Anforderungen von Anfang an eingebaut statt nachträglich angepasst',
    ],
    highlights: [
      {
        label: 'Sechs-Schritte-Besichtigung am Tablet',
        description:
          'Räume zählen, Sanitär, Zustand, Rhythmus – die Kalkulation läuft mit. Am Ende steht das Angebot als PDF mit fortlaufender Nummer. Wird es angenommen, ist das Objekt mit einem Klick angelegt.',
      },
      {
        label: 'Arbeitszeitaufzeichnung entsteht automatisch',
        description:
          'Aus Check-in und Check-out am QR-Schild entsteht die Aufzeichnung nach § 26 AZG – mit Monatsauswertung zur Unterschrift und Export fürs Lohnbüro.',
      },
      {
        label: 'Funktioniert ohne Empfang',
        description:
          'Die Mitarbeiter-App arbeitet auch im Keller weiter und überträgt später nach.',
      },
      {
        label: 'Datenschutz als Konstruktionsprinzip',
        description:
          'Keine Ortung (§ 10 AVRAG), Krankmeldung ohne Angabe eines Grundes (Art. 9 DSGVO), Auftragsverarbeitungsvertrag beim ersten Login (Art. 28 DSGVO).',
      },
      {
        label: 'Rechnungen nach § 11 UStG',
        description:
          'Fortlaufend nummeriert, nach Ausstellung unveränderbar, Korrektur nur per Gutschrift, Aufbewahrung nach § 132 BAO.',
      },
    ],
    techStack: [
      'PHP',
      'MySQL',
      'Vanilla JavaScript',
      'Web-App ohne App-Store',
      'Offline-Zwischenspeicher',
      'PDF-Erzeugung',
      'QR-Codes',
    ],
    results: [
      {
        label: 'Bausteine',
        value: '5',
        hint: 'ein Login, ein System',
      },
      {
        label: 'Zielgruppe',
        value: '5–50 Kräfte',
        hint: 'Reinigungsbetriebe in Österreich',
      },
      {
        label: 'Ortung',
        value: 'Keine',
        hint: 'Anwesenheit nur per QR-Code',
      },
      {
        label: 'Installation',
        value: 'Keine',
        hint: 'läuft im Browser',
      },
    ],
    businessNote:
      'Takt ist ein eigenes Produkt von WebDesign Alcor. Es zeigt, was über eine klassische Website hinaus möglich ist: Wenn Ihr Betrieb einen Ablauf hat, der in keine Standardsoftware passt, baue ich die passende Web-Anwendung.',
    metaTitle: 'Referenz: Takt – Software für Reinigungsbetriebe',
    metaDescription:
      'Eigenes Produkt von WebDesign Alcor: Dienstplan, Zeiterfassung per QR-Code, Mitarbeiter-App, Kundenportal und Rechnungen für österreichische Reinigungsbetriebe.',
  },
  {
    slug: 'alcorleads',
    client: 'ALCOR Leads – CRM & Akquise',
    initials: 'AL',
    industry: 'Eigenes Projekt · CRM & Automatisierung',
    url: '/referenzen/alcorleads',
    liveUrl: '',
    year: 2026,
    brandColor: '#25252B',
    brandColorAccent: '#CF8755',
    screenshot: '/media/alcor-crm-illustration-2026.webp',
    screenshotAlt:
      'Konzeptionelle Produktillustration: Laptop mit einer abstrakten CRM-Oberfläche, ohne echte Kontaktdaten',
    screenshotCaption:
      'Produktillustration mit neutralen Beispieldaten. Die tatsächliche Anwendung wird ausschließlich nach persönlicher Freigabe gezeigt.',
    access: 'on-request',
    shortDescription:
      'Internes CRM für ALCOR: Firmenrecherche mit Apify, individuelle LinkedIn-Kontaktaufnahme und automatisierte Übernahme belegter Interessen nach Prüfung. Kontakte, Gesprächsverlauf und nächste Schritte bleiben zusammen. Zugang auf Anfrage bei Robert.',
    tags: ['CRM', 'Apify', 'LinkedIn-Workflow'],
    challenge:
      'Eine recherchierte Firma ist noch kein interessierter Kunde. Für die eigene Akquise sollte nachvollziehbar bleiben, woher ein Kontakt stammt, was bereits besprochen wurde und wer den nächsten Schritt übernimmt. Die Aufgabe war deshalb, Recherche, persönliche Ansprache und CRM-Übergabe zu einem dokumentierten Arbeitsablauf zu verbinden, ohne aus jeder Vernetzung automatisch einen Lead zu machen.',
    approach: [
      'Öffentliche Firmendaten und Website-Informationen mit Apify recherchieren und die Ergebnisse für den CRM-Import aufbereiten.',
      'Firmen und Ansprechpartner gegen vorhandene Datensätze abgleichen; Quellen und Bearbeitungsstand erhalten.',
      'Passende berufliche Anknüpfungspunkte für die individuelle LinkedIn-Kontaktaufnahme prüfen und bestehende Gespräche berücksichtigen.',
      'Bei belegtem Interesse den Kontakt nach Prüfung automatisiert mit Profil, Gesprächslink, Interessensbeleg und nächstem Schritt in das CRM übernehmen.',
      'Ansprechpartner, Zuständigkeiten, Aufgaben und Gesprächsnotizen in einer geschützten, auch mobil nutzbaren Oberfläche zusammenführen.',
      'Den produktiven Bestand privat halten; Einblick nur nach persönlicher Freigabe und mit geeigneten Beispieldaten.',
    ],
    highlights: [
      {
        label: 'Apify als Recherchebaustein',
        description:
          'Recherchierte Firmeninformationen fließen in einen strukturierten Import. Herkunft und Zuordnung bleiben nachvollziehbar. Die Firmensuche und die persönliche LinkedIn-Ansprache sind getrennte Schritte.',
      },
      {
        label: 'LinkedIn-Interesse direkt übernehmen',
        description:
          'Die administrative Übergabe speichert geprüfte Interessenten mit Profil- und Gesprächslink, Antwortdatum, Bedarf, offenen Punkten und nächstem Schritt. Vorhandene Kontakte werden berücksichtigt, damit derselbe Ansprechpartner nicht erneut angelegt wird.',
      },
      {
        label: 'Klare Signale für die persönliche Beratung',
        description:
          'Bestätigtes Interesse wird in der Kontaktübersicht hervorgehoben und den berechtigten Nutzern als Meldung angezeigt. Diese Kennzeichnung ersetzt keine vollständige Bedarfsklärung und behauptet keinen erteilten Auftrag.',
      },
      {
        label: 'Privater Arbeitsbereich',
        description:
          'Anmeldung, Mehrfaktorprüfung, Rollen und Zuweisungen begrenzen den Zugriff. Notizen und Kontaktsperren bleiben erhalten; eine Antwort auf LinkedIn erteilt keine automatische Telefon- oder E-Mail-Freigabe.',
      },
    ],
    techStack: [
      'Next.js',
      'React',
      'TypeScript',
      'Supabase Auth',
      'PostgreSQL',
      'Apify',
      'Administrativer CRM-Import',
    ],
    results: [
      {
        label: 'Recherche',
        value: 'Apify',
        hint: 'Firmendaten mit nachvollziehbarer Quelle',
      },
      {
        label: 'Kontaktaufnahme',
        value: 'Individuell',
        hint: 'Bestehenden LinkedIn-Verlauf berücksichtigen',
      },
      {
        label: 'Übergabe',
        value: 'Mit Beleg',
        hint: 'Interesse nach Prüfung im CRM speichern',
      },
      {
        label: 'Zugang',
        value: 'Auf Anfrage',
        hint: 'Persönliche Freigabe durch Robert',
      },
    ],
    businessNote:
      'ALCOR Leads ist ein eigenes, intern genutztes Projekt von Robert Alchimowicz. Die Abbildung ist eine Illustration, kein Screenshot des produktiven Kontaktbestands. Eine persönliche Demonstration kann bei Robert angefragt werden. Apify-Recherche bedeutet keine pauschale Erlaubnis zur Kontaktaufnahme; die Ansprache erfolgt individuell innerhalb der verfügbaren Plattformfunktionen.',
    metaTitle: 'ALCOR Leads: CRM, Apify & LinkedIn | Projekt',
    metaDescription:
      'Eigenes CRM von ALCOR: Apify-Firmenrecherche, individuelle LinkedIn-Ansprache und Übernahme belegter Interessen. Bilder und Projektbeschreibung; Zugang auf Anfrage.',
  },
  {
    slug: 'therapieplan-android',
    client: 'Therapieplan – Android-App',
    initials: 'TP',
    industry: 'Android-App · Projektkontext Grüner Kreis',
    url: '/referenzen/therapieplan-android',
    liveUrl: '',
    year: 2026,
    brandColor: '#243D37',
    brandColorAccent: '#9FBEAF',
    screenshot: '/media/therapieplan-android-illustration-2026.webp',
    screenshotAlt:
      'Konzeptionelle Produktillustration: Android-Smartphone und Tablet mit einer neutralen Tagesübersicht ohne Patientendaten',
    screenshotCaption:
      'Produktillustration einer Organisations-App. Kein Original-Screenshot und keine Darstellung echter Personen- oder Gesundheitsdaten.',
    access: 'on-request',
    shortDescription:
      'Unabhängig entwickelte Organisationshilfe im Projektkontext Grüner Kreis: persönliche Termine, Notizen, Kontakte und lokale Erinnerungen auf Android. Kontrollierter Pilot mit getrenntem Einrichtungszugang; Demonstration und APK nur auf Anfrage bei Robert.',
    tags: ['Android', 'Offline-Funktionen', 'Kontrollierter Pilot'],
    challenge:
      'Termine, persönliche Notizen und tägliche Aufgaben sollen auf dem Handy schnell erreichbar sein. Gleichzeitig dürfen persönliche Gerätefunktionen und gemeinsam genutzte Einrichtungsdaten nicht verwechselt werden. Die Anwendung braucht deshalb eine klare Tagesübersicht, nachvollziehbare Rollen und einen bewusst freigegebenen Weg zum Austausch mit einer Einrichtung.',
    approach: [
      'Die Startseite als Tagesübersicht aufbauen: aktuelle und kommende Ereignisse sowie rollenbezogene Einstiege.',
      'Persönliche Termine, Notizen, Kontakte und Einstellungen lokal nutzbar machen; Erinnerungen über Android bereitstellen.',
      'Bedienung für schmale Smartphones und geeignete breite Fenster anpassen.',
      'Lokales Profil, PIN-Sperre, Wiederherstellung und persönliches Gerätebackup als eigene Funktionen vorsehen.',
      'Gemeinsame Daten ausdrücklich vom persönlichen Bereich trennen: Einrichtungsabgleich nur mit erreichbarem HTTPS-Server und persönlich freigegebenem Zugang.',
      'Bedienungsanleitung und IT-Übergabe für den kontrollierten Pilotstand 1.2.1 / Build 5 dokumentieren.',
    ],
    highlights: [
      {
        label: 'Persönliche Funktionen ohne Einrichtungsserver',
        description:
          'Eigene Termine, Notizen, Kontakte und lokale Erinnerungen sind als persönliche Gerätefunktionen vorgesehen. Das macht den gemeinsamen Betrieb einer Einrichtung nicht automatisch offline verfügbar.',
      },
      {
        label: 'Zwei klar getrennte Betriebsarten',
        description:
          'Patientenlisten, freigegebene Medikationspläne, Dienstzuteilungen und gemeinsamer Speiseplan setzen eine bestätigte Einrichtungsverbindung und passende Berechtigungen voraus. Ein lokaler Rollenname allein gewährt keinen Zugriff auf fremde Daten.',
      },
      {
        label: 'Android im Alltag prüfen',
        description:
          'Erinnerungen hängen von Android-Freigaben und Geräteeinstellungen ab. Die Dokumentation enthält dafür einen eigenen Prüfschritt; eine gespeicherte Erinnerung ist noch kein Nachweis ihrer Zustellung.',
      },
      {
        label: 'Demonstration nach Freigabe',
        description:
          'Robert stellt den Pilotstand und die Unterlagen auf Anfrage vor. Es gibt keinen öffentlichen APK-Download und keinen freien Zugang zu Einrichtungsdaten.',
      },
    ],
    techStack: [
      'Android-APK',
      'Lokale Datenspeicherung',
      'Android-Benachrichtigungen',
      'PIN-Zugang',
      'Gerätebackup',
      'Optionaler HTTPS-Einrichtungsabgleich',
    ],
    results: [
      {
        label: 'Plattform',
        value: 'Android',
        hint: 'Smartphones und geeignete Tablets',
      },
      {
        label: 'Persönlicher Bereich',
        value: 'Lokal nutzbar',
        hint: 'Termine, Notizen und Erinnerungen',
      },
      {
        label: 'Dokumentierter Stand',
        value: '1.2.1 / Build 5',
        hint: 'Kontrollierter Pilot, Stand 17.11.2026',
      },
      {
        label: 'Zugang',
        value: 'Auf Anfrage',
        hint: 'Demonstration und APK bei Robert anfragen',
      },
    ],
    businessNote:
      'Unabhängige Entwicklung von Robert Alchimowicz im Projektkontext Grüner Kreis. Die Referenz beschreibt einen kontrollierten Pilotstand und behauptet keine offizielle Produktivfreigabe oder medizinische Zulassung. Persönliche Offline-Funktionen und servergestützte Einrichtungsfunktionen sind getrennt. Die Abbildung ist eine Illustration ohne echte Gesundheitsdaten.',
    metaTitle: 'Therapieplan: Android-App im Pilot | ALCOR',
    metaDescription:
      'Android-Organisationshilfe im Projektkontext Grüner Kreis: lokale Termine und Erinnerungen, getrennter Einrichtungszugang. Kontrollierter Pilot, Demo auf Anfrage.',
  },
  {
    slug: 'psychologen-webdesign',
    client: 'psychologen-webdesign.at',
    initials: 'PW',
    industry: 'Eigene Marke · Praxis-Websites',
    url: '/referenzen/psychologen-webdesign',
    liveUrl: 'https://psychologen-webdesign.at',
    year: 2026,
    brandColor: '#7C3AED',
    brandColorAccent: '#C4B5FD',
    screenshot: '/referenzen/psychologen-webdesign.webp',
    shortDescription:
      'Spezialisierte Landing-Page für Psycholog:innen und Psychotherapeut:innen in Wien. Eigene Marke von WebDesign Alcor mit klarem Starter-Paket um € 599,–.',
    tags: ['Eigene Marke', 'Local SEO', 'Lead-Generierung'],
    challenge:
      'Psychotherapeut:innen haben besondere Anforderungen an ihre Website: hohe Vertraulichkeit, ruhige Bildsprache, klare Termin-Strukturen, Hinweise zur Kostenübernahme. Allgemeine Webdesign-Anbieter kennen diese Besonderheiten oft nicht. Es brauchte eine spezialisierte Marke, die sich genau an diese Zielgruppe richtet.',
    approach: [
      'Recherche: Wonach suchen Psycholog:innen wirklich, wenn sie eine Website wollen?',
      'Beruhigende, vertrauensbildende Farbpalette in Salbei- und Cremetönen',
      'Footer mit allen 23 Wiener Bezirken für die lokale Suche',
      'Klares Starter-Paket als Einstieg, persönliches Erstgespräch als nächster Schritt',
    ],
    highlights: [
      {
        label: 'Browser-Mockups nur mit CSS',
        description:
          'Die Portfolio-Sektion zeigt Beispiel-Praxisseiten in Browser-Rahmen – komplett mit CSS gebaut, ohne Bilddateien. Lädt sofort und wirkt trotzdem hochwertig.',
      },
      {
        label: 'Branchenspezifische FAQ',
        description:
          'Die Fragen greifen die Sorgen der Zielgruppe auf: Datenschutz für Klient:innen, Hinweise zur Kostenübernahme, Scheu vor Online-Terminen.',
      },
      {
        label: 'Schema.org Service-Markup',
        description:
          'Strukturierte Daten beschreiben das Angebot als Webdesign-Leistung für Therapeut:innen in Wien.',
      },
    ],
    techStack: [
      'Next.js (App Router)',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Formular mit Validierung',
      'Bunny Fonts',
    ],
    results: [
      {
        label: 'Zielgruppe',
        value: 'Praxen in Wien',
        hint: 'Psychologie und Psychotherapie',
      },
      {
        label: 'Einstiegspaket',
        value: '€ 599,–',
        hint: 'Starter',
      },
      {
        label: 'Bezirke im Footer',
        value: '23',
        hint: 'für die lokale Suche',
      },
    ],
    businessNote:
      'Die Marke psychologen-webdesign.at gehört zu WebDesign Alcor und richtet sich gezielt an Therapeut:innen mit eigener Praxis. Das Starter-Paket ist auf die typischen Anforderungen abgestimmt – Therapie-Spektrum, Termine, Anfahrt, Hinweise zur Kostenübernahme.',
    metaTitle: 'Referenz: psychologen-webdesign.at – Marke für Praxis-Websites',
    metaDescription:
      'Spezialisierte Landing-Page für Psycholog:innen und Psychotherapeut:innen in Wien. Eigene Marke von WebDesign Alcor mit Starter-Paket um € 599,–.',
  },
]

export function getCaseBySlug(slug: string): Case | undefined {
  return CASES.find((c) => c.slug === slug)
}
