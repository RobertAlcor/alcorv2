import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export type RelatedPage = {
  href: string
  label: string
  description: string
}

type Props = {
  title?: string
  pages: RelatedPage[]
}

/**
 * Cross-linking section am Ende einer Seite.
 * Zeigt 2-4 thematisch passende andere Seiten als interne Links.
 * Hilft Lesern weiterzuklicken ohne ins Hauptmenü zu greifen.
 */
export function RelatedPages({
  title = 'Verwandte Seiten',
  pages,
}: Props) {
  if (pages.length === 0) return null

  return (
    <section className="container-fluid py-16 md:py-20 border-t border-line">
      <p className="text-xs font-semibold tracking-[0.16em] uppercase text-signal-2 mb-6">
        <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
        {title}
      </p>
      <div
        className={`grid gap-4 md:gap-5 ${
          pages.length === 2
            ? 'md:grid-cols-2'
            : pages.length === 3
              ? 'md:grid-cols-3'
              : 'md:grid-cols-2 lg:grid-cols-4'
        }`}
      >
        {pages.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className="group block bg-deep-2 border border-line rounded-sm p-6 hover:border-signal-2/40 transition-all duration-300"
          >
            <h3 className="font-serif text-xl text-paper mb-2 group-hover:text-signal-2 transition-colors leading-tight">
              {page.label}
            </h3>
            <p className="text-sm text-paper-mute leading-relaxed mb-4">
              {page.description}
            </p>
            <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-signal-2 group-hover:gap-2.5 transition-all">
              Ansehen
              <ArrowRight className="w-3 h-3" strokeWidth={2} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
