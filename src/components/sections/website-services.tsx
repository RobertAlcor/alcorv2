import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SITE } from '@/lib/site'
import { WEBSITE_SERVICES, WEBSITE_SERVICE_KEYS, websiteServiceRequestPath, type WebsiteServiceKey } from '@/lib/website-service'
import styles from './website-services.module.css'

function ServiceCards() {
  return <div className={styles.grid}>{WEBSITE_SERVICE_KEYS.map(key => {
    const service = WEBSITE_SERVICES[key]
    return <article className={styles.card} key={key}>
      <p className={styles.eyebrow}>{key === 'soforthilfe' ? 'Gezielt reparieren' : 'Laufend betreuen'}</p>
      <h3 className={styles.cardTitle}>{service.title}</h3>
      <p className={styles.intro}>{service.description}</p>
      <p><strong className={styles.price}>{service.price}</strong><span className={styles.unit}>{service.unit}</span></p>
      <Link href={service.path} className="alcor-text-link">{service.title} ansehen <ArrowUpRight size={20} aria-hidden="true" /></Link>
    </article>
  })}</div>
}

export function WebsiteServicesSection() {
  return <section className={`container-fluid ${styles.section}`} aria-labelledby="website-service-heading">
    <div className={styles.heading}>
      <div><p className={styles.eyebrow}>ALCOR Website-Service</p><h2 id="website-service-heading" className={styles.title}>Auch für Websites, die schon online sind.</h2></div>
      <p className={styles.intro}>Nicht jedes Problem braucht einen Relaunch. Manchmal fehlt eine gezielte Korrektur. Oder jemand, der sich regelmäßig kümmert.</p>
    </div>
    <ServiceCards />
    <p className={styles.note}>Preise ohne Umsatzsteuer. Leistungsumfang und Machbarkeit werden vorab geprüft. Fremdkosten sind nicht enthalten und werden bei Bedarf gesondert abgestimmt.</p>
  </section>
}

function Breadcrumbs({ serviceKey }: { serviceKey?: WebsiteServiceKey }) {
  return <nav className={styles.breadcrumb} aria-label="Brotkrumennavigation"><ol>
    <li><Link href="/">Start</Link></li>
    <li>{serviceKey ? <Link href="/website-service">Website-Service</Link> : <span aria-current="page">Website-Service</span>}</li>
    {serviceKey && <li><span aria-current="page">{WEBSITE_SERVICES[serviceKey].title}</span></li>}
  </ol></nav>
}

export function WebsiteServiceOverview() {
  return <>
    <section className={`container-fluid ${styles.hero}`}>
      <Breadcrumbs />
      <p className={styles.eyebrow}>Bestehende Websites · ALCOR</p>
      <h1 className={styles.heroTitle}>Ihre Website steht.<br /><span>Jetzt soll sie funktionieren.</span></h1>
      <p className={styles.intro}>Kleine technische Probleme lösen oder die laufende Pflege abgeben: Hier finden Sie den passenden Einstieg. Persönlich, mit vereinbartem Umfang und ohne eine neue Website beauftragen zu müssen.</p>
      <div className={styles.actions}><Link href="/website-soforthilfe" className="alcor-button">Ein Problem lösen <ArrowUpRight size={20} aria-hidden="true" /></Link><Link href="/website-betreuung" className="alcor-button alcor-button-outline">Betreuung ansehen</Link></div>
    </section>
    <WebsiteServicesSection />
    <section className={`container-fluid ${styles.section} ${styles.rule}`}>
      <div className={styles.scope}><h2 className={styles.title}>Erst verstehen.<br />Dann beauftragen.</h2><div><p className={styles.intro}>Sie beschreiben Ihre Website und Ihr Anliegen. Ich prüfe, ob und in welchem Umfang ich helfen kann. Erst nach einem konkreten Angebot und Ihrer Freigabe beginnt die Arbeit.</p><p className={styles.note}>Sie planen stattdessen einen neuen Auftritt? Das bestehende Webdesign-Angebot bleibt separat.</p><div className={styles.actions}><Link href="/leistungen/website-erstellung" className="alcor-text-link">Neue Website planen <ArrowUpRight size={18} aria-hidden="true" /></Link><Link href="/leistungen/relaunch" className="alcor-text-link">Relaunch besprechen <ArrowUpRight size={18} aria-hidden="true" /></Link></div></div></div>
    </section>
  </>
}

