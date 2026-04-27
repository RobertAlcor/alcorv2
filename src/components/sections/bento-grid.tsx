import Link from 'next/link'
import { SERVICES } from '@/lib/services'

const ICONS: Record<string, React.ReactNode> = {
  'website-erstellung': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="1" />
      <line x1="2" y1="9" x2="22" y2="9" />
      <line x1="6" y1="6.5" x2="6.01" y2="6.5" />
      <line x1="9" y1="6.5" x2="9.01" y2="6.5" />
    </svg>
  ),
  relaunch: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  ),
  'seo-wien': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="11" y1="8" x2="11" y2="14" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  ),
}

export function BentoGrid() {
  const [websiteService, relaunchService, seoService] = SERVICES

  return (
    <section className="container-fluid py-24 md:py-32">
      <div className="max-w-3xl mb-16">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-signal-2 mb-6">
          <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
          Leistungen
        </p>
        <h2 className="font-serif text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] text-balance">
          Drei Wege, mit denen ich Ihnen helfe.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        {websiteService && (
          <Link
            href={websiteService.href}
            className="lg:col-span-4 group relative overflow-hidden bg-deep-2 border border-line rounded-sm p-8 md:p-10 hover:border-signal-2 transition-all duration-500 min-h-[280px] flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 text-signal-2 mb-6">{ICONS['website-erstellung']}</div>
              <p className="font-mono text-[0.7rem] text-paper-dim uppercase tracking-wider mb-2">
                {websiteService.tagline}
              </p>
              <h3 className="font-serif text-3xl md:text-4xl text-paper mb-3 group-hover:text-signal-2 transition-colors">
                {websiteService.title}
              </h3>
              <p className="text-paper-mute leading-relaxed max-w-md">
                {websiteService.description}
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-paper-mute group-hover:text-signal-2 mt-8 transition-colors">
              Mehr erfahren
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
          </Link>
        )}

        {relaunchService && (
          <Link
            href={relaunchService.href}
            className="lg:col-span-2 group relative overflow-hidden bg-deep-2 border border-line rounded-sm p-8 hover:border-signal-2 transition-all duration-500 min-h-[280px] flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 text-signal-2 mb-6">{ICONS.relaunch}</div>
              <p className="font-mono text-[0.7rem] text-paper-dim uppercase tracking-wider mb-2">
                {relaunchService.tagline}
              </p>
              <h3 className="font-serif text-2xl text-paper mb-3 group-hover:text-signal-2 transition-colors">
                {relaunchService.title}
              </h3>
              <p className="text-paper-mute text-sm leading-relaxed">
                {relaunchService.description}
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-paper-mute group-hover:text-signal-2 mt-6 transition-colors">
              Mehr
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
          </Link>
        )}

        {seoService && (
          <Link
            href={seoService.href}
            className="lg:col-span-6 group relative overflow-hidden bg-deep-2 border border-line rounded-sm p-8 md:p-10 hover:border-signal-2 transition-all duration-500 min-h-[200px]"
          >
            <div className="grid md:grid-cols-[auto_1fr_auto] gap-6 md:gap-10 items-center">
              <div className="w-10 h-10 text-signal-2">{ICONS['seo-wien']}</div>
              <div>
                <p className="font-mono text-[0.7rem] text-paper-dim uppercase tracking-wider mb-2">
                  {seoService.tagline}
                </p>
                <h3 className="font-serif text-2xl md:text-3xl text-paper mb-2 group-hover:text-signal-2 transition-colors">
                  {seoService.title}
                </h3>
                <p className="text-paper-mute text-sm leading-relaxed max-w-2xl">
                  {seoService.description}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-paper-mute group-hover:text-signal-2 transition-colors shrink-0">
                <span className="hidden md:inline">Mehr erfahren</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </div>
          </Link>
        )}
      </div>
    </section>
  )
}
