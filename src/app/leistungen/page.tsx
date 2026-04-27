import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'
import { BentoGrid } from '@/components/sections/bento-grid'
import { CtaBand } from '@/components/sections/cta-band'

export const metadata: Metadata = {
  title: 'Leistungen',
  description:
    'Webentwicklung, Relaunch, SEO und GEO aus Wien. Drei klare Wege, mit denen ich Ihnen helfe.',
  alternates: { canonical: '/leistungen' },
}

export default function LeistungenPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Start', href: '/' },
          { label: 'Leistungen', href: '/leistungen' },
        ]}
      />

      <section className="container-fluid pt-12 md:pt-16 pb-8">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-signal-2 mb-6">
            <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
            Leistungen
          </p>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] tracking-[-0.02em] text-balance mb-8">
            Was ich für Sie baue.
          </h1>
          <p className="font-serif italic text-xl md:text-2xl text-paper-mute max-w-3xl leading-snug">
            Drei klare Pakete für drei klare Situationen. Wenn Sie unsicher sind,
            welches passt – fragen Sie einfach.
          </p>
        </div>
      </section>

      <BentoGrid />

      <CtaBand
        title="Welche Leistung passt zu Ihnen?"
        subtitle="Wenn Sie sich nicht sicher sind, welches Paket richtig ist, klären wir das im kostenfreien Erstgespräch in 15 Minuten."
      />
    </>
  )
}
