import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 – Seite nicht gefunden',
  description: 'Die gesuchte Seite existiert nicht.',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <section className="container-fluid pt-16 md:pt-24 pb-32 min-h-[70vh] flex flex-col justify-center">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-signal-2 mb-6">
          <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
          Fehler 404
        </p>
        <h1 className="font-serif text-[clamp(3rem,12vw,9rem)] leading-[0.9] tracking-[-0.025em] text-balance mb-8">
          Diese Seite ist <em className="text-signal-2 italic">nicht hier.</em>
        </h1>
        <p className="font-serif italic text-xl md:text-2xl text-paper-mute max-w-2xl leading-snug mb-10">
          Vielleicht ein alter Link, vielleicht ein Tippfehler. So oder so – hier
          geht es weiter:
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 px-7 py-4 bg-signal text-paper font-medium text-sm rounded-sm hover:bg-signal-2 transition-all duration-300 shadow-[0_8px_30px_-8px_rgba(var(--signal-rgb),0.5)]"
          >
            Zur Startseite
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
          <Link
            href="/leistungen"
            className="inline-flex items-center gap-2 px-7 py-4 text-paper-mute font-medium text-sm border border-line rounded-sm hover:text-paper hover:border-paper-mute transition-all duration-300"
          >
            Leistungen ansehen
          </Link>
        </div>
      </div>
    </section>
  )
}
