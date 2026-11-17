import Link from 'next/link'

export const SEO_DECISION_FAQS = [
  {
    question: 'Was erhalte ich bei einer technischen SEO-Prüfung?',
    answer:
      'Wir legen zunächst die zu prüfenden Seiten und Ihre Ziele fest. Die vereinbarte Prüfung dokumentiert konkrete Befunde, betroffene URLs und priorisierte Maßnahmen. Technische Anpassungen und deren Kontrolle werden nach dem beauftragten Umfang umgesetzt; ein Prüfbericht allein ist noch keine Umsetzung.',
  },
  {
    question: 'Was unterscheidet technische SEO, Local SEO und GEO?',
    answer:
      'Technische SEO betrifft unter anderem Erreichbarkeit, Indexierbarkeit und Seitenstruktur. Local SEO berücksichtigt zusätzlich regionale Suchabsichten und konsistente Unternehmensinformationen, etwa für Wien. GEO befasst sich mit verständlichen, belegbaren Informationen für generative Suchsysteme. Welche Maßnahmen sinnvoll sind, hängt von Ihrer Website ab. Eine Aufnahme oder bestimmte Darstellung in Suchmaschinen und KI-Antworten ist nicht garantiert.',
  },
  {
    question: 'Was kostet die SEO-Optimierung einer bestehenden Website?',
    answer:
      'Einmalige Optimierungen werden anhand der Website angeboten. Das laufende Service für SEO und regionale Sichtbarkeit kostet 299 € monatlich für eine Website und ein vereinbartes Einzugsgebiet. Es verbindet tägliche technische Kontrollen, Google-Auswertungen, Suchbegriffs- und Konkurrenzanalyse sowie eine wöchentliche Übersicht. LinkedIn ist optional nach Vereinbarung. Neue Texte, größere Umbauten und Fremdkosten werden gesondert abgestimmt.',
  },
  {
    question: 'Welche Angaben helfen bei meiner SEO-Anfrage?',
    answer:
      'Nennen Sie die Adresse Ihrer Website, Ihre wichtigsten Leistungen und Ihr tatsächliches Einzugsgebiet. Beschreiben Sie, welche Anfragen Sie gewinnen möchten oder welches konkrete Problem auftritt. Zugangsdaten gehören nicht ins Kontaktformular. Benötigte Zugriffe klären wir getrennt und beschränken sie auf den vereinbarten Zweck.',
  },
]

const CHECKS = [
  {
    title: 'Kann die Seite gefunden werden?',
    detail:
      'HTTP-Status, robots-Regeln, noindex, Canonicals und Sitemap: Wir prüfen bei den vereinbarten URLs, ob technische Signale die gewünschte Indexierung behindern oder widersprüchlich sind.',
  },
  {
    title: 'Passt die Seite zur Suchabsicht?',
    detail:
      'Seitentitel, Überschriften und Inhalte sollen dieselbe konkrete Aufgabe beantworten. Bei lokalen Leistungen gehören das tatsächliche Servicegebiet und konsistente Unternehmensdaten dazu — nicht bloß häufige Ortsnamen.',
  },
  {
    title: 'Finden Besucher den nächsten Schritt?',
    detail:
      'Interne Links verbinden Leistung, passende Referenz und Kontakt. Mobilansicht, Bildauslieferung und erreichbare Anfragewege werden im beauftragten Umfang mitbetrachtet.',
  },
]

const EXAMPLES = [
  {
    href: '/referenzen/massagewelt-wien',
    title: 'Massagewelt Wien: Angebote gezielt finden',
    detail:
      'Eigene Leistungsseiten, eine erreichbare Preisliste und direkte Kontaktmöglichkeiten zeigen, wie sich unterschiedliche Informationsbedürfnisse innerhalb einer Praxis-Website gliedern lassen.',
  },
  {
    href: '/referenzen/cleankos',
    title: 'CleanKos: Leistungen verständlich gliedern',
    detail:
      'Sechs Bereiche für Reinigung und Hausbetreuung führen zu eigenen Leistungsseiten. Die Referenz zeigt die Navigation und die direkten Kontaktwege für unterschiedliche Objektanfragen.',
  },
]

