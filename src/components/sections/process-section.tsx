const STEPS = [
  {
    number: '01',
    title: 'Erstgespräch',
    duration: '~30 Min',
    description:
      'Wir besprechen, was Sie brauchen. Ziele, Budget, Inhalte, Zeitrahmen. Kostenlos und unverbindlich.',
  },
  {
    number: '02',
    title: 'Konzept',
    duration: '~3 Tage',
    description:
      'Sie bekommen einen schriftlichen Vorschlag mit Seitenstruktur, Design-Richtung und Festpreis.',
  },
  {
    number: '03',
    title: 'Umsetzung',
    duration: '~7 Tage',
    description:
      'Ich baue. Sie sehen den Live-Stand jederzeit. Anpassungen klären wir direkt – kein E-Mail-Pingpong.',
  },
  {
    number: '04',
    title: 'Launch',
    duration: '1 Tag',
    description:
      'Live-Schaltung, Suchmaschinen-Anmeldung, Übergabe. Ab da gehört der Code Ihnen.',
  },
] as const

export function ProcessSection() {
  return (
    <section className="container-fluid py-24 md:py-32 border-t border-line">
      <div className="max-w-3xl mb-12 md:mb-16">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-signal-2 mb-6">
          <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
          Ablauf
        </p>
        <h2 className="font-serif text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] text-balance">
          Vom ersten Gespräch zur Live-Schaltung.
        </h2>
      </div>

      <div className="relative">
        {/* Connecting line - desktop only */}
        <div
          aria-hidden
          className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-line"
        />

        <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 relative">
          {STEPS.map((step, idx) => (
            <li
              key={step.number}
              className="relative bg-deep-2 border border-line rounded-sm p-7 hover:border-signal-2 transition-colors group"
            >
              {/* Number circle - sits on the connecting line */}
              <div className="hidden lg:flex absolute -top-px left-7 -translate-y-1/2 w-10 h-10 items-center justify-center bg-deep-2 border border-line rounded-full font-mono text-xs text-signal-2 group-hover:border-signal-2 transition-colors">
                {step.number}
              </div>

              <div className="lg:mt-4">
                <div className="lg:hidden font-mono text-xs text-signal-2 mb-2">
                  Schritt {step.number}
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
                  className="hidden lg:flex absolute top-8 -right-4 -translate-y-1/2 w-8 h-8 items-center justify-center bg-deep border border-line rounded-full text-paper-dim z-10"
                >
                  <svg
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
