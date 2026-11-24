import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Case } from '@/lib/cases'
import { projectAccessHref } from '@/lib/project-access'
import { CaseMockup } from './case-mockup'

export function CaseCard({ caseData }: { caseData: Case }) {
  return (
    <article className="group bg-deep-2 border-line hover:border-signal-2/40 flex flex-col overflow-hidden rounded-sm border transition-all duration-500">
      <Link href={caseData.url} className="block">
        <CaseMockup caseData={caseData} />
      </Link>

      <div className="flex flex-1 flex-col p-7">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="text-signal-2 font-mono text-[0.7rem] tracking-wider uppercase">
            {caseData.industry}
          </span>
          <span className="text-paper-dim font-mono text-[0.7rem]">{caseData.year}</span>
        </div>

        <h3 className="text-paper group-hover:text-signal-2 mb-3 font-serif text-2xl transition-colors">
          <Link href={caseData.url} className="block">
            {caseData.client}
          </Link>
        </h3>

        <p className="text-paper-mute mb-5 line-clamp-3 text-sm leading-relaxed">
          {caseData.shortDescription}
        </p>

        {/* Tags */}
        <div className="mb-6 flex flex-wrap gap-1.5">
          {caseData.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-paper-mute bg-deep border-line rounded-sm border px-2 py-0.5 font-mono text-[0.65rem] tracking-wider uppercase"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA Footer */}
        <div className="border-line mt-auto flex items-center justify-between border-t pt-4">
          <Link
            href={caseData.url}
            className="text-signal-2 inline-flex items-center gap-2 text-sm font-medium transition-all hover:gap-3"
          >
            Case Study lesen
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          {caseData.access === 'on-request' ? (
            <Link
              href={projectAccessHref(caseData.slug)}
              className="text-signal-2 hover:text-paper text-sm transition-colors"
              aria-label={`Zugang zu ${caseData.client} bei Robert anfragen`}
            >
              Zugang anfragen
            </Link>
          ) : (
            <a
              href={caseData.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-paper-dim hover:text-paper text-xs transition-colors"
              aria-label={`Live-Site ${caseData.client} öffnen`}
            >
              Live ansehen ↗
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
