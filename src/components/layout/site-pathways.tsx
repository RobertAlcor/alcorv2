'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight } from 'lucide-react'

type Pathway = {
  href: string
  label: string
  description: string
}

const pathways = {
  website: {
    href: '/leistungen/website-erstellung',
    label: 'Website erstellen lassen',
    description: 'Pakete, Leistungsumfang und Ablauf für eine neue Firmenwebsite.',
  },
  relaunch: {
    href: '/leistungen/relaunch',
    label: 'Website-Relaunch',
    description: 'Bestehende Inhalte, Technik und Anfragewege gezielt überarbeiten.',
  },
  seo: {
    href: '/leistungen/seo-wien',
    label: 'Technische SEO',
    description: 'Indexierbarkeit, Struktur, interne Links und lokale Sichtbarkeit verbessern.',
  },
  it: {
    href: '/it-service-wien',
    label: 'PC-Hilfe & IT-Service',
    description: 'Windows, PC-Einrichtung, E-Mail, WLAN, Drucker und Fernwartung in Wien.',
  },
  websiteService: {
    href: '/website-service',
    label: 'Website-Service',
    description: 'Soforthilfe und vereinbarte Betreuung für bestehende Websites.',
  },
  prices: {
    href: '/preise',
    label: 'Preise vergleichen',
    description: 'Webdesign- und IT-Einstiegspreise mit klaren Leistungsgrenzen.',
  },
  references: {
    href: '/referenzen',
    label: 'Projekte ansehen',
    description: 'Konkrete Websites, Anwendungen und umgesetzte Funktionen.',
  },
  guides: {
    href: '/blog',
    label: 'Ratgeber lesen',
    description: 'Entscheidungshilfen zu Webdesign, SEO, Kosten und Technik.',
  },
  contact: {
    href: '/kontakt',
    label: 'Anliegen schildern',
    description: 'Website-, SEO- oder IT-Anfrage kostenlos und unverbindlich senden.',
  },
  appointment: {
    href: '/termin',
    label: '15 Minuten kennenlernen',
    description: 'Ziele, Umfang und nächsten Schritt persönlich besprechen.',
  },
} satisfies Record<string, Pathway>

function selectPathways(pathname: string): Pathway[] {
  if (pathname.startsWith('/it-service-wien')) {
    return [pathways.contact, pathways.prices, pathways.website, pathways.references]
  }

  if (pathname.startsWith('/preise')) {
    return [pathways.website, pathways.it, pathways.references, pathways.contact]
  }

  if (pathname.startsWith('/leistungen/seo-wien')) {
    return [pathways.website, pathways.relaunch, pathways.references, pathways.contact]
  }

  if (pathname.startsWith('/leistungen')) {
    return [pathways.prices, pathways.references, pathways.guides, pathways.contact]
  }

  if (
    pathname.startsWith('/website-service') ||
    pathname.startsWith('/website-soforthilfe') ||
    pathname.startsWith('/website-betreuung')
  ) {
    return [pathways.website, pathways.prices, pathways.it, pathways.contact]
  }

  if (pathname.startsWith('/blog')) {
    return [pathways.website, pathways.it, pathways.references, pathways.contact]
  }

  if (pathname.startsWith('/referenzen')) {
    return [pathways.website, pathways.it, pathways.prices, pathways.contact]
  }

  if (pathname.startsWith('/ueber-mich')) {
    return [pathways.references, pathways.website, pathways.it, pathways.contact]
  }

  if (
    pathname.startsWith('/kontakt') ||
    pathname.startsWith('/bewerbung') ||
    pathname.startsWith('/termin')
  ) {
    return [pathways.website, pathways.it, pathways.prices, pathways.references]
  }

  return [pathways.website, pathways.it, pathways.prices, pathways.references]
}

export function SitePathways() {
  const pathname = usePathname()

  if (pathname.startsWith('/admin')) return null

  const selected = selectPathways(pathname).filter(
    (item, index, items) =>
      item.href !== pathname &&
      items.findIndex((candidate) => candidate.href === item.href) === index,
  )

  if (selected.length === 0) return null

  return (
    <section
      className="container-fluid border-t border-line py-14 md:py-18"
      aria-labelledby="site-pathways-title"
    >
      <div className="mb-7 max-w-3xl">
        <p className="alcor-eyebrow">Direkte Wege</p>
        <h2 id="site-pathways-title" className="text-3xl md:text-4xl">
          Ohne Umweg zur passenden Information.
        </h2>
      </div>
      <nav
        aria-label="Thematisch passende Seiten"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {selected.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex min-h-[170px] flex-col justify-between rounded-lg border border-line bg-deep-2 p-6 transition-colors hover:border-signal-2/60 focus-visible:border-signal-2"
          >
            <div>
              <h3 className="text-xl leading-tight text-paper transition-colors group-hover:text-signal-2">
                {item.label}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-paper-mute">
                {item.description}
              </p>
            </div>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-signal-2">
              Seite öffnen
              <ArrowRight size={16} aria-hidden="true" />
            </span>
          </Link>
        ))}
      </nav>
    </section>
  )
}
