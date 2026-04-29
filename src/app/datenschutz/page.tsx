import type { Metadata } from 'next'
import Link from 'next/link'
import { LegalPageLayout } from '@/components/legal/legal-page-layout'
import {
  Section,
  SubSection,
  P,
  Strong,
  UnorderedList,
  ContactBlock,
} from '@/components/legal/legal-typography'
import { CookieSettingsLink } from '@/components/legal/cookie-settings-link'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description:
    'Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO bei Webdesign Alcor.',
  alternates: { canonical: '/datenschutz' },
  robots: { index: true, follow: true },
}

export default function DatenschutzPage() {
  return (
    <LegalPageLayout
      eyebrow="Rechtliches"
      title="Datenschutzerklärung"
      subtitle="Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO"
      lastUpdated="29. April 2026"
      breadcrumbs={[
        { label: 'Start', href: '/' },
        { label: 'Datenschutz', href: '/datenschutz' },
      ]}
    >
      {/* EINLEITUNG */}
      <Section title="Überblick">
        <P>
          Der Schutz Ihrer personenbezogenen Daten ist mir wichtig. Diese
          Erklärung informiert Sie darüber, welche Daten ich auf dieser Website
          erhebe, zu welchem Zweck ich sie verarbeite und welche Rechte Sie
          haben.
        </P>
        <P>
          Rechtsgrundlage ist die Datenschutz-Grundverordnung (DSGVO), das
          österreichische Datenschutzgesetz (DSG) sowie das
          Telekommunikationsgesetz (TKG 2003, §165).
        </P>
      </Section>

      {/* VERANTWORTLICHER */}
      <Section title="Verantwortlicher">
        <P>
          Verantwortlicher im Sinne der DSGVO ist:
        </P>
        <ContactBlock
          name="Robert Alchimowicz"
          address={`Berresgasse 11/3/1\n1220 Wien\nÖsterreich`}
          email="office@webdesign-alcor.at"
          phone="+43 664 99 124 999"
        />
      </Section>

      {/* SERVER-LOG */}
      <Section title="Server-Logs (technisch notwendig)">
        <P>
          Beim Aufruf dieser Website werden vom Hosting-Provider folgende Daten
          automatisch in Logs gespeichert:
        </P>
        <UnorderedList
          items={[
            'IP-Adresse (gekürzt/anonymisiert)',
            'Datum und Uhrzeit des Zugriffs',
            'Aufgerufene Seite (URL)',
            'Referrer-URL',
            'User-Agent (Browser, Betriebssystem)',
            'HTTP-Statuscode',
          ]}
        />
        <P>
          <Strong>Zweck:</Strong> Bereitstellung der Website, Sicherheit, Schutz
          vor Angriffen.
        </P>
        <P>
          <Strong>Rechtsgrundlage:</Strong> Berechtigtes Interesse (Art. 6 Abs.
          1 lit. f DSGVO).
        </P>
        <P>
          <Strong>Speicherdauer:</Strong> Bis zu 30 Tage, danach automatische
          Löschung. Bei sicherheitsrelevanten Vorfällen länger.
        </P>
      </Section>

      {/* HOSTING */}
      <Section title="Hosting (Vercel)">
        <P>
          Diese Website wird gehostet bei{' '}
          <Strong>Vercel Inc.</Strong> (440 N Barranca Ave #4133, Covina, CA
          91723, USA). Vercel betreibt EU-Rechenzentren in Frankfurt
          (Deutschland), die Auslieferung erfolgt vorrangig über das EU-Edge-Netzwerk.
        </P>
        <P>
          <Strong>Rechtsgrundlage:</Strong> Berechtigtes Interesse (Art. 6 Abs.
          1 lit. f DSGVO) zur technischen Bereitstellung der Website.
        </P>
        <P>
          <Strong>Datenübermittlung in Drittländer:</Strong> Sofern Daten an
          Vercel-Server in den USA übermittelt werden, erfolgt dies auf Basis
          der EU-Standardvertragsklauseln und des EU-US Data Privacy Framework.
        </P>
        <P className="text-sm">
          Datenschutzerklärung von Vercel:{' '}
          <a
            href="https://vercel.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-signal-2 hover:text-signal underline underline-offset-2"
          >
            vercel.com/legal/privacy-policy
          </a>
        </P>
      </Section>

      {/* KONTAKTFORMULAR */}
      <Section title="Kontaktformular und Termin-Buchung">
        <P>
          Wenn Sie das Kontaktformular oder die Termin-Buchung nutzen, werden
          Ihre Eingaben (Name, E-Mail, Telefon, Firmenname, Anliegen, Nachricht
          sowie ggf. Wunschtermin und Adresse) zur Bearbeitung Ihrer Anfrage
          verarbeitet.
        </P>
        <P>
          <Strong>Zweck:</Strong> Bearbeitung Ihrer Anfrage, Terminvereinbarung,
          Vorbereitung eines Angebots.
        </P>
        <P>
          <Strong>Rechtsgrundlage:</Strong> Vertragsanbahnung (Art. 6 Abs. 1
          lit. b DSGVO) und berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO).
        </P>
        <P>
          <Strong>Speicherdauer:</Strong> Bis zur abschließenden Bearbeitung
          Ihrer Anfrage. Wird ein Auftrag erteilt, gelten die handels- und
          steuerrechtlichen Aufbewahrungsfristen (i.d.R. 7 Jahre).
        </P>
        <P>
          <Strong>Empfänger:</Strong> Die Daten werden in der Datenbank
          (Supabase) gespeichert; Bestätigungs- und Benachrichtigungs-Mails
          werden über Resend versendet (siehe unten).
        </P>
      </Section>

      {/* DATENBANK SUPABASE */}
      <Section title="Datenbank (Supabase)">
        <P>
          Anfragen, Termin-Buchungen und damit verbundene Daten werden in einer
          Datenbank von <Strong>Supabase Inc.</Strong> (970 Toa Payoh North #07-04,
          Singapur 318992) gespeichert. Der Datenbank-Server steht im{' '}
          <Strong>EU-Rechenzentrum Frankfurt (Deutschland)</Strong>.
        </P>
        <P>
          <Strong>Zweck:</Strong> Speicherung und Verwaltung von Anfragen und
          Buchungen.
        </P>
        <P>
          <Strong>Rechtsgrundlage:</Strong> Vertragsanbahnung (Art. 6 Abs. 1
          lit. b DSGVO).
        </P>
        <P className="text-sm">
          Datenschutzerklärung von Supabase:{' '}
          <a
            href="https://supabase.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-signal-2 hover:text-signal underline underline-offset-2"
          >
            supabase.com/privacy
          </a>
        </P>
      </Section>

      {/* MAIL-VERSAND RESEND */}
      <Section title="E-Mail-Versand (Resend)">
        <P>
          Für den Versand transaktionaler E-Mails (Bestätigungen, Anfrage-Kopien
          und Termin-Benachrichtigungen) nutze ich den Dienst{' '}
          <Strong>Resend</Strong> (Resend Inc., 2261 Market Street #5039, San
          Francisco, CA 94114, USA). Mails werden über EU-Server (Irland)
          ausgeliefert.
        </P>
        <P>
          <Strong>Zweck:</Strong> Zustellung von E-Mails an Sie und an mich.
        </P>
        <P>
          <Strong>Rechtsgrundlage:</Strong> Vertragsanbahnung (Art. 6 Abs. 1
          lit. b DSGVO) und berechtigtes Interesse.
        </P>
        <P className="text-sm">
          Datenschutzerklärung von Resend:{' '}
          <a
            href="https://resend.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-signal-2 hover:text-signal underline underline-offset-2"
          >
            resend.com/legal/privacy-policy
          </a>
        </P>
      </Section>

      {/* SCHRIFTEN BUNNY FONTS */}
      <Section title="Schriften (Bunny Fonts)">
        <P>
          Diese Website verwendet Schriftarten von <Strong>Bunny Fonts</Strong>{' '}
          (BunnyWay d.o.o., Slowenien, EU). Bunny Fonts ist ein
          datenschutzfreundlicher, GDPR-konformer Schrift-Dienst, der keine
          IP-Adressen speichert, keine Cookies setzt und kein Tracking einsetzt.
        </P>
        <P>
          <Strong>Rechtsgrundlage:</Strong> Berechtigtes Interesse (Art. 6 Abs.
          1 lit. f DSGVO) an einer ansprechenden Darstellung der Website.
        </P>
      </Section>

      {/* COOKIES UND CONSENT */}
      <Section id="cookies" title="Cookies und vergleichbare Technologien">
        <P>
          Diese Website verwendet Cookies und vergleichbaren lokalen Speicher
          (localStorage) nach folgenden Kategorien:
        </P>

        <SubSection title="Notwendig (immer aktiv)">
          <P>
            Technisch erforderliche Cookies und Speicher-Einträge, die für den
            Betrieb der Website unverzichtbar sind. Dazu gehören:
          </P>
          <UnorderedList
            items={[
              'Speicherung Ihrer Cookie-Einstellungen (alcor-consent-v1)',
              'Sitzung im Admin-Bereich (sofern Sie sich einloggen)',
              'Spam-Schutz bei Formular-Übermittlungen',
            ]}
          />
          <P>
            <Strong>Rechtsgrundlage:</Strong> Berechtigtes Interesse (Art. 6
            Abs. 1 lit. f DSGVO) und § 165 Abs. 3 TKG (Ausnahme von der
            Einwilligungspflicht für technisch notwendige Speicherung).
          </P>
        </SubSection>

        <SubSection title="Statistik (nur mit Einwilligung)">
          <P>
            Wenn Sie zustimmen, lade ich Google Analytics zur anonymisierten
            Erfassung von Reichweiten- und Nutzungsdaten. Details siehe nächster
            Abschnitt.
          </P>
        </SubSection>

        <SubSection title="Marketing (aktuell nicht im Einsatz)">
          <P>
            Reserviert für mögliche zukünftige Werbe- oder Remarketing-Tools.
            Aktuell werden keine Marketing-Cookies gesetzt.
          </P>
        </SubSection>

        <div className="mt-6 mb-2">
          <CookieSettingsLink />
        </div>
        <P className="text-sm">
          Sie können Ihre Auswahl jederzeit über den Cookie-Button unten links
          oder über die obige Schaltfläche anpassen oder widerrufen.
        </P>
      </Section>

      {/* GOOGLE ANALYTICS */}
      <Section title="Google Analytics (mit Einwilligung)">
        <P>
          Sofern Sie eingewilligt haben, nutze ich <Strong>Google Analytics</Strong>{' '}
          (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland)
          zur anonymisierten Reichweitenmessung. Verarbeitet werden:
        </P>
        <UnorderedList
          items={[
            'IP-Adresse (durch IP-Anonymisierung verkürzt)',
            'Aufgerufene Seiten und Verweildauer',
            'Referrer-URL und ungefährer Standort (Land/Stadt-Ebene)',
            'Geräteinformationen (Browser, Betriebssystem)',
            'Pseudonyme Nutzer-ID (Google Analytics Cookie)',
          ]}
        />
        <P>
          <Strong>Zweck:</Strong> Statistische Auswertung der Nutzung dieser
          Website zur Verbesserung des Angebots.
        </P>
        <P>
          <Strong>Rechtsgrundlage:</Strong> Einwilligung (Art. 6 Abs. 1 lit. a
          DSGVO sowie § 165 Abs. 3 TKG).
        </P>
        <P>
          <Strong>Speicherdauer:</Strong> 14 Monate.
        </P>
        <P>
          <Strong>Datenübermittlung:</Strong> Google verarbeitet Daten innerhalb
          der EU, eine Übermittlung in die USA kann nicht ausgeschlossen werden.
          Diese erfolgt auf Basis der EU-Standardvertragsklauseln und des EU-US
          Data Privacy Framework.
        </P>
        <P>
          <Strong>Widerruf:</Strong> Sie können Ihre Einwilligung jederzeit über
          den Cookie-Button unten links widerrufen, mit Wirkung für die Zukunft.
        </P>
        <P className="text-sm">
          Datenschutzerklärung von Google:{' '}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-signal-2 hover:text-signal underline underline-offset-2"
          >
            policies.google.com/privacy
          </a>
        </P>
      </Section>

      {/* BETROFFENENRECHTE */}
      <Section title="Ihre Rechte">
        <P>Sie haben gemäß DSGVO folgende Rechte mir gegenüber:</P>
        <UnorderedList
          items={[
            <>
              <Strong>Auskunft</Strong> (Art. 15 DSGVO) – über die zu Ihrer
              Person gespeicherten Daten
            </>,
            <>
              <Strong>Berichtigung</Strong> (Art. 16 DSGVO) – falls Daten
              unrichtig sind
            </>,
            <>
              <Strong>Löschung</Strong> (Art. 17 DSGVO) – sofern keine
              gesetzlichen Aufbewahrungspflichten entgegenstehen
            </>,
            <>
              <Strong>Einschränkung der Verarbeitung</Strong> (Art. 18 DSGVO)
            </>,
            <>
              <Strong>Datenübertragbarkeit</Strong> (Art. 20 DSGVO) – Erhalt
              Ihrer Daten in maschinenlesbarem Format
            </>,
            <>
              <Strong>Widerspruch</Strong> (Art. 21 DSGVO) – gegen Verarbeitungen
              auf Basis berechtigter Interessen
            </>,
            <>
              <Strong>Widerruf von Einwilligungen</Strong> (Art. 7 Abs. 3 DSGVO)
              – mit Wirkung für die Zukunft
            </>,
          ]}
        />
        <P>
          Anfragen senden Sie bitte an{' '}
          <a
            href="mailto:office@webdesign-alcor.at"
            className="text-signal-2 hover:text-signal underline underline-offset-2"
          >
            office@webdesign-alcor.at
          </a>
          . Ich antworte ohne unnötige Verzögerung, spätestens innerhalb eines
          Monats.
        </P>
      </Section>

      {/* BESCHWERDERECHT */}
      <Section title="Beschwerderecht">
        <P>
          Sie haben das Recht, sich bei der zuständigen Aufsichtsbehörde zu
          beschweren, wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer
          Daten gegen die DSGVO verstößt. Zuständig in Österreich:
        </P>
        <ContactBlock
          name="Österreichische Datenschutzbehörde"
          address={`Barichgasse 40–42\n1030 Wien\nÖsterreich`}
          email="dsb@dsb.gv.at"
          phone="+43 1 521 52 25 69"
        />
        <P className="text-sm">
          Online:{' '}
          <a
            href="https://www.dsb.gv.at"
            target="_blank"
            rel="noopener noreferrer"
            className="text-signal-2 hover:text-signal underline underline-offset-2"
          >
            dsb.gv.at
          </a>
        </P>
      </Section>

      {/* ÄNDERUNGEN */}
      <Section title="Änderungen dieser Erklärung">
        <P>
          Ich passe diese Datenschutzerklärung an, sobald Änderungen an der
          Verarbeitung dies erforderlich machen. Die jeweils aktuelle Version
          finden Sie hier auf dieser Seite. Stand der Erklärung:{' '}
          <Strong>29. April 2026</Strong>.
        </P>
      </Section>

      <Section title="Kontakt">
        <P>
          Bei Fragen zum Datenschutz erreichen Sie mich am einfachsten per
          E-Mail an{' '}
          <a
            href="mailto:office@webdesign-alcor.at"
            className="text-signal-2 hover:text-signal underline underline-offset-2"
          >
            office@webdesign-alcor.at
          </a>
          . Siehe auch{' '}
          <Link
            href="/impressum"
            className="text-signal-2 hover:text-signal underline underline-offset-2"
          >
            Impressum
          </Link>
          .
        </P>
      </Section>
    </LegalPageLayout>
  )
}
