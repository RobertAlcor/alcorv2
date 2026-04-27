import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Impressum',
  description:
    'Offenlegung gemäß § 5 ECG und § 24 Mediengesetz für Webdesign Alcor, Robert Alchimowicz, Wien.',
  alternates: { canonical: '/impressum' },
  robots: { index: true, follow: true },
}

export default function ImpressumPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Start', href: '/' },
          { label: 'Impressum', href: '/impressum' },
        ]}
      />

      <section className="container-fluid pt-12 md:pt-16 pb-24 max-w-3xl">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-signal-2 mb-6">
          <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
          Rechtliches
        </p>
        <h1 className="font-serif text-[clamp(2.5rem,6vw,4rem)] leading-[0.95] tracking-[-0.02em] text-balance mb-4">
          Imp<em className="text-signal-2 italic">res</em>sum
        </h1>
        <p className="text-paper-mute mb-12">
          Offenlegung gemäß § 5 ECG und § 24 Mediengesetz
        </p>

        <Section title="Diensteanbieter">
          <Definitions
            items={[
              ['Inhaber', SITE.founder.name],
              ['Unternehmen', `${SITE.name} (${SITE.brand})`],
              [
                'Adresse',
                `${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city}, ${SITE.address.countryName}`,
              ],
              [
                'Telefon',
                <a key="tel" href={`tel:${SITE.contact.phoneRaw}`} className="text-signal-2 hover:underline">
                  {SITE.contact.phone}
                </a>,
              ],
              [
                'E-Mail',
                <a key="mail" href={`mailto:${SITE.contact.email}`} className="text-signal-2 hover:underline">
                  {SITE.contact.email}
                </a>,
              ],
            ]}
          />
        </Section>

        <Section title="Unternehmensgegenstand">
          <p className="text-paper-mute leading-relaxed">
            Webentwicklung, Webdesign, Suchmaschinenoptimierung (SEO), digitale
            Beratung.
          </p>
        </Section>

        <Section title="Gewerbliche Vorschriften">
          <p className="text-paper-mute leading-relaxed">
            Gewerbeordnung:{' '}
            <a
              href="https://www.ris.bka.gv.at"
              target="_blank"
              rel="noopener"
              className="text-signal-2 hover:underline"
            >
              www.ris.bka.gv.at
            </a>
          </p>
        </Section>

        <Section title="Aufsichtsbehörde">
          <p className="text-paper-mute leading-relaxed">
            Magistrat der Stadt Wien
          </p>
        </Section>

        <Section title="Berufsbezeichnung">
          <p className="text-paper-mute leading-relaxed">
            Dienstleistungen in der automatischen Datenverarbeitung und
            Informationstechnik (verliehen in Österreich)
          </p>
        </Section>

        <Section title="Mitglied bei">
          <p className="text-paper-mute leading-relaxed">
            Wirtschaftskammer Wien, Fachgruppe UBIT
          </p>
        </Section>

        <Section title="Online-Streitbeilegung">
          <p className="text-paper-mute leading-relaxed">
            Verbraucher haben die Möglichkeit, Beschwerden an die
            Online-Streitbeilegungsplattform der EU zu richten:{' '}
            <a
              href="https://ec.europa.eu/odr"
              target="_blank"
              rel="noopener"
              className="text-signal-2 hover:underline"
            >
              ec.europa.eu/odr
            </a>
            . Beschwerden können auch an die oben angegebene E-Mail-Adresse
            gerichtet werden.
          </p>
        </Section>

        <Section title="Haftungsausschluss">
          <p className="text-paper-mute leading-relaxed mb-4">
            Die auf dieser Website bereitgestellten Inhalte werden mit
            größtmöglicher Sorgfalt erstellt. {SITE.name} übernimmt jedoch keine
            Gewähr für die Richtigkeit, Vollständigkeit und Aktualität der
            bereitgestellten Inhalte.
          </p>
          <p className="text-paper-mute leading-relaxed">
            Die Nutzung der Website-Inhalte erfolgt auf eigene Gefahr des
            Nutzers. Namentlich gekennzeichnete Beiträge geben die Meinung des
            jeweiligen Autors und nicht immer die Meinung des Anbieters wieder.
          </p>
        </Section>

        <Section title="Urheberrecht">
          <p className="text-paper-mute leading-relaxed">
            Sämtliche Inhalte dieser Website (Texte, Bilder, Grafiken, Code) sind
            urheberrechtlich geschützt. Jede Verwendung außerhalb der gesetzlich
            erlaubten Fälle bedarf der vorherigen schriftlichen Zustimmung von{' '}
            {SITE.founder.name}.
          </p>
        </Section>
      </section>
    </>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-12">
      <h2 className="font-serif italic text-2xl text-signal-2 mb-4">{title}</h2>
      {children}
    </div>
  )
}

function Definitions({
  items,
}: {
  items: [string, React.ReactNode][]
}) {
  return (
    <dl className="bg-deep-2 border border-line rounded-sm p-6 grid gap-2 sm:grid-cols-[160px_1fr] gap-x-6">
      {items.map(([term, def], i) => (
        <div key={i} className="contents">
          <dt className="text-xs font-semibold tracking-[0.04em] uppercase text-paper-dim self-center">
            {term}
          </dt>
          <dd className="text-paper">{def}</dd>
        </div>
      ))}
    </dl>
  )
}
