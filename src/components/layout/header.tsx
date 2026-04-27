'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { NAV } from '@/lib/site'
import { MobileMenu } from './mobile-menu'

export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-deep/80 border-b border-line">
      <div className="container-fluid flex items-center justify-between py-4">
        <Link
          href="/"
          className="group font-serif text-2xl tracking-tight text-paper transition-all min-h-[44px] flex items-center"
          aria-label="Webdesign Alcor – Startseite"
        >
          <span className="text-signal-2 italic text-[1.7rem] inline-block transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
            A
          </span>
          <span className="transition-opacity duration-300 group-hover:opacity-90">
            lcor
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Hauptnavigation">
          {NAV.main.map((item) => {
            const isActive =
              (item.href as string) === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-sm font-medium transition-colors duration-300 min-h-[44px] flex items-center ${
                  isActive ? 'text-paper' : 'text-paper-mute hover:text-paper'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-px bg-signal-2" />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          {/* Sticky CTA - Desktop */}
          <Link
            href="/kontakt"
            className="hidden md:inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 bg-signal text-deep font-medium text-sm rounded-sm hover:bg-signal-2 transition-all duration-300 shadow-[0_4px_20px_-8px_rgba(var(--signal-rgb),0.6)]"
          >
            Anfragen
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
