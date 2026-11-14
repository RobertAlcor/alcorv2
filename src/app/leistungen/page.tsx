import { Breadcrumbs } from '@/components/layout/breadcrumbs'
import { BentoGrid } from '@/components/sections/bento-grid'
import { ProcessSection } from '@/components/sections/process-section'
import { CtaBand } from '@/components/sections/cta-band'
import { PAGE_META } from '@/lib/seo-metadata'

export const metadata = PAGE_META.leistungen

export default function LeistungenPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Start', href: '/' },
          { label: 'Leistungen', href: '/leistungen' },
        ]}
      />
      <section className="container-fluid alcor-section">
        <p className="alcor-eyebrow">Web · SEO · IT-Service</p>
        <h1 className="alcor-page-title">
          Eine klare Aufgabe.
          <br />
          <span className="text-signal-2">Eine passende Lösung.</span>
        </h1>
        <p className="alcor-intro">
          Von Website-Erstellung und technischer SEO bis zur persönlichen
          PC-Hilfe in Wien. Umfang, Preis, Termin und Leistungsgrenzen werden
          vor Beginn transparent vereinbart.
        </p>
      </section>
      <BentoGrid />
      <ProcessSection />
      <CtaBand />
    </>
  )
}
