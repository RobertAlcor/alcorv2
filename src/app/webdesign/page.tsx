import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'
import { CtaBand } from '@/components/sections/cta-band'
import { getAllBezirke, getPublishedBezirke } from '@/lib/bezirke'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Webdesign Wien · Alle 23 Bezirke | Webdesign Alcor',
  description:
    'Webdesign in jedem Wiener Bezirk — handgeschriebene Websites ohne WordPress, ab €599 in 7 Tagen. Lokale SEO-Optimierung auf Ihren Bezirk.',
  keywords: [
    'Webdesign Wien Bezirke',
    'Webagentur jeder Bezirk Wien',
    'Lokales Webdesign Wien',
    ...SITE.seo.primaryKeywords,
  ].join(', '),
  alternates: { canonical: '/webdesign' },
  openGraph: {
    type: 'website',
    locale: 'de_AT',
    url: `${SITE.url}/webdesign`,
    siteName: SITE.name,
    title: 'Webdesign Wien · Alle 23 Bezirke | Webdesign Alcor',
    description:
      'Webdesign in jedem Wiener Bezirk — handgeschriebene Websites, ab €599 in 7 Tagen.',
  },
}

export default function WebdesignHubPage() {
  const allBezirke = getAllBezirke().sort((a, b) => a.num - b.num)
  const publishedCount = getPublishedBezirke().length

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Start', href: '/' },
          { label: 'Webdesign Wien', href: '/webdesign' },
        ]}
      />

      {/* Hero */}
      <section className="container-fluid pt-12 md:pt-16 pb-16 md:pb-24">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-signal-2 mb-6">
            <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
            Webdesign in jedem Wiener Bezirk
          </p>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] tracking-[-0.02em] text-balance mb-8">
            Webdesign Wien — von 1010 bis 1230.
          </h1>
          <p className="font-serif italic text-xl md:text-2xl text-paper-mute max-w-3xl leading-snug">
            Jeder Wiener Bezirk hat eigene Klientel, eigene Konkurrenz, eigene
            Suchanfragen. Genau das bilde ich in der Optimierung Ihrer Website ab.
          </p>
        </div>
      </section>

      {/* Intro Paragraph */}
      <section className="container-fluid py-16 md:py-20 border-t border-line">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-signal-2 mb-6">
              <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
              Warum bezirksgenau optimieren
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-paper text-balance">
              Wien ist nicht ein Markt. Es sind 23.
            </h2>
          </div>
          <div className="space-y-6 text-paper-mute leading-relaxed text-lg">
            <p>
              Wer in Wien nach einer Dienstleistung sucht, sucht meist bezirksspezifisch:
              „Friseur Favoriten", „Anwalt 1010", „Praxis Döbling". Wer auf
              „Webdesign Wien" oder „Webdesigner Wien" optimiert, kämpft gegen Hunderte
              etablierte Agenturen — und verliert oft. Wer auf „Webdesign 1100 Wien" oder
              „Webagentur Donaustadt" optimiert, hat oft konkurrenzfreie Top-Rankings bei
              Kunden mit hoher Kaufabsicht.
            </p>
            <p>
              Genau deshalb gibt es für jeden Bezirk eine eigene Seite — mit lokalem
              Kontext, branchenspezifischen Beispielen, bezirksbezogener
              Pain-Point-Analyse und passenden Schema.org-Markups. Aktuell sind{' '}
              {publishedCount} Bezirke vollständig ausgearbeitet, die übrigen folgen
              schrittweise.
            </p>
          </div>
        </div>
      </section>

      {/* Bezirks-Grid */}
      <section className="container-fluid py-16 md:py-20 border-t border-line">
        <p className="text-xs font-semibold tracking-[0.16em] uppercase text-signal-2 mb-6">
          <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
          Alle 23 Wiener Bezirke
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-paper mb-12 text-balance">
          Wählen Sie Ihren Bezirk.
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {allBezirke.map((b) => {
            const isPublished = b.status === 'full'
            const Wrapper = isPublished ? Link : 'div'
            const wrapperProps = isPublished
              ? { href: `/webdesign/${b.slug}` }
              : { 'aria-disabled': true }

            return (
              <Wrapper
                key={b.slug}
                {...(wrapperProps as any)}
                className={`group flex items-center justify-between gap-4 p-5 border border-line transition-colors ${
                  isPublished
                    ? 'hover:border-signal-2 cursor-pointer'
                    : 'opacity-50 cursor-default'
                }`}
              >
                <div>
                  <span className="font-mono text-xs text-paper-dim block mb-1">
                    {b.plz} · {b.num}. Bezirk
                  </span>
                  <span
                    className={`font-serif text-lg ${
                      isPublished
                        ? 'text-paper group-hover:text-signal-2 transition-colors'
                        : 'text-paper-mute'
                    }`}
                  >
                    {b.name}
                  </span>
                  {!isPublished && (
                    <span className="block text-[10px] font-mono uppercase tracking-wider text-paper-dim mt-1">
                      bald verfügbar
                    </span>
                  )}
                </div>
                {isPublished && (
                  <svg
                    className="w-4 h-4 text-paper-dim group-hover:text-signal-2 group-hover:translate-x-1 transition-all"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                )}
              </Wrapper>
            )
          })}
        </div>
      </section>

      <CtaBand />
    </>
  )
}
