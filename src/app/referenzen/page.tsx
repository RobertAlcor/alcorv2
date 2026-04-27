import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'
import { CaseCard } from '@/components/sections/case-card'
import { CtaBand } from '@/components/sections/cta-band'
import { CASES } from '@/lib/cases'

export const metadata: Metadata = {
  title: 'Referenzen',
  description:
    'Ausgewählte Projekte: Praxis-Websites, Custom-Plattformen, Nischen-Landingpages. Echte Cases aus Wien.',
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

      <section className="container-fluid pt-12 md:pt-16 pb-16">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-signal-2 mb-6">
            <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
            Referenzen
          </p>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] tracking-[-0.02em] text-balance mb-8">
            Was ich zuletzt gebaut habe.
          </h1>
          <p className="font-serif italic text-xl md:text-2xl text-paper-mute max-w-3xl leading-snug">
            Drei Projekte aus drei Welten – Gesundheit, Dienstleistung, Nische.
            Jedes mit unterschiedlichen Anforderungen, jedes handcodiert.
          </p>
        </div>
      </section>

      <section className="container-fluid pb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {CASES.map((caseData) => (
            <CaseCard key={caseData.slug} caseData={caseData} />
          ))}
        </div>
      </section>

      <CtaBand
        title="Ihr Projekt als nächste Referenz?"
        subtitle="Wenn Sie eine Website wollen, die ich später hier zeigen darf – reden wir."
      />
    </>
  )
}
