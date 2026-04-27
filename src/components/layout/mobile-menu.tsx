'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'motion/react'
import { NAV, SITE } from '@/lib/site'

export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

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
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Menü öffnen"
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="md:hidden relative w-10 h-10 flex items-center justify-center text-paper hover:text-signal-2 transition-colors -mr-2"
      >
        <BurgerIcon />
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
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] md:hidden bg-deep overflow-hidden"
            style={{ height: '100dvh' }}
          >
            <div
              aria-hidden
              className="absolute -top-1/4 -right-1/4 w-[80vw] h-[80vw] pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 60%)',
                filter: 'blur(60px)',
              }}
            />

            <div className="relative h-full flex flex-col">
              <div className="container-fluid flex items-center justify-between py-5 border-b border-line shrink-0">
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 }}
                >
                  <Link
                    href="/"
                    className="font-serif text-2xl tracking-tight text-paper"
                    onClick={() => setOpen(false)}
                  >
                    <span className="text-signal-2 italic text-[1.7rem]">A</span>lcor
                  </Link>
                </motion.div>

                <motion.button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Menü schließen"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 }}
                  className="w-10 h-10 flex items-center justify-center text-paper hover:text-signal-2 transition-colors -mr-2"
                >
                  <CloseIcon />
                </motion.button>
              </div>

              <nav
                aria-label="Hauptnavigation"
                className="flex-1 container-fluid flex flex-col justify-center py-8 overflow-y-auto min-h-0"
              >
                <p className="text-xs font-semibold tracking-[0.18em] uppercase text-signal-2 mb-6">
                  <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
                  WEBDESIGN ALCOR · WIEN · SEIT 2002
                </p>

                <ul className="space-y-0">
                  {NAV.main.map((item, idx) => {
                    const isActive = pathname === item.href
                    return (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, x: -32 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.15 + idx * 0.06,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        <Link
                          href={item.href}
                          className="group flex items-center justify-between py-4 border-b border-line hover:border-signal-2 transition-colors"
                          onClick={() => setOpen(false)}
                        >
                          <span className="flex items-center gap-4">
                            <span className="font-mono text-[0.7rem] text-paper-dim w-6">
                              0{idx + 1}
                            </span>
                            <span
                              className={`font-serif text-[2rem] sm:text-4xl leading-none tracking-tight transition-colors ${
                                isActive
                                  ? 'text-signal-2 italic'
                                  : 'text-paper group-hover:text-signal-2'
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

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="container-fluid border-t border-line py-6 shrink-0"
              >
                <p className="text-[0.7rem] font-semibold tracking-[0.16em] uppercase text-paper-dim mb-3">
                  Direkt erreichen
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <a
                    href={`tel:${SITE.contact.phoneRaw}`}
                    className="group flex flex-col items-center gap-1.5 py-3 bg-deep-2 border border-line rounded-sm hover:border-signal-2 transition-colors"
                    aria-label="Telefonisch anrufen"
                  >
                    <PhoneIcon className="w-4 h-4 text-signal-2" />
                    <span className="text-[0.7rem] font-medium text-paper-mute group-hover:text-paper transition-colors">
                      Anruf
                    </span>
                  </a>
                  <a
                    href={`mailto:${SITE.contact.email}`}
                    className="group flex flex-col items-center gap-1.5 py-3 bg-deep-2 border border-line rounded-sm hover:border-signal-2 transition-colors"
                    aria-label="E-Mail schreiben"
                  >
                    <MailIcon className="w-4 h-4 text-signal-2" />
                    <span className="text-[0.7rem] font-medium text-paper-mute group-hover:text-paper transition-colors">
                      E-Mail
                    </span>
                  </a>
                  <a
                    href={SITE.contact.whatsappPrefilled}
                    target="_blank"
                    rel="noopener"
                    className="group flex flex-col items-center gap-1.5 py-3 bg-deep-2 border border-line rounded-sm hover:border-signal-2 transition-colors"
                    aria-label="WhatsApp schreiben"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-signal-2" />
                    <span className="text-[0.7rem] font-medium text-paper-mute group-hover:text-paper transition-colors">
                      WhatsApp
                    </span>
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function BurgerIcon() {
  return (
    <svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <line x1="0" y1="2" x2="22" y2="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="6" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <line x1="3" y1="3" x2="19" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="19" y1="3" x2="3" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
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
