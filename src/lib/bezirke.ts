/**
 * Bezirks-Landingpages für SEO Long-Tail-Strategie.
 *
 * Jeder Bezirk bekommt eine eigene Page unter /webdesign/[slug].
 * Content-driven: Pflege erfolgt hier zentral, Page rendert dynamisch.
 *
 * Tier-1 (vollständiger Content): 1010, 1100, 1190, 1220, 1230
 * Tier-2 (Scaffold zum Befüllen): alle übrigen 18 Bezirke
 *
 * KRITISCH für SEO: Jeder Bezirk MUSS unique Content haben.
 * Duplizieren ohne Anpassung = Google sieht "doorway pages" → Abwertung.
 */

export type BezirkFAQ = {
  question: string
  answer: string
}

export type Bezirk = {
  /** URL-Slug, z.B. 'donaustadt' → /webdesign/donaustadt */
  slug: string
  /** Bezirksnummer 1-23 */
  num: number
  /** Bezirksname laut amtlicher Bezeichnung */
  name: string
  /** Postleitzahl */
  plz: string
  /** Status: 'full' = produktiv, 'scaffold' = noch zu befüllen */
  status: 'full' | 'scaffold'
  /** SEO Title - 50-60 Zeichen */
  metaTitle: string
  /** SEO Description - 140-160 Zeichen */
  metaDescription: string
  /** Hauptkeywords für diese Seite */
  keywords: string[]
  /** H1 der Seite */
  h1: string
  /** Italic Lead-Text unter H1 (1-2 Sätze) */
  lead: string
  /** Charakter des Bezirks - Geographie, Atmosphäre, Eigenart (3-5 Sätze) */
  localContext: string
  /** Typische Branchen im Bezirk + warum sie eine moderne Website brauchen */
  industriesParagraph: string
  /** Bezirks-spezifische Pain Points (3-5) */
  painPoints: string[]
  /** Welche Mitbewerber-Probleme habe ich gelöst (mit Bezug zum Bezirk falls möglich) */
  positioningParagraph: string
  /** 2-4 hyperlokale FAQ */
  faqs: BezirkFAQ[]
  /** Slugs der angrenzenden/verwandten Bezirke für Internal Linking */
  nearbyDistricts: string[]
  /** Optional: Verweis auf Niche-Sites der ALCOR Group */
  nicheSiteHint?: {
    url: string
    label: string
    reason: string
  }
}

/**
 * Hilfs-Slug-Map: Bezirksname → URL-Slug
 * Für Konsistenz mit viennaDistricts in site.ts
 */
export const BEZIRK_SLUGS: Record<number, string> = {
  1: 'innere-stadt',
  2: 'leopoldstadt',
  3: 'landstrasse',
  4: 'wieden',
  5: 'margareten',
  6: 'mariahilf',
  7: 'neubau',
  8: 'josefstadt',
  9: 'alsergrund',
  10: 'favoriten',
  11: 'simmering',
  12: 'meidling',
  13: 'hietzing',
  14: 'penzing',
  15: 'rudolfsheim-fuenfhaus',
  16: 'ottakring',
  17: 'hernals',
  18: 'waehring',
  19: 'doebling',
  20: 'brigittenau',
  21: 'floridsdorf',
  22: 'donaustadt',
  23: 'liesing',
}

