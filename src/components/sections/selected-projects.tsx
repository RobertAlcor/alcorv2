import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
export const FEATURED_PROJECTS = [
  {
    slug: 'psychotherapie-hrdlicka',
    name: 'Psychotherapie Hrdlicka',
    type: 'Praxis-Website · Mödling',
    image: '/referenzen/psychotherapie-hrdlicka.webp',
    note: 'Welches Angebot passt zu mir? Eine ruhige Seitenstruktur erklärt Psychotherapie, Ablauf und den Weg zum ersten Kontakt.',
  },
  {
    slug: 'schmerzfrei-wien',
    name: 'schmerzfrei.wien',
    type: 'Praxis & Terminbuchung · Wien',
    image: '/referenzen/schmerzfrei-wien.webp',
    note: 'Von der Behandlung zur Terminanfrage: verständliche Leistungsseiten und eine integrierte Online-Buchung.',
  },
  {
    slug: 'umzugsmeister',
    name: 'Umzugsmeister',
    type: 'Dienstleistung · Wien',
    image: '/media/umzugsmeister-2026-11.webp',
    note: 'Was muss ich für ein Angebot angeben? Ein aktualisierter Anfrage-Assistent sammelt Umzugsdaten und optionale Fotos Schritt für Schritt.',
  },
  {
    slug: 'buero-reinigung',
    name: 'TAKT',
    type: 'Eigenes Produkt · Branchensoftware',
    image: '/referenzen/buero-reinigung.webp',
    note: 'Wie bleiben Dienste und Nachweise im Blick? Das eigene Produkt bündelt Planung, Zeiterfassung und Kundenportal.',
  },
  {
    slug: 'alcorleads',
    name: 'ALCOR Leads – CRM & Akquise',
    type: 'Eigenes Projekt · Zugang auf Anfrage',
    image: '/media/alcor-crm-illustration-2026.webp',
    note: 'Apify-Recherche, persönliche LinkedIn-Ansprache und geprüfte CRM-Übergabe. Einblick bei Robert anfragen.',
    illustration: true,
  },
  {
    slug: 'therapieplan-android',
    name: 'Therapieplan – Android-App',
    type: 'Kontrollierter Pilot · Zugang auf Anfrage',
    image: '/media/therapieplan-android-illustration-2026.webp',
    note: 'Termine und Erinnerungen lokal im Blick. Android-Pilot im Projektkontext Grüner Kreis; Demo bei Robert anfragen.',
    illustration: true,
  },
] as const
export function SelectedProjects() {
  return (
    <section
      className="container-fluid alcor-section"
      id="projekte"
      aria-labelledby="projects-title"
    >
      <div className="alcor-section-head">
        <div>
          <p className="alcor-eyebrow">Ausgewählte Projekte</p>
          <h2 id="projects-title">
            Andere Aufgaben.
            <br />
            <span className="text-signal-2">Konkrete Lösungen.</span>
          </h2>
        </div>
        <div>
          <p>
            Wie wird aus einer Website ein verständlicher Weg zur Anfrage? Diese Projekte
            zeigen unterschiedliche Antworten – mit Einblicken in Aufgabe, Gestaltung und
            Umsetzung.
          </p>
          <Link className="alcor-text-link" href="/referenzen">
            Alle Projekte ansehen <ArrowRight size={19} aria-hidden="true" />
          </Link>
        </div>
      </div>
      <div className="alcor-project-grid">
        {FEATURED_PROJECTS.map((p, i) => (
          <article className="alcor-project" key={p.slug}>
            <Link
              href={`/referenzen/${p.slug}`}
              className="alcor-project-image"
              aria-label={`${p.name}: Projekt ansehen`}
            >
              <Image
                src={p.image}
                alt={`${'illustration' in p ? 'Produktillustration' : 'Website-Ansicht'}: ${p.name}`}
                fill
                sizes="(min-width: 1280px) 31vw, (min-width: 700px) 46vw, 95vw"
                className="object-cover object-top"
              />
              <span className="alcor-project-number">0{i + 1}</span>
              <span className="alcor-circle">
                <ArrowUpRight aria-hidden="true" />
              </span>
            </Link>
            <p className="alcor-project-type">{p.type}</p>
            <h3>
              <Link href={`/referenzen/${p.slug}`}>{p.name}</Link>
            </h3>
            <p>{p.note}</p>
            {'illustration' in p && (
              <p className="text-paper-dim mt-2 text-sm">
                Produktillustration · keine Originalansicht
              </p>
            )}
          </article>
        ))}
      </div>
      <nav
        aria-label="Weitere Webdesign-Referenzen"
        className="border-line mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t pt-6"
      >
        <span className="text-paper-mute">Weitere Projektbeispiele:</span>
        <Link href="/referenzen/massagewelt-wien" className="alcor-text-link">
          Massagewelt Wien <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
        <Link href="/referenzen/cleankos" className="alcor-text-link">
          CleanKos <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
        <Link href="/referenzen/etikettendruck24" className="alcor-text-link">
          Etikettendruck24 <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </nav>
    </section>
  )
}
