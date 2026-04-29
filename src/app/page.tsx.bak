import Link from 'next/link'
import { Hero } from '@/components/sections/hero'
import { BentoGrid } from '@/components/sections/bento-grid'
import { CaseCard } from '@/components/sections/case-card'
import { ProcessSection } from '@/components/sections/process-section'
import { ComparisonSection } from '@/components/sections/comparison-section'
import { FaqSection } from '@/components/sections/faq-accordion'
import { CtaBand } from '@/components/sections/cta-band'
import { CASES } from '@/lib/cases'

export default function HomePage() {
  return (
    <>
      <Hero />

      <BentoGrid />

      {/* Featured Cases */}
      <section className="container-fluid py-24 md:py-32 border-t border-line">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-signal-2 mb-6">
              <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
              Referenzen
            </p>
            <h2 className="font-serif text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] text-balance">
              Was ich zuletzt gebaut habe.
            </h2>
          </div>
          <Link
            href="/referenzen"
            className="group inline-flex items-center gap-2 text-sm text-paper-mute hover:text-signal-2 transition-colors"
          >
            Alle Projekte ansehen
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {CASES.map((caseData) => (
            <CaseCard key={caseData.slug} caseData={caseData} />
          ))}
        </div>
      </section>

      <ProcessSection />

      <ComparisonSection />

      <FaqSection />

      <CtaBand />
    </>
  )
}
