/**
 * Eigene Tools (Lab-Projekte).
 * Werden auf /referenzen unter "Eigene Tools" angezeigt.
 * Sind keine Kunden-Referenzen, sondern Demonstrationen technischer Fähigkeit.
 */

export type Tool = {
  slug: string
  name: string
  category: string
  shortDescription: string
  description: string
  features: string[]
  techStack: string[]
  status: 'Im Einsatz' | 'In Entwicklung' | 'Privat'
  visibility: 'public' | 'private'
  visibilityNote?: string
  brandColor: string
  brandColorAccent: string
}

export const TOOLS: Tool[] = [
  {
    slug: 'bewerbungssystem',
    name: 'KI-Bewerbungs-Generator',
    category: 'Productivity · KI-gestützt',
    shortDescription:
      'Erzeugt aus Stelleninserat und Lebenslauf in 5–10 Minuten ein vollständiges Bewerbungspaket nach DIN 5008 – Anschreiben, Motivationsschreiben, optional Lebenslauf.',
    description:
      'Das System analysiert ein gegebenes Stelleninserat (URL oder Text), erkennt die Anforderungen und Unternehmenskultur, und kombiniert das mit dem Lebenslauf des Bewerbers. Ergebnis: ein vollständig nach DIN 5008 formatiertes Bewerbungsschreiben, ein Motivationsschreiben sowie optional ein neu generierter Lebenslauf. Dokumente werden als PDF heruntergeladen, fertig zum Versand.',
    features: [
      'Stelleninserat-Analyse: erkennt Schlüsselanforderungen, Unternehmenskultur, Branche',
      'Lebenslauf-Parsing: liest bestehenden CV ein und mappt auf Stellenanforderungen',
      'DIN 5008 konforme Formatierung: korrekte Adressfeld-Position, Bezugszeichen, Datum',
      'Drei Dokumente in einem Durchlauf: Bewerbungsschreiben, Motivationsschreiben, optionaler Lebenslauf',
      'PDF-Download: print- und versandfertig',
      'Komplette Bearbeitungszeit: 5–10 Minuten von der Eingabe bis zur fertigen Bewerbung',
    ],
    techStack: [
      'Next.js 15',
      'TypeScript',
      'Anthropic Claude API',
      'PDF-Generation (React-PDF)',
      'Tailwind CSS',
    ],
    status: 'Im Einsatz',
    visibility: 'private',
    visibilityNote:
      'Wird für eigene Bewerbungs-Vorbereitung genutzt. Eine öffentliche Version ist in Planung – Anfragen über das Kontaktformular.',
    brandColor: '#1F2937',
    brandColorAccent: '#9CA3AF',
  },

  {
    slug: 'leadgen-tool',
    name: 'Lead-Generator (Wien)',
    category: 'B2B · Datenakquise',
    shortDescription:
      'Filtert nach Bezirk in Wien automatisch potenzielle Geschäftskunden heraus und exportiert die Kontaktdaten als CSV. Ausschließlich für eigene Akquise.',
    description:
      'Ein Werkzeug zur eigenen Akquise: Auswahl eines Wiener Bezirks und einer Branche, das Tool sammelt öffentlich verfügbare Geschäftsdaten (Firmenname, Adresse, Telefon, Mobilnummer, Website, Geschäftsführer, etc.) und exportiert sie als CSV mit fortlaufender ID. Nutzung ausschließlich für die eigene Geschäftsentwicklung – die Daten werden nicht weiterverkauft oder geteilt.',
    features: [
      'Bezirks-Filter: alle 23 Wiener Bezirke einzeln oder in Kombination',
      'Branchen-Filter: präzise Auswahl der Zielgruppe',
      'Strukturierte CSV-Ausgabe: ID, Name, Adresse, Telefon, Mobil, Website, weitere Felder',
      'Deduplizierung: keine doppelten Einträge im Output',
      'DSGVO-konforme Verarbeitung: nur öffentlich zugängliche Daten, kein Tracking, lokale Verarbeitung',
    ],
    techStack: [
      'Python 3 (Backend)',
      'Pandas (CSV-Verarbeitung)',
      'Public-Data APIs',
      'Streamlit (lokales UI)',
    ],
    status: 'Privat',
    visibility: 'private',
    visibilityNote:
      'Strikt für eigene Akquise. Wird nicht verkauft, nicht lizenziert, nicht weitergegeben. Listed hier nur als Demonstration meiner Fähigkeit, eigene Tools zu bauen, die Geschäftsprozesse beschleunigen.',
    brandColor: '#0F172A',
    brandColorAccent: '#64748B',
  },
]
