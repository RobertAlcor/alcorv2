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
      className="fixed bottom-3 right-3 z-40 flex flex-row items-center gap-2 sm:bottom-5 sm:right-5 sm:flex-col sm:items-end sm:gap-3"
      role="group"
      aria-label="Schnellkontakt"
    >
      <FabButton
        href={SITE.contact.whatsappPrefilled}
        external
        aria-label="WhatsApp Nachricht senden"
        tooltip="WhatsApp"
        bgClass="bg-[#25D366] hover:bg-[#1EBF5C] text-white pulse-ring"
        icon={<MessageCircle className="h-5 w-5" strokeWidth={2} fill="currentColor" />}
      />

      <FabButton
        href={`tel:${SITE.contact.phoneRaw}`}
        aria-label={`Anrufen ${SITE.contact.phoneFormatted}`}
        tooltip={SITE.contact.phoneFormatted}
        bgClass="bg-deep-2 border border-line text-paper hover:bg-signal hover:text-deep hover:border-signal"
        icon={<Phone className="h-5 w-5" strokeWidth={1.75} />}
      />

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
            className="group relative hidden h-12 w-12 items-center justify-center rounded-full border border-line bg-deep-2 text-paper-mute shadow-lg shadow-black/30 backdrop-blur-md transition-all duration-300 hover:border-signal-2 hover:text-signal-2 sm:flex"
          >
            <ArrowUp className="h-5 w-5" strokeWidth={1.75} />
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
      className={`group relative flex h-11 w-11 items-center justify-center rounded-full shadow-lg shadow-black/30 backdrop-blur-md transition-all duration-300 sm:h-12 sm:w-12 ${bgClass}`}
    >
      {icon}
      <Tooltip>{tooltip}</Tooltip>
    </a>
  )
}

function Tooltip({ children }: { children: React.ReactNode }) {
  return (
    <span
      role="tooltip"
      className="pointer-events-none absolute right-full mr-3 hidden translate-x-2 whitespace-nowrap rounded-sm border border-line bg-deep-2 px-3 py-1.5 text-xs text-paper opacity-0 shadow-lg shadow-black/40 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 sm:block"
    >
      {children}
    </span>
  )
}
