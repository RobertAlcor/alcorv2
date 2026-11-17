import Link from 'next/link'
import { ArrowUpRight, Check, Search } from 'lucide-react'
import { SEO_CARE, SEO_CARE_FEATURES } from '@/lib/seo-care'
import { POSITIONING } from '@/lib/positioning'
import { SITE } from '@/lib/site'
import styles from './seo-care.module.css'

export function SeoCareSection({ detailed = false }: { detailed?: boolean }) {
  const heading = detailed ? 'seo-care-title' : 'seo-care-preview-title'
  return (
    <section
      id={detailed ? 'seo-betreuung' : 'seo-sichtbarkeit'}
      className={styles.section}
      aria-labelledby={heading}
    >
      <div className="container-fluid">
        <div className={styles.overview}>
          <div>
            <p className="alcor-eyebrow">
              <Search size={18} aria-hidden="true" /> Webdesign. Und danach: SEO.
            </p>
            <h2 id={heading} className={styles.title}>
              Ihre Leistung verdient
              <br />
              <span>Sichtbarkeit vor Ort.</span>
            </h2>
            <p className="alcor-intro">
              SEO heißt Suchmaschinenoptimierung: Wir arbeiten daran, dass Suchmaschinen
              Ihre Website verstehen und passende Menschen Ihr Angebot finden können. Mit
              klarem Fokus auf Ihr Einzugsgebiet.
            </p>
            <ul className={styles.highlights}>
              {[
                'Tägliche technische Kontrollen der vereinbarten Seiten',
                'Besucher- und Suchdaten verständlich auswerten',
                'Suchbegriffe und regionale Mitbewerber analysieren',
                'Wöchentliche Übersicht mit vorhandenen Interessenten',
              ].map((item) => (
                <li key={item}>
                  <Check size={19} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <aside
            className={styles.priceCard}
            aria-label="SEO-Betreuung für 299 Euro pro Monat"
          >
            <p className="alcor-eyebrow">SEO & regionale Sichtbarkeit</p>
            <p className={styles.price}>
              {SEO_CARE.price}
              <span>{SEO_CARE.unit}</span>
            </p>
            <p>
              Für eine bestehende Website und ein vereinbartes Einzugsgebiet. Persönlich
              betreut von Robert Alchimowicz.
            </p>
            <Link
              href={detailed ? SEO_CARE.requestPath : SEO_CARE.path}
              className="alcor-button"
            >
              {detailed ? 'SEO-Betreuung anfragen' : 'Das 299-Euro-Service ansehen'}
              <ArrowUpRight size={20} aria-hidden="true" />
            </Link>
            <p className={styles.note}>
              LinkedIn-Begleitung optional nach Vereinbarung. Keine feste Anzahl an
              Interessenten oder garantierte Platzierung.
            </p>
            <p className={styles.note}>{POSITIONING.taxNote}</p>
          </aside>
        </div>
        {detailed && (
          <>
            <div className={styles.features}>
              {SEO_CARE_FEATURES.map((feature, index) => (
                <article key={feature.title} className={styles.feature}>
                  <span className={styles.number}>0{index + 1}</span>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </article>
              ))}
            </div>
            <div className={styles.scope}>
              <div>
                <p className="alcor-eyebrow">Ein verständlicher Rahmen</p>
                <h3>Was wir vor dem Start festlegen.</h3>
              </div>
              <div>
                <p>
                  Das Paket betrifft eine Website und ein vereinbartes Servicegebiet.
                  Wichtige Seiten, Suchbegriffe, ausgewählte Mitbewerber und messbare
                  Ziele legen wir gemeinsam fest. Die vorhandenen Google-Konten werden
                  nach Ihrer Freigabe angebunden; Passwörter gehören nicht in eine
                  Anfrage.
                </p>
                <p>
                  Aus den Beobachtungen entsteht ein priorisierter Maßnahmenplan. Welche
                  kleinen Verbesserungen im monatlichen Arbeitsumfang umgesetzt werden,
                  steht vor Beginn schriftlich fest. Neue Seiten, umfangreiche
                  Programmierung, ein Relaunch, Anzeigenbudgets und kostenpflichtige
                  Fremddienste sind gesonderte Leistungen. Eine gegebenenfalls nötige
                  Ersteinrichtung wird vorab ausgewiesen.
                </p>
                <p>
                  LinkedIn ist optional und wird nur mit freigegebenem Profil und
                  abgestimmter Ansprache betreut. Die wöchentliche Übersicht macht auch
                  kenntlich, wenn noch keine bestätigten Interessenten vorliegen. Eine
                  bloße Firmenadresse ist kein bekundetes Interesse und keine automatische
                  Freigabe für Werbung.
                </p>
                <p>
                  Umfang, Laufzeit, Kündigung und Übergabe werden vor Beauftragung
                  schriftlich vereinbart. Mit einer Anfrage schließen Sie noch kein
                  Abonnement ab.
                </p>
              </div>
            </div>
            <div className={styles.privacy}>
              <h3>Was bedeutet „IP-Anonymisierung“ bei Google Analytics?</h3>
              <p>
                Eine IP-Adresse ist die Netzwerkadresse eines Geräts im Internet. Google
                Analytics 4 speichert laut Google keine IP-Adressen. Dadurch sind
                allerdings nicht automatisch alle Besucherdaten vollständig anonym. Welche
                Daten gemessen werden und wie die Einwilligung gestaltet ist, wird für
                Ihre Website geprüft.
              </p>
              <a
                href="https://support.google.com/analytics/answer/9019185?hl=de"
                target="_blank"
                rel="noopener noreferrer"
                className="alcor-text-link"
              >
                Datenschutzeinstellungen bei Google Analytics erläutert{' '}
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
            <div className="alcor-actions">
              <Link href={SEO_CARE.requestPath} className="alcor-button">
                Mein Einzugsgebiet besprechen
                <ArrowUpRight size={20} aria-hidden="true" />
              </Link>
              <Link href="/termin" className="alcor-text-link">
                15 Minuten kennenlernen
              </Link>
            </div>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'Service',
                  '@id': `${SITE.url}/leistungen/seo-wien#seo-betreuung`,
                  name: SEO_CARE.title,
                  description:
                    'Laufende SEO-Überwachung, Auswertung von Such- und Besucherdaten, Keyword- und Konkurrenzanalyse sowie eine wöchentliche Übersicht für eine Website und ein vereinbartes Einzugsgebiet. LinkedIn optional nach Vereinbarung.',
                  provider: { '@id': `${SITE.url}/#organization` },
                  areaServed: { '@type': 'Country', name: 'Österreich' },
                  offers: {
                    '@type': 'Offer',
                    url: `${SITE.url}${SEO_CARE.path}`,
                    price: SEO_CARE.amount,
                    priceCurrency: 'EUR',
                    priceSpecification: {
                      '@type': 'UnitPriceSpecification',
                      price: SEO_CARE.amount,
                      priceCurrency: 'EUR',
                      unitText: 'Monat',
                    },
                  },
                }).replace(/</g, '\\u003c'),
              }}
            />
          </>
        )}
      </div>
    </section>
  )
}
