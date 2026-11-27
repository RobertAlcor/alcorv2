import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Case } from '@/lib/cases'
import { projectAccessHref } from '@/lib/project-access'
import { CaseMockup } from './case-mockup'

export function CaseCard({ caseData }: { caseData: Case }) {
  return (
    <article className="group bg-deep-2 border-line hover:border-signal-2/40 flex h-full min-w-0 flex-col overflow-hidden rounded-sm border transition-all duration-500">
      <Link href={caseData.url} className="block shrink-0">
        <CaseMockup caseData={caseData} />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-7">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          <span className="text-signal-2 font-mono text-[0.7rem] tracking-wider uppercase">
            {caseData.industry}
          </span>
          <span className="text-paper-dim font-mono text-[0.7rem]">{caseData.year}</span>
        </div>

        <h3 className="text-paper group-hover:text-signal-2 mb-3 break-words font-serif text-2xl transition-colors">
          <Link href={caseData.url} className="block">
            {caseData.client}
          </Link>
        </h3>

        <p className="text-paper-mute mb-5 text-sm leading-relaxed">
          {caseData.shortDescription}
        </p>

        {/* Tags */}
        <div className="mb-6 flex flex-wrap gap-1.5">
          {caseData.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-paper-mute bg-deep border-line max-w-full break-words rounded-sm border px-2 py-0.5 font-mono text-[0.65rem] tracking-wider uppercase"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA Footer */}
        <div className="border-line mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t pt-4">
          <Link
            href={caseData.url}
            className="text-signal-2 inline-flex min-h-11 items-center gap-2 text-sm font-medium transition-all hover:gap-3"
          >
            Case Study lesen
            <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          </Link>
          {caseData.access === 'on-request' ? (
            <Link
              href={projectAccessHref(caseData.slug)}
              className="text-signal-2 hover:text-paper inline-flex min-h-11 items-center text-sm transition-colors"
              aria-label={`Zugang zu ${caseData.client} bei Robert anfragen`}
            >
              Zugang anfragen
            </Link>
          ) : (
            <a
              href={caseData.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-paper-dim hover:text-paper inline-flex min-h-11 items-center text-xs transition-colors"
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
