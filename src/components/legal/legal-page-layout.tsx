import type { ReactNode } from 'react'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'

type Props = {
  eyebrow: string
  title: string
  subtitle?: string
  lastUpdated: string
  breadcrumbs: { label: string; href: string }[]
  children: ReactNode
}

export function LegalPageLayout({
  eyebrow,
  title,
  subtitle,
  lastUpdated,
  breadcrumbs,
  children,
}: Props) {
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />

      <section className="container-fluid pt-12 md:pt-16 pb-12">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-signal-2 mb-6">
            <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
            {eyebrow}
          </p>
          <h1 className="font-serif text-[clamp(2.25rem,6vw,4.5rem)] leading-[0.95] tracking-[-0.02em] text-balance mb-6">
            {title}
          </h1>
          {subtitle && (
            <p className="font-serif italic text-lg md:text-xl text-paper-mute leading-snug mb-3">
              {subtitle}
            </p>
          )}
          <p className="text-xs text-paper-mute font-mono uppercase tracking-wider">
            Stand: {lastUpdated}
          </p>
        </div>
      </section>

      <section className="container-fluid pb-24 md:pb-32">
        <div className="max-w-3xl">{children}</div>
      </section>
    </>
  )
}
