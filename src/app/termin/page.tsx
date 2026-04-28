import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'
import { TerminWizard } from '@/components/booking/termin-wizard'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Termin vereinbaren',
  description:
    '15 Minuten Erstgespräch direkt online buchen. Telefon, Video oder vor Ort in Wien. Kostenlos, ohne Verkaufsdruck.',
  alternates: { canonical: '/termin' },
}

export default function TerminPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Start', href: '/' },
          { label: 'Termin', href: '/termin' },
        ]}
      />

      <section className="container-fluid pt-12 md:pt-16 pb-12">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-signal-2 mb-6">
            <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
            Erstgespräch
          </p>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] tracking-[-0.02em] text-balance mb-8">
            15 Minuten,{' '}
            <em className="text-signal-2 italic">die klären</em>, ob wir
            zusammenpassen.
          </h1>
          <p className="font-serif italic text-xl md:text-2xl text-paper-mute max-w-3xl leading-snug">
            Direkt online buchen. Telefon, Video oder vor Ort in Wien.
            Kostenlos, ohne Verkaufsdruck.
          </p>
        </div>
      </section>

      <section className="container-fluid pb-24 max-w-4xl">
        <TerminWizard />

        {/* Fallback: Telefon */}
        <div className="mt-16 pt-8 border-t border-line text-center">
          <p className="text-paper-dim text-sm mb-3">
            Lieber direkt sprechen, ohne Online-Buchung?
          </p>
          <a
            href={`tel:${SITE.contact.phoneRaw}`}
            className="text-signal-2 hover:text-signal text-lg font-mono"
          >
            {SITE.contact.phoneFormatted}
          </a>
        </div>
      </section>
    </>
  )
}
