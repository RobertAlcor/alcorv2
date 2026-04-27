import Link from 'next/link'
import { breadcrumbSchema } from '@/lib/schema'
import { SITE } from '@/lib/site'

export type Crumb = { label: string; href: string }

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const schemaItems = items.map((item) => ({
    name: item.label,
    url: `${SITE.url}${item.href}`,
  }))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema(schemaItems)),
        }}
      />
      <nav
        aria-label="Brotkrumen-Navigation"
        className="container-fluid pt-8"
      >
        <ol className="flex items-center gap-2 text-xs text-paper-dim flex-wrap">
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1
            return (
              <li key={item.href} className="flex items-center gap-2">
                {isLast ? (
                  <span className="text-paper-mute" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-paper-mute transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
                {!isLast && (
                  <span className="text-paper-dim/50" aria-hidden="true">
                    /
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
