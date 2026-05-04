import Link from 'next/link'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'
import { CtaBand } from '@/components/sections/cta-band'
import type { Bezirk } from '@/lib/bezirke'
import { getBezirkBySlug } from '@/lib/bezirke'
import { faqSchema } from '@/lib/schema'
import { SITE } from '@/lib/site'

/**
 * Detail-Layout für /webdesign/[bezirk] Pages.
 * Folgt der bestehenden Design-Sprache (service-detail-layout.tsx als Vorbild).
 */
export function BezirkDetailLayout({ bezirk }: { bezirk: Bezirk }) {
  const nearby = bezirk.nearbyDistricts
    .map((slug) => getBezirkBySlug(slug))
    .filter((b): b is Bezirk => Boolean(b))

  return (
    <>
      {bezirk.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              faqSchema(
                bezirk.faqs.map((f) => ({ question: f.question, answer: f.answer }))
              )
            ),
          }}
        />
      )}

      <Breadcrumbs
        items={[
          { label: 'Start', href: '/' },
          { label: 'Webdesign Wien', href: '/webdesign' },
          { label: `${bezirk.plz} ${bezirk.name}`, href: `/webdesign/${bezirk.slug}` },
        ]}
      />

      {/* Hero */}
      <section className="container-fluid pt-12 md:pt-16 pb-16 md:pb-24">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-signal-2 mb-6">
            <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
            {bezirk.plz} Wien · {bezirk.num}. Bezirk
          </p>
          <h1 className="font-serif text-[clamp(2.25rem,6vw,4.5rem)] leading-[0.98] tracking-[-0.02em] text-balance mb-8">
            {bezirk.h1}
          </h1>
          <p className="font-serif italic text-xl md:text-2xl text-paper-mute max-w-3xl leading-snug">
            {bezirk.lead}
          </p>
        </div>
      </section>

      {/* Local Context */}
      <section className="container-fluid py-16 md:py-20 border-t border-line">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-signal-2 mb-6">
              <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
              {bezirk.name} im Überblick
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-paper text-balance">
              Was diesen Bezirk ausmacht.
            </h2>
          </div>
          <div className="space-y-6 text-paper-mute leading-relaxed text-lg">
            <p>{bezirk.localContext}</p>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="container-fluid py-16 md:py-20 border-t border-line">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-signal-2 mb-6">
              <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
              Für wen ich hier arbeite
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-paper text-balance">
              Typische Klienten in {bezirk.name}.
            </h2>
          </div>
          <div className="space-y-6 text-paper-mute leading-relaxed text-lg">
            <p>{bezirk.industriesParagraph}</p>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      {bezirk.painPoints.length > 0 && (
        <section className="container-fluid py-16 md:py-20 border-t border-line">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] uppercase text-signal-2 mb-6">
                <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
                Typische Probleme
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-paper text-balance">
                Was im {bezirk.num}. Bezirk oft schiefgeht.
              </h2>
            </div>
            <ul className="space-y-5">
              {bezirk.painPoints.map((pain, idx) => (
                <li
                  key={idx}
                  className="flex gap-4 text-paper-mute leading-relaxed text-lg pb-5 border-b border-line/60 last:border-0"
                >
                  <span className="font-mono text-xs text-signal-2 pt-1.5 shrink-0">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span>{pain}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Positioning */}
      <section className="container-fluid py-16 md:py-20 border-t border-line">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-signal-2 mb-6">
              <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
              Mein Ansatz
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-paper text-balance">
              Was Sie von mir bekommen.
            </h2>
          </div>
          <div className="space-y-6 text-paper-mute leading-relaxed text-lg">
            <p>{bezirk.positioningParagraph}</p>
          </div>
        </div>
      </section>

      {/* Niche Site Hint (only if defined) */}
      {bezirk.nicheSiteHint && (
        <section className="container-fluid py-16 border-t border-line">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-signal-2 mb-6">
              <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
              Spezialisierte Niche-Site
            </p>
            <h2 className="font-serif text-2xl md:text-3xl text-paper mb-4">
              {bezirk.nicheSiteHint.label}
            </h2>
            <p className="text-paper-mute leading-relaxed text-lg mb-6">
              {bezirk.nicheSiteHint.reason}
            </p>
            <a
              href={bezirk.nicheSiteHint.url}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 text-signal-2 hover:text-paper transition-colors text-sm"
            >
              Site besuchen
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M7 17L17 7M17 7H8M17 7V16" />
              </svg>
            </a>
          </div>
        </section>
      )}

      {/* FAQ */}
      {bezirk.faqs.length > 0 && (
        <section className="container-fluid py-16 md:py-20 border-t border-line">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] uppercase text-signal-2 mb-6">
                <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
                Häufige Fragen
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-paper text-balance">
                Speziell für {bezirk.name}.
              </h2>
            </div>
            <div className="space-y-8">
              {bezirk.faqs.map((faq, idx) => (
                <div key={idx} className="pb-8 border-b border-line/60 last:border-0">
                  <h3 className="font-serif text-xl md:text-2xl text-paper mb-4">
                    {faq.question}
                  </h3>
                  <p className="text-paper-mute leading-relaxed text-lg">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Nearby Districts */}
      {nearby.length > 0 && (
        <section className="container-fluid py-16 border-t border-line">
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-signal-2 mb-6">
            <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
            Webdesign in angrenzenden Bezirken
          </p>
          <h2 className="font-serif text-2xl md:text-3xl text-paper mb-10 text-balance">
            Nachbar-Bezirke, in denen ich auch arbeite.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {nearby.map((b) => (
              <Link
                key={b.slug}
                href={`/webdesign/${b.slug}`}
                className="group flex items-center justify-between gap-4 p-5 border border-line hover:border-signal-2 transition-colors"
              >
                <div>
                  <span className="font-mono text-xs text-paper-dim block mb-1">
                    {b.plz}
                  </span>
                  <span className="font-serif text-lg text-paper group-hover:text-signal-2 transition-colors">
                    Webdesign {b.name}
                  </span>
                </div>
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
              </Link>
            ))}
          </div>

          <div className="mt-8">
            <Link
              href="/webdesign"
              className="inline-flex items-center gap-2 text-sm text-paper-mute hover:text-signal-2 transition-colors"
            >
              Alle 23 Bezirke ansehen
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  )
}
