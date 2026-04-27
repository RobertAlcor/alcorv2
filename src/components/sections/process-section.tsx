'use client'

import { motion } from 'motion/react'
import {
  MessageSquare,
  PenLine,
  Hammer,
  Rocket,
  ArrowRight,
} from 'lucide-react'

const STEPS = [
  {
    number: '01',
    icon: MessageSquare,
    title: 'Erstgespräch',
    duration: '~30 Min',
    description:
      'Wir besprechen, was Sie brauchen. Ziele, Budget, Inhalte, Zeitrahmen. Kostenlos und unverbindlich.',
  },
  {
    number: '02',
    icon: PenLine,
    title: 'Konzept',
    duration: '~3 Tage',
    description:
      'Sie bekommen einen schriftlichen Vorschlag mit Seitenstruktur, Design-Richtung und Festpreis.',
  },
  {
    number: '03',
    icon: Hammer,
    title: 'Umsetzung',
    duration: '~7 Tage',
    description:
      'Ich baue. Sie sehen den Live-Stand jederzeit. Anpassungen klären wir direkt – kein E-Mail-Pingpong.',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Launch',
    duration: '1 Tag',
    description:
      'Live-Schaltung, Suchmaschinen-Anmeldung, Übergabe. Ab da gehört der Code Ihnen.',
  },
] as const

export function ProcessSection() {
  return (
    <section className="container-fluid py-24 md:py-32 border-t border-line">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl mb-12 md:mb-16"
      >
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-signal-2 mb-6">
          <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
          Ablauf
        </p>
        <h2 className="font-serif text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] text-balance">
          Vom ersten Gespräch zur Live-Schaltung.
        </h2>
      </motion.div>

      <div className="relative">
        {/* Connecting line - desktop only */}
        <div
          aria-hidden
          className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-line"
        />

        <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 relative">
          {STEPS.map((step, idx) => {
            const Icon = step.icon
            return (
              <motion.li
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative bg-deep-2 border border-line rounded-sm p-7 hover:border-signal-2 transition-colors group"
              >
                {/* Icon circle - sits on the connecting line */}
                <div className="hidden lg:flex absolute -top-px left-7 -translate-y-1/2 w-12 h-12 items-center justify-center bg-deep-2 border border-line rounded-full text-signal-2 group-hover:border-signal-2 group-hover:scale-110 transition-all duration-500">
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                </div>

                <div className="lg:mt-6">
                  {/* Mobile icon + number */}
                  <div className="lg:hidden flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 flex items-center justify-center bg-deep border border-line rounded-full text-signal-2">
                      <Icon className="w-4 h-4" strokeWidth={1.5} />
                    </div>
                    <span className="font-mono text-xs text-signal-2">
                      Schritt {step.number}
                    </span>
                  </div>

                  <div className="hidden lg:block font-mono text-xs text-signal-2 mb-1">
                    {step.number}
                  </div>
                  <div className="flex items-baseline justify-between gap-3 mb-3">
                    <h3 className="font-serif text-2xl text-paper">{step.title}</h3>
                    <span className="font-mono text-[0.7rem] text-paper-dim shrink-0">
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-paper-mute text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow to next step - desktop only, between cards */}
                {idx < STEPS.length - 1 && (
                  <div
                    aria-hidden
                    className="hidden lg:flex absolute top-12 -right-4 -translate-y-1/2 w-8 h-8 items-center justify-center bg-deep border border-line rounded-full text-paper-dim z-10 group-hover:text-signal-2 transition-colors"
                  >
                    <ArrowRight className="w-3 h-3" strokeWidth={2} />
                  </div>
                )}
              </motion.li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
