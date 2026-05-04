import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { SITE, NAV, SISTER_SITES } from '@/lib/site'
import { APP_VERSION } from '@/lib/version'

export function Footer() {
  return (
    <footer className="border-line bg-deep mt-32 border-t">
      <div className="container-fluid grid gap-12 pt-16 pb-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link href="/" className="mb-5 flex items-baseline gap-1.5">
            <span className="text-paper font-serif text-2xl tracking-tight">
              <span className="text-signal-2 text-[1.7rem] italic">A</span>
              LCOR
            </span>
            <span className="text-paper-mute font-mono text-[0.65rem] tracking-[0.18em] uppercase">
              Group
            </span>
          </Link>
          <p className="text-paper-mute max-w-md text-sm leading-relaxed">
            {SITE.tagline}. Handgeschriebener Code statt WordPress. Eine Person, voller
            Code-Besitz.
          </p>
          <p className="text-paper-dim text-s mt-6 max-w-md leading-relaxed italic">
            Diese Seite lädt in unter einer Sekunde, hat 0 Tracking-Cookies und wurde von
            Hand geschrieben. Alles, was ich predige, lebe ich hier vor.
          </p>
        </div>

        <div>
          <h3 className="text-paper-dim mb-4 font-sans text-xs font-semibold tracking-[0.16em] uppercase">
            Navigation
          </h3>
          <ul className="space-y-2.5">
            {NAV.main.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-paper-mute hover:text-paper text-sm transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-paper-dim mb-4 font-sans text-xs font-semibold tracking-[0.16em] uppercase">
            Kontakt
          </h3>
          <ul className="text-paper-mute space-y-2.5 text-sm">
            <li>
              <a
                href={`tel:${SITE.contact.phoneRaw}`}
                className="hover:text-paper transition-colors"
              >
                {SITE.contact.phoneFormatted}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${SITE.contact.email}`}
                className="hover:text-paper break-all transition-colors"
              >
                {SITE.contact.email}
              </a>
            </li>
            <li>
              <a
                href={SITE.contact.whatsapp}
                target="_blank"
                rel="noopener"
                className="hover:text-paper transition-colors"
              >
                WhatsApp
              </a>
            </li>
            <li className="text-paper-dim pt-2 text-xs">
              {SITE.address.street}
              <br />
              {SITE.address.postalCode} {SITE.address.city}
              <br />
              {SITE.address.district}
            </li>
          </ul>
        </div>
      </div>

      {/* Sister Sites */}
      <div className="border-line border-t">
        <div className="container-fluid py-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <h3 className="text-signal-2 mb-2 font-sans text-xs font-semibold tracking-[0.16em] uppercase">
                Weitere Sites unter ALCOR Group
              </h3>
              <p className="text-paper-dim max-w-lg text-xs leading-relaxed">
                Spezialisierte Marken für unterschiedliche Zielgruppen – alle aus einer
                Hand.
              </p>
            </div>
            <ul className="flex flex-col gap-2 md:items-end">
              {SISTER_SITES.map((site) => (
                <li key={site.url}>
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener"
                    className="group text-paper-mute hover:text-signal-2 inline-flex items-center gap-2 text-sm transition-colors"
                  >
                    <span>{site.name}</span>
                    <ExternalLink
                      className="h-3 w-3 opacity-50 transition-opacity group-hover:opacity-100"
                      strokeWidth={1.75}
                    />
                    <span className="text-paper-dim hidden text-xs md:inline">
                      · {site.role}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-line border-t">
        <div className="container-fluid text-paper-dim flex flex-wrap items-center justify-between gap-4 py-6 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <span>
              © {SITE.founder.foundedIn}–{new Date().getFullYear()} {SITE.brand} ·{' '}
              {SITE.founder.name}
            </span>
            <span aria-hidden className="text-paper-dim/40">
              ·
            </span>
            <span
              className="text-paper-dim/70 font-mono text-[0.65rem] tracking-wider"
              title="Aktuelle Versionsnummer dieser Website"
            >
              v{APP_VERSION}
            </span>
          </div>
          <nav className="flex gap-6" aria-label="Rechtliches">
            {NAV.legal.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-paper-mute transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
