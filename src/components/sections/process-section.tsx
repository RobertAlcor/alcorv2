import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

const STEPS = [
  [
    'Anfrage & Kennenlernen',
    'Sie schildern Ihr Ziel. Wir besprechen erste Fragen, einen sinnvollen Umfang und ob die Zusammenarbeit passt – ohne fertiges Konzept als Voraussetzung.',
  ],
  [
    'Angebot & Vertrag',
    'Leistungsumfang, Zeitplan, Preis und Korrekturrunden halten wir schriftlich fest. 60 % Anzahlung sind bei Auftragserteilung fällig.',
  ],
  [
    'Entwicklung mit Live-Einblick',
    'Sie verfolgen den aktuellen Entwicklungsstand online. Feedback sammeln wir in den vereinbarten Runden — maximal fünf, innerhalb des vereinbarten Konzepts.',
  ],
  [
    'Abnahme & Übergabe',
    'Wir prüfen die vereinbarten Leistungen. Nach erfolgreicher Abnahme folgen die restlichen 40 %, die abgestimmte Veröffentlichung und die Übergabe.',
  ],
]

export function ProcessSection() {
  return (
    <section
      className="container-fluid alcor-section"
      aria-labelledby="process-title"
    >
      <div className="alcor-section-head">
        <div>
          <p className="alcor-eyebrow">Von der Idee zur Website</p>
          <h2 id="process-title">
            Klare Schritte.
            <br />
            Keine Überraschungen.
          </h2>
        </div>
        <p>
          Sie wissen, was als Nächstes passiert, und sehen Ihre Website während
          der Entwicklung. Ziele, Leistungen und Preis halten wir vor dem Start
          schriftlich fest.
        </p>
      </div>
      <ol className="alcor-process">
        {STEPS.map(([title, description], index) => (
          <li key={title}>
            <span className="alcor-process-number">0{index + 1}</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </li>
        ))}
      </ol>
      <div className="alcor-process-note">
        <p>
          Die vereinbarten Korrekturrunden – höchstens fünf – dienen der
          Feinabstimmung innerhalb des freigegebenen Konzepts. Ein neues Konzept
          oder zusätzliche Funktionen werden separat vereinbart.
        </p>
        <Link className="alcor-text-link" href="/preise">
          Pakete & Vertragsrahmen
          <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
