import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Clock3, Phone } from 'lucide-react'
import { SITE } from '@/lib/site'
import { POSITIONING } from '@/lib/positioning'
type CtaBandProps = { title?: string; subtitle?: string; primaryLabel?: string; primaryHref?: string; secondaryLabel?: string; secondaryHref?: string }
export function CtaBand({ title = '15 Minuten. Passen wir zusammen?', subtitle = 'Wir sprechen über Ihre Idee, Ihren Anspruch und den passenden Rahmen. Sie lernen mich kennen. Ich lerne Ihr Projekt kennen. Danach wissen wir, ob es weitergeht.', primaryLabel = '15-Minuten-Gespräch vereinbaren', primaryHref = '/termin', secondaryLabel = 'Projekt bewerben', secondaryHref = '/bewerbung' }: CtaBandProps) {
 return <section className="alcor-cta-section"><div className="container-fluid"><div className="alcor-cta">
  <div><p className="alcor-eyebrow"><Clock3 size={18} aria-hidden="true" /> Persönlich. Kostenlos. Unverbindlich.</p><h2>{title}</h2><p className="alcor-intro">{subtitle}</p><div className="alcor-actions"><Link href={primaryHref} className="alcor-button">{primaryLabel}<ArrowUpRight size={20} aria-hidden="true" /></Link><Link href={secondaryHref} className="alcor-button alcor-button-outline">{secondaryLabel}</Link></div><a className="alcor-text-link" href={`tel:${SITE.contact.phoneRaw}`}><Phone size={17} aria-hidden="true" />{SITE.contact.phoneFormatted}</a></div>
  <aside className="alcor-person-card">{POSITIONING.portrait ? <Image src={POSITIONING.portrait} alt="Robert Alchimowicz, Ihr Ansprechpartner bei ALCOR" width={640} height={800} sizes="(min-width: 1100px) 28vw, 85vw" /> : <div className="alcor-monogram" aria-hidden="true">R<span>.</span></div>}<div><span>Ihr direkter Ansprechpartner</span><h3>Robert Alchimowicz</h3><p>Konzept. Design. Entwicklung.<br />Persönlich aus Wien.</p></div></aside>
 </div></div></section>
}
