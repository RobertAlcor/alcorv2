import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Fachbeiträge zu Webentwicklung, SEO, GEO und Performance. Aus 24 Jahren Praxis in Wien.',
  alternates: { canonical: '/blog' },
  robots: { index: true, follow: true },
}

const PLANNED_POSTS = [
  {
    title: 'WordPress oder handcodiert? Ehrliche Vor- und Nachteile 2026',
    category: 'Strategie',
    eta: 'Mai 2026',
  },
  {
    title: 'Was kostet eine professionelle Website in Wien? Echte Preise',
    category: 'Pricing',
    eta: 'Mai 2026',
  },
  {
    title: 'GEO statt SEO: Wie ChatGPT Ihr Unternehmen findet',
    category: 'GEO',
    eta: 'Juni 2026',
  },
  {
    title: 'Core Web Vitals 2026: Was Google jetzt wirklich misst',
    category: 'Performance',
    eta: 'Juni 2026',
  },
] as const

export default function BlogPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Start', href: '/' },
          { label: 'Blog', href: '/blog' },
        ]}
      />

      <section className="container-fluid pt-12 md:pt-16 pb-16">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-signal-2 mb-6">
            <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
            Blog
          </p>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] tracking-[-0.02em] text-balance mb-8">
            Fachbeiträge <em className="text-signal-2 italic">aus der Praxis.</em>
          </h1>
          <p className="font-serif italic text-xl md:text-2xl text-paper-mute max-w-3xl leading-snug">
            24 Jahre Webentwicklung in Wien. Hier teile ich, was funktioniert –
            und was nicht.
          </p>
        </div>
      </section>

      {/* Coming Soon Hint */}
      <section className="container-fluid py-12 border-t border-line">
        <div className="bg-deep-2 border border-line rounded-sm p-8 md:p-10 max-w-3xl">
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-2 h-2 rounded-full bg-signal-2 mt-3 animate-pulse" />
            <div>
              <p className="font-mono text-xs text-signal-2 uppercase tracking-wider mb-2">
                In Vorbereitung
              </p>
              <h2 className="font-serif text-2xl md:text-3xl text-paper mb-3">
                Die ersten Artikel sind in Arbeit.
              </h2>
              <p className="text-paper-mute leading-relaxed">
                Ich schreibe aktuell die ersten Beiträge – ehrlich, faktisch, ohne
                Marketing-Geschwafel. Was Sie erwartet:
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Planned Articles */}
      <section className="container-fluid pb-24">
        <div className="grid md:grid-cols-2 gap-6">
          {PLANNED_POSTS.map((post, idx) => (
            <article
              key={post.title}
              className="bg-deep-2 border border-line rounded-sm p-8 hover:border-paper-mute/30 transition-colors group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[0.7rem] text-paper-dim uppercase tracking-wider">
                  {post.category}
                </span>
                <span className="font-mono text-[0.7rem] text-signal-2">
                  {post.eta}
                </span>
              </div>
              <h3 className="font-serif text-xl md:text-2xl text-paper text-balance leading-tight">
                {post.title}
              </h3>
              <div className="mt-6 flex items-center gap-2 text-xs text-paper-dim">
                <span className="font-mono">0{idx + 1}</span>
                <span>·</span>
                <span>Bald verfügbar</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-fluid py-24 border-t border-line">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-signal-2 mb-6">
            <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
            In der Zwischenzeit
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-paper mb-6 text-balance">
            Konkrete Frage zu Ihrem Projekt?
          </h2>
          <p className="text-paper-mute leading-relaxed mb-8">
            Statt auf einen Blogartikel zu warten – fragen Sie direkt. Im
            kostenfreien Erstgespräch beantworte ich Ihre konkrete Frage in 15
            Minuten.
          </p>
          <Link
            href="/kontakt"
            className="group inline-flex items-center gap-2 px-7 py-4 bg-signal text-paper font-medium text-sm rounded-sm hover:bg-signal-2 transition-all duration-300 shadow-[0_8px_30px_-8px_rgba(37,99,235,0.5)]"
          >
            Frage stellen
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  )
}
