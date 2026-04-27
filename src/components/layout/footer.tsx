import Link from 'next/link'
import { SITE, NAV } from '@/lib/site'

export function Footer() {
  return (
    <footer className="border-t border-line bg-deep mt-32">
      <div className="container-fluid py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link href="/" className="font-serif text-2xl tracking-tight text-paper inline-block mb-4">
            <span className="text-signal-2 italic text-[1.7rem]">A</span>lcor
          </Link>
          <p className="text-paper-mute text-sm max-w-sm leading-relaxed">
            {SITE.tagline}. Handgeschriebener Code statt WordPress. Eine Person, voller Code-Besitz.
          </p>
        </div>

        <div>
          <h3 className="font-sans text-xs font-semibold tracking-[0.16em] text-paper-dim uppercase mb-4">
            Navigation
          </h3>
          <ul className="space-y-2.5">
            {NAV.main.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-paper-mute hover:text-paper transition-colors">
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
              <a href={`tel:${SITE.contact.phoneRaw}`} className="hover:text-paper transition-colors">
                {SITE.contact.phoneFormatted}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.contact.email}`} className="hover:text-paper transition-colors break-all">
                {SITE.contact.email}
              </a>
            </li>
            <li className="pt-2 text-paper-dim text-xs">
              {SITE.address.street}<br />
              {SITE.address.postalCode} {SITE.address.city}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-fluid py-6 flex flex-wrap items-center justify-between gap-4 text-xs text-paper-dim">
          <div>
            © {SITE.founder.foundedIn}–{new Date().getFullYear()} {SITE.brand} · {SITE.founder.name}
          </div>
          <nav className="flex gap-6" aria-label="Rechtliches">
            {NAV.legal.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-paper-mute transition-colors">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