export function WebsiteServiceDetail({ serviceKey }: { serviceKey: WebsiteServiceKey }) {
  const service = WEBSITE_SERVICES[serviceKey]
  const otherKey = serviceKey === 'soforthilfe' ? 'betreuung' : 'soforthilfe'
  const other = WEBSITE_SERVICES[otherKey]
  const requestPath = websiteServiceRequestPath(serviceKey)
  const schema = {
    '@context': 'https://schema.org', '@type': 'Service',
    '@id': `${SITE.url}${service.path}#service`, name: service.title,
    description: service.description, url: `${SITE.url}${service.path}`,
    provider: { '@type': 'ProfessionalService', name: SITE.name, url: SITE.url },
  }
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <section className={`container-fluid ${styles.hero}`}>
      <Breadcrumbs serviceKey={serviceKey} />
      <div className={styles.heroGrid}>
        <div><p className={styles.eyebrow}>ALCOR · {service.title}</p><h1 className={styles.heroTitle}>{service.headline}</h1><p className={styles.intro}>{service.description}</p><div className={styles.actions}><Link href={requestPath} className="alcor-button">{serviceKey === 'soforthilfe' ? 'Problem schildern' : 'Betreuung anfragen'} <ArrowUpRight size={20} aria-hidden="true" /></Link><Link href="#leistungsumfang" className="alcor-text-link">Leistungsumfang prüfen</Link></div><p className={styles.note}>Unverbindliche Anfrage. Kein automatischer Auftrag.</p></div>
        <aside className={styles.summary} aria-label="Preis und Leistungsrahmen"><h2 className={styles.summaryTitle}>{service.title}</h2><strong className={styles.price}>{service.price}</strong><span className={styles.unit}>{service.unit}</span><p className={styles.intro}>{serviceKey === 'soforthilfe' ? 'Eine kleine, vereinbarte Korrektur mit bis zu 30 Minuten Umsetzungszeit.' : 'Bis zu 30 Minuten Gesamtzeit pro Monat für vereinbarte Prüfungen und kleine Änderungen.'}</p><p className={styles.note}>Ohne Umsatzsteuer. Fremdkosten nicht enthalten. Bei größerem Umfang erhalten Sie vorab ein eigenes Angebot.</p></aside>
      </div>
    </section>
    <section id="leistungsumfang" className={`container-fluid ${styles.section} ${styles.rule}`}>
      <div className={styles.scope}><div><p className={styles.eyebrow}>Der Rahmen</p><h2 className={styles.title}>Klar vereinbart.<br />Nicht unbegrenzt.</h2></div><div><ul className={styles.list}>{service.scope.map(item => <li key={item}>{item}</li>)}</ul><p className={styles.note}>{service.limits}</p></div></div>
    </section>
    <section className={`container-fluid ${styles.section} ${styles.rule}`}>
      <p className={styles.eyebrow}>Typische Anliegen</p><h2 className={styles.title}>Wobei ich helfen kann.</h2>
      <div className={styles.examples}>{service.examples.map(item => <article key={item.title} className={styles.example}><h3>{item.title}</h3><p className={styles.intro}>{item.text}</p></article>)}</div>
      <p className={styles.note}>Beispiele sind keine pauschale Leistungszusage. Systeme, Zugänge und Aufwand werden vorab geprüft. Suchmaschinenplatzierungen oder bestimmte Ladezeitwerte werden nicht garantiert.</p>
    </section>
    <section className={`container-fluid ${styles.section} ${styles.rule}`}>
      <p className={styles.eyebrow}>So starten wir</p><h2 className={styles.title}>Vom Anliegen zur Umsetzung.</h2>
      <ol className={styles.steps}>{[
        ['Anliegen beschreiben', 'Website-Adresse und eine kurze Beschreibung reichen für den ersten Kontakt. Bitte keine Passwörter mitsenden.'],
        ['Umfang und Preis klären', 'Ich prüfe die Machbarkeit. Sie erhalten ein Angebot mit Leistungsumfang, Preis und vereinbartem Termin.'],
        ['Freigeben und umsetzen', 'Erst nach Ihrer Zustimmung beginnt die Arbeit. Sie erfahren anschließend, was konkret erledigt wurde.'],
      ].map(([title, text], index) => <li key={title}><span className={styles.stepNumber}>0{index + 1}</span><h3>{title}</h3><p className={styles.intro}>{text}</p></li>)}</ol>
    </section>
    <section className={`container-fluid ${styles.section} ${styles.rule}`}>
      <p className={styles.eyebrow}>Vor Ihrer Anfrage</p><h2 className={styles.title}>Die wichtigsten Fragen.</h2>
      <div className={styles.faq}>{service.faq.map(item => <details key={item.question}><summary>{item.question}</summary><p className={styles.intro}>{item.answer}</p></details>)}</div>
    </section>
    <section className={`container-fluid ${styles.section}`}>
      <div className={styles.request}><p className={styles.eyebrow}>Der nächste Schritt</p><h2 className={styles.title}>{serviceKey === 'soforthilfe' ? 'Was funktioniert gerade nicht?' : 'Was möchten Sie abgeben?'}</h2><p className={styles.intro}>Beschreiben Sie Ihr Anliegen. Das passende Angebot ist im Anfrageformular bereits vorausgewählt.</p><div className={styles.actions}><Link href={requestPath} className="alcor-button">{service.title} anfragen <ArrowUpRight size={20} aria-hidden="true" /></Link><Link href="/termin" className="alcor-text-link">15 Minuten kennenlernen <ArrowUpRight size={18} aria-hidden="true" /></Link></div><p className={styles.note}>Oder direkt per <a href={`mailto:${SITE.contact.email}`} className="underline">E-Mail</a>. Keine Zugangsdaten im ersten Kontakt erforderlich.</p></div>
      <div className={styles.actions}><Link href={other.path} className="alcor-text-link">Auch interessant: {other.title} <ArrowUpRight size={18} aria-hidden="true" /></Link><Link href="/website-service" className="alcor-text-link">Alle Website-Services</Link></div>
    </section>
  </>
}