export const BEZIRKE: Bezirk[] = [
  // ────────────────────────────────────────────────────────────
  // TIER 1: Vollständig befüllte Top-Bezirke
  // ────────────────────────────────────────────────────────────

  {
    slug: 'innere-stadt',
    num: 1,
    name: 'Innere Stadt',
    plz: '1010',
    status: 'full',
    metaTitle: 'Webdesign 1010 Wien | Webagentur Innere Stadt | Alcor',
    metaDescription:
      'Webdesign für die Innere Stadt — handgeschriebene Websites für Anwälte, Notare, Berater und Hotels im 1. Bezirk. Einfache Basis-Homepage 599 €. Business und Premium nach Vereinbarung.',
    keywords: [
      'Webdesign 1010 Wien',
      'Webdesign Innere Stadt',
      'Webagentur 1. Bezirk',
      'Webdesigner Innere Stadt Wien',
      'Webdesign Anwalt Wien',
    ],
    h1: 'Webdesign in der Inneren Stadt — für Kanzleien, Berater und Häuser mit Geschichte.',
    lead: "Ein klarer Auftritt für Ihr Unternehmen im 1. Bezirk: Leistungen, Ansprechpartner und Kontaktwege verständlich darstellen.",
    localContext:
      "Für Kanzleien, Beratungen, Galerien oder Hotels in der Inneren Stadt zählen nachvollziehbare Informationen: Wer ist zuständig, welche Leistungen werden angeboten und wie lässt sich ein Termin oder ein Gespräch vereinbaren? Die Website sollte diese Fragen beantworten und Standort sowie Anfahrt verständlich zeigen.",
    industriesParagraph:
      "Der Ansatz eignet sich für Kanzleien, Notariate, Beratungen, Architekturbüros und Hotels, die einen individuell abgestimmten Auftritt benötigen. Gemeinsam planen wir Seitenstruktur, Kontaktwege und bei Bedarf zusätzliche Sprachen. Funktionen, Übersetzungen, Pflege und technische Prüfung werden konkret vereinbart – nicht pauschal durch die Wahl eines Systems ersetzt.",
    painPoints: [
      "Bei mehreren Sprachen müssen Inhalte, Navigation und spätere Aktualisierungen zusammenpassen.",
      "Eine Buchungs- oder Anfragefunktion sollte auch auf einem Smartphone verständlich bedienbar sein.",
      "Unklare Zuständigkeiten und veraltete Leistungsbeschreibungen erschweren die Vorbereitung eines Erstgesprächs.",
      "Formulare und externe Dienste benötigen eine bewusste Planung der Datenerhebung, Zugänge und rechtlichen Informationen.",
    ],
    positioningParagraph:
      "Ich entwickle einen zu Ihrem Angebot passenden Auftritt mit verständlicher Struktur, nachvollziehbaren Kontaktwegen und technischer Prüfung. Mehrsprachigkeit und besondere Funktionen werden separat geplant. Passende strukturierte Daten können die Inhalte für Suchmaschinen beschreiben; eine bestimmte Platzierung oder Darstellung wird damit nicht zugesagt.",
    faqs: [
      {
        question:
          'Sind handgeschriebene Websites für Kanzleien und Notariate die richtige Wahl?',
        answer:
          "Das kann sinnvoll sein, wenn Gestaltung und Funktionen gezielt auf die Kanzlei abgestimmt werden sollen. Ob eine individuelle Entwicklung oder ein CMS passt, hängt von Pflegebedarf, Abläufen und Budget ab. Für beide Wege müssen Zuständigkeiten für Aktualisierungen, Zugriffsschutz und den Umgang mit Daten geklärt werden.",
      },
      {
        question:
          "Können zusätzliche Sprachen vorgesehen werden?",
        answer:
          "Ja, zusätzliche Sprachversionen können im Business- oder Premium-Projekt vereinbart werden. Wir klären Seitenumfang, Übersetzungen, technische Umsetzung und spätere Pflege. Mehrsprachigkeit ist kein automatischer Bestandteil der Basis-Homepage.",
      },
      {
        question: 'Wie sieht es mit Datenschutz für Mandantendaten aus?',
        answer:
          "Vor der Umsetzung klären wir, welche Angaben wirklich benötigt werden, wo sie verarbeitet werden und wer Zugriff erhält. Technische Schutzmaßnahmen und eingesetzte Dienste werden projektbezogen abgestimmt. Vertrauliche Mandantenunterlagen gehören nicht in ein allgemeines Erstkontaktformular. Eine rechtliche Prüfung wird durch Webentwicklung nicht ersetzt.",
      },
    ],
    nearbyDistricts: ['leopoldstadt', 'landstrasse', 'wieden', 'mariahilf', 'neubau'],
  },

  {
    slug: 'favoriten',
    num: 10,
    name: 'Favoriten',
    plz: '1100',
    status: 'full',
    metaTitle: 'Webdesign 1100 Wien | Webagentur Favoriten | Alcor',
    metaDescription:
      'Webdesign für Favoriten — Websites für KMU, Gastronomie, Handwerk und Praxen im 10. Bezirk. Handgeschrieben, ohne WordPress, Basis-Homepage 599 €, weitere Pakete nach Vereinbarung.',
    keywords: [
      'Webdesign 1100 Wien',
      'Webdesign Favoriten',
      'Webagentur 10. Bezirk',
      'Webdesigner Favoriten',
      'Webdesign Reumannplatz',
    ],
    h1: 'Webdesign in Favoriten — für die Geschäfte, Praxen und Werkstätten zwischen Reumannplatz und Hauptbahnhof.',
    lead: 'Der 10. Bezirk ist Wiens größter — und einer der vielfältigsten. Ihre Website sollte zeigen, wer Sie sind, statt in einem Baukasten-Template zu verschwinden.',
    localContext:
      'Favoriten ist mit über 213.000 Einwohnern der bevölkerungsreichste Wiener Bezirk. Vom revitalisierten Sonnwendviertel rund um den Hauptbahnhof über den lebhaften Reumannplatz bis zu den ruhigeren Wohnvierteln rund um den Laaer Berg deckt der Bezirk eine enorme wirtschaftliche Bandbreite ab. Hier finden sich kleine Gastronomiebetriebe, Friseure, Handwerker, Arzt- und Therapie-Praxen, KFZ-Werkstätten, Steuerberater und zahlreiche inhabergeführte Geschäfte.',
    industriesParagraph:
      "Für Friseurbetriebe, Gastronomie, Handwerk oder Praxen in Favoriten kann ein klarer Auftritt die Vorbereitung einer Anfrage erleichtern. Wichtige Informationen sind Leistungen, Öffnungs- beziehungsweise Kontaktzeiten, Anfahrt und der passende nächste Schritt. Lokale Suchbegriffe müssen zum tatsächlichen Angebot passen; ein voller Terminkalender lässt sich daraus nicht versprechen.",
    painPoints: [
      "Ein Social-Media-Profil allein bietet nicht immer Raum für alle Leistungsinformationen und Kontaktwege.",
      'Bestehende Sites sind oft uralte HTML-Seiten oder Wix-Baukästen, die mobil unbenutzbar sind.',
      'Google-My-Business-Eintrag fehlt oder ist veraltet — der wichtigste lokale SEO-Hebel verschenkt.',
      'Online-Terminbuchung fehlt — gerade Praxen verlieren so täglich Anfragen außerhalb der Öffnungszeiten.',
    ],
    positioningParagraph:
      'Ich arbeite persönlich an ausgewählten Website-Projekten. Die einfache Basis-Homepage für 599 € umfasst eine Seite mit bereitgestellten Inhalten, responsiver Darstellung und Basis-SEO. Kein Kontaktformular, keine Animationen und keine Erstellung von Rechtstexten. Business und Premium werden individuell vereinbart. Preise sind einmalig und ohne Umsatzsteuer; Hosting und Zusatzleistungen werden separat ausgewiesen. Umfang, Zeitplan, 60 % Anzahlung, 40 % nach Abnahme und bis zu fünf Korrekturrunden werden schriftlich festgelegt.',
    faqs: [
      {
        question: 'Ich habe noch gar keine Website. Wo fange ich an?',
        answer:
          'Mit einem 15-minütigen Erstgespräch — telefonisch oder bei Ihnen vor Ort. Ich frage Sie, was Sie anbieten, wer Ihre typischen Kunden sind und was die Website leisten soll (Erstkontakt? Terminbuchung? Reservierungen?). Daraus entsteht ein Festpreis-Vorschlag mit Seitenstruktur. Leistungsumfang und Zeitplan stehen im Vertrag; die Umsetzung beginnt nach Auftragserteilung und vereinbarter Anzahlung.',
      },
      {
        question:
          'Lohnt sich eine eigene Website, wenn ich auch auf willhaben.at oder herold.at gelistet bin?',
        answer:
          'Ja — und zwar deutlich. Listings auf Plattformen ranken bei Google oft schlechter als eine eigene Website mit lokaler Optimierung. Außerdem zahlen Sie auf den Plattformen für Sichtbarkeit, während Domain, Hosting und gegebenenfalls beauftragte Pflege der eigenen Website separat kalkulierbar sind. Plattform-Listings ergänzen eine eigene Website, ersetzen sie aber nicht.',
      },
      {
        question: 'Bauen Sie auch Websites auf Türkisch oder Bosnisch/Kroatisch/Serbisch?',
        answer:
          'Mehrsprachigkeit und Übersetzungen werden im Business- oder Premium-Projekt separat vereinbart. Die einfache Basis-Homepage enthält keine kostenlose Mehrsprachigkeit.',
      },
    ],
    nearbyDistricts: ['simmering', 'meidling', 'wieden', 'landstrasse', 'liesing'],
  },

  {
    slug: 'doebling',
    num: 19,
    name: 'Döbling',
    plz: '1190',
    status: 'full',
    metaTitle: 'Webdesign 1190 Wien | Webagentur Döbling | Alcor',
    metaDescription:
      'Webdesign für Döbling — Websites für Ärzte, Anwälte, Steuerberater und Heurige im 19. Bezirk. Handgeschrieben, hochwertig, Basis-Homepage 599 €, weitere Pakete nach Vereinbarung.',
    keywords: [
      'Webdesign 1190 Wien',
      'Webdesign Döbling',
      'Webagentur 19. Bezirk',
      'Webdesigner Döbling Wien',
      'Webdesign Grinzing',
    ],
    h1: 'Webdesign in Döbling — für Praxen, Kanzleien und Heurige zwischen Heiligenstadt und Grinzing.',
    lead: 'Der 19. Bezirk hat einen Ruf zu verteidigen. Ihre Website sollte ihn unterstreichen — nicht mit dem nächsten WordPress-Theme verwässern.',
    localContext:
      'Döbling gehört zu den wohlhabendsten Wiener Bezirken. Heuriger-Vororte wie Grinzing, Sievering und Nußdorf treffen auf Villenviertel in Hohe Warte und Cottage, dazu kommt das medizinische Cluster rund um die Privatklinik Döbling. Klientel und Patient:innen erwarten hier einen seriösen, ruhigen Auftritt — laut, blinkend oder generisch wirkt sofort fehl am Platz. Gleichzeitig ist die Konkurrenz im Premium-Segment hoch: Eine schwache Website verliert im Vergleich mit etablierten Praxen oder Kanzleien sofort an Glaubwürdigkeit.',
    industriesParagraph:
      "Eine Praxis, Kanzlei oder ein Gastronomiebetrieb hat unterschiedliche Anforderungen. Für eine Praxis können Leistungsinformationen und ein verständlicher Terminweg sinnvoll sein. Ein Heurigenbetrieb benötigt möglicherweise aktuelle Ausschankzeiten, eine Karte und eine passende Reservierungsmöglichkeit. Diese Abläufe bestimmen die Website, nicht ein festes Standardpaket.",
    painPoints: [
      "Bei einer bestehenden Website sollte klar sein, wer eingesetzte Komponenten aktualisiert und Änderungen prüft.",
      "Für Buchungen sollten eigene Funktionen und externe Dienste anhand von Kosten, Bedienung und Datenverarbeitung verglichen werden.",
      "Aktuelle Ausschankzeiten und Kontaktwege sollten ohne langes Suchen auffindbar sein.",
      "Zusätzliche Sprachen sind sinnvoll, wenn sie zur Kundschaft passen und anschließend gepflegt werden können.",
    ],
    positioningParagraph:
      "Ich plane zurückhaltende, gut lesbare Websites mit klaren Leistungsinformationen und Kontaktwegen. Eine Termin- oder Reservierungsfunktion kann nach Vereinbarung hinzukommen. Standortangaben und passende strukturierte Daten unterstützen die technische Einordnung; Rankings und eine Darstellung im Google Local Pack sind keine zugesagten Ergebnisse.",
    faqs: [
      {
        question:
          'Ich habe bereits eine Website über eine größere Agentur — lohnt sich ein Wechsel zu Ihnen?',
        answer:
          "Ein Relaunch sollte anhand der bestehenden Probleme und Ihrer Ziele geprüft werden. Vergleichen Sie Erstellung, Hosting, Lizenzen, Betreuung und spätere Änderungen über denselben Zeitraum. Auch eine individuelle Website kann Pflege und Updates benötigen. Eine pauschale Amortisationsfrist oder ausschließlich Hostingkosten lassen sich ohne konkreten Umfang nicht seriös zusagen.",
      },
      {
        question:
          "Kann eine Terminbuchung in die Website integriert werden?",
        answer:
          "Ja, eine Buchungsfunktion kann individuell vereinbart werden. Welche Daten benötigt werden und ob Kalender oder andere Dienste angebunden werden, wird vorab festgelegt. Eine eigene Oberfläche bedeutet nicht automatisch, dass keine externen Dienste beteiligt sind. Laufende Kosten, Zuständigkeiten und Datenschutzanforderungen werden gesondert geklärt.",
      },
      {
        question:
          'Ich betreibe einen Heurigen in Grinzing — was ist für meine Website besonders wichtig?',
        answer:
          "Wichtig sind aktuelle Ausschankzeiten, verständliche Anfahrt, eine gut lesbare Karte und der gewünschte Reservierungsweg. Eigene, geeignete Bilder vermitteln den Betrieb konkret. Welche Inhalte Sie bereitstellen und welche zusätzliche Unterstützung erforderlich ist, besprechen wir vor Projektbeginn.",
      },
    ],
    nearbyDistricts: ['waehring', 'alsergrund', 'brigittenau', 'floridsdorf'],
  },

  {
    slug: 'donaustadt',
    num: 22,
    name: 'Donaustadt',
    plz: '1220',
    status: 'full',
    metaTitle: 'Webdesign 1220 Wien | Webagentur Donaustadt | Alcor',
    metaDescription:
      'Webdesign aus der Donaustadt für die Donaustadt — handgeschriebene Websites für KMU, Handwerk und Praxen im 22. Bezirk. Direkt vor Ort, ab €599.',
    keywords: [
      'Webdesign 1220 Wien',
      'Webdesign Donaustadt',
      'Webagentur 22. Bezirk',
      'Webdesigner Donaustadt',
      'Webdesign Kagran',
      'Webdesign Aspern',
    ],
    h1: 'Webdesign aus der Donaustadt — für die Unternehmen, neben denen ich arbeite.',
    lead: 'Mein Büro ist in der Berresgasse, mitten im 22. Bezirk. Ich kenne die Region — und die Unternehmen, die hier ihre Wurzeln haben.',
    localContext:
      "Für Betriebe in Kagran, Aspern, Stadlau oder Hirschstetten sollte eine Website das konkrete Angebot und den tatsächlichen Einsatzbereich erklären. Mein Standort ist in der Berresgasse in 1220 Wien. Im Gespräch klären wir, welche Standortinformationen und Kontaktwege für Ihre Kundschaft relevant sind.",
    industriesParagraph:
      "Der Ansatz richtet sich beispielsweise an Handwerksbetriebe, Transport- und Logistikunternehmen, Praxen und Beratungen in der Donaustadt. Im Mittelpunkt stehen verständliche Leistungen, passende Projektbeispiele und direkte Kontaktwege. Ich betreue ausgewählte Projekte persönlich und stimme Umfang sowie technische Betreuung vorab ab.",
    painPoints: [
      "Eine ältere Website sollte auf mobile Bedienbarkeit, aktuelle Inhalte und funktionierende Kontaktwege geprüft werden.",
      "Für Geschäftskunden müssen Leistungen, Einsatzgebiet und Voraussetzungen einer Anfrage klar sein.",
      "Bei einem wachsenden Unternehmen sollte geprüft werden, ob Seitenstruktur und Funktionen noch zum Angebot passen.",
      "Für Praxen sollte der Weg von der Leistungsinformation zur Kontakt- oder Terminanfrage nachvollziehbar sein.",
    ],
    positioningParagraph:
      'Ich arbeite persönlich an ausgewählten Website-Projekten. Die einfache Basis-Homepage für 599 € umfasst eine Seite mit bereitgestellten Inhalten, responsiver Darstellung und Basis-SEO. Kein Kontaktformular, keine Animationen und keine Erstellung von Rechtstexten. Business und Premium werden individuell vereinbart. Preise sind einmalig und ohne Umsatzsteuer; Hosting und Zusatzleistungen werden separat ausgewiesen. Umfang, Zeitplan, 60 % Anzahlung, 40 % nach Abnahme und bis zu fünf Korrekturrunden werden schriftlich festgelegt.',
    faqs: [
      {
        question:
          'Sie sind selbst in der Donaustadt — kann ich vorbeikommen oder Sie zu mir kommen?',
        answer:
          "Mein Standort ist in der Berresgasse in 1220 Wien. Persönliche Gespräche werden vorab vereinbart. Ob ein Termin telefonisch, per Video oder vor Ort sinnvoll ist, stimmen wir gemeinsam ab; Verfügbarkeit und gegebenenfalls Aufwand werden dabei geklärt.",
      },
      {
        question:
          'Mein Unternehmen sitzt in Aspern Seestadt — gibt es etwas Besonderes zu beachten?',
        answer:
          "Verwenden Sie den tatsächlichen Standort und beschreiben Sie Ihr Einzugsgebiet dort, wo es für Kunden hilfreich ist. Informationen zu Leistungen, Erreichbarkeit und Anfahrt müssen zur Praxis passen. Lokale Suchbegriffe werden anhand des Angebots geprüft; konkurrenzfreie Rankings oder bestimmte Platzierungen werden nicht versprochen.",
      },
      {
        question: 'Bauen Sie auch komplexere B2B-Sites mit Kundenportal oder CRM-Anbindung?',
        answer:
          "Individuelle Anwendungen, Kundenportale oder Anbindungen können nach Prüfung des Umfangs vereinbart werden. Als Einblick finden Sie im Portfolio TAKT, ein eigenes Produkt für Reinigungsbetriebe mit Planung und Zeiterfassung. Es ist als eigenes Produkt gekennzeichnet, nicht als behaupteter Kundenauftrag aus dem Bezirk.",
      },
    ],
    nearbyDistricts: ['floridsdorf', 'leopoldstadt', 'landstrasse'],
  },

  {
    slug: 'liesing',
    num: 23,
    name: 'Liesing',
    plz: '1230',
    status: 'full',
    metaTitle: 'Webdesign 1230 Wien | Webagentur Liesing | Alcor',
    metaDescription:
      'Webdesign für Liesing — handgeschriebene Websites für KMU im 23. Bezirk, von Atzgersdorf über Mauer bis Siebenhirten. Basis-Homepage 599 €, Zeitplan nach Vereinbarung.',
    keywords: [
      'Webdesign 1230 Wien',
      'Webdesign Liesing',
      'Webagentur 23. Bezirk',
      'Webdesigner Liesing',
    ],
    h1: 'Webdesign in Liesing — vom Stadtrand bis ins Industriegebiet.',
    lead: 'Liesing hat einen eigenen Charakter zwischen Wienerwald und Wiener Becken. Wer hier gefunden werden will, braucht eine Website, die auf den Bezirk und seine Ortsteile abgestimmt ist.',
    localContext:
      'Liesing ist Wiens südlichster Bezirk und vereint mehrere Welten: das alte Ortszentrum in Mauer mit Heurigen-Tradition, die lebhafte Geschäftsstraße in Atzgersdorf, die großen Industriegebiete in Inzersdorf, Familienunternehmen in Rodaun und Kalksburg sowie Wohnviertel rund um Erlaa und Siebenhirten. 100.000 Einwohner und ein hoher Anteil an Klein- und Mittelbetrieben prägen den Bezirk.',
    industriesParagraph:
      "Für produzierende Unternehmen, Handel, Handwerk, Gastronomie und Praxen in Liesing sind unterschiedliche Informationen wichtig. Ein B2B-Auftritt kann technische Leistungen und Anfragevoraussetzungen erklären; bei einem lokalen Dienstleister stehen Angebot, Einsatzgebiet und Kontakt oft im Vordergrund.",
    painPoints: [
      "Bei B2B-Angeboten sollten Leistungen und Voraussetzungen für eine konkrete Anfrage verständlich beschrieben sein.",
      'Lokale Geschäfte in Atzgersdorf und Mauer optimieren ihre Sites kaum auf Bezirks-Suchanfragen — die Konkurrenz aus dem Zentrum hat dadurch leichtes Spiel.',
      "Für Gastronomiebetriebe helfen aktuelle Zeiten, Anfahrt und ein erreichbarer Kontakt- oder Reservierungsweg.",
    ],
    positioningParagraph:
      'Für Betriebe in Liesing baue ich Websites, die auf die lokale Suche im 23. Bezirk ausgerichtet sind: mit den Ortsteilen, in denen Sie tatsächlich arbeiten — von Atzgersdorf, Erlaa und Inzersdorf über Mauer, Rodaun und Kalksburg bis Siebenhirten — sauber ausgezeichneten Standortdaten und Inhalten, die zu den Suchanfragen Ihrer Kundschaft passen. Handgeschrieben, ohne WordPress, mit Festpreis und einem einzigen Ansprechpartner.',
    faqs: [
      {
        question: 'Sie sind im 22. Bezirk — sind persönliche Termine in Liesing möglich?',
        answer:
          'Ja, problemlos. Liesing ist mit dem Auto in 25 Minuten erreichbar, mit der U6 + S-Bahn in unter 45 Minuten. Persönliche Termine vor Ort kosten nichts extra.',
      },
    ],
    nearbyDistricts: ['hietzing', 'meidling', 'favoriten'],
  },

  // ────────────────────────────────────────────────────────────
  // TIER 2: Scaffold-Bezirke (zum Befüllen nach Bedarf)
  //
  // Diese werden in Phase 2 ausgebaut. Bis dahin werden sie
  // NICHT in Sitemap und Footer aufgenommen (siehe getPublishedBezirke()).
  // ────────────────────────────────────────────────────────────

  ...createScaffolds([
    { num: 2, name: 'Leopoldstadt', plz: '1020', slug: 'leopoldstadt' },
    { num: 3, name: 'Landstraße', plz: '1030', slug: 'landstrasse' },
    { num: 4, name: 'Wieden', plz: '1040', slug: 'wieden' },
    { num: 5, name: 'Margareten', plz: '1050', slug: 'margareten' },
    { num: 6, name: 'Mariahilf', plz: '1060', slug: 'mariahilf' },
    { num: 7, name: 'Neubau', plz: '1070', slug: 'neubau' },
    { num: 8, name: 'Josefstadt', plz: '1080', slug: 'josefstadt' },
    { num: 9, name: 'Alsergrund', plz: '1090', slug: 'alsergrund' },
    { num: 11, name: 'Simmering', plz: '1110', slug: 'simmering' },
    { num: 12, name: 'Meidling', plz: '1120', slug: 'meidling' },
    { num: 13, name: 'Hietzing', plz: '1130', slug: 'hietzing' },
    { num: 14, name: 'Penzing', plz: '1140', slug: 'penzing' },
    { num: 15, name: 'Rudolfsheim-Fünfhaus', plz: '1150', slug: 'rudolfsheim-fuenfhaus' },
    { num: 16, name: 'Ottakring', plz: '1160', slug: 'ottakring' },
    { num: 17, name: 'Hernals', plz: '1170', slug: 'hernals' },
    { num: 18, name: 'Währing', plz: '1180', slug: 'waehring' },
    { num: 20, name: 'Brigittenau', plz: '1200', slug: 'brigittenau' },
    { num: 21, name: 'Floridsdorf', plz: '1210', slug: 'floridsdorf' },
  ]),
]

