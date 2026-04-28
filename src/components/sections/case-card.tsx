import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Case } from '@/lib/cases'
import { CaseMockup } from './case-mockup'

export function CaseCard({ caseData }: { caseData: Case }) {
  return (
    <article className="group flex flex-col bg-deep-2 border border-line rounded-sm overflow-hidden transition-all duration-500 hover:border-signal-2/40">
      <Link href={caseData.url} className="block">
        <CaseMockup caseData={caseData} />
      </Link>

      <div className="flex-1 flex flex-col p-7">
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className="font-mono text-[0.7rem] text-signal-2 uppercase tracking-wider">
            {caseData.industry}
          </span>
          <span className="font-mono text-[0.7rem] text-paper-dim">
            {caseData.year}
          </span>
        </div>

        <h3 className="font-serif text-2xl text-paper mb-3 transition-colors group-hover:text-signal-2">
          <Link href={caseData.url} className="block">
            {caseData.client}
          </Link>
        </h3>

        <p className="text-paper-mute leading-relaxed text-sm mb-5 line-clamp-3">
          {caseData.shortDescription}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {caseData.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[0.65rem] font-mono uppercase tracking-wider text-paper-mute bg-deep border border-line rounded-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA Footer */}
        <div className="mt-auto pt-4 border-t border-line flex items-center justify-between">
          <Link
            href={caseData.url}
            className="inline-flex items-center gap-2 text-sm font-medium text-signal-2 hover:gap-3 transition-all"
          >
            Case Study lesen
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <a
            href={caseData.liveUrl}
            target="_blank"
            rel="noopener"
            className="text-xs text-paper-dim hover:text-paper transition-colors"
            aria-label={`Live-Site ${caseData.client} öffnen`}
          >
            Live ansehen ↗
          </a>
        </div>
      </div>
    </article>
  )
}
