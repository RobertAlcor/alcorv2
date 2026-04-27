import Link from 'next/link'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'
import { CtaBand } from '@/components/sections/cta-band'
import type { Service } from '@/lib/services'
import { serviceSchema } from '@/lib/schema'
import { SITE } from '@/lib/site'

export function ServiceDetailLayout({ service }: { service: Service }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema({
              name: service.title,
              description: service.description,
              url: `${SITE.url}${service.href}`,
              ...(service.slug === 'website-erstellung' && { price: SITE.pricing.starter }),
            })
          ),
        }}
      />

      <Breadcrumbs
        items={[
          { label: 'Start', href: '/' },
          { label: 'Leistungen', href: '/leistungen' },
          { label: service.shortTitle, href: service.href },
        ]}
      />

      {/* Hero */}
      <section className="container-fluid pt-12 md:pt-16 pb-16 md:pb-24">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-signal-2 mb-6">
            <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
            {service.tagline}
          </p>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] tracking-[-0.02em] text-balance mb-8">
            {service.title}
          </h1>
          <p className="font-serif italic text-xl md:text-2xl text-paper-mute max-w-3xl leading-snug">
            {service.intro}
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="container-fluid py-16 md:py-20 border-t border-line">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-signal-2 mb-6">
              <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
              Was enthalten ist
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-paper text-balance">
              Im Paket inbegriffen.
            </h2>
          </div>
          <ul className="space-y-4">
            {service.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-4 pb-4 border-b border-line"
              >
                <svg
                  className="w-5 h-5 text-signal-2 mt-1 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-paper text-lg leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section className="container-fluid py-16 md:py-24 border-t border-line">
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-signal-2 mb-6">
            <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
            Ablauf
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-paper text-balance">
            Vier Schritte vom ersten Gespräch zur Live-Schaltung.
          </h2>
        </div>
        <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {service.process.map((step, idx) => (
            <li
              key={step.step}
              className="bg-deep-2 border border-line p-6 rounded-sm"
            >
              <div className="font-mono text-xs text-paper-dim uppercase tracking-wider mb-3">
                Schritt 0{idx + 1}
              </div>
              <h3 className="font-serif text-2xl text-paper mb-3">{step.step}</h3>
              <p className="text-paper-mute text-sm leading-relaxed">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* For whom / Not for whom */}
      <section className="container-fluid py-16 md:py-24 border-t border-line">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="bg-deep-2 border border-line p-8 md:p-10 rounded-sm">
            <h3 className="font-serif text-2xl text-paper mb-6 flex items-center gap-3">
              <svg className="w-6 h-6 text-signal-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Passt zu Ihnen wenn
            </h3>
            <ul className="space-y-3">
              {service.forWhom.map((item) => (
                <li key={item} className="text-paper-mute leading-relaxed flex items-start gap-3">
                  <span className="text-signal-2 mt-2.5 w-1 h-1 rounded-full bg-signal-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-line p-8 md:p-10 rounded-sm">
            <h3 className="font-serif text-2xl text-paper-mute mb-6 flex items-center gap-3">
              <svg className="w-6 h-6 text-paper-dim" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              Nicht ideal wenn
            </h3>
            <ul className="space-y-3">
              {service.notForWhom.map((item) => (
                <li key={item} className="text-paper-dim leading-relaxed flex items-start gap-3">
                  <span className="text-paper-dim mt-2.5 w-1 h-1 rounded-full bg-paper-dim shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBand
        title={`Interesse an ${service.shortTitle}?`}
        subtitle="Im kostenfreien Erstgespräch klären wir Ziele, Umfang und Festpreis. Kein Verkaufsdruck, ehrliche Einschätzung."
        primaryLabel={`${service.shortTitle} anfragen`}
      />
    </>
  )
}
