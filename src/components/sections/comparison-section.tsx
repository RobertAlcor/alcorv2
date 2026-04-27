const COMPARISON = [
  {
    aspect: 'Lieferzeit',
    alcor: '7 Tage',
    wordpress: '4–8 Wochen',
    advantage: 'alcor' as const,
  },
  {
    aspect: 'Plugin-Updates',
    alcor: 'Keine',
    wordpress: 'Wöchentlich nötig',
    advantage: 'alcor' as const,
  },
  {
    aspect: 'Monatliche Wartung',
    alcor: '€ 0',
    wordpress: '€ 30–150',
    advantage: 'alcor' as const,
  },
  {
    aspect: 'Ladezeit',
    alcor: '< 1 Sekunde',
    wordpress: '2–5 Sekunden',
    advantage: 'alcor' as const,
  },
  {
    aspect: 'Sicherheits­lücken',
    alcor: 'Keine bekannten',
    wordpress: 'Häufig',
    advantage: 'alcor' as const,
  },
  {
    aspect: 'Selbst Inhalte ändern',
    alcor: 'Mit Mini-CMS',
    wordpress: 'Ja, im Backend',
    advantage: 'wordpress' as const,
  },
  {
    aspect: 'Plugin-Marketplace',
    alcor: 'Nein',
    wordpress: 'Ja, 60.000+',
    advantage: 'wordpress' as const,
  },
  {
    aspect: 'Code-Besitz',
    alcor: 'Vollständig bei Ihnen',
    wordpress: 'Theme/Plugin-abhängig',
    advantage: 'alcor' as const,
  },
  {
    aspect: 'Ansprechpartner',
    alcor: 'Eine Person',
    wordpress: 'Account-Manager + Team',
    advantage: 'alcor' as const,
  },
] as const

export function ComparisonSection() {
  return (
    <section className="container-fluid py-24 md:py-32 border-t border-line">
      <div className="max-w-3xl mb-12 md:mb-16">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-signal-2 mb-6">
          <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
          Ehrlicher Vergleich
        </p>
        <h2 className="font-serif text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] text-balance mb-6">
          Handgeschrieben vs. WordPress-Agentur.
        </h2>
        <p className="text-paper-mute leading-relaxed">
          Beide Wege haben ihre Berechtigung. Hier sehen Sie die Unterschiede –
          ehrlich, ohne Marketing-Filter.
        </p>
      </div>

      <div className="overflow-x-auto -mx-[var(--pad-x)] md:mx-0">
        <div className="min-w-[700px] md:min-w-0 px-[var(--pad-x)] md:px-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line">
                <th className="text-left py-5 pr-6 font-mono text-xs text-paper-dim uppercase tracking-wider w-1/3">
                  Aspekt
                </th>
                <th className="text-left py-5 px-6 font-serif text-base text-signal-2">
                  Webdesign Alcor
                </th>
                <th className="text-left py-5 px-6 font-mono text-xs text-paper-dim uppercase tracking-wider">
                  WordPress-Agentur
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row) => (
                <tr
                  key={row.aspect}
                  className="border-b border-line hover:bg-deep-2/40 transition-colors"
                >
                  <td className="py-5 pr-6 text-paper font-medium">
                    {row.aspect}
                  </td>
                  <td
                    className={`py-5 px-6 ${
                      row.advantage === 'alcor'
                        ? 'text-paper font-medium'
                        : 'text-paper-mute'
                    }`}
                  >
                    <span className="inline-flex items-center gap-2">
                      {row.advantage === 'alcor' && (
                        <span className="w-1.5 h-1.5 rounded-full bg-signal-2 shrink-0" />
                      )}
                      {row.alcor}
                    </span>
                  </td>
                  <td
                    className={`py-5 px-6 ${
                      row.advantage === 'wordpress'
                        ? 'text-paper font-medium'
                        : 'text-paper-dim'
                    }`}
                  >
                    <span className="inline-flex items-center gap-2">
                      {row.advantage === 'wordpress' && (
                        <span className="w-1.5 h-1.5 rounded-full bg-paper-dim shrink-0" />
                      )}
                      {row.wordpress}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-8 text-sm text-paper-dim italic max-w-2xl">
        Hinweis: Wenn Sie zwingend einen WordPress-Backend benötigen oder
        Plugins aus dem Marketplace nutzen wollen, ist eine WordPress-Agentur
        der bessere Weg. Für alle anderen Fälle empfehle ich handgeschriebenen
        Code.
      </p>
    </section>
  )
}
