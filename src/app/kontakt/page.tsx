import type { Metadata } from 'next'
import { KontaktForm } from '@/components/sections/kontakt-form'
import { SITE } from '@/lib/site'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Kontakt',
  description:
    'Anfrage für Webentwicklung, Relaunch oder SEO. Antwort binnen 24 Stunden. Auch direkt per Telefon, E-Mail oder WhatsApp.',
  alternates: { canonical: '/kontakt' },
}

export default function KontaktPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Start', url: SITE.url },
              { name: 'Kontakt', url: `${SITE.url}/kontakt` },
            ])
          ),
        }}
      />

      <section className="container-fluid pt-16 md:pt-24 pb-32">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-signal-2 mb-6">
            <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
            Kontakt
          </p>

          <h1 className="font-serif text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] tracking-[-0.02em] text-balance mb-8">
            Erzählen Sie mir, <em className="text-signal-2 italic">was Sie vorhaben.</em>
          </h1>

          <p className="font-serif italic text-xl md:text-2xl text-paper-mute max-w-2xl leading-snug mb-16">
            Ein Satz reicht für den Anfang. Den Rest klären wir im Gespräch.
          </p>

          <div className="grid lg:grid-cols-[1fr_320px] gap-12 lg:gap-20 items-start">
            <div>
              <KontaktForm />
            </div>

            <aside className="space-y-8 lg:pt-2">
              <div>
                <h2 className="text-xs font-semibold tracking-[0.16em] uppercase text-paper-dim mb-3">
                  Direkt erreichen
                </h2>
                <ul className="space-y-4">
                  <li>
                    <a
                      href={`tel:${SITE.contact.phoneRaw}`}
                      className="block group"
                    >
                      <span className="block text-xs text-paper-dim mb-1">Telefon</span>
                      <span className="font-serif text-xl text-paper group-hover:text-signal-2 transition-colors">
                        {SITE.contact.phoneFormatted}
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${SITE.contact.email}`}
                      className="block group"
                    >
                      <span className="block text-xs text-paper-dim mb-1">E-Mail</span>
                      <span className="font-serif text-xl text-paper group-hover:text-signal-2 transition-colors break-all">
                        {SITE.contact.email}
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={SITE.contact.whatsappPrefilled}
                      target="_blank"
                      rel="noopener"
                      className="block group"
                    >
                      <span className="block text-xs text-paper-dim mb-1">WhatsApp</span>
                      <span className="font-serif text-xl text-paper group-hover:text-signal-2 transition-colors">
                        Direkt schreiben
                      </span>
                    </a>
                  </li>
                </ul>
              </div>

              <div className="pt-8 border-t border-line">
                <h2 className="text-xs font-semibold tracking-[0.16em] uppercase text-paper-dim mb-3">
                  Standort
                </h2>
                <p className="text-sm text-paper-mute leading-relaxed">
                  {SITE.address.street}<br />
                  {SITE.address.postalCode} {SITE.address.city}<br />
                  {SITE.address.district}
                </p>
              </div>

              <div className="pt-8 border-t border-line">
                <h2 className="text-xs font-semibold tracking-[0.16em] uppercase text-paper-dim mb-3">
                  Erreichbar
                </h2>
                <p className="text-sm text-paper-mute leading-relaxed">
                  Montag – Freitag<br />
                  9 bis 18 Uhr
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
