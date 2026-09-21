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
    "slug": "psychotherapie-hrdlicka",
    "client": "Psychotherapie Hrdlicka",
    "initials": "GH",
    "industry": "Gesundheit · Psychotherapie · Mödling",
    "url": "/referenzen/psychotherapie-hrdlicka",
    "liveUrl": "https://psychotherapie-hrdlicka.at",
    "year": 2026,
    "brandColor": "#1F3A4D",
    "brandColorAccent": "#9DB4C0",
    "screenshot": "/referenzen/psychotherapie-hrdlicka.webp",
    "shortDescription": "Praxis-Website für Psychotherapeut Mag. Gerald Hrdlicka in Mödling: zehn ruhig gestaltete Seiten zu Psychotherapie, Lebensberatung, Supervision und Mediation – handgeschrieben, ohne CMS-Ballast.",
    "tags": [
      "PHP",
      "Semantisches HTML",
      "Schema.org",
      "Bunny Fonts"
    ],
    "challenge": "Eine Praxis mit vier Angeboten – Psychotherapie, Lebensberatung, Supervision und Mediation – für Kinder, Jugendliche und Erwachsene. Wer eine solche Seite besucht, ist oft in einer belastenden Situation. Die Website darf deshalb nicht überfordern: Sie muss in wenigen Klicks beantworten, ob das Angebot passt, wie eine Therapie abläuft, was sie kostet und wie man zu einem Termin kommt.",
    "approach": [
      "Seitenstruktur entlang der Fragen von Klient:innen: Angebot, Methode, Ablauf und Kosten, Praxis und Anfahrt, Kontakt",
      "Eigene Seite zur Integrativen Gestalttherapie – verständlich erklärt statt Fachjargon",
      "Ruhige Bildsprache und eine gut lesbare Serifenschrift für Überschriften, klare Groteskschrift für Fließtext",
      "Bereich „Interviews“ für Presse- und Medienbeiträge",
      "Hinweis auf Online-Termine per Zoom und Telefon direkt beim Angebot",
      "Terminanfrage als durchgängiger Hauptweg auf jeder Seite"
    ],
    "highlights": [
      {
        "label": "Strukturierte Daten für die lokale Suche",
        "description": "Schema.org-Auszeichnung als MedicalBusiness mit Adresse, Geodaten und Einzugsgebiet – damit Google die Praxis als lokales Gesundheitsangebot in Mödling einordnen kann."
      },
      {
        "label": "Keine externen Skripte",
        "description": "Die Startseite lädt ein einziges, eigenes JavaScript. Kein Tag-Manager, kein Baukasten-Framework, keine Plugin-Bibliotheken."
      },
      {
        "label": "Schriften DSGVO-konform",
        "description": "Newsreader und Source Sans 3 kommen über Bunny Fonts aus der EU – ohne Übermittlung an Google."
      },
      {
        "label": "Sprechende URLs",
        "description": "Kurze, lesbare Adressen wie /ablauf-und-kosten und /praxis-und-anfahrt, dazu Sitemap und Canonical-Tags auf jeder Seite."
      }
    ],
    "techStack": [
      "PHP",
      "Semantisches HTML5",
      "CSS (ohne Framework)",
      "Vanilla JavaScript",
      "Bunny Fonts",
      "Schema.org MedicalBusiness",
      "Apache mit HSTS"
    ],
    "results": [
      {
        "label": "Umfang",
        "value": "10 Seiten",
        "hint": "inkl. Impressum und Datenschutz"
      },
      {
        "label": "Angebote",
        "value": "4",
        "hint": "Psychotherapie, Lebensberatung, Supervision, Mediation"
      },
      {
        "label": "Externe Skripte",
        "value": "0",
        "hint": "auf der Startseite"
      },
      {
        "label": "Standort",
        "value": "Mödling",
        "hint": "Niederösterreich"
      }
    ],
    "metaTitle": "Referenz: Praxis-Website Psychotherapie Hrdlicka, Mödling",
    "metaDescription": "Handgeschriebene Praxis-Website für einen Psychotherapeuten in Mödling: zehn Seiten, strukturierte Daten, keine externen Skripte, DSGVO-konforme Schriften."
  },
  {
    "slug": "umzugsmeister",
    "client": "Umzugsmeister",
    "initials": "UM",
    "industry": "Umzug · Entrümpelung · Wien",
    "url": "/referenzen/umzugsmeister",
    "liveUrl": "https://www.umzugsmeister.at",
    "year": 2026,
    "brandColor": "#232327",
    "brandColorAccent": "#CF8755",
    "shortDescription": "Website für ein Wiener Umzugsunternehmen mit Online-Umzugsangebot in wenigen Minuten: neun Leistungsarten, Foto-Upload, transparente Stundensätze und eigene Seiten für Bezirke und EU-Umzüge.",
    "tags": [
      "PHP",
      "Anfrage-Assistent",
      "Local SEO",
      "Ratgeber"
    ],
    "challenge": "Wer einen Umzug plant, vergleicht mehrere Anbieter und will vor allem eines wissen: Was kostet das – und kommen am Ende Zuschläge dazu? Die Website muss diese Frage offen beantworten und den Weg zur Anfrage so kurz machen, dass er auch am Handy zwischen zwei Terminen funktioniert.",
    "approach": [
      "Online-Umzugsangebot als zentraler Weg: Leistungsart wählen, Eckdaten erfassen, Fotos hochladen, absenden",
      "Neun Einstiege in denselben Assistenten – von Privatumzug über Firmenumzug und Entrümpelung bis Klaviertransport und Verlassenschaft",
      "Preistransparenz als eigener Abschnitt: Stundensätze für 2, 3 und 4 Mann mit LKW, inklusive USt., mit klarer Aussage zu Zuschlägen",
      "Eigene Seiten für Leistungen, Wiener Bezirke und EU-Umzüge für die lokale Suche",
      "Ratgeber-Bereich für Suchanfragen wie „Was kostet ein Umzug in Wien?“",
      "Telefon und Angebot als fixe Leiste am Handy – ein Tipp zum Anrufen, ein Tipp zur Anfrage"
    ],
    "highlights": [
      {
        "label": "Anfrage-Assistent mit Foto-Upload",
        "description": "Statt eines leeren Textfelds führt ein Assistent durch die Anfrage. Fotos der Wohnung ersetzen in vielen Fällen die Besichtigung – das spart beiden Seiten einen Termin."
      },
      {
        "label": "Vergleich „bei anderen / bei uns“",
        "description": "Kilometer-, Wochenend-, Nacht-, Sprit- und Parkzuschlag stehen nebeneinander. Die wichtigste Kaufentscheidung wird auf einen Blick beantwortet."
      },
      {
        "label": "Rechtstexte vollständig",
        "description": "Impressum, Datenschutzerklärung und AGB als eigene Seiten – bei Verbrauchergeschäften keine Kür, sondern Pflicht."
      },
      {
        "label": "Klick-zu-Anruf überall",
        "description": "Festnetz, Mobil, WhatsApp und E-Mail sind auf jeder Seite erreichbar, mit korrekt ausgezeichneten tel:-Links."
      }
    ],
    "techStack": [
      "PHP",
      "Semantisches HTML5",
      "CSS",
      "Vanilla JavaScript",
      "XML-Sitemap",
      "Open Graph"
    ],
    "results": [
      {
        "label": "Leistungsarten",
        "value": "9",
        "hint": "im Online-Umzugsangebot"
      },
      {
        "label": "Anfrage",
        "value": "ca. 5 Min",
        "hint": "laut Assistent auf der Website"
      },
      {
        "label": "Einzugsgebiet",
        "value": "Wien + EU",
        "hint": "mit eigenen Landingpages"
      },
      {
        "label": "Rechtstexte",
        "value": "3",
        "hint": "Impressum, Datenschutz, AGB"
      }
    ],
    "metaTitle": "Referenz: Umzugsmeister Wien – Website mit Online-Umzugsangebot",
    "metaDescription": "Website für ein Wiener Umzugsunternehmen: Anfrage-Assistent mit Foto-Upload, transparente Stundensätze, Bezirks- und EU-Seiten, Ratgeber für die lokale Suche."
  },
  {
    "slug": "schmerzfrei-wien",
    "client": "schmerzfrei.wien",
    "initials": "SW",
    "industry": "Gesundheit · Heilmassage · Schmerztherapie",
    "url": "/referenzen/schmerzfrei-wien",
    "liveUrl": "https://schmerzfrei.wien",
    "year": 2026,
    "brandColor": "#0F766E",
    "brandColorAccent": "#5EEAD4",
    "screenshot": "/referenzen/schmerzfrei-wien.webp",
    "shortDescription": "Komplette Neuentwicklung der Praxis-Website für Heilmasseurin Monika Bestereimer in Wien Brigittenau – mit eigener Terminbuchung statt Baukasten-Plugin.",
    "tags": [
      "Next.js",
      "TypeScript",
      "Terminbuchung"
    ],
    "challenge": "Die bestehende WordPress-Site war langsam, sah aus wie viele andere Therapie-Sites und bot keine direkte Buchungsmöglichkeit. Gefragt war eine Website, die der fachlichen Kompetenz und der ruhigen, persönlichen Arbeitsweise gerecht wird – und Patient:innen direkt zur Terminbuchung führt.",
    "approach": [
      "Erstgespräch zur Positionierung: Was unterscheidet die Arbeit der Praxis von Standard-Massagen?",
      "Inhalte neu erstellt mit Fokus auf die drei Kernbehandlungen: Heilmassage, Liebscher & Bracht, Sculptural Facelift",
      "Eigene Buchungslogik mit Verfügbarkeitsprüfung und automatischer E-Mail-Bestätigung",
      "Ruhiges, vertrauensbildendes Design mit klarer Typografie und viel Weißraum",
      "Barrierefreiheit nach WCAG 2.2 AA – wichtig für Patient:innen mit eingeschränkter Mobilität"
    ],
    "highlights": [
      {
        "label": "Eigene Terminbuchung",
        "description": "Statt eines fertigen Plugins eine schlanke Buchungslogik: Verfügbarkeit, Zeitfenster, Bestätigungsmail – alles in eigenem Code, kein externes Buchungstool."
      },
      {
        "label": "Strukturierte Daten für Google",
        "description": "Schema.org-Auszeichnung für Praxis, Leistungen und häufige Fragen – damit Google die Praxis als lokales Gesundheitsangebot korrekt einordnet."
      },
      {
        "label": "WhatsApp-Schnellkontakt",
        "description": "Für Patient:innen mit einer kurzen Frage: ein vorausgefüllter WhatsApp-Link auf jeder Seite."
      }
    ],
    "techStack": [
      "Next.js (App Router)",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Datenbank für Termine",
      "Transaktions-E-Mails"
    ],
    "results": [
      {
        "label": "Kernbehandlungen",
        "value": "3",
        "hint": "Heilmassage, Liebscher & Bracht, Sculptural Facelift"
      },
      {
        "label": "Terminbuchung",
        "value": "Eigenbau",
        "hint": "ohne externes Buchungstool"
      },
      {
        "label": "Barrierefreiheit",
        "value": "WCAG 2.2 AA",
        "hint": "als Projektziel"
      },
      {
        "label": "Standort",
        "value": "1200 Wien",
        "hint": "Brigittenau"
      }
    ],
    "before": {
      "description": "Vorher lief die Site auf WordPress mit einem gekauften Theme. Patient:innen mussten anrufen oder ein Standard-Kontaktformular nutzen.",
      "problems": [
        "Lange Ladezeit am Handy",
        "Kein Online-Booking, nur Anruf möglich",
        "Theme-Design ohne Wiedererkennung",
        "Viele Plugins mit laufenden Update-Zyklen",
        "Keine strukturierten Daten für Google"
      ]
    },
    "testimonial": {
      quote:
        'Robert hat innerhalb von einer Woche etwas geliefert, was meine alte Agentur in vier Monaten nicht geschafft hat. Die Site sieht aus, wie ich mich fühle – ruhig, professionell, ohne Schnickschnack. Und die Anfragen kommen.',
      author: 'Monika Bestereimer',
      role: 'Diplomierte Heilmasseurin',
      verified: true,
    },
    "metaTitle": "Referenz: schmerzfrei.wien – Praxis-Website mit Online-Booking",
    "metaDescription": "Von der WordPress-Site zur eigenständigen Praxis-Website mit selbst entwickelter Terminbuchung – für eine Heilmasseurin in Wien Brigittenau."
  },
  {
    "slug": "buero-reinigung",
    "client": "Takt – Software für Reinigungsbetriebe",
    "initials": "T",
    "industry": "Eigenes Produkt · Branchensoftware",
    "url": "/referenzen/buero-reinigung",
    "liveUrl": "https://reinigung.webdesign-alcor.at",
    "year": 2025,
    "brandColor": "#1E40AF",
    "brandColorAccent": "#60A5FA",
    "screenshot": "/referenzen/buero-reinigung.webp",
    "shortDescription": "Branchensoftware für Reinigungsbetriebe mit 5 bis 50 Kräften: Dienstplan, Zeiterfassung per QR-Code am Objekt, Mitarbeiter-App, Kundenportal mit Fotonachweis und Monatsrechnung – in einem System.",
    "tags": [
      "PHP",
      "MySQL",
      "Web-App",
      "Eigenes Produkt"
    ],
    "challenge": "In vielen Reinigungsbetrieben laufen Dienstplan, Stunden und Reklamationen über Zettel, WhatsApp-Gruppen und Anrufe beim Vorarbeiter. Gleichzeitig verlangt § 26 AZG lückenlose Arbeitszeitaufzeichnungen, und Kunden wollen einen Nachweis, dass gereinigt wurde. Die meisten Programme am Markt kommen aus Deutschland oder den USA und sind auf österreichische Vorschriften nur angepasst.",
    "approach": [
      "Fünf Bausteine, ein Login: Büro, Mitarbeiter-App, Kundenportal, Besichtigung und Angebot, Rechnungen",
      "Durchgängiger Datenfluss: Aus der Besichtigung wird das Angebot, aus dem Angebot das Objekt, aus dem Objekt der Dienstplan, aus dem Dienstplan die Rechnung",
      "Anwesenheit ausschließlich über den QR-Code am Objekt – bewusst ohne Ortung",
      "Mitarbeiter-App als Link am Handy, ohne App-Store und ohne Installation",
      "Rechtliche Anforderungen von Anfang an eingebaut statt nachträglich angepasst"
    ],
    "highlights": [
      {
        "label": "Sechs-Schritte-Besichtigung am Tablet",
        "description": "Räume zählen, Sanitär, Zustand, Rhythmus – die Kalkulation läuft mit. Am Ende steht das Angebot als PDF mit fortlaufender Nummer. Wird es angenommen, ist das Objekt mit einem Klick angelegt."
      },
      {
        "label": "Arbeitszeitaufzeichnung entsteht automatisch",
        "description": "Aus Check-in und Check-out am QR-Schild entsteht die Aufzeichnung nach § 26 AZG – mit Monatsauswertung zur Unterschrift und Export fürs Lohnbüro."
      },
      {
        "label": "Funktioniert ohne Empfang",
        "description": "Die Mitarbeiter-App arbeitet auch im Keller weiter und überträgt später nach."
      },
      {
        "label": "Datenschutz als Konstruktionsprinzip",
        "description": "Keine Ortung (§ 10 AVRAG), Krankmeldung ohne Angabe eines Grundes (Art. 9 DSGVO), Auftragsverarbeitungsvertrag beim ersten Login (Art. 28 DSGVO)."
      },
      {
        "label": "Rechnungen nach § 11 UStG",
        "description": "Fortlaufend nummeriert, nach Ausstellung unveränderbar, Korrektur nur per Gutschrift, Aufbewahrung nach § 132 BAO."
      }
    ],
    "techStack": [
      "PHP",
      "MySQL",
      "Vanilla JavaScript",
      "Web-App ohne App-Store",
      "Offline-Zwischenspeicher",
      "PDF-Erzeugung",
      "QR-Codes"
    ],
    "results": [
      {
        "label": "Bausteine",
        "value": "5",
        "hint": "ein Login, ein System"
      },
      {
        "label": "Zielgruppe",
        "value": "5–50 Kräfte",
        "hint": "Reinigungsbetriebe in Österreich"
      },
      {
        "label": "Ortung",
        "value": "Keine",
        "hint": "Anwesenheit nur per QR-Code"
      },
      {
        "label": "Installation",
        "value": "Keine",
        "hint": "läuft im Browser"
      }
    ],
    "businessNote": "Takt ist ein eigenes Produkt der ALCOR Group. Es zeigt, was über eine klassische Website hinaus möglich ist: Wenn Ihr Betrieb einen Ablauf hat, der in keine Standardsoftware passt, baue ich die passende Web-Anwendung.",
    "metaTitle": "Referenz: Takt – Software für Reinigungsbetriebe",
    "metaDescription": "Eigenes Produkt der ALCOR Group: Dienstplan, Zeiterfassung per QR-Code, Mitarbeiter-App, Kundenportal und Rechnungen für österreichische Reinigungsbetriebe."
  },
  {
    "slug": "alcorleads",
    "client": "AlcorLeads",
    "initials": "AL",
    "industry": "Eigenes Produkt · Web-Anwendung",
    "url": "/referenzen/alcorleads",
    "liveUrl": "https://alcorleads.com",
    "year": 2026,
    "brandColor": "#3A2A1E",
    "brandColorAccent": "#CF8755",
    "screenshot": "/referenzen/alcorleads.webp",
    "shortDescription": "Eigene Web-Anwendung für die Verwaltung von Leads, zugänglich nur mit Login. Handgeschrieben in PHP, betrieben auf klassischem Webhosting in Österreich.",
    "tags": [
      "PHP",
      "Web-App",
      "Login-Bereich"
    ],
    "challenge": "Akquise besteht aus vielen kleinen Schritten: Kontakte erfassen, Status nachhalten, nichts vergessen. Tabellen werden dabei schnell unübersichtlich, große CRM-Systeme sind für ein Ein-Personen-Unternehmen zu schwer. AlcorLeads ist das Werkzeug dazwischen.",
    "approach": [
      "Geschützter Bereich mit Anmeldung und „Passwort vergessen“-Funktion",
      "Bewusst ohne Framework und ohne externe Dienste gebaut – läuft auf jedem üblichen PHP-Hosting",
      "Oberfläche im eigenen Erscheinungsbild statt Standard-Admin-Theme"
    ],
    "highlights": [
      {
        "label": "Eigener Login statt Fremddienst",
        "description": "Die Anmeldung ist Teil der Anwendung – kein externer Login-Anbieter, über den Zugangsdaten laufen."
      },
      {
        "label": "Auch für Kundenprojekte",
        "description": "Wenn Ihr Betrieb eine interne Web-Anwendung mit Login braucht, baue ich sie nach demselben Prinzip: handgeschrieben, ohne Framework-Abhängigkeit, auf Ihrem Hosting."
      }
    ],
    "techStack": [
      "PHP",
      "HTML und CSS ohne Framework",
      "Login mit Passwort-Reset"
    ],
    "results": [
      {
        "label": "Zugang",
        "value": "Nur mit Login",
        "hint": "kein öffentlicher Bereich"
      },
      {
        "label": "Hosting",
        "value": "Österreich",
        "hint": "klassisches Webhosting"
      },
      {
        "label": "Framework",
        "value": "Keines",
        "hint": "handgeschrieben"
      }
    ],
    "metaTitle": "Referenz: AlcorLeads – eigene Web-Anwendung für Leads",
    "metaDescription": "AlcorLeads ist eine eigene, handgeschriebene Web-Anwendung der ALCOR Group zur Lead-Verwaltung – in PHP, ohne Framework, gehostet in Österreich."
  },
  {
    "slug": "psychologen-webdesign",
    "client": "psychologen-webdesign.at",
    "initials": "PW",
    "industry": "Eigene Marke · Praxis-Websites",
    "url": "/referenzen/psychologen-webdesign",
    "liveUrl": "https://psychologen-webdesign.at",
    "year": 2026,
    "brandColor": "#7C3AED",
    "brandColorAccent": "#C4B5FD",
    "screenshot": "/referenzen/psychologen-webdesign.webp",
    "shortDescription": "Spezialisierte Landing-Page für Psycholog:innen und Psychotherapeut:innen in Wien. Eigene Marke der ALCOR Group mit klarem Starter-Paket um € 599,–.",
    "tags": [
      "Eigene Marke",
      "Local SEO",
      "Lead-Generierung"
    ],
    "challenge": "Psychotherapeut:innen haben besondere Anforderungen an ihre Website: hohe Vertraulichkeit, ruhige Bildsprache, klare Termin-Strukturen, Hinweise zur Kostenübernahme. Allgemeine Webdesign-Anbieter kennen diese Besonderheiten oft nicht. Es brauchte eine spezialisierte Marke, die sich genau an diese Zielgruppe richtet.",
    "approach": [
      "Recherche: Wonach suchen Psycholog:innen wirklich, wenn sie eine Website wollen?",
      "Beruhigende, vertrauensbildende Farbpalette in Salbei- und Cremetönen",
      "Footer mit allen 23 Wiener Bezirken für die lokale Suche",
      "Klares Starter-Paket als Einstieg, persönliches Erstgespräch als nächster Schritt"
    ],
    "highlights": [
      {
        "label": "Browser-Mockups nur mit CSS",
        "description": "Die Portfolio-Sektion zeigt Beispiel-Praxisseiten in Browser-Rahmen – komplett mit CSS gebaut, ohne Bilddateien. Lädt sofort und wirkt trotzdem hochwertig."
      },
      {
        "label": "Branchenspezifische FAQ",
        "description": "Die Fragen greifen die Sorgen der Zielgruppe auf: Datenschutz für Klient:innen, Hinweise zur Kostenübernahme, Scheu vor Online-Terminen."
      },
      {
        "label": "Schema.org Service-Markup",
        "description": "Strukturierte Daten beschreiben das Angebot als Webdesign-Leistung für Therapeut:innen in Wien."
      }
    ],
    "techStack": [
      "Next.js (App Router)",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Formular mit Validierung",
      "Bunny Fonts"
    ],
    "results": [
      {
        "label": "Zielgruppe",
        "value": "Praxen in Wien",
        "hint": "Psychologie und Psychotherapie"
      },
      {
        "label": "Einstiegspaket",
        "value": "€ 599,–",
        "hint": "Starter"
      },
      {
        "label": "Bezirke im Footer",
        "value": "23",
        "hint": "für die lokale Suche"
      }
    ],
    "businessNote": "Die Marke psychologen-webdesign.at ist Teil der ALCOR Group und richtet sich gezielt an Therapeut:innen mit eigener Praxis. Das Starter-Paket ist auf die typischen Anforderungen abgestimmt – Therapie-Spektrum, Termine, Anfahrt, Hinweise zur Kostenübernahme.",
    "metaTitle": "Referenz: psychologen-webdesign.at – Marke für Praxis-Websites",
    "metaDescription": "Spezialisierte Landing-Page für Psycholog:innen und Psychotherapeut:innen in Wien. Eigene Marke der ALCOR Group mit Starter-Paket um € 599,–."
  }
]

export function getCaseBySlug(slug: string): Case | undefined {
  return CASES.find((c) => c.slug === slug)
}
