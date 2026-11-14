import Link from 'next/link'
import { ArrowUpRight, Check, MapPin, MonitorCog, ShieldCheck } from 'lucide-react'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'
import styles from '@/components/sections/website-services.module.css'
import {
  IT_SERVICES,
  IT_SERVICE_KEYS,
  itServiceRequestPath,
} from '@/lib/it-service'
import { PAGE_META } from '@/lib/seo-metadata'
import { SITE } from '@/lib/site'

export const metadata = PAGE_META.itService

const faqs = [
  {
    question: 'Ist die Anfahrt innerhalb Wiens wirklich kostenlos?',
    answer:
      'Ja. Für einen vereinbarten Vor-Ort-Termin innerhalb Wiens wird keine eigene Anfahrtspauschale berechnet. Die beauftragte Arbeitszeit beziehungsweise die vereinbarte Serviceleistung ist kostenpflichtig.',
  },
  {
    question: 'Was kostet ein Termin außerhalb Wiens?',
    answer:
      'Außerhalb Wiens wird Kilometergeld berechnet. Strecke, Berechnung und voraussichtlicher Betrag werden vor der Terminbestätigung schriftlich vereinbart. Ohne diese Vereinbarung findet kein kostenpflichtiger Außentermin statt.',
  },
  {
    question: 'Ist eine Windows-Lizenz im Preis enthalten?',
    answer:
      'Nein. Die Leistung umfasst die vereinbarte Installation und Einrichtung. Eine gültige Windows-, Office- oder sonstige Softwarelizenz muss vorhanden sein oder vom Kunden separat beschafft werden. ALCOR löst ohne konkreten Auftrag keinen Lizenzkauf aus.',
  },
  {
    question: 'Repariert ALCOR defekte Hardware?',
    answer:
      'Nein. ALCOR öffnet keine Geräte, lötet nicht und tauscht keine internen Bauteile aus. Bei einem wahrscheinlichen Hardwaredefekt erhalten Sie eine verständliche Einschätzung und können sich damit an einen geeigneten Reparaturbetrieb wenden.',
  },
  {
    question: 'Kann die Hilfe per Fernwartung erfolgen?',
    answer:
      'Ja, wenn der Computer startet, eine stabile Internetverbindung besteht und das Problem sicher per Fernzugriff bearbeitet werden kann. Zugriff und Umfang werden vorher vereinbart; nach Abschluss wird die Sitzung beendet.',
  },
  {
    question: 'Sind meine Daten bei einer Neuinstallation automatisch gesichert?',
    answer:
      'Nein. Vor Änderungen wird geklärt, ob eine Datensicherung notwendig und technisch möglich ist. Eine Sicherung oder Datenübertragung ist eine eigene Leistung. Für bereits beschädigte oder nicht lesbare Datenträger kann keine Datenrettung garantiert werden.',
  },
]

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE.url}/it-service-wien#service`,
  name: 'PC-Hilfe und IT-Service in Wien',
  serviceType: 'PC-Hilfe, Windows-Einrichtung und IT-Unterstützung',
  description:
    'Vor-Ort- und Fernunterstützung für PC-Einrichtung, Windows-Installation, E-Mail, Office, WLAN, Drucker, Datensicherung und Fehlerdiagnose. Keine Hardware-Reparaturen.',
  url: `${SITE.url}/it-service-wien`,
  provider: { '@id': `${SITE.url}/#organization` },
  areaServed: { '@type': 'City', name: 'Wien' },
  availableChannel: [
    {
      '@type': 'ServiceChannel',
      serviceLocation: {
        '@type': 'Place',
        address: { '@type': 'PostalAddress', addressLocality: 'Wien' },
      },
    },
    {
      '@type': 'ServiceChannel',
      serviceUrl: `${SITE.url}/kontakt?thema=it-service`,
    },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'IT-Service und PC-Hilfe',
    itemListElement: IT_SERVICE_KEYS.map((key) => {
      const service = IT_SERVICES[key]
      return {
        '@type': 'Offer',
        name: service.title,
        url: `${SITE.url}${itServiceRequestPath(key)}`,
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: service.priceFrom,
          priceCurrency: 'EUR',
        },
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.description,
        },
      }
    }),
  },
}

