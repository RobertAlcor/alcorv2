import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'
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
  subtitle = '15 Minuten Erstgespräch direkt buchen. Ehrliche Einschätzung, kein Verkaufsdruck. Telefon, Video oder vor Ort in Wien.',
  primaryLabel = 'Termin vereinbaren',
  primaryHref = '/termin',
  secondaryLabel = 'Anfrage formulieren',
  secondaryHref = '/kontakt',
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
            className="group inline-flex items-center gap-2 min-h-[48px] px-7 py-4 bg-signal text-deep font-medium text-sm rounded-sm hover:bg-signal-2 transition-all duration-300 shadow-[0_8px_30px_-8px_rgba(var(--signal-rgb),0.5)]"
          >
            <Calendar className="w-4 h-4" strokeWidth={1.75} />
            {primaryLabel}
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            href={secondaryHref}
            className="inline-flex items-center gap-2 min-h-[48px] px-7 py-4 text-paper-mute font-medium text-sm border border-line rounded-sm hover:text-paper hover:border-paper-mute transition-all duration-300"
          >
            {secondaryLabel}
          </Link>
          <a
            href={`tel:${SITE.contact.phoneRaw}`}
            className="inline-flex items-center gap-2 min-h-[48px] px-5 py-4 text-paper-dim font-medium text-sm hover:text-paper transition-colors"
          >
            oder direkt anrufen: {SITE.contact.phoneFormatted}
          </a>
        </div>
      </div>
    </section>
  )
}
