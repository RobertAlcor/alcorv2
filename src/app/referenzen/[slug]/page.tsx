import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Quote, ExternalLink, ArrowRight, Sparkles, AlertCircle } from 'lucide-react'
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

  const otherCases = CASES.filter((c) => c.slug !== caseData.slug).slice(0, 2)

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Start', href: '/' },
          { label: 'Referenzen', href: '/referenzen' },
          { label: caseData.client, href: caseData.url },
        ]}
      />

      {/* Hero */}
      <section className="container-fluid pt-12 md:pt-16 pb-12">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6 text-xs font-mono uppercase tracking-wider">
              <span className="text-signal-2">{caseData.industry}</span>
              <span className="text-paper-dim">·</span>
              <span className="text-paper-dim">{caseData.year}</span>
            </div>
            <h1 className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] tracking-[-0.02em] text-balance mb-6">
              {caseData.client}
            </h1>
            <p className="text-paper leading-relaxed text-lg md:text-xl text-pretty mb-8 max-w-xl">
              {caseData.shortDescription}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={caseData.liveUrl}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 min-h-[44px] px-6 py-3 bg-signal text-deep font-medium text-sm rounded-sm hover:bg-signal-2 transition-all duration-300 shadow-[0_4px_20px_-8px_rgba(var(--signal-rgb),0.6)]"
              >
                Live-Site ansehen
                <ExternalLink className="w-4 h-4" strokeWidth={1.75} />
              </a>
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 min-h-[44px] px-6 py-3 text-paper-mute font-medium text-sm border border-line rounded-sm hover:text-paper hover:border-paper-mute transition-colors"
              >
                Ähnliches Projekt anfragen
              </Link>
            </div>
          </div>
          <div>
            <CaseMockup caseData={caseData} large />
          </div>
        </div>
      </section>

      {/* Results Bar */}
      <section className="container-fluid py-12 md:py-16 border-t border-line">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line">
          {caseData.results.map((result) => (
            <div key={result.label} className="bg-deep p-5 md:p-6">
              <div className="font-sans font-light text-3xl md:text-4xl text-signal-2 leading-none tracking-tight mb-2">
                {result.value}
              </div>
              <div className="text-sm font-medium text-paper mb-1">
                {result.label}
              </div>
              {result.hint && (
                <div className="text-xs text-paper-dim leading-snug">
                  {result.hint}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Challenge */}
      <section className="container-fluid py-16 md:py-20 border-t border-line">
        <div className="grid lg:grid-cols-[280px_1fr] gap-8 lg:gap-16">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-signal-2 mb-3">
              <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
              Ausgangslage
            </p>
          </div>
          <div className="max-w-2xl">
            <h2 className="font-serif text-2xl md:text-3xl text-paper text-balance leading-tight mb-6">
              Womit wir gestartet sind.
            </h2>
            <p className="text-paper-mute leading-relaxed text-pretty">
              {caseData.challenge}
            </p>

            {caseData.before && (
              <div className="mt-8 p-6 bg-deep-2 border-l-2 border-paper-dim/40 rounded-sm">
                <div className="flex items-start gap-2 mb-3">
                  <AlertCircle
                    className="w-4 h-4 text-paper-mute shrink-0 mt-0.5"
                    strokeWidth={1.75}
                  />
                  <p className="text-sm font-semibold text-paper">
                    Konkrete Probleme der Vorher-Lösung
                  </p>
                </div>
                <p className="text-sm text-paper-mute leading-relaxed mb-4 italic">
                  {caseData.before.description}
                </p>
                <ul className="space-y-2">
                  {caseData.before.problems.map((problem) => (
                    <li
                      key={problem}
                      className="flex items-start gap-2.5 text-sm text-paper-mute"
                    >
                      <span
                        className="w-1 h-1 rounded-full bg-paper-dim mt-2 shrink-0"
                        aria-hidden
                      />
                      <span>{problem}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="container-fluid py-16 md:py-20 border-t border-line">
        <div className="grid lg:grid-cols-[280px_1fr] gap-8 lg:gap-16">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-signal-2 mb-3">
              <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
              Vorgehen
            </p>
          </div>
          <div className="max-w-2xl">
            <h2 className="font-serif text-2xl md:text-3xl text-paper text-balance leading-tight mb-6">
              Wie ich vorgegangen bin.
            </h2>
            <ol className="space-y-4">
              {caseData.approach.map((step, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-4 text-paper leading-relaxed"
                >
                  <span className="font-mono text-xs text-signal-2 mt-1 shrink-0 w-6">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="text-pretty">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="container-fluid py-16 md:py-20 border-t border-line">
        <div className="max-w-3xl mb-10">
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-signal-2 mb-3">
            <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
            Technische Highlights
          </p>
          <h2 className="font-serif text-2xl md:text-3xl text-paper text-balance leading-tight">
            Was dieses Projekt besonders macht.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {caseData.highlights.map((highlight) => (
            <article
              key={highlight.label}
              className="bg-deep-2 border border-line rounded-sm p-7 hover:border-signal-2/40 transition-colors"
            >
              <div className="flex items-start gap-3 mb-3">
                <Sparkles
                  className="w-4 h-4 text-signal-2 shrink-0 mt-1"
                  strokeWidth={1.75}
                />
                <h3 className="font-serif text-xl text-paper leading-tight">
                  {highlight.label}
                </h3>
              </div>
              <p className="text-paper-mute leading-relaxed text-sm pl-7">
                {highlight.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="container-fluid py-16 md:py-20 border-t border-line">
        <div className="grid lg:grid-cols-[280px_1fr] gap-8 lg:gap-16">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-signal-2 mb-3">
              <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
              Stack
            </p>
          </div>
          <div className="max-w-2xl">
            <h2 className="font-serif text-2xl md:text-3xl text-paper text-balance leading-tight mb-6">
              Womit gebaut wurde.
            </h2>
            <div className="flex flex-wrap gap-2">
              {caseData.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-xs font-mono text-paper-mute bg-deep-2 border border-line rounded-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {caseData.testimonial && (
        <section className="container-fluid py-16 md:py-20 border-t border-line">
          <div className="max-w-3xl mx-auto text-center">
            <Quote
              className="w-10 h-10 text-signal-2/30 mx-auto mb-6"
              strokeWidth={1.5}
            />
            <blockquote className="font-serif italic text-2xl md:text-3xl text-paper text-balance leading-snug mb-8">
              „{caseData.testimonial.quote}"
            </blockquote>
            <div className="text-sm text-paper-mute">
              <strong className="text-paper not-italic">
                {caseData.testimonial.author}
              </strong>
              {caseData.testimonial.role && (
                <>
                  {' · '}
                  {caseData.testimonial.role}
                </>
              )}
              {caseData.testimonial.verified && (
                <span className="block mt-1 text-[0.7rem] text-paper-dim font-mono uppercase tracking-wider">
                  ✓ Verifiziert
                </span>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Business Note - z.B. für Büro-Reinigung Lizenz-Modell */}
      {caseData.businessNote && (
        <section className="container-fluid py-12 border-t border-line">
          <div className="max-w-3xl bg-deep-2 border-l-2 border-signal-2 rounded-sm p-6 md:p-8">
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-signal-2 mb-3">
              Geschäftsmodell-Hinweis
            </p>
            <p className="text-paper leading-relaxed text-pretty">
              {caseData.businessNote}
            </p>
          </div>
        </section>
      )}

      {/* Other Cases */}
      <section className="container-fluid py-16 md:py-20 border-t border-line">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
          <h2 className="font-serif text-2xl md:text-3xl text-paper text-balance">
            Weitere Projekte ansehen.
          </h2>
          <Link
            href="/referenzen"
            className="group inline-flex items-center gap-2 text-sm text-paper-mute hover:text-signal-2 transition-colors"
          >
            Alle Referenzen
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {otherCases.map((other) => (
            <Link
              key={other.slug}
              href={other.url}
              className="group bg-deep-2 border border-line rounded-sm p-7 hover:border-signal-2/40 transition-colors"
            >
              <p className="font-mono text-[0.7rem] text-signal-2 uppercase tracking-wider mb-3">
                {other.industry}
              </p>
              <h3 className="font-serif text-2xl text-paper mb-3 group-hover:text-signal-2 transition-colors">
                {other.client}
              </h3>
              <p className="text-paper-mute text-sm leading-relaxed line-clamp-2">
                {other.shortDescription}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand
        title="Ihr Projekt klingt ähnlich?"
        subtitle="Im 15-Minuten-Erstgespräch klären wir, ob das, was Sie brauchen, in eine ähnliche Lösung passt."
      />
    </>
  )
}
