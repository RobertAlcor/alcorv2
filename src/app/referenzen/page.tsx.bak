import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'
import { CtaBand } from '@/components/sections/cta-band'
import { CaseCard } from '@/components/sections/case-card'
import { ToolsGrid } from '@/components/sections/tools-grid'
import { CASES } from '@/lib/cases'
import { TOOLS } from '@/lib/tools'
import { RelatedPages } from '@/components/sections/related-pages'
import { RELATED_FOR } from '@/lib/related-pages'

export const metadata: Metadata = {
  title: 'Referenzen',
  description:
    'Ausgewählte Kundenprojekte und eigene Tools. Von Praxis-Websites über komplette Backoffice-Plattformen bis zu KI-gestützten Werkzeugen.',
  alternates: { canonical: '/referenzen' },
}

export default function ReferenzenPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Start', href: '/' },
          { label: 'Referenzen', href: '/referenzen' },
        ]}
      />

      {/* Hero */}
      <section className="container-fluid pt-12 md:pt-16 pb-12">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-signal-2 mb-6">
            <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
            Referenzen
          </p>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] tracking-[-0.02em] text-balance mb-8">
            Was ich gebaut habe.{' '}
            <em className="text-signal-2 italic">Ausführlich.</em>
          </h1>
          <p className="font-serif italic text-xl md:text-2xl text-paper-mute max-w-3xl leading-snug">
            Echte Projekte, echte Zahlen, echte Probleme. Keine Mockups, keine
            Stockfotos. Was hier steht, läuft live.
          </p>
        </div>
      </section>

      {/* Kunden-Referenzen */}
      <section className="container-fluid py-16 md:py-20">
        <div className="mb-12 max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-signal-2 mb-4">
            <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
            Kundenprojekte
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-paper text-balance mb-4">
            Drei Projekte, jedes anders.
          </h2>
          <p className="text-paper-mute leading-relaxed">
            Eine Praxis-Website mit Online-Booking, eine komplette
            Backoffice-Plattform für eine Reinigungsfirma, eine spezialisierte
            Niche-Marke für Therapeut:innen. Klicken Sie auf eine Karte für die
            ausführliche Case Study.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {CASES.map((caseData) => (
            <CaseCard key={caseData.slug} caseData={caseData} />
          ))}
        </div>
      </section>

      {/* Eigene Tools / Lab */}
      <section className="container-fluid py-20 md:py-24 border-t border-line">
        <div className="mb-12 max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-signal-2 mb-4">
            <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
            Eigene Tools / Lab
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-paper text-balance mb-4">
            Was ich für mich selbst gebaut habe.
          </h2>
          <p className="text-paper-mute leading-relaxed">
            Diese Werkzeuge nutze ich täglich für die eigene Arbeit. Sie sind
            keine Kundenprojekte – sondern ein Beweis, dass ich Probleme
            erkenne, eigene Lösungen baue und damit auch meinen Geschäftsalltag
            beschleunige. Ein Hinweis auf die Denkweise hinter meiner Arbeit.
          </p>
        </div>
        <ToolsGrid tools={TOOLS} />
      </section>

      <CtaBand
        title="Eigenes Projekt im Kopf?"
        subtitle="Ob klassische Website, Custom-Plattform oder eigenes Tool – im 15-Minuten-Erstgespräch klären wir, was möglich ist."
      />
      <RelatedPages pages={RELATED_FOR.referenzen} />

    </>
  )
}
