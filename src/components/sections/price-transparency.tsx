import Link from 'next/link'
import { SITE } from '@/lib/site'
import { PRICE_POINTS } from '@/lib/positioning'

export function PriceTransparency() {
  const formatPrice = (amount: number) =>
    new Intl.NumberFormat('de-AT').format(amount)

  return (
    <section
      className="container-fluid alcor-section alcor-legal-notes"
      aria-labelledby="cost-transparency-title"
    >
      <div className="alcor-section-head">
        <div>
          <p className="alcor-eyebrow">
            Vor dem Auftrag wissen, was dazugehört
          </p>
          <h2 id="cost-transparency-title">
            Einmalig, laufend
            <br />
            oder zusätzlich?
          </h2>
        </div>
        <p>
          Die Erstellung ist nicht dasselbe wie der spätere Betrieb. Im
          Angebot werden Leistungen, Zuständigkeiten und mögliche Zusatzkosten
          getrennt festgehalten.
        </p>
      </div>

      <div className="alcor-notes-grid">
        <div>
          <h3>Erstellung der Website</h3>
          <p>
            Basis kostet {formatPrice(PRICE_POINTS.starter)} € fix, Business
            beginnt bei {formatPrice(PRICE_POINTS.businessFrom)} € und Premium
            bei {formatPrice(PRICE_POINTS.premiumFrom)} €. Individuelle Web-Apps
            und Sonderentwicklungen starten ab{' '}
            {formatPrice(PRICE_POINTS.customFrom)} €. Maßgeblich ist das
            schriftliche Angebot.
          </p>
        </div>
        <div>
          <h3>Domain und Hosting</h3>
          <p>
            Domain und Hosting sind vom Erstellungspreis getrennt. Optionales
            Hosting ist derzeit mit {formatPrice(SITE.pricing.hostingYearly)} €
            pro Jahr ausgewiesen. Anbieter, Konten und Betreuungsumfang werden
            vorab geklärt. Externe Dienste oder Lizenzen können gesonderte
            Kosten verursachen.
          </p>
        </div>
        <div>
          <h3>Pflege und spätere Änderungen</h3>
          <p>
            Vereinbarte Website-Betreuung beginnt bei{' '}
            {formatPrice(PRICE_POINTS.careMonthlyFrom)} € pro Monat. Sonstige
            Zusatzarbeiten erfolgen nach Freigabe zum ausgewiesenen Satz von{' '}
            {formatPrice(SITE.pricing.hourlyRate)} € pro Stunde.
          </p>
        </div>
        <div>
          <h3>Inhalte und Übergabe</h3>
          <p>
            Sie erhalten den vereinbarten Projektcode und die abgestimmte
            Übergabe. Texte, Bilder, Zugänge, Einweisung und eine mögliche
            Bearbeitungsoberfläche sind nur enthalten, wenn sie ausdrücklich
            vereinbart wurden. Webentwicklung ersetzt keine rechtliche Prüfung.
          </p>
        </div>
      </div>

      <div className="mt-12">
        <div className="alcor-section-head">
          <div>
            <p className="alcor-eyebrow">Typische Erweiterungen</p>
            <h2>Klare Startpreise statt Überraschungen.</h2>
          </div>
          <p>
            Die folgenden Beträge gelten für klar abgegrenzte Standardfälle.
            Komplexität, Inhalte und notwendige Schnittstellen können den
            tatsächlichen Aufwand verändern.
          </p>
        </div>
        <div className="alcor-notes-grid">
          <div>
            <h3>Zusätzliche Unterseite</h3>
            <p>
              Ab {formatPrice(PRICE_POINTS.additionalPageFrom)} € bei
              bereitgestelltem Inhalt und bestehendem Designsystem.
            </p>
          </div>
          <div>
            <h3>Einfaches Formular</h3>
            <p>
              Ab {formatPrice(PRICE_POINTS.simpleFormFrom)} € ohne Datenbank,
              Buchungslogik oder externe Schnittstelle.
            </p>
          </div>
          <div>
            <h3>Website-Betreuung</h3>
            <p>
              Ab {formatPrice(PRICE_POINTS.careMonthlyFrom)} € pro Monat für
              einen schriftlich vereinbarten, begrenzten Betreuungsumfang.
            </p>
          </div>
          <div>
            <h3>Individuelle Web-App</h3>
            <p>
              Ab {formatPrice(PRICE_POINTS.customFrom)} € für eigens geplante
              Abläufe, Portale oder Schnittstellen. Externe Dienste werden
              separat ausgewiesen.
            </p>
          </div>
        </div>
      </div>

      <aside
        className="mt-9 rounded-lg border border-line p-6 md:p-8"
        aria-label="Beispielrechnung für die Basis-Homepage"
      >
        <h3 className="text-xl font-semibold text-paper">
          Beispiel für das erste Jahr
        </h3>
        <p className="mt-3 text-base leading-relaxed text-paper-mute">
          Basis-Homepage {formatPrice(PRICE_POINTS.starter)} € + optionales
          Hosting für ein Jahr {formatPrice(SITE.pricing.hostingYearly)} € ={' '}
          <strong className="text-paper">
            {formatPrice(
              PRICE_POINTS.starter + SITE.pricing.hostingYearly,
            )}{' '}
            €
          </strong>
          . Domain, zusätzliche Betreuung, externe Dienste und Erweiterungen
          sind nicht enthalten. Aufgrund der Kleinunternehmerregelung wird für
          die genannten ALCOR-Leistungen keine Umsatzsteuer verrechnet.
        </p>
        <Link
          href="/blog/website-kosten-wien-2026"
          className="alcor-text-link mt-4"
        >
          Website-Kosten nachvollziehen →
        </Link>
      </aside>
    </section>
  )
}
