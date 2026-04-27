import type { Case } from '@/lib/cases'

export function CaseMockup({ caseData, large = false }: { caseData: Case; large?: boolean }) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-sm border border-line bg-deep ${
        large ? 'aspect-[16/10]' : 'aspect-[4/3]'
      }`}
    >
      {/* Browser chrome */}
      <div className="absolute top-0 left-0 right-0 h-7 md:h-8 bg-deep-2 border-b border-line flex items-center gap-1.5 px-3">
        <span className="w-2 h-2 rounded-full bg-paper-dim/40" />
        <span className="w-2 h-2 rounded-full bg-paper-dim/40" />
        <span className="w-2 h-2 rounded-full bg-paper-dim/40" />
        <div className="ml-2 md:ml-4 flex-1 h-3 md:h-4 bg-deep rounded-sm flex items-center px-2">
          <span className="text-[0.55rem] md:text-[0.6rem] text-paper-dim font-mono truncate">
            {caseData.liveUrl.replace('https://', '')}
          </span>
        </div>
      </div>

      {/* Mockup content with brand color */}
      <div
        className="absolute inset-x-0 top-7 md:top-8 bottom-0 flex items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${caseData.brandColor} 0%, ${caseData.brandColorAccent} 100%)`,
        }}
      >
        {/* Decorative grid */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Initials */}
        <div className="relative font-serif text-white text-[20vw] md:text-[clamp(4rem,12vw,9rem)] leading-none italic font-normal opacity-95 select-none">
          {caseData.initials}
        </div>

        {/* Bottom badge */}
        <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 right-3 md:right-4 flex items-end justify-between gap-2">
          <div className="font-mono text-[0.6rem] md:text-[0.65rem] text-white/80 uppercase tracking-wider">
            {caseData.industry}
          </div>
          <div className="font-mono text-[0.6rem] md:text-[0.65rem] text-white/80">
            {caseData.year}
          </div>
        </div>
      </div>
    </div>
  )
}
