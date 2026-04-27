import Link from 'next/link'
import { SITE } from '@/lib/site'

type CtaBandProps = {
  title?: string
  subtitle?: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
}

export function CtaBand({
  title = 'Reden wir.',
  subtitle = 'Kostenfreies Erstgespräch, ehrliche Einschätzung Ihres Projekts. Persönlich in Wien, telefonisch oder per Videocall.',
  primaryLabel = 'Projekt anfragen',
  primaryHref = '/kontakt',
  secondaryLabel = 'Direkt anrufen',
  secondaryHref = `tel:${SITE.contact.phoneRaw}`,
}: CtaBandProps) {
  return (
    <section className="container-fluid py-24 md:py-32 border-t border-line relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(var(--signal-rgb),0.15) 0%, transparent 60%)',
        }}
      />

      <div className="relative max-w-3xl">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-signal-2 mb-6">
          <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
          Nächster Schritt
        </p>
        <h2 className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-[-0.02em] text-balance mb-6">
          {title}
        </h2>
        <p className="text-paper-mute leading-relaxed text-lg mb-10 max-w-xl">
          {subtitle}
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <Link
            href={primaryHref}
            className="group inline-flex items-center gap-2 px-7 py-4 bg-signal text-paper font-medium text-sm rounded-sm hover:bg-signal-2 transition-all duration-300 shadow-[0_8px_30px_-8px_rgba(var(--signal-rgb),0.5)]"
          >
            {primaryLabel}
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
          <Link
            href={secondaryHref}
            className="inline-flex items-center gap-2 px-7 py-4 text-paper-mute font-medium text-sm border border-line rounded-sm hover:text-paper hover:border-paper-mute transition-all duration-300"
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
