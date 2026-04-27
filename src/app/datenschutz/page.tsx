import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Datenschutz',
  description:
    'Datenschutzerklärung von Webdesign Alcor gemäß DSGVO und österreichischem Datenschutzgesetz.',
  alternates: { canonical: '/datenschutz' },
  robots: { index: true, follow: true },
}

export default function DatenschutzPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Start', href: '/' },
          { label: 'Datenschutz', href: '/datenschutz' },
        ]}
      />

      <section className="container-fluid pt-12 md:pt-16 pb-24 max-w-3xl">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-signal-2 mb-6">
          <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
          Rechtliches
        </p>
        <h1 className="font-serif text-[clamp(2.5rem,6vw,4rem)] leading-[0.95] tracking-[-0.02em] text-balance mb-4">
          Daten<em className="text-signal-2 italic">schutz</em>
        </h1>
        <p className="text-paper-mute mb-8">
          Diese Erklärung informiert Sie über die Verarbeitung personenbezogener
          Daten beim Besuch dieser Website gemäß DSGVO und österreichischem
          Datenschutzgesetz (DSG).
        </p>

        <div className="bg-deep-2 border-l-2 border-signal-2 rounded-sm p-6 mb-12">
          <p className="text-paper leading-relaxed">
            <strong className="text-signal-2">Kurzfassung:</strong> Diese Website
            setzt keine Tracking-Cookies ein und führt kein Web-Tracking durch.
            Personenbezogene Daten werden nur dann verarbeitet, wenn Sie das
            Kontaktformular nutzen oder uns direkt kontaktieren.
          </p>
        </div>

        <Section title="1. Verantwortlicher">
          <p className="text-paper-mute leading-relaxed">
            <strong className="text-paper">{SITE.founder.name}</strong>
            <br />
            {SITE.name} ({SITE.brand})
            <br />
            {SITE.address.street}, {SITE.address.postalCode} {SITE.address.city}
            <br />
            E-Mail:{' '}
            <a href={`mailto:${SITE.contact.email}`} className="text-signal-2 hover:underline">
              {SITE.contact.email}
            </a>
            <br />
            Telefon:{' '}
            <a href={`tel:${SITE.contact.phoneRaw}`} className="text-signal-2 hover:underline">
              {SITE.contact.phone}
            </a>
          </p>
        </Section>

        <Section title="2. Server-Logfiles">
          <p className="text-paper-mute leading-relaxed mb-4">
            Beim Aufruf dieser Website speichert der Webserver automatisch
            sogenannte Server-Logfiles:
          </p>
          <ul className="list-disc pl-6 space-y-1.5 text-paper-mute">
            <li>Datum und Uhrzeit des Aufrufs</li>
            <li>Aufgerufene URL</li>
            <li>Referrer-URL</li>
            <li>Verwendeter Browser und Betriebssystem</li>
            <li>IP-Adresse (anonymisiert nach 7 Tagen)</li>
          </ul>
          <p className="text-paper-mute leading-relaxed mt-4">
            <strong className="text-paper">Rechtsgrundlage:</strong> Art. 6 Abs. 1
            lit. f DSGVO – berechtigtes Interesse am sicheren Betrieb.
            <br />
            <strong className="text-paper">Speicherdauer:</strong> 30 Tage.
          </p>
        </Section>

        <Section title="3. Kontaktformular">
          <p className="text-paper-mute leading-relaxed mb-4">
            Wenn Sie das Kontaktformular nutzen, werden die übermittelten Daten
            (Name, E-Mail, ggf. Telefon, Firma, Anliegen) zur Bearbeitung Ihrer
            Anfrage in einer Datenbank (Supabase, Server in der EU) gespeichert
            und per E-Mail (Resend) an uns übermittelt.
          </p>
          <p className="text-paper-mute leading-relaxed">
            <strong className="text-paper">Rechtsgrundlage:</strong> Art. 6 Abs. 1
            lit. b DSGVO – Vertragsanbahnung.
            <br />
            <strong className="text-paper">Speicherdauer:</strong> Bis zur
            Erledigung Ihres Anliegens, anschließende Aufbewahrung gemäß
            gesetzlicher Aufbewahrungsfristen (§ 132 BAO – 7 Jahre).
          </p>
        </Section>

        <Section title="4. Direkte Kontaktaufnahme">
          <p className="text-paper-mute leading-relaxed">
            Bei Kontaktaufnahme per <strong className="text-paper">E-Mail</strong>,{' '}
            <strong className="text-paper">Telefon</strong> oder{' '}
            <strong className="text-paper">WhatsApp</strong> werden die
            mitgeteilten Daten ausschließlich zur Beantwortung Ihrer Anfrage
            verarbeitet.
          </p>
          <p className="text-paper-mute leading-relaxed mt-4">
            Bei WhatsApp gelten zusätzlich die Datenschutzbestimmungen von
            WhatsApp Ireland Ltd.:{' '}
            <a
              href="https://www.whatsapp.com/legal/privacy-policy-eea"
              target="_blank"
              rel="noopener"
              className="text-signal-2 hover:underline"
            >
              whatsapp.com/legal/privacy-policy-eea
            </a>
          </p>
        </Section>

        <Section title="5. Cookies und Tracking">
          <p className="text-paper-mute leading-relaxed">
            Diese Website verwendet <strong className="text-paper">keine
            Cookies</strong>, kein Web-Tracking und keine Analyse-Tools.
          </p>
        </Section>

        <Section title="6. Eingebundene Schriftarten">
          <p className="text-paper-mute leading-relaxed">
            Schriftarten von <strong className="text-paper">Bunny Fonts</strong>{' '}
            (Bunny.net, Slovenien), DSGVO-konforme Alternative zu Google Fonts.
            Es werden keine personenbezogenen Daten an Google übertragen.
          </p>
          <p className="text-paper-mute leading-relaxed mt-4">
            Datenschutz Bunny.net:{' '}
            <a
              href="https://bunny.net/privacy"
              target="_blank"
              rel="noopener"
              className="text-signal-2 hover:underline"
            >
              bunny.net/privacy
            </a>
          </p>
        </Section>

        <Section title="7. Hosting">
          <p className="text-paper-mute leading-relaxed">
            Die Website wird auf Servern in der Europäischen Union gehostet
            (Vercel, Region Frankfurt). Logfile-Daten werden im Auftrag
            verarbeitet (Auftragsverarbeitungsvertrag gemäß Art. 28 DSGVO).
          </p>
        </Section>

        <Section title="8. Ihre Rechte">
          <ul className="list-disc pl-6 space-y-2 text-paper-mute">
            <li>
              <strong className="text-paper">Auskunft</strong> über gespeicherte
              Daten (Art. 15 DSGVO)
            </li>
            <li>
              <strong className="text-paper">Berichtigung</strong> unrichtiger
              Daten (Art. 16 DSGVO)
            </li>
            <li>
              <strong className="text-paper">Löschung</strong> (Art. 17 DSGVO)
            </li>
            <li>
              <strong className="text-paper">Einschränkung</strong> der
              Verarbeitung (Art. 18 DSGVO)
            </li>
            <li>
              <strong className="text-paper">Datenübertragbarkeit</strong> (Art.
              20 DSGVO)
            </li>
            <li>
              <strong className="text-paper">Widerspruch</strong> (Art. 21 DSGVO)
            </li>
            <li>
              <strong className="text-paper">Widerruf</strong> einer Einwilligung
              (Art. 7 Abs. 3 DSGVO)
            </li>
          </ul>
          <p className="text-paper-mute leading-relaxed mt-4">
            Zur Geltendmachung wenden Sie sich an{' '}
            <a
              href={`mailto:${SITE.contact.email}`}
              className="text-signal-2 hover:underline"
            >
              {SITE.contact.email}
            </a>
            .
          </p>
        </Section>

        <Section title="9. Beschwerderecht">
          <p className="text-paper-mute leading-relaxed">
            <strong className="text-paper">Österreichische
            Datenschutzbehörde</strong>
            <br />
            Barichgasse 40-42, 1030 Wien
            <br />
            <a
              href="https://www.dsb.gv.at"
              target="_blank"
              rel="noopener"
              className="text-signal-2 hover:underline"
            >
              www.dsb.gv.at
            </a>
          </p>
        </Section>

        <Section title="10. Aktualität">
          <p className="text-paper-mute leading-relaxed">
            Stand: <strong className="text-paper">April 2026</strong>. Diese
            Erklärung wird bei Erweiterungen der Website (z. B. Newsletter,
            Analytics) entsprechend angepasst.
          </p>
        </Section>
      </section>
    </>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-10">
      <h2 className="font-serif italic text-2xl text-signal-2 mb-4">{title}</h2>
      {children}
    </div>
  )
}
