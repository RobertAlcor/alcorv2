import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SITE, NAV } from '@/lib/site'

const webLinks = [
  { label: 'Website erstellen lassen', href: '/leistungen/website-erstellung' },
  { label: 'Website-Relaunch', href: '/leistungen/relaunch' },
  { label: 'Technische SEO', href: '/leistungen/seo-wien' },
  { label: 'Website-Service', href: '/website-service' },
  { label: 'Website-Soforthilfe', href: '/website-soforthilfe' },
  { label: 'Website-Betreuung', href: '/website-betreuung' },
]

const itLinks = [
  { label: 'IT-Service Übersicht', href: '/it-service-wien' },
  {
    label: 'Fernwartung anfragen',
    href: '/kontakt?thema=it-service&service=remote-support',
  },
  {
    label: 'Software, E-Mail & Office',
    href: '/kontakt?thema=it-service&service=software-email-office',
  },
  {
    label: 'PC- und Laptop-Einrichtung',
    href: '/kontakt?thema=it-service&service=pc-setup',
  },
  {
    label: 'WLAN, Router & Drucker',
    href: '/kontakt?thema=it-service&service=network-printer',
  },
  {
    label: 'Daten & Backup',
    href: '/kontakt?thema=it-service&service=data-backup',
  },
  {
    label: 'Windows-Installation',
    href: '/kontakt?thema=it-service&service=windows-installation',
  },
]

const orientationLinks = [
  { label: 'Pakete & Preise', href: '/preise' },
  { label: 'Referenzen', href: '/referenzen' },
  { label: 'Über mich', href: '/ueber-mich' },
  { label: 'Journal & Ratgeber', href: '/blog' },
  { label: '15-Minuten-Termin', href: '/termin' },
  { label: 'Kontakt', href: '/kontakt' },
  { label: 'Projekt anfragen', href: '/bewerbung' },
]

function FooterLinkList({
  title,
  links,
}: {
  title: string
  links: { label: string; href: string }[]
}) {
  return (
    <nav aria-label={title}>
      <h2 className="mb-5 text-base font-semibold">{title}</h2>
      <div className="flex flex-col gap-1">
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex min-h-[40px] items-center text-sm leading-snug text-paper-mute hover:text-signal-2"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-deep">
      <div className="container-fluid grid gap-12 py-14 sm:grid-cols-2 xl:grid-cols-[1.15fr_repeat(3,minmax(0,1fr))]">
        <div>
          <Link
            href="/"
            className="alcor-brand"
            aria-label="ALCOR Startseite"
          >
            <span>
              <b>A</b>LCOR
            </span>
            <small>Web Development & IT Service</small>
          </Link>
          <p className="mt-6 max-w-md text-base leading-relaxed text-paper-mute">
            Persönliche Webentwicklung und PC-Hilfe aus Wien. Websites,
            technische SEO und klar vereinbarter IT-Service aus einer Hand.
          </p>
          <div className="mt-5 flex flex-col items-start gap-2">
            <a
              href={`mailto:${SITE.contact.email}`}
              className="min-h-[40px] text-sm text-paper-mute hover:text-signal-2"
            >
              {SITE.contact.email}
            </a>
            <a
              href={`tel:${SITE.contact.phoneRaw}`}
              className="min-h-[40px] text-sm text-paper-mute hover:text-signal-2"
            >
              {SITE.contact.phoneFormatted}
            </a>
            <p className="text-sm text-paper-mute">
              {SITE.address.street}
              <br />
              {SITE.address.postalCode} {SITE.address.city}
            </p>
          </div>
          <Link href="/kontakt" className="alcor-text-link mt-5">
            Anliegen unverbindlich senden
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>

        <FooterLinkList title="Web & SEO" links={webLinks} />
        <FooterLinkList title="IT & PC-Hilfe" links={itLinks} />
        <FooterLinkList title="Orientierung" links={orientationLinks} />
      </div>

      <div className="container-fluid flex flex-wrap items-center justify-between gap-5 border-t border-line py-7 text-sm text-paper-mute">
        <p>
          © {new Date().getFullYear()} {SITE.name}. Robert Alchimowicz.
        </p>
        <nav aria-label="Rechtliche Informationen" className="flex gap-6">
          {NAV.legal.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="py-2 hover:text-signal-2"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}
