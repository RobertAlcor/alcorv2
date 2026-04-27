import Link from 'next/link'
import { NAV } from '@/lib/site'

export function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-deep/80 border-b border-line">
      <div className="container-fluid flex items-center justify-between py-5">
        <Link
          href="/"
          className="font-serif text-2xl tracking-tight text-paper hover:opacity-80 transition-opacity"
          aria-label="Webdesign Alcor – Startseite"
        >
          <span className="text-signal-2 italic text-[1.7rem]">A</span>
          <span>lcor</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Hauptnavigation">
          {NAV.main.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-paper-mute hover:text-paper transition-colors duration-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/kontakt"
          className="md:hidden text-sm font-medium text-paper-mute hover:text-paper"
        >
          Kontakt
        </Link>
      </div>
    </header>
  )
}
