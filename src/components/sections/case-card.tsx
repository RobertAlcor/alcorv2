import Link from 'next/link'
import type { Case } from '@/lib/cases'
import { CaseMockup } from './case-mockup'

export function CaseCard({ caseData }: { caseData: Case }) {
  return (
    <Link
      href={caseData.url}
      className="group block"
      aria-label={`Case Study ${caseData.client} ansehen`}
    >
      <div className="overflow-hidden rounded-sm transition-transform duration-500 group-hover:scale-[1.01]">
        <CaseMockup caseData={caseData} />
      </div>
      <div className="mt-5">
        <div className="flex items-center gap-3 mb-2">
          <span className="font-mono text-[0.7rem] text-paper-dim uppercase tracking-wider">
            {caseData.industry}
          </span>
        </div>
        <h3 className="font-serif text-2xl text-paper group-hover:text-signal-2 transition-colors mb-2">
          {caseData.client}
        </h3>
        <p className="text-paper-mute text-sm leading-relaxed line-clamp-2">
          {caseData.shortDescription}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {caseData.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-[0.7rem] font-medium text-paper-mute bg-deep-2 border border-line rounded-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
