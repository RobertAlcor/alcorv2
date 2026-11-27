import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SITE, NAV } from '@/lib/site'

const webLinks = [
  { label: 'Website erstellen lassen', href: '/leistungen/website-erstellung' },
  { label: 'SEO & Local SEO', href: '/leistungen/seo-wien' },
  {
    label: 'SEO-Betreuung · 299 € monatlich',
    href: '/leistungen/seo-wien#seo-betreuung',
  },
  { label: 'Website-Relaunch', href: '/leistungen/relaunch' },
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
    <nav aria-label={title} className="min-w-0">
      <h2 className="mb-5 text-base font-semibold">{title}</h2>
      <div className="flex flex-col gap-1">
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-paper-mute hover:text-signal-2 flex min-h-[44px] items-center text-sm leading-snug [overflow-wrap:anywhere]"
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
    <footer className="border-line bg-deep mt-20 border-t">
      <div className="container-fluid grid gap-12 py-14 sm:grid-cols-2 xl:grid-cols-[1.15fr_repeat(3,minmax(0,1fr))]">
        <div className="min-w-0">
          <Link href="/" className="alcor-brand" aria-label="ALCOR Startseite">
            <span>
              <b>A</b>LCOR
            </span>
            <small>Webdesign · SEO · IT-Service</small>
          </Link>
          <p className="text-paper-mute mt-6 max-w-md text-base leading-relaxed">
            Webdesign und Suchmaschinenoptimierung aus Wien. Individuelle Websites,
            regionale Sichtbarkeit und persönlicher IT-Service.
          </p>
          <div className="mt-5 flex flex-col items-start gap-2">
            <a
              href={`mailto:${SITE.contact.email}`}
              className="text-paper-mute hover:text-signal-2 min-h-[44px] max-w-full text-sm [overflow-wrap:anywhere]"
            >
              {SITE.contact.email}
            </a>
            <a
              href={`tel:${SITE.contact.phoneRaw}`}
              className="text-paper-mute hover:text-signal-2 min-h-[44px] max-w-full text-sm"
            >
              {SITE.contact.phoneFormatted}
            </a>
            <p className="text-paper-mute text-sm">
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

      <div className="container-fluid border-line text-paper-mute flex flex-wrap items-center justify-between gap-5 border-t py-7 text-sm">
        <p>
          © {new Date().getFullYear()} {SITE.name}. Robert Alchimowicz.
        </p>
        <nav aria-label="Rechtliche Informationen" className="flex flex-wrap gap-x-6 gap-y-2">
          {NAV.legal.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-signal-2 py-2">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}
