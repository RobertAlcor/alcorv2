import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'
import { TerminWizard } from '@/components/booking/termin-wizard'
import { SITE } from '@/lib/site'
import { RelatedPages } from '@/components/sections/related-pages'
import { RELATED_FOR } from '@/lib/related-pages'
import { PAGE_META } from '@/lib/seo-metadata'



export const metadata = PAGE_META.termin

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
          <h1 className="alcor-page-title mb-8">
            15 Minuten.<br /><span className="text-signal-2">Passen wir zusammen?</span>
          </h1>
          <p className="alcor-intro">
            Kostenlos und unverbindlich kennenlernen. Beschreiben Sie Ihre Idee und
            wählen Sie einen angebotenen Termin. Ein Auftrag entsteht erst durch eine gesonderte Vereinbarung.
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
      <RelatedPages pages={RELATED_FOR.termin} />

    </>
  )
}
