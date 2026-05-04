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
      'Webdesign für die Innere Stadt — handgeschriebene Websites für Anwälte, Notare, Berater und Hotels im 1. Bezirk. Festpreis ab €599, Lieferung in 7 Tagen.',
    keywords: [
      'Webdesign 1010 Wien',
      'Webdesign Innere Stadt',
      'Webagentur 1. Bezirk',
      'Webdesigner Innere Stadt Wien',
      'Webdesign Anwalt Wien',
    ],
    h1: 'Webdesign in der Inneren Stadt — für Kanzleien, Berater und Häuser mit Geschichte.',
    lead: 'Eine Adresse im 1. Bezirk verpflichtet. Ihre Website sollte das auch tun — ohne Plugin-Chaos und ohne Stockfoto-Beliebigkeit.',
    localContext:
      'Der 1. Bezirk ist UNESCO-Weltkulturerbe und gleichzeitig dichtestes Geschäftsviertel Wiens. Hier sitzen Top-Kanzleien, Wirtschaftsprüfer, Privatbanken, Beratungen, Galerien, traditionsreiche Hotels und über 200 Botschaften. Mietpreise zählen zu den höchsten Österreichs — entsprechend hoch ist die Erwartungshaltung der Klientel an jeden Auftritt. Eine Website, die langsam lädt, mobil bricht oder nach Baukasten aussieht, sabotiert in diesem Umfeld jeden Erstkontakt.',
    industriesParagraph:
      'Typische Klienten im 1. Bezirk sind Rechtsanwaltskanzleien, Notariate, Steuerberater, Vermögensverwalter, Architekturbüros und Boutique-Hotels. Was sie alle brauchen: einen ruhigen, vertrauensbildenden Onlineauftritt mit klarer Hierarchie, schnellen Ladezeiten unter einer Sekunde und mehrsprachiger Option (Deutsch, Englisch — bei Botschaftsumfeld auch Französisch oder Russisch). Genau das liefert handgeschriebener Code: keine WordPress-Plugins, die das Übersetzungssetup zerschießen können, keine Wartungsfenster, keine Sicherheitslücken durch veraltete Themes.',
    painPoints: [
      'Mehrsprachige WordPress-Sites mit WPML brechen regelmäßig nach Plugin-Updates — peinlich, wenn internationale Mandanten landen.',
      'Hotelbuchungen verlieren Conversions, wenn die Seite mobil über zwei Sekunden lädt — gerade Spontanbucher klicken weg.',
      'Kanzlei-Websites mit veralteter Optik wirken anachronistisch — auch wenn die rechtliche Expertise erstklassig ist.',
      'Cookie-Banner-Fehlkonfigurationen sind im 1. Bezirk besonders riskant: Anwälte und Berater sind selbst DSGVO-Profis und erkennen Mängel sofort.',
    ],
    positioningParagraph:
      'Ich entwickle Websites, die zur Adresse passen: zurückgenommen, präzise, technisch fehlerfrei. Mehrsprachigkeit ist sauber per Routing gelöst, nicht per Plugin. Schema.org-Markup für ProfessionalService oder LegalService stellt sicher, dass Google Ihre Kanzlei oder Beratung korrekt einordnet. Lokale SEO-Optimierung auf "Anwalt 1010 Wien", "Steuerberater Innere Stadt" oder "Hotel 1. Bezirk Wien" sorgt dafür, dass Sie auch ohne Google-Ads-Budget gefunden werden.',
    faqs: [
      {
        question:
          'Sind handgeschriebene Websites für Kanzleien und Notariate die richtige Wahl?',
        answer:
          'Ja — sogar besonders. Kanzleien und Notariate sind selbst sensibel für Datensicherheit, DSGVO und Vertraulichkeit. WordPress mit Plugin-Stack widerspricht diesem Anspruch fundamental. Eine handcodierte Site hat keine offenen Plugin-Schnittstellen, keine Login-URLs, die Bots scannen, und keine Update-Pflicht, die Sie oder Ihre IT belastet.',
      },
      {
        question:
          'Können Sie mehrsprachige Websites bauen — Deutsch und Englisch ist im 1. Bezirk Standard?',
        answer:
          'Ja, Mehrsprachigkeit ist Teil des Standardangebots. Realisiert wird das per Next.js-Routing (z.B. /en/services), nicht per Plugin. Saubere hreflang-Tags, eigenständige Sitemaps pro Sprache, kein Crawling-Chaos. Auf Wunsch auch dreisprachig (z.B. + Französisch oder Russisch fürs Botschaftsumfeld).',
      },
      {
        question: 'Wie sieht es mit Datenschutz für Mandantendaten aus?',
        answer:
          'Sämtliche Formulardaten landen verschlüsselt direkt in Ihrer E-Mail oder Ihrem CRM — kein WordPress-Backend speichert sie zwischen, das angreifbar wäre. Bei Bedarf richte ich auch verschlüsselte Mandantenportale ein. Hosting läuft in EU-Rechenzentren, Bunny Fonts statt Google Fonts, vollständig DSGVO-konform.',
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
      'Webdesign für Favoriten — Websites für KMU, Gastronomie, Handwerk und Praxen im 10. Bezirk. Handgeschrieben, ohne WordPress, ab €599 in 7 Tagen.',
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
      'Typische Klienten in Favoriten sind Familienbetriebe und Soloselbstständige: Friseure und Kosmetikstudios, kleine Restaurants und Cafés, Allgemeinmediziner und Physiotherapeuten, Handwerker (Installateure, Elektriker, Tischler), Fahrschulen und KFZ-Werkstätten. Sie alle teilen ein Problem: Ihre Stammkundschaft kennt sie — aber Neukunden suchen heute zuerst auf Google. Eine Website mit klarer Lokal-SEO-Optimierung auf "Friseur Favoriten", "Allgemeinmediziner 1100 Wien" oder "Installateur Reumannplatz" macht den Unterschied zwischen "voller Terminkalender" und "halbleerem Geschäft".',
    painPoints: [
      'Viele Betriebe haben gar keine Website — nur einen Facebook-Eintrag, der bei Google kaum rankt.',
      'Bestehende Sites sind oft uralte HTML-Seiten oder Wix-Baukästen, die mobil unbenutzbar sind.',
      'Google-My-Business-Eintrag fehlt oder ist veraltet — der wichtigste lokale SEO-Hebel verschenkt.',
      'Online-Terminbuchung fehlt — gerade Praxen verlieren so täglich Anfragen außerhalb der Öffnungszeiten.',
    ],
    positioningParagraph:
      'Mein Starter-Paket ab €599 ist genau für diese Realität gemacht: Sie bekommen eine vollständige, mobil-perfekte Website mit lokaler SEO-Optimierung auf Ihren Bereich des 10. Bezirks, optionaler Online-Terminbuchung, DSGVO-konformem Impressum und Datenschutz — in sieben Werktagen. Keine monatlichen Wartungskosten. Wenn Sie zusätzlich ein Google-My-Business-Profil aufsetzen oder optimieren wollen, mache ich das im Paket mit. Persönliche Termine vor Ort sind problemlos möglich — ich bin im 22. Bezirk und mit der U1 in 25 Minuten am Reumannplatz.',
    faqs: [
      {
        question: 'Ich habe noch gar keine Website. Wo fange ich an?',
        answer:
          'Mit einem 15-minütigen Erstgespräch — telefonisch oder bei Ihnen vor Ort. Ich frage Sie, was Sie anbieten, wer Ihre typischen Kunden sind und was die Website leisten soll (Erstkontakt? Terminbuchung? Reservierungen?). Daraus entsteht ein Festpreis-Vorschlag mit Seitenstruktur. Wenn Sie zustimmen, ist die Website in sieben Werktagen online.',
      },
      {
        question:
          'Lohnt sich eine eigene Website, wenn ich auch auf willhaben.at oder herold.at gelistet bin?',
        answer:
          'Ja — und zwar deutlich. Listings auf Plattformen ranken bei Google oft schlechter als eine eigene Website mit lokaler Optimierung. Außerdem zahlen Sie auf den Plattformen für Sichtbarkeit, während eine eigene Website nach dem Launch keine laufenden Kosten verursacht. Plattform-Listings ergänzen eine eigene Website, ersetzen sie aber nicht.',
      },
      {
        question: 'Bauen Sie auch Websites auf Türkisch oder Bosnisch/Kroatisch/Serbisch?',
        answer:
          'Ja. Mehrsprachigkeit ist Teil des Standardangebots, ohne Aufpreis im Starter-Paket bei zwei Sprachen. Übersetzungen organisiere ich auf Wunsch über professionelle Übersetzer — oder Sie liefern die Texte selbst.',
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
      'Webdesign für Döbling — Websites für Ärzte, Anwälte, Steuerberater und Heurige im 19. Bezirk. Handgeschrieben, hochwertig, ab €599 in 7 Tagen.',
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
      'Typische Klienten in Döbling sind Wahlärzte (Allgemeinmedizin, Internisten, Orthopäden, Zahnärzte), Psychotherapeut:innen, Anwaltskanzleien, Steuerberater, Architekten und Heurige-Betreiber. Wahlärzte und Therapeut:innen brauchen eine Website, die Vertrauen weckt und Online-Terminbuchung integriert. Heurige brauchen eine Site, die Saisonzeiten, Karte und Reservierung sauber abbildet — auch mobil, denn die meisten Reservierungen kommen vom Smartphone unterwegs.',
    painPoints: [
      'Wahlarzt-Sites laufen oft auf alten WordPress-Themes — die Wartung übernimmt eine Agentur, die Updates aber selten zeitnah einspielt. Sicherheitslücken bleiben.',
      'Online-Terminbuchung über Drittanbieter (z.B. Doctolib) frisst Marge und führt Patient:innen weg von der eigenen Website.',
      'Heurigen-Sites zeigen oft nicht klar, wann Ausschank ist — das kostet Spontanbesucher.',
      'Mehrsprachigkeit (Englisch) fehlt häufig — internationale Patient:innen aus dem Privatklinik-Umfeld werden so verschenkt.',
    ],
    positioningParagraph:
      'Ich entwickle Websites, die zum Anspruch des Bezirks passen: zurückhaltend, präzise im Detail, technisch ohne Schwachstellen. Online-Terminbuchung kann direkt auf der Website laufen — ohne Drittanbieter-Provision. Schema.org-Markup für Physician, Dentist, LegalService oder Restaurant sorgt dafür, dass Google Ihre Praxis oder Ihren Heurigen korrekt einordnet und im Local Pack anzeigt. Lokale SEO-Optimierung auf "Wahlarzt 1190 Wien", "Anwalt Döbling" oder "Heuriger Grinzing" macht Sie im Bezirk auffindbar.',
    faqs: [
      {
        question:
          'Ich habe bereits eine Website über eine größere Agentur — lohnt sich ein Wechsel zu Ihnen?',
        answer:
          'Das hängt davon ab, was Sie monatlich für Wartung zahlen. Üblich sind in Döbling 80 bis 250 Euro pro Monat für WordPress-Wartungspakete. Wenn Sie das addieren, ergibt sich über drei Jahre schnell ein vier- bis fünfstelliger Betrag. Ein Relaunch zu handgeschriebenem Code amortisiert sich oft in unter zwei Jahren — danach zahlen Sie nichts mehr außer Hosting (€99/Jahr).',
      },
      {
        question:
          'Können Sie Online-Terminbuchung direkt in die Website integrieren — ohne Doctolib oder ähnliche Drittanbieter?',
        answer:
          'Ja. Ich integriere eine eigene Terminbuchung, die Patient:innen direkt auf Ihrer Website nutzen — kein externer Anbieter, keine monatliche Provision, keine Datenweitergabe an Dritte. Die Termine landen direkt in Ihrem Outlook-, Google- oder iCloud-Kalender. DSGVO-konform, da keine Patientendaten an Drittanbieter wandern.',
      },
      {
        question:
          'Ich betreibe einen Heurigen in Grinzing — was ist für meine Website besonders wichtig?',
        answer:
          'Drei Dinge: Erstens eine prominente, immer aktuelle Anzeige Ihrer Ausschank-Zeiten — idealerweise mit Schema.org-Markup, damit Google sie direkt im Snippet zeigt. Zweitens eine mobile Reservierungsmöglichkeit, weil die meisten Anfragen unterwegs entstehen. Drittens authentische Bilder Ihres Hauses und Ihrer Karte — keine Stockfotos. Auf Wunsch komme ich als ehemaliger Berufsfotograf mit mobilem Studio zu Ihnen.',
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
      'Die Donaustadt ist flächenmäßig der größte Wiener Bezirk und gleichzeitig einer der dynamischsten. Vom etablierten Kagran über die UNO-City und das schnell wachsende Aspern bis zu den Gewerbegebieten in Stadlau und Hirschstetten reicht das Spektrum von international tätigen Konzernen bis zum Familienbetrieb mit zwei Mitarbeitern. Aspern Seestadt ist eines der größten Stadtentwicklungsgebiete Europas — hier siedeln sich derzeit massiv neue Unternehmen an, die alle eine Website brauchen.',
    industriesParagraph:
      'Typische Klienten in der Donaustadt sind Handwerksbetriebe (Bau, Installation, Elektrik, Tischlerei), Logistik- und Transportunternehmen, Arzt- und Therapie-Praxen, Gastronomie an der Alten Donau und im Donauzentrum-Umfeld, Beratungsunternehmen in Aspern und KMU im Gewerbepark Stadlau. Was sie verbindet: ein hoher Anteil B2B, klare lokale Verwurzelung und der Wunsch, ohne Plugin-Wartung und Marketing-Bullshit auszukommen. Genau das liefere ich — als Nachbar.',
    painPoints: [
      'Viele Handwerksbetriebe haben Websites, die seit zehn Jahren nicht mehr angefasst wurden — keine Mobile-Optimierung, kein SSL, kein Eintrag bei Google My Business.',
      'B2B-Unternehmen unterschätzen, dass ihre Kunden längst auf Google nach Lieferanten suchen — auch wenn die Beziehung über Empfehlungen läuft.',
      'Aspern Seestadt-Unternehmen sind oft frisch gegründet — die "schnelle Wix-Website" wird dann zur Bremse, wenn das Geschäft wächst.',
      'Praxen entlang der U1 (Kagran, Kagraner Platz, Aderklaaer Straße) verlieren Patient:innen, weil Online-Terminbuchung fehlt.',
    ],
    positioningParagraph:
      'Ich bin Ihr Nachbar — physisch in der Berresgasse, fünf Minuten von Hirschstetten, zehn Minuten von Kagran, fünfzehn Minuten von Aspern. Persönliche Termine vor Ort sind kein Aufwand, sondern Standard. Ich kenne die typischen Wege durch den Bezirk, die Stoßzeiten an der U1, die Realität von Gewerbegebieten am Stadtrand. Mein Starter-Paket ab €599 liefert in sieben Werktagen eine Website, die mobil schnell ist, lokal optimiert auf "Handwerker 1220 Wien", "Praxis Kagran" oder "Beratung Aspern" — und keine monatliche Wartung kostet.',
    faqs: [
      {
        question:
          'Sie sind selbst in der Donaustadt — kann ich vorbeikommen oder Sie zu mir kommen?',
        answer:
          'Beides. Mein Büro ist in der Berresgasse 11, im 22. Bezirk. Persönliche Termine vor Ort bei Ihnen mache ich kostenlos im gesamten Bezirk und im benachbarten Floridsdorf. Auch während der Umsetzung können wir uns jederzeit treffen, falls etwas am Live-Stand zu besprechen ist.',
      },
      {
        question:
          'Mein Unternehmen sitzt in Aspern Seestadt — gibt es etwas Besonderes zu beachten?',
        answer:
          'Aspern ist ein Gewerbestandort im starken Wachstum. Was hier oft fehlt: lokale SEO-Optimierung auf "Aspern" als Suchbegriff. Viele Unternehmen optimieren auf "Wien" und gehen im Gesamtmarkt unter. Wer "Beratung Aspern Seestadt" oder "Café Aspern" optimiert, hat oft konkurrenzfreie Top-Rankings bei hoher Kaufintention. Genau dafür baue ich Ihre Seite.',
      },
      {
        question: 'Bauen Sie auch komplexere B2B-Sites mit Kundenportal oder CRM-Anbindung?',
        answer:
          'Ja. Ich habe für eine Reinigungsfirma im 22. Bezirk eine komplette Plattform mit CRM, Personalplanung, Tablet-PWA und Mitarbeiter-Check-in entwickelt — siehe Referenz "Büroreinigung Wien". Solche Projekte gehen über das Starter-Paket hinaus und werden individuell kalkuliert, mit Festpreis vor Projektstart.',
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
      'Webdesign für Liesing — handgeschriebene Websites für KMU im 23. Bezirk. Spezialisierte Niche-Site verfügbar: webdesign-liesing.wien.',
    keywords: [
      'Webdesign 1230 Wien',
      'Webdesign Liesing',
      'Webagentur 23. Bezirk',
      'Webdesigner Liesing',
    ],
    h1: 'Webdesign in Liesing — vom Stadtrand bis ins Industriegebiet.',
    lead: 'Liesing hat einen eigenen Charakter zwischen Wienerwald und Wiener Becken. Für den 23. Bezirk gibt es bei ALCOR Group eine spezialisierte Niche-Site mit lokalem Tiefenwissen.',
    localContext:
      'Liesing ist Wiens südlichster Bezirk und vereint mehrere Welten: das alte Ortszentrum in Mauer mit Heurigen-Tradition, die lebhafte Geschäftsstraße in Atzgersdorf, die großen Industriegebiete in Inzersdorf, Familienunternehmen in Rodaun und Kalksburg sowie Wohnviertel rund um Erlaa und Siebenhirten. 100.000 Einwohner und ein hoher Anteil an Klein- und Mittelbetrieben prägen den Bezirk.',
    industriesParagraph:
      'Typische Klienten in Liesing sind produzierende Betriebe und Handel im Inzersdorfer Industriegebiet, Handwerksbetriebe und Dienstleister verteilt über alle Bezirksteile, Heurige und Gastronomie in Mauer und Rodaun, Praxen und Einzelhandel an der U6-Achse Siebenhirten/Alterlaa.',
    painPoints: [
      'Industriebetriebe in Inzersdorf haben oft veraltete oder gar keine Websites — B2B-Anfragen kommen heute aber zuerst über Google.',
      'Lokale Geschäfte in Atzgersdorf und Mauer optimieren ihre Sites kaum auf Bezirks-Suchanfragen — die Konkurrenz aus dem Zentrum hat dadurch leichtes Spiel.',
      'Heurige in Mauer haben oft schöne Visitenkarten-Sites, aber keine SEO — Spontanbesucher landen daher beim Mitbewerber.',
    ],
    positioningParagraph:
      'Für den 23. Bezirk betreibe ich unter ALCOR Group eine eigene spezialisierte Site: webdesign-liesing.wien. Dort finden Sie ausführliches lokales Wissen zu jedem Bezirksteil — von Atzgersdorf über Mauer bis Siebenhirten — und bezirksspezifische SEO-Strategien. Wenn Sie konkret in Liesing aktiv sind, ist die Niche-Site die bessere Adresse. Hier auf alcor.at finden Sie die übergeordnete Wien-Strategie und alle Leistungen im Überblick.',
    faqs: [
      {
        question:
          'Warum gibt es eine eigene Site für Liesing und gleichzeitig diese Bezirks-Page auf alcor.at?',
        answer:
          'webdesign-liesing.wien ist eine spezialisierte Niche-Site mit Tiefenwissen zu jedem Bezirksteil und SEO-Fokus auf den 23. Bezirk. Diese Page hier dient der Übersicht und verlinkt auf die Niche-Site. Beide Sites werden von mir betreut, das Angebot ist identisch — nur der Schwerpunkt unterscheidet sich.',
      },
      {
        question: 'Sie sind im 22. Bezirk — sind persönliche Termine in Liesing möglich?',
        answer:
          'Ja, problemlos. Liesing ist mit dem Auto in 25 Minuten erreichbar, mit der U6 + S-Bahn in unter 45 Minuten. Persönliche Termine vor Ort kosten nichts extra.',
      },
    ],
    nearbyDistricts: ['hietzing', 'meidling', 'favoriten'],
    nicheSiteHint: {
      url: 'https://webdesign-liesing.wien',
      label: 'webdesign-liesing.wien — die spezialisierte Niche-Site',
      reason:
        'Tiefenwissen zu allen 8 Bezirksteilen (Atzgersdorf, Erlaa, Inzersdorf, Kalksburg, Mauer, Rodaun, Siebenhirten, Liesing-Mitte) plus eigener Blog mit Liesing-Fokus.',
    },
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
    metaDescription: `Webdesign für den ${b.num}. Bezirk Wien (${b.name}). Handgeschriebene Websites ohne WordPress, ab €599 in 7 Tagen.`,
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