export function SeoServiceEvidence() {
  return (
    <section
      className="container-fluid alcor-section border-line border-t"
      aria-labelledby="seo-pruefumfang"
    >
      <div className="max-w-5xl">
        <p className="alcor-eyebrow">Technische SEO für Unternehmen in Wien</p>
        <h2 id="seo-pruefumfang">Was eine SEO-Prüfung konkret klärt.</h2>
        <p className="alcor-intro">
          Eine bestehende Website braucht nicht automatisch einen Relaunch. Zuerst klären
          wir, welche Seiten Ihre Leistungen erklären sollen, welche Hindernisse vorliegen
          und welche Änderungen sinnvoll sind. Prüfung, Umsetzung und laufende Betreuung
          werden klar voneinander abgegrenzt.
        </p>
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {CHECKS.map((check) => (
          <div key={check.title} className="border-line rounded-lg border p-6">
            <h3 className="text-paper text-xl font-semibold">{check.title}</h3>
            <p className="text-paper-mute mt-4 leading-relaxed">{check.detail}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 max-w-5xl">
        <h3 className="text-paper text-2xl font-semibold">
          Nachvollziehbare Befunde statt pauschaler Versprechen
        </h3>
        <p className="text-paper-mute mt-4 leading-relaxed">
          Zu einer beauftragten Maßnahme gehören die betroffene Seite, der festgestellte
          Ausgangszustand und die Kontrolle der Änderung. Suchmaschinen-Daten werden,
          soweit verfügbar und freigegeben, getrennt von der technischen Abnahme
          beurteilt. Eine behobene technische Blockade ist noch kein Beleg für bessere
          Rankings oder mehr Anfragen.
        </p>
        <p className="text-paper-mute mt-4 leading-relaxed">
          Muss die Website grundlegend neu aufgebaut werden, finden Sie den gesonderten
          Ablauf beim{' '}
          <Link href="/leistungen/relaunch" className="alcor-text-link">
            Website-Relaunch
          </Link>
          . Für einen neuen Auftritt ist die{' '}
          <Link href="/leistungen/website-erstellung" className="alcor-text-link">
            Website-Erstellung
          </Link>{' '}
          der passende Einstieg.
        </p>
      </div>
      <div className="border-line mt-10 border-t pt-8">
        <h3 className="text-paper text-2xl font-semibold">
          Seitenstruktur und Kontaktwege aus dem Portfolio
        </h3>
        <p className="text-paper-mute mt-4 max-w-5xl leading-relaxed">
          Diese Webdesign-Referenzen zeigen konkrete Inhaltsstrukturen und Funktionen mit
          Original-Screenshots. Sie sind keine SEO-Erfolgsstudien und kein Nachweis für
          bestimmte Platzierungen oder Kundenzahlen.
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {EXAMPLES.map((example) => (
            <div key={example.href} className="border-line rounded-lg border p-6">
              <Link href={example.href} className="alcor-text-link">
                {example.title} →
              </Link>
              <p className="text-paper-mute mt-4 leading-relaxed">{example.detail}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 max-w-5xl">
        <h3 className="text-paper text-2xl font-semibold">
          Welche Aufgabe soll Ihre Website besser erfüllen?
        </h3>
        <p className="text-paper-mute mt-4 leading-relaxed">
          Schicken Sie Ihre Website-Adresse, die wichtigste Leistung und Ihr
          Einzugsgebiet. Das Thema SEO ist im Anfrageformular bereits ausgewählt. Mit
          Ihrer Anfrage beauftragen Sie noch keine kostenpflichtige Leistung.
        </p>
        <div className="alcor-actions mt-6">
          <Link href="/kontakt?thema=seo" className="alcor-button">
            SEO-Anfrage stellen
          </Link>
        </div>
      </div>
    </section>
  )
}
