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
    h1: "Website erstellen lassen in Wien",
    faqs: [
      {
        "question": "Was kostet es, eine Website in Wien erstellen zu lassen?",
        "answer": "Das Starter-Paket kostet € 599 einmalig und umfasst bis zu fünf Seiten, Kontaktformular, technisches SEO und die Live-Schaltung. Größere Websites mit Blog, Mini-CMS oder eigenen Funktionen bekommen nach dem Erstgespräch einen schriftlichen Festpreis. Alle Preise sind Endpreise, es kommt keine Umsatzsteuer dazu. Hosting ist optional und kostet bei mir € 99 pro Jahr."
      },
      {
        "question": "Wie lange dauert die Erstellung?",
        "answer": "Eine Starter-Website ist sieben Tage nach dem Kickoff online – vorausgesetzt, Texte und Bilder liegen vor oder wir haben vereinbart, dass ich sie erstelle. Umfangreichere Projekte dauern meist zwei bis drei Wochen. Den Termin halte ich schriftlich fest."
      },
      {
        "question": "Was muss ich vor dem Start liefern?",
        "answer": "Im Idealfall Logo, Texte und Fotos. Fehlt etwas davon, ist das kein Hindernis: Bei Texten helfe ich mit Struktur und Formulierung, und als Berufsfotograf kann ich die Bilder für Ihre Website auf Wunsch selbst aufnehmen."
      },
      {
        "question": "Kann ich Inhalte später selbst ändern?",
        "answer": "Ja, wenn Sie das möchten. Auf Wunsch baue ich ein schlankes Mini-CMS ein, mit dem Sie Texte und Bilder ohne Programmierkenntnisse pflegen. Wer nur selten etwas ändert, schickt mir die Änderung einfach – abgerechnet wird nach tatsächlichem Aufwand, ohne Wartungsvertrag."
      },
      {
        "question": "Gehört die Website nach der Fertigstellung wirklich mir?",
        "answer": "Ja. Sie erhalten den vollständigen Quellcode und alle Zugangsdaten zu Domain und Hosting. Es gibt keine Lizenzgebühren und keine technische Bindung an mich – jede:r Webentwickler:in kann mit dem Code weiterarbeiten."
      },
      {
        "question": "Wie steht es um DSGVO und Barrierefreiheit?",
        "answer": "Schriften werden DSGVO-konform eingebunden, es gibt kein Tracking ohne Einwilligung, und Formulardaten werden mit klarer Löschfrist gespeichert. Gebaut wird nach WCAG 2.2 AA: Tastaturbedienung, ausreichende Kontraste, saubere Überschriftenstruktur. Die Inhalte von Impressum und Datenschutzerklärung stimmen wir gemeinsam ab; rechtlich verantwortlich bleibt der Betreiber der Website."
      }
    ],
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
      'Sie brauchen eine neue Website. Schnell, sicher, ohne Wartungsalbtraum. Genau das mache ich seit über zehn Jahren – und ich mache es selbst, von der ersten Strategie-Skizze bis zum letzten Deploy.',
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
    h1: "Website-Relaunch in Wien",
    faqs: [
      {
        "question": "Verliere ich durch einen Relaunch meine Google-Rankings?",
        "answer": "Nicht, wenn der Relaunch sauber geplant ist. Vor dem Start erfasse ich alle bestehenden Adressen, übernehme die Inhalte, die bereits gut ranken, und leite jede alte Adresse per 301-Weiterleitung auf die passende neue Seite. Nach der Umschaltung kontrolliere ich in der Google Search Console, ob alles korrekt indexiert wird. Kurzfristige Schwankungen sind normal, dauerhafte Verluste entstehen fast immer durch fehlende Weiterleitungen."
      },
      {
        "question": "Kann ich von WordPress zu handgeschriebenem Code wechseln?",
        "answer": "Ja, das ist der häufigste Fall. Texte, Bilder und Blogartikel werden aus WordPress übernommen, die Seitenstruktur bleibt – wo sinnvoll – erhalten. Danach entfallen Plugin-Updates, Theme-Lizenzen und die meisten Sicherheitsrisiken. Die alte WordPress-Installation schalte ich nach der Umstellung ab."
      },
      {
        "question": "Ist meine Website während des Relaunchs offline?",
        "answer": "Nein. Die neue Website entsteht auf einer Testadresse, Ihre bestehende läuft unverändert weiter. Die Umschaltung selbst dauert wenige Minuten und findet zu einem vereinbarten Zeitpunkt statt."
      },
      {
        "question": "Was kostet ein Relaunch?",
        "answer": "Das hängt von Seitenzahl und Funktionen ab. Ein kompakter Auftritt mit bis zu fünf Seiten liegt im Bereich des Starter-Pakets ab € 599. Für größere Websites erhalten Sie nach dem kostenlosen Audit einen schriftlichen Festpreis – inklusive Migration und Weiterleitungen."
      },
      {
        "question": "Woran erkenne ich, dass ein Relaunch fällig ist?",
        "answer": "Typische Zeichen: Die Seite lädt am Handy länger als zwei, drei Sekunden, das Design ist älter als fünf Jahre, Änderungen sind mühsam, es kommen kaum Anfragen, oder Plugin-Updates verursachen regelmäßig Probleme. Im Audit bekommen Sie dazu einen ehrlichen Befund – auch wenn das Ergebnis lautet, dass gezielte Korrekturen reichen."
      }
    ],
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
    h1: "SEO Wien – auf Google und in der KI-Suche gefunden werden",
    faqs: [
      {
        "question": "Wie lange dauert es, bis SEO wirkt?",
        "answer": "Technische Korrekturen – Ladezeit, Indexierung, strukturierte Daten – zeigen oft innerhalb weniger Wochen Wirkung. Bessere Platzierungen für umkämpfte Suchbegriffe wie „Webdesign Wien“ oder „Installateur 1100“ brauchen in der Regel drei bis sechs Monate, weil Google Vertrauen erst aufbauen muss."
      },
      {
        "question": "Was gehört zu lokaler SEO für Wiener Unternehmen?",
        "answer": "Ein vollständig gepflegtes Google-Unternehmensprofil, einheitliche Firmendaten (Name, Adresse, Telefon) im gesamten Web, Bewertungen echter Kund:innen, Inhalte zu Ihrem Bezirk und Ihrer Leistung sowie strukturierte Daten, die Google Standort und Angebot eindeutig mitteilen."
      },
      {
        "question": "Garantieren Sie Platz 1 bei Google?",
        "answer": "Nein – und niemand kann das seriös. Google entscheidet die Reihenfolge selbst, und sie ändert sich laufend. Was ich zusage: eine nachvollziehbare Maßnahmenliste, saubere Umsetzung und monatliche Zahlen, an denen Sie den Fortschritt ablesen."
      },
      {
        "question": "Was ist GEO und brauche ich das?",
        "answer": "GEO steht für Generative Engine Optimization: Inhalte so aufzubereiten, dass KI-Assistenten wie ChatGPT, Perplexity oder die KI-Übersichten von Google sie verstehen und als Quelle nennen. Dazu gehören klare Antworten auf konkrete Fragen, strukturierte Daten und eine maschinenlesbare Zusammenfassung Ihres Angebots. Wer Dienstleistungen anbietet, nach denen Menschen Assistenten fragen, profitiert davon."
      },
      {
        "question": "Funktioniert SEO auch mit meiner bestehenden WordPress-Seite?",
        "answer": "Grundsätzlich ja. Inhalte, Google-Unternehmensprofil und strukturierte Daten lassen sich auf jeder Website verbessern. Grenzen setzt die Technik: Wenn Themes und Plugins die Ladezeit dauerhaft drücken, ist ein Relaunch oft der günstigere Weg als monatelange Detailarbeit."
      }
    ],
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
