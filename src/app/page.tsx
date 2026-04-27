import { Hero } from '@/components/sections/hero'
import Link from 'next/link'

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Platzhalter für Sprint 2: Services Bento, Cases, FAQ, CTA */}
      <section className="container-fluid py-24 border-t border-line">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-signal-2 mb-4">
            <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
            Im Aufbau
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-paper mb-6 text-balance">
            Weitere Sektionen folgen.
          </h2>
          <p className="text-paper-mute leading-relaxed text-lg max-w-xl">
            Diese Seite befindet sich in aktiver Entwicklung. Leistungen, Referenzen
            und Blog werden in den nächsten Wochen ergänzt. Wenn Sie nicht warten
            möchten —
          </p>
          <div className="mt-8">
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 px-7 py-4 bg-signal text-paper font-medium text-sm rounded-sm hover:bg-signal-2 transition-all duration-300"
            >
              Direkt anfragen
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
