'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Phone, ArrowUp, MessageCircle } from 'lucide-react'
import { SITE } from '@/lib/site'

export function FabStack() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div
      className="fixed bottom-5 right-5 z-40 flex flex-col gap-3 items-end"
      role="group"
      aria-label="Schnellkontakt"
    >
      {/* WhatsApp - immer sichtbar, mit Pulse-Ring */}
      <FabButton
        href={SITE.contact.whatsappPrefilled}
        external
        aria-label="WhatsApp Nachricht senden"
        tooltip="WhatsApp"
        bgClass="bg-[#25D366] hover:bg-[#1EBF5C] text-white pulse-ring"
        icon={<MessageCircle className="w-5 h-5" strokeWidth={2} fill="currentColor" />}
      />

      {/* Telefon */}
      <FabButton
        href={`tel:${SITE.contact.phoneRaw}`}
        aria-label={`Anrufen ${SITE.contact.phoneFormatted}`}
        tooltip={SITE.contact.phoneFormatted}
        bgClass="bg-deep-2 border border-line text-paper hover:bg-signal hover:text-deep hover:border-signal"
        icon={<Phone className="w-5 h-5" strokeWidth={1.75} />}
      />

      {/* ScrollToTop - nur nach Scroll */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            type="button"
            onClick={handleScrollTop}
            aria-label="Nach oben scrollen"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="group relative w-12 h-12 flex items-center justify-center bg-deep-2 border border-line rounded-full text-paper-mute hover:text-signal-2 hover:border-signal-2 transition-all duration-300 shadow-lg shadow-black/30 backdrop-blur-md"
          >
            <ArrowUp className="w-5 h-5" strokeWidth={1.75} />
            <Tooltip>Nach oben</Tooltip>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

type FabButtonProps = {
  href: string
  external?: boolean
  'aria-label': string
  tooltip: string
  bgClass: string
  icon: React.ReactNode
}

function FabButton({
  href,
  external,
  'aria-label': ariaLabel,
  tooltip,
  bgClass,
  icon,
}: FabButtonProps) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      {...(external ? { target: '_blank', rel: 'noopener' } : {})}
      className={`group relative w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 shadow-lg shadow-black/30 backdrop-blur-md ${bgClass}`}
    >
      {icon}
      <Tooltip>{tooltip}</Tooltip>
    </a>
  )
}

/**
 * Tooltip LINKS vom Button (FAB ist rechts am Viewport-Rand)
 */
function Tooltip({ children }: { children: React.ReactNode }) {
  return (
    <span
      role="tooltip"
      className="pointer-events-none absolute right-full mr-3 px-3 py-1.5 bg-deep-2 border border-line rounded-sm text-xs text-paper whitespace-nowrap opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0 transition-all duration-200 shadow-lg shadow-black/40"
    >
      {children}
    </span>
  )
}
