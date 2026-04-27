import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'
import { CaseMockup } from '@/components/sections/case-mockup'
import { CtaBand } from '@/components/sections/cta-band'
import { CASES, getCaseBySlug } from '@/lib/cases'

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const caseData = getCaseBySlug(slug)
  if (!caseData) return {}
  return {
    title: caseData.metaTitle,
    description: caseData.metaDescription,
    alternates: { canonical: `/referenzen/${slug}` },
  }
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const caseData = getCaseBySlug(slug)
  if (!caseData) notFound()

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Start', href: '/' },
          { label: 'Referenzen', href: '/referenzen' },
          { label: caseData.client, href: caseData.url },
        ]}
      />

      <section className="container-fluid pt-12 md:pt-16 pb-16 md:pb-20">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center">
          <div>
            <p className="font-mono text-xs text-paper-dim uppercase tracking-wider mb-4">
              {caseData.industry} · {caseData.year}
            </p>
            <h1 className="font-serif text-[clamp(2rem,5.5vw,4.5rem)] leading-[1] tracking-[-0.02em] text-balance mb-6">
              {caseData.client}
            </h1>
            <p className="text-xl text-paper-mute leading-relaxed mb-6">
              {caseData.shortDescription}
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {caseData.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-xs font-medium text-paper-mute bg-deep-2 border border-line rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <a
              href={caseData.liveUrl}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 text-signal-2 hover:text-paper transition-colors text-sm group"
            >
              Live ansehen
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </a>
          </div>
          <div>
            <CaseMockup caseData={caseData} large />
          </div>
        </div>
      </section>

      {/* Task / Solution */}
      <section className="container-fluid py-16 md:py-20 border-t border-line">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 max-w-5xl">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-signal-2 mb-4">
              <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
              Aufgabe
            </p>
            <p className="text-paper leading-relaxed text-pretty">{caseData.task}</p>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-signal-2 mb-4">
              <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
              Lösung
            </p>
            <p className="text-paper leading-relaxed text-pretty">{caseData.solution}</p>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="container-fluid py-16 md:py-20 border-t border-line">
        <p className="text-xs font-semibold tracking-[0.16em] uppercase text-signal-2 mb-8">
          <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
          Ergebnisse
        </p>
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {caseData.results.map((result) => (
            <div
              key={result.label}
              className="bg-deep-2 border border-line p-8 rounded-sm"
            >
              <div className="font-serif italic text-5xl text-signal-2 mb-3 leading-none">
                {result.value}
              </div>
              <div className="text-sm text-paper-mute">{result.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Other cases */}
      <section className="container-fluid py-16 md:py-20 border-t border-line">
        <h2 className="font-serif text-3xl text-paper mb-8">Weitere Projekte</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {CASES.filter((c) => c.slug !== slug).map((other) => (
            <Link
              key={other.slug}
              href={other.url}
              className="group flex items-center gap-6 p-6 bg-deep-2 border border-line rounded-sm hover:border-signal-2 transition-colors"
            >
              <div className="w-20 h-20 shrink-0 rounded-sm flex items-center justify-center font-serif italic text-3xl text-white"
                   style={{
                     background: `linear-gradient(135deg, ${other.brandColor} 0%, ${other.brandColorAccent} 100%)`,
                   }}>
                {other.initials}
              </div>
              <div className="min-w-0">
                <p className="font-mono text-[0.7rem] text-paper-dim uppercase tracking-wider mb-1">
                  {other.industry}
                </p>
                <h3 className="font-serif text-xl text-paper group-hover:text-signal-2 transition-colors mb-1">
                  {other.client}
                </h3>
                <p className="text-paper-mute text-sm line-clamp-1">{other.shortDescription}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  )
}