/**
 * Erstellt Scaffold-Einträge für noch nicht ausgebaute Bezirke.
 * Diese werden NICHT publiziert (siehe getPublishedBezirke).
 */
function createScaffolds(
  list: { num: number; name: string; plz: string; slug: string }[]
): Bezirk[] {
  return list.map((b) => ({
    slug: b.slug,
    num: b.num,
    name: b.name,
    plz: b.plz,
    status: 'scaffold' as const,
    metaTitle: `Webdesign ${b.plz} Wien | Webagentur ${b.name} | Alcor`,
    metaDescription: `Webdesign für den ${b.num}. Bezirk Wien (${b.name}). Handgeschriebene Websites ohne WordPress, Basis-Homepage 599 €, weitere Pakete nach Vereinbarung.`,
    keywords: [
      `Webdesign ${b.plz} Wien`,
      `Webdesign ${b.name}`,
      `Webagentur ${b.num}. Bezirk`,
    ],
    h1: `Webdesign in ${b.name} — bald verfügbar.`,
    lead: 'Diese Bezirks-Seite wird derzeit ausgebaut.',
    localContext: '',
    industriesParagraph: '',
    painPoints: [],
    positioningParagraph: '',
    faqs: [],
    nearbyDistricts: [],
  }))
}

// ────────────────────────────────────────────────────────────
// Helper Functions
// ────────────────────────────────────────────────────────────

/**
 * Liefert nur publizierte Bezirke (status === 'full').
 * Für Sitemap, Footer-Links, generateStaticParams.
 */
export function getPublishedBezirke(): Bezirk[] {
  return BEZIRKE.filter((b) => b.status === 'full')
}

/**
 * Liefert ALLE Bezirke (auch Scaffolds) — für Hub-Page als "coming soon" Marker.
 */
export function getAllBezirke(): Bezirk[] {
  return BEZIRKE
}

/**
 * Findet einen Bezirk per Slug. Gibt undefined zurück wenn nicht gefunden
 * oder noch nicht publiziert.
 */
export function getBezirkBySlug(slug: string): Bezirk | undefined {
  const b = BEZIRKE.find((b) => b.slug === slug)
  return b?.status === 'full' ? b : undefined
}
