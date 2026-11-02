import Link from 'next/link'
import type { Service } from '@/lib/services'
import { serviceSchema, faqSchema } from '@/lib/schema'
import { SITE } from '@/lib/site'

const GUIDES: Record<string, { href: string; label: string }[]> = {
  'website-erstellung': [
    { href: '/blog/homepage-erstellen-lassen-wien', label: 'Homepage erstellen lassen: Kosten und Ablauf' },
    { href: '/preise', label: 'Webdesign-Preise und Pakete vergleichen' },
    { href: '/blog/website-fuer-handwerker-wien', label: 'Was eine Website für Handwerker braucht' },
  ],
  relaunch: [
    { href: '/blog/website-relaunch-2026', label: 'Website-Relaunch vorbereiten' },
    { href: '/leistungen/seo-wien', label: 'Technische SEO beim Relaunch berücksichtigen' },
    { href: '/referenzen', label: 'Webdesign-Referenzen ansehen' },
  ],
  'seo-wien': [
    { href: '/blog/seo-fuer-kmu-wien-2026', label: 'SEO-Grundlagen für KMU in Wien' },
    { href: '/blog/google-unternehmensprofil-wien', label: 'Google-Unternehmensprofil einrichten' },
    { href: '/blog/core-web-vitals-2026', label: 'Ladezeit und Core Web Vitals verstehen' },
  ],
}

export function ServiceSeoSection({ service }: { service: Service }) {
  const faqs = service.faqs || []
  const schemas = [
    serviceSchema({ name: service.h1 || service.title, description: service.description, url: `${SITE.url}${service.href}` }),
    ...(faqs.length ? [faqSchema(faqs)] : []),
  ]
  return (
    <section className="container-fluid alcor-section border-t border-line" aria-labelledby="service-questions">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas).replace(/</g, '\\u003c') }} />
      <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
        <div><p className="alcor-eyebrow">Vor Ihrer Entscheidung</p><h2 id="service-questions">Häufige Fragen: {service.title}</h2><p className="alcor-intro">Leistungen, Grenzen und Zusammenarbeit verständlich erklärt.</p></div>
        <div>
          {faqs.map((faq) => (
            <details key={faq.question} className="group border-b border-line py-3">
              <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-5 py-3 text-lg font-semibold hover:text-signal-2 [&::-webkit-details-marker]:hidden">
                <span>{faq.question}</span><span aria-hidden="true" className="shrink-0 text-2xl text-signal-2 group-open:rotate-45">+</span>
              </summary>
              <p className="pb-6 pt-3 text-base leading-relaxed text-paper-mute">{faq.answer}</p>
            </details>
          ))}
          <nav aria-label="Weiterführende Informationen zur Leistung" className="mt-8 space-y-4">
            {(GUIDES[service.slug] || []).map((guide) => <Link key={guide.href} href={guide.href} className="alcor-text-link block">{guide.label} →</Link>)}
          </nav>
        </div>
      </div>
    </section>
  )
}
