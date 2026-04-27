'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'motion/react'
import { NAV, SITE } from '@/lib/site'

export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  // Close on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Body scroll lock + Escape + Focus management
  useEffect(() => {
    if (!open) return

    const scrollY = window.scrollY
    const originalStyle = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    }

    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handleKey)

    return () => {
      document.body.style.overflow = originalStyle.overflow
      document.body.style.position = originalStyle.position
      document.body.style.top = originalStyle.top
      document.body.style.width = originalStyle.width
      window.scrollTo(0, scrollY)
      window.removeEventListener('keydown', handleKey)
      // Return focus to trigger button
      buttonRef.current?.focus()
    }
  }, [open])

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="md:hidden relative z-[110] w-11 h-11 flex items-center justify-center text-paper hover:text-signal-2 transition-colors -mr-2 group"
      >
        <AnimatedBurger isOpen={open} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Hauptnavigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-0 z-[100] md:hidden bg-deep/95 backdrop-blur-xl"
            style={{ height: '100dvh' }}
          >
            {/* Atmospheric gradient */}
            <motion.div
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="absolute -top-1/4 -right-1/4 w-[80vw] h-[80vw] pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle, rgba(var(--signal-rgb),0.22) 0%, transparent 60%)',
                filter: 'blur(60px)',
              }}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{
                type: 'spring',
                damping: 28,
                stiffness: 280,
                mass: 0.8,
              }}
              className="relative h-full flex flex-col bg-deep overflow-hidden"
              style={{ height: '100dvh' }}
            >
              {/* Top bar */}
              <div className="container-fluid flex items-center justify-between py-5 border-b border-line shrink-0">
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                >
                  <Link
                    href="/"
                    className="group font-serif text-2xl tracking-tight text-paper inline-flex items-baseline"
                    onClick={() => setOpen(false)}
                  >
                    <span className="text-signal-2 italic text-[1.7rem] inline-block transition-transform duration-500 group-hover:rotate-[-8deg]">
                      A
                    </span>
                    <span>lcor</span>
                  </Link>
                </motion.div>

                {/* Visual placeholder where burger sits - actual button is fixed top-right */}
                <div className="w-11 h-11" aria-hidden />
              </div>

              {/* Navigation */}
              <nav
                aria-label="Hauptnavigation"
                className="flex-1 container-fluid flex flex-col justify-center py-6 overflow-y-auto min-h-0"
              >
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-xs font-semibold tracking-[0.18em] uppercase text-signal-2 mb-6"
                >
                  <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
                  WEBDESIGN ALCOR · SEIT 2002
                </motion.p>

                <ul className="space-y-0">
                  {NAV.main.map((item, idx) => {
                    const isActive =
                      (item.href as string) === '/'
                        ? pathname === '/'
                        : pathname.startsWith(item.href)
                    return (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          type: 'spring',
                          damping: 22,
                          stiffness: 200,
                          delay: 0.25 + idx * 0.05,
                        }}
                      >
                        <Link
                          href={item.href}
                          className="group relative flex items-center justify-between py-4 border-b border-line transition-colors hover:border-signal-2"
                          onClick={() => setOpen(false)}
                        >
                          {/* Active indicator line */}
                          {isActive && (
                            <motion.span
                              layoutId="active-mobile"
                              className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-signal-2 rounded-full"
                              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            />
                          )}
                          <span className="flex items-center gap-4">
                            <span className="font-mono text-[0.7rem] text-paper-dim w-6 transition-colors group-hover:text-signal-2">
                              0{idx + 1}
                            </span>
                            <span
                              className={`font-serif text-[2rem] sm:text-4xl leading-none tracking-tight transition-all duration-300 ${
                                isActive
                                  ? 'text-signal-2 italic'
                                  : 'text-paper group-hover:text-signal-2 group-hover:translate-x-1'
                              }`}
                            >
                              {item.label}
                            </span>
                          </span>
                          <ArrowIcon className="w-5 h-5 text-paper-dim group-hover:text-signal-2 group-hover:translate-x-1 transition-all duration-300 shrink-0" />
                        </Link>
                      </motion.li>
                    )
                  })}
                </ul>
              </nav>

              {/* Quick contacts */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="container-fluid border-t border-line py-6 shrink-0"
              >
                <p className="text-[0.7rem] font-semibold tracking-[0.16em] uppercase text-paper-dim mb-3">
                  Direkt erreichen
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <ContactTile
                    href={`tel:${SITE.contact.phoneRaw}`}
                    label="Anruf"
                    icon={<PhoneIcon className="w-4 h-4" />}
                    aria="Telefonisch anrufen"
                  />
                  <ContactTile
                    href={`mailto:${SITE.contact.email}`}
                    label="E-Mail"
                    icon={<MailIcon className="w-4 h-4" />}
                    aria="E-Mail schreiben"
                  />
                  <ContactTile
                    href={SITE.contact.whatsappPrefilled}
                    label="WhatsApp"
                    icon={<WhatsAppIcon className="w-4 h-4" />}
                    aria="WhatsApp schreiben"
                    external
                  />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function ContactTile({
  href,
  label,
  icon,
  aria,
  external,
}: {
  href: string
  label: string
  icon: React.ReactNode
  aria: string
  external?: boolean
}) {
  const Comp = (
    <a
      href={href}
      className="group flex flex-col items-center gap-1.5 py-3 bg-deep-2 border border-line rounded-sm hover:border-signal-2 hover:-translate-y-0.5 transition-all duration-300"
      aria-label={aria}
      {...(external ? { target: '_blank', rel: 'noopener' } : {})}
    >
      <span className="text-signal-2 transition-transform duration-300 group-hover:scale-110">
        {icon}
      </span>
      <span className="text-[0.7rem] font-medium text-paper-mute group-hover:text-paper transition-colors">
        {label}
      </span>
    </a>
  )
  return Comp
}

/**
 * Animated Burger that morphs to X
 * Uses two lines that rotate and translate to form X
 */
function AnimatedBurger({ isOpen }: { isOpen: boolean }) {
  return (
    <span className="relative w-6 h-6 inline-block">
      <motion.span
        className="absolute left-0 right-0 h-px bg-current"
        initial={false}
        animate={
          isOpen
            ? { top: '50%', rotate: 45, translateY: '-50%' }
            : { top: '30%', rotate: 0, translateY: '0%' }
        }
        transition={{ type: 'spring', damping: 22, stiffness: 280 }}
      />
      <motion.span
        className="absolute left-0 right-2 h-px bg-current"
        initial={false}
        animate={
          isOpen
            ? { opacity: 0, top: '50%' }
            : { opacity: 1, top: '50%', right: '0px' }
        }
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="absolute left-0 right-0 h-px bg-current"
        initial={false}
        animate={
          isOpen
            ? { top: '50%', rotate: -45, translateY: '-50%' }
            : { top: '70%', rotate: 0, translateY: '0%' }
        }
        transition={{ type: 'spring', damping: 22, stiffness: 280 }}
      />
    </span>
  )
}

function ArrowIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

function PhoneIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function MailIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

function WhatsAppIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  )
}
