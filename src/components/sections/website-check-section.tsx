import Link from 'next/link'
import { ArrowRight, Search, CheckCircle2 } from 'lucide-react'

const CHECKS = [
  'Ist in 5 Sekunden klar, was Sie anbieten?',
  'Funktioniert der Anfrageweg am Smartphone?',
  'Sind Leistung, Standort und Nutzen für Google verständlich?',
  'Schafft die Seite genug Vertrauen für eine Kontaktaufnahme?',
] as const

export function WebsiteCheckSection() {
  return (
    <section className="border-line border-t">
      <div className="container-fluid py-20 md:py-28">
        <div className="border-signal-2/30 bg-deep-2 relative overflow-hidden rounded-sm border p-7 md:p-10 lg:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(var(--signal-rgb),0.14), transparent 68%)' }}
          />
          <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <div className="text-signal-2 mb-6 flex h-11 w-11 items-center justify-center rounded-full border border-signal-2/30">
                <Search className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <p className="text-signal-2 mb-4 font-mono text-[0.7rem] tracking-[0.16em] uppercase">
                Niedrige Einstiegshürde
              </p>
              <h2 className="font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.02em]">
                Unsicher, warum Ihre Website keine Anfragen bringt?
              </h2>
              <p className="text-paper-mute mt-5 max-w-xl leading-relaxed">
                Schicken Sie mir Ihre Website. Ich sehe mir den ersten Eindruck, den Anfrageweg,
                die mobile Darstellung und die technische Basis an und sage Ihnen, wo ich zuerst
                ansetzen würde.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/kontakt?anliegen=website-check"
                  className="group bg-signal text-deep hover:bg-signal-2 inline-flex min-h-[48px] items-center gap-2 rounded-sm px-6 py-3.5 text-sm font-semibold transition-colors"
                >
                  Website prüfen lassen
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/referenzen"
                  className="border-line text-paper-mute hover:text-paper hover:border-paper-mute inline-flex min-h-[48px] items-center rounded-sm border px-6 py-3.5 text-sm font-medium transition-colors"
                >
                  Erst Referenzen ansehen
                </Link>
              </div>
              <p className="text-paper-dim mt-4 text-xs">
                Unverbindliche Ersteinschätzung — kein automatisierter SEO-Report.
              </p>
            </div>

            <div className="border-line bg-deep rounded-sm border p-6 md:p-8">
              <p className="text-paper mb-6 text-sm font-semibold">Darauf schaue ich zuerst:</p>
              <ul className="space-y-5">
                {CHECKS.map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckCircle2 className="text-signal-2 mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.75} />
                    <span className="text-paper-mute text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
