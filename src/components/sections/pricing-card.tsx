import Link from 'next/link'
import { SITE } from '@/lib/site'

type PricingTier = {
  name: string
  price: string
  priceNote: string
  description: string
  features: string[]
  cta: string
  ctaHref: string
  highlight?: boolean
}

const TIERS: PricingTier[] = [
  {
    name: 'Starter',
    price: `€ ${SITE.pricing.starter}`,
    priceNote: 'einmalig',
    description: 'Eine schnelle, schlanke Website für den professionellen Auftritt.',
    features: [
      'Bis zu 5 Seiten',
      'Mobile optimiert',
      'Technisches SEO',
      'Kontaktformular',
      'Lieferung in 7 Tagen',
      'DSGVO-konform',
    ],
    cta: 'Starter anfragen',
    ctaHref: '/kontakt',
  },
  {
    name: 'Business',
    price: 'auf Anfrage',
    priceNote: 'individuell kalkuliert',
    description: 'Mehrseitige Site mit erweiterten Funktionen und CMS-Light für Selbstpflege.',
    features: [
      'Bis zu 15 Seiten',
      'Mini-CMS für Selbstpflege',
      'Erweitertes SEO',
      'Blog-System',
      'Lead-Funnel mit Formularen',
      'Lieferung 2-3 Wochen',
    ],
    cta: 'Business anfragen',
    ctaHref: '/kontakt',
    highlight: true,
  },
  {
    name: 'Premium',
    price: 'auf Anfrage',
    priceNote: 'projektbasiert',
    description: 'Komplexe Sites, Custom-Funktionen, E-Commerce, individuelle Backend-Lösungen.',
    features: [
      'Individueller Umfang',
      'Custom-Funktionen',
      'Logo und Branding inklusive',
      'Vollständige SEO und GEO',
      'Foto-Produktion auf Wunsch',
      'Lieferung nach Vereinbarung',
    ],
    cta: 'Premium anfragen',
    ctaHref: '/kontakt',
  },
]

export function PricingCards() {
  return (
    <div className="grid gap-6 md:gap-8 md:grid-cols-3">
      {TIERS.map((tier) => (
        <article
          key={tier.name}
          className={`relative flex flex-col bg-deep-2 border rounded-sm p-8 transition-colors duration-500 ${
            tier.highlight
              ? 'border-signal-2 shadow-[0_0_60px_-20px_rgba(var(--signal-rgb),0.4)]'
              : 'border-line hover:border-paper-mute/30'
          }`}
        >
          {tier.highlight && (
            <span className="absolute -top-3 left-8 px-3 py-1 text-[0.65rem] font-semibold tracking-[0.12em] uppercase bg-signal text-paper rounded-sm">
              Häufigste Wahl
            </span>
          )}

          <div className="mb-6">
            <h3 className="font-serif text-2xl text-paper mb-2">{tier.name}</h3>
            <p className="text-paper-mute text-sm leading-relaxed">{tier.description}</p>
          </div>

          <div className="mb-8 pb-8 border-b border-line">
            <div className="font-serif text-4xl text-paper">{tier.price}</div>
            <div className="text-xs text-paper-dim mt-1">{tier.priceNote}</div>
          </div>

          <ul className="space-y-3 mb-10 flex-1">
            {tier.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-sm text-paper-mute">
                <svg
                  className="w-4 h-4 text-signal-2 mt-0.5 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <Link
            href={tier.ctaHref}
            className={`group inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 font-medium text-sm rounded-sm transition-all duration-300 ${
              tier.highlight
                ? 'bg-signal text-paper hover:bg-signal-2 shadow-[0_8px_30px_-8px_rgba(var(--signal-rgb),0.5)]'
                : 'border border-line text-paper-mute hover:text-paper hover:border-paper-mute'
            }`}
          >
            {tier.cta}
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </article>
      ))}
    </div>
  )
}
