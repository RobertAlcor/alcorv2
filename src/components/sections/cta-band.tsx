import Link from 'next/link'
import Image from 'next/image'
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

      <div className="relative grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-center">
        <div>
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

        <div className="hidden lg:block">
          <div className="border-line bg-deep-2 relative overflow-hidden rounded-sm border p-3 shadow-2xl">
            <div className="border-line mb-3 flex items-center gap-1.5 border-b pb-3">
              <span className="bg-paper-dim/40 h-2 w-2 rounded-full" />
              <span className="bg-paper-dim/40 h-2 w-2 rounded-full" />
              <span className="bg-paper-dim/40 h-2 w-2 rounded-full" />
              <span className="text-paper-dim ml-3 font-mono text-[0.6rem]">echtes ALCOR Projekt</span>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-sm">
              <Image
                src="/referenzen/schmerzfrei-wien.webp"
                alt="ALCOR Referenzprojekt schmerzfrei.wien"
                fill
                sizes="40vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
