import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { SITE, NAV, SISTER_SITES } from '@/lib/site'
import { APP_VERSION } from '@/lib/version'

export function Footer() {
  return (
    <footer className="border-t border-line bg-deep mt-32">
      <div className="container-fluid pt-16 pb-12 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link href="/" className="flex items-baseline gap-1.5 mb-5">
            <span className="font-serif text-2xl tracking-tight text-paper">
              <span className="text-signal-2 italic text-[1.7rem]">A</span>
              LCOR
            </span>
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-paper-mute">
              Group
            </span>
          </Link>
          <p className="text-paper-mute text-sm max-w-md leading-relaxed">
            {SITE.tagline}. Handgeschriebener Code statt WordPress. Eine Person,
            voller Code-Besitz.
          </p>
          <p className="text-paper-dim text-xs mt-6 max-w-md leading-relaxed italic">
            Diese Seite lädt in unter einer Sekunde, hat 0 Tracking-Cookies und
            wurde von Hand geschrieben. Alles, was ich predige, lebe ich hier
            vor.
          </p>
        </div>

        <div>
          <h3 className="font-sans text-xs font-semibold tracking-[0.16em] text-paper-dim uppercase mb-4">
            Navigation
          </h3>
          <ul className="space-y-2.5">
            {NAV.main.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-paper-mute hover:text-paper transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-sans text-xs font-semibold tracking-[0.16em] text-paper-dim uppercase mb-4">
            Kontakt
          </h3>
          <ul className="space-y-2.5 text-sm text-paper-mute">
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
                className="hover:text-paper transition-colors break-all"
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
            <li className="pt-2 text-paper-dim text-xs">
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
      <div className="border-t border-line">
        <div className="container-fluid py-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div>
              <h3 className="font-sans text-xs font-semibold tracking-[0.16em] text-signal-2 uppercase mb-2">
                Weitere Sites unter ALCOR Group
              </h3>
              <p className="text-paper-dim text-xs max-w-lg leading-relaxed">
                Spezialisierte Marken für unterschiedliche Zielgruppen – alle
                aus einer Hand.
              </p>
            </div>
            <ul className="flex flex-col gap-2 md:items-end">
              {SISTER_SITES.map((site) => (
                <li key={site.url}>
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener"
                    className="group inline-flex items-center gap-2 text-sm text-paper-mute hover:text-signal-2 transition-colors"
                  >
                    <span>{site.name}</span>
                    <ExternalLink
                      className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity"
                      strokeWidth={1.75}
                    />
                    <span className="text-xs text-paper-dim hidden md:inline">
                      · {site.role}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-fluid py-6 flex flex-wrap items-center justify-between gap-4 text-xs text-paper-dim">
          <div className="flex items-center gap-4 flex-wrap">
            <span>
              © {SITE.founder.foundedIn}–{new Date().getFullYear()}{' '}
              {SITE.brand} · {SITE.founder.name}
            </span>
            <span aria-hidden className="text-paper-dim/40">·</span>
            <span
              className="font-mono text-[0.65rem] tracking-wider text-paper-dim/70"
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