export default function ItServiceWienPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema).replace(/</g, '\\u003c'),
        }}
      />
      <Breadcrumbs
        items={[
          { label: 'Start', href: '/' },
          { label: 'IT-Service & PC-Hilfe', href: '/it-service-wien' },
        ]}
      />

      <section className={`container-fluid ${styles.hero}`}>
        <div className={styles.heroGrid}>
          <div>
            <p className={styles.eyebrow}>PC-Hilfe · IT-Service · Wien</p>
            <h1 className={styles.heroTitle}>
              PC-Hilfe und IT-Service
              <br />
              <span>persönlich in Wien.</span>
            </h1>
            <p className={styles.intro}>
              Windows installieren, einen neuen PC einrichten, E-Mail und
              Office konfigurieren, WLAN oder Drucker verbinden und
              Computerprobleme nachvollziehbar lösen — vor Ort oder per
              Fernwartung.
            </p>
            <div className={styles.actions}>
              <Link href={itServiceRequestPath()} className="alcor-button">
                IT-Hilfe anfragen
                <ArrowUpRight size={20} aria-hidden="true" />
              </Link>
              <a
                href={`tel:${SITE.contact.phoneRaw}`}
                className="alcor-button alcor-button-outline"
              >
                {SITE.contact.phoneFormatted}
              </a>
            </div>
            <p className={styles.note}>
              Kostenlose Anfrage, kein automatischer Auftrag. Umfang, Preis
              und Termin werden vor Beginn vereinbart.
            </p>
          </div>

          <aside className={styles.summary} aria-label="Servicegebiet und Preisrahmen">
            <p className={styles.eyebrow}>Vor Ort oder per Fernwartung</p>
            <strong className={styles.price}>ab 39 €</strong>
            <span className={styles.unit}>je nach Leistung und Umfang</span>
            <ul className={styles.list}>
              <li>Anfahrt innerhalb Wiens: 0 €</li>
              <li>Außerhalb Wiens: Kilometergeld nach Vorabvereinbarung</li>
              <li>Fernwartung, wenn technisch sicher möglich</li>
              <li>Keine Hardware-Reparaturen oder Ersatzteilmontage</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className={`alcor-surface ${styles.section}`} aria-labelledby="it-services-title">
        <div className="container-fluid">
          <div className={styles.heading}>
            <div>
              <p className={styles.eyebrow}>Leistungen & Einstiegspreise</p>
              <h2 id="it-services-title" className={styles.title}>
                Klare Hilfe für typische PC-Probleme.
              </h2>
            </div>
            <p className={styles.intro}>
              Die Preise gelten als Einstieg für klar abgegrenzte Aufgaben.
              Vor zusätzlicher Arbeit erhalten Sie eine konkrete Rückmeldung.
            </p>
          </div>

          <div className={styles.grid}>
            {IT_SERVICE_KEYS.map((key) => {
              const service = IT_SERVICES[key]
              return (
                <article className={styles.card} key={key}>
                  <p className={styles.eyebrow}>{service.shortTitle}</p>
                  <h3 className={styles.cardTitle}>{service.title}</h3>
                  <p className={styles.intro}>{service.description}</p>
                  <p>
                    <strong className={styles.price}>{service.price}</strong>
                    <span className={styles.unit}>{service.unit}</span>
                  </p>
                  <ul className={styles.list}>
                    {service.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <Link
                    href={itServiceRequestPath(key)}
                    className="alcor-text-link mt-5"
                  >
                    Leistung anfragen
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </Link>
                </article>
              )
            })}
          </div>
          <p className={styles.note}>
            Keine Umsatzsteuer aufgrund der Kleinunternehmerregelung. Lizenzen,
            kostenpflichtige Programme, Speichermedien, Ersatzgeräte und andere
            Fremdkosten sind nicht enthalten.
          </p>
        </div>
      </section>

      <section className={`container-fluid ${styles.section} ${styles.rule}`}>
        <div className={styles.scope}>
          <div>
            <p className={styles.eyebrow}>Servicegebiet</p>
            <h2 className={styles.title}>
              In Wien ohne Anfahrtskosten.
            </h2>
          </div>
          <div>
            <div className="space-y-6">
              <div className="flex gap-4">
                <MapPin className="mt-1 shrink-0 text-signal-2" aria-hidden="true" />
                <div>
                  <h3 className="text-xl font-semibold">Vor-Ort-Termin in Wien</h3>
                  <p className={styles.intro}>
                    Die Anfahrt innerhalb Wiens kostet 0 €. Berechnet wird nur
                    die vereinbarte Serviceleistung beziehungsweise Arbeitszeit.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <MonitorCog className="mt-1 shrink-0 text-signal-2" aria-hidden="true" />
                <div>
                  <h3 className="text-xl font-semibold">Außerhalb Wiens</h3>
                  <p className={styles.intro}>
                    Kilometergeld und Strecke werden vor der Terminbestätigung
                    schriftlich vereinbart. Dadurch entstehen keine
                    überraschenden Anfahrtskosten.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <ShieldCheck className="mt-1 shrink-0 text-signal-2" aria-hidden="true" />
                <div>
                  <h3 className="text-xl font-semibold">Fernwartung</h3>
                  <p className={styles.intro}>
                    Geeignete Software- und Einstellungsprobleme können ohne
                    Anfahrt bearbeitet werden. Die Verbindung wird nur für den
                    vereinbarten Termin genutzt.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`container-fluid ${styles.section} ${styles.rule}`}>
        <div className={styles.scope}>
          <div>
            <p className={styles.eyebrow}>Klare Leistungsgrenzen</p>
            <h2 className={styles.title}>Softwarehilfe, keine Werkstatt.</h2>
          </div>
          <div>
            <ul className={styles.list}>
              <li>
                Keine Hardware-Reparaturen, Lötarbeiten oder Öffnung von
                Geräten zur Bauteilreparatur.
              </li>
              <li>
                Kein Austausch interner Komponenten und keine physische
                Datenrettung beschädigter Datenträger.
              </li>
              <li>
                Windows-, Office- und andere kostenpflichtige Lizenzen sind
                nicht im Servicepreis enthalten.
              </li>
              <li>
                Datenübertragung und Sicherung werden vor Neuinstallation oder
                Zurücksetzen ausdrücklich vereinbart.
              </li>
              <li>
                Bei wahrscheinlichem Hardwaredefekt erhalten Sie eine
                nachvollziehbare Einschätzung für den Reparaturbetrieb.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className={`container-fluid ${styles.section} ${styles.rule}`}>
        <p className={styles.eyebrow}>So läuft die Hilfe ab</p>
        <h2 className={styles.title}>Erst prüfen. Dann vereinbaren.</h2>
        <ol className={styles.steps}>
          {[
            [
              'Problem beschreiben',
              'Gerät, Fehlermeldung und gewünschte Hilfe kurz schildern. Bitte keine Passwörter oder Zugangscodes mitsenden.',
            ],
            [
              'Umfang, Preis und Termin',
              'Ich prüfe, ob Fernwartung oder ein Vor-Ort-Termin sinnvoll ist. Leistung, Einstiegspreis und mögliche Anfahrt werden vorab festgehalten.',
            ],
            [
              'Durchführen und kontrollieren',
              'Die vereinbarte Aufgabe wird umgesetzt und gemeinsam geprüft. Zusätzlicher Aufwand erfolgt nur nach Ihrer Freigabe.',
            ],
          ].map(([title, text], index) => (
            <li key={title}>
              <span className={styles.stepNumber}>0{index + 1}</span>
              <h3>{title}</h3>
              <p className={styles.intro}>{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={`container-fluid ${styles.section} ${styles.rule}`}>
        <p className={styles.eyebrow}>Vor Ihrer Anfrage</p>
        <h2 className={styles.title}>Die wichtigsten Fragen.</h2>
        <div className={styles.faq}>
          {faqs.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p className={styles.intro}>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className={`container-fluid ${styles.section}`}>
        <div className={styles.request}>
          <p className={styles.eyebrow}>Der nächste Schritt</p>
          <h2 className={styles.title}>Wobei benötigen Sie Unterstützung?</h2>
          <p className={styles.intro}>
            Beschreiben Sie Gerät und Problem in wenigen Stichpunkten. Ich
            melde mich mit einer ersten Einordnung und dem passenden nächsten
            Schritt.
          </p>
          <div className={styles.actions}>
            <Link href={itServiceRequestPath()} className="alcor-button">
              IT-Service unverbindlich anfragen
              <ArrowUpRight size={20} aria-hidden="true" />
            </Link>
            <a
              className="alcor-text-link"
              href={`mailto:${SITE.contact.email}`}
            >
              {SITE.contact.email}
            </a>
          </div>
          <p className={styles.note}>
            Keine Hardware-Reparatur. Keine automatische Beauftragung. Keine
            Passwörter im Anfrageformular mitsenden.
          </p>
        </div>
      </section>
    </>
  )
}
