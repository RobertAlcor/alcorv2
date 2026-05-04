import type { Metadata } from 'next'
import Link from 'next/link'
import { LegalPageLayout } from '@/components/legal/legal-page-layout'
import {
  Section,
  P,
  Strong,
  DefList,
  ContactBlock,
} from '@/components/legal/legal-typography'

export const metadata: Metadata = {
  title: 'Impressum',
  description:
    'Impressum gemäß §5 ECG und §25 MedienG für Webdesign Alcor (Robert Alchimowicz, Wien).',
  alternates: { canonical: '/impressum' },
  robots: { index: true, follow: true },
}

export default function ImpressumPage() {
  return (
    <LegalPageLayout
      eyebrow="Rechtliches"
      title="Impressum"
      subtitle="Angaben gemäß §5 ECG und §25 MedienG"
      lastUpdated="4. Mai 2026"
      breadcrumbs={[
        { label: 'Start', href: '/' },
        { label: 'Impressum', href: '/impressum' },
      ]}
    >
      {/* DIENSTANBIETER */}
      <Section title="Dienstanbieter">
        <P>
          Diese Website wird betrieben von:
        </P>
        <ContactBlock
          name="Robert Alchimowicz"
          address={`Berresgasse 11/3/1\n1220 Wien\nÖsterreich`}
          email="office@webdesign-alcor.at"
          phone="+43 664 99 124 999"
        />
        <P>
          Tätig unter der Bezeichnung <Strong>Alcor Group</Strong> bzw.{' '}
          <Strong>Webdesign Alcor</Strong>.
        </P>
      </Section>

      {/* UNTERNEHMENSGEGENSTAND */}
      <Section title="Unternehmensgegenstand">
        <P>
          Webentwicklung, Webdesign, Werbegrafik, Werbetexterei, Berufsfotografie
          sowie Suchmaschinenoptimierung (SEO) und IT-Beratung.
        </P>
      </Section>

      {/* RECHTSFORM & REGISTER */}
      <Section title="Rechtsform & Register">
        <DefList
          items={[
            {
              term: 'Rechtsform',
              def: 'Einzelunternehmen (nicht im Firmenbuch eingetragen)',
            },
            {
              term: 'UID-Nummer',
              def: (
                <span className="text-paper-mute italic">
                  Kleinunternehmer gemäß § 6 Abs. 1 Z 27 UStG (keine USt)
                </span>
              ),
            },
          ]}
        />
        <P>
          Hinweis zur Umsatzsteuer: Als Kleinunternehmer im Sinne des § 6 Abs. 1
          Z 27 UStG wird in Rechnungen keine Umsatzsteuer ausgewiesen.
        </P>
      </Section>

      {/* GEWERBE & GISA-ZAHLEN */}
      <Section title="Gewerbe & GISA-Zahlen">
        <P>
          Folgende Gewerbeberechtigungen sind im GISA (Gewerbeinformationssystem
          Austria) eingetragen:
        </P>
        <DefList
          items={[
            { term: 'Werbeagentur', def: 'GISA-Zahl 39659996' },
            { term: 'Berufsfotograf', def: 'GISA-Zahl 39660015' },
            {
              term: 'Pressefotografie und Fotodesign',
              def: 'GISA-Zahl 39660022',
            },
            { term: 'Werbegrafik-Designer', def: 'GISA-Zahl 39660053' },
            { term: 'Werbetexter', def: 'GISA-Zahl 39660046' },
          ]}
        />
        <P className="text-sm">
          Einsicht in das GISA-Register unter{' '}
          <a
            href="https://www.gisa.gv.at"
            target="_blank"
            rel="noopener noreferrer"
            className="text-signal-2 hover:text-signal underline underline-offset-2"
          >
            gisa.gv.at
          </a>
          .
        </P>
      </Section>

      {/* WKO-MITGLIEDSCHAFT */}
      <Section title="Mitgliedschaft Wirtschaftskammer">
        <P>
          Mitglied der Wirtschaftskammer Wien (WKW) in folgenden Fachgruppen:
        </P>
        <DefList
          items={[
            {
              term: 'Sparte Information und Consulting',
              def: 'Fachgruppe Werbung und Marktkommunikation',
            },
            {
              term: 'Sparte Gewerbe und Handwerk',
              def: 'Fachgruppe der Berufsfotografen',
            },
          ]}
        />
        <P className="text-sm">
          Wirtschaftskammer Wien, Straße der Wiener Wirtschaft 1, 1020 Wien ·{' '}
          <a
            href="https://www.wko.at"
            target="_blank"
            rel="noopener noreferrer"
            className="text-signal-2 hover:text-signal underline underline-offset-2"
          >
            wko.at
          </a>
        </P>
      </Section>

      {/* AUFSICHTSBEHÖRDE */}
      <Section title="Aufsichtsbehörde / Gewerbebehörde">
        <P>Magistratisches Bezirksamt für den 22. Bezirk (Donaustadt)</P>
        <P className="text-sm">
          Schrödingerplatz 1, 1220 Wien
        </P>
      </Section>

      {/* ANWENDBARE RECHTSVORSCHRIFTEN */}
      <Section title="Anwendbare Rechtsvorschriften">
        <P>
          Gewerbeordnung (GewO 1994), abrufbar unter{' '}
          <a
            href="https://www.ris.bka.gv.at"
            target="_blank"
            rel="noopener noreferrer"
            className="text-signal-2 hover:text-signal underline underline-offset-2"
          >
            ris.bka.gv.at
          </a>
          .
        </P>
      </Section>

      {/* ONLINE-STREITBEILEGUNG */}
      <Section title="Online-Streitbeilegung (OS-Plattform)">
        <P>
          Die Europäische Kommission stellt eine Plattform zur
          Online-Streitbeilegung (OS) bereit, die Sie unter{' '}
          <a
            href="https://ec.europa.eu/consumers/odr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-signal-2 hover:text-signal underline underline-offset-2"
          >
            ec.europa.eu/consumers/odr
          </a>{' '}
          finden. Verbraucher können diese Plattform für die Beilegung von
          Streitigkeiten nutzen.
        </P>
        <P className="text-sm">
          Hinweis: Ich bin nicht verpflichtet und nicht bereit, an einem
          Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
          teilzunehmen.
        </P>
      </Section>

      {/* HAFTUNG */}
      <Section title="Haftung für Inhalte">
        <P>
          Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für
          die Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann
          jedoch keine Gewähr übernommen werden. Als Diensteanbieter bin ich
          gemäß § 7 Abs. 1 ECG für eigene Inhalte auf diesen Seiten nach den
          allgemeinen Gesetzen verantwortlich.
        </P>
      </Section>

      <Section title="Haftung für Links">
        <P>
          Diese Website enthält Links zu externen Websites Dritter, auf deren
          Inhalte ich keinen Einfluss habe. Für die Inhalte verlinkter Seiten
          ist stets der jeweilige Anbieter oder Betreiber verantwortlich.
        </P>
      </Section>

      {/* URHEBERRECHT */}
      <Section title="Urheberrecht">
        <P>
          Die durch den Seitenbetreiber erstellten Inhalte und Werke unterliegen
          dem österreichischen Urheberrecht. Vervielfältigung, Bearbeitung,
          Verbreitung und jede Art der Verwertung außerhalb der Grenzen des
          Urheberrechts bedürfen der schriftlichen Zustimmung des Verfassers.
        </P>
      </Section>

      {/* DATENSCHUTZ-LINK */}
      <Section title="Datenschutz">
        <P>
          Informationen zur Verarbeitung personenbezogener Daten finden Sie in
          der{' '}
          <Link
            href="/datenschutz"
            className="text-signal-2 hover:text-signal underline underline-offset-2"
          >
            Datenschutzerklärung
          </Link>
          .
        </P>
      </Section>
    </LegalPageLayout>
  )
}
