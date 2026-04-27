'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import { Camera, X, Check, MapPin } from 'lucide-react'

const STORAGE_KEY = 'alcor-promo-seen-photo-shoot-v1'
const SHOW_AFTER_MS = 30000 // 30 Sekunden
const SCROLL_THRESHOLD = 0.4 // 40% gescrollt

export function PromoModal() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Schon gesehen? Dann nicht nochmal zeigen
    let seen = false
    try {
      seen = localStorage.getItem(STORAGE_KEY) === '1'
    } catch {
      // localStorage geblockt
    }
    if (seen) return

    let opened = false
    let timer: ReturnType<typeof setTimeout> | null = null

    const triggerOpen = () => {
      if (opened) return
      opened = true
      setOpen(true)
      try {
        localStorage.setItem(STORAGE_KEY, '1')
      } catch {
        /* ok */
      }
    }

    // Trigger 1: Nach 30 Sekunden
    timer = setTimeout(triggerOpen, SHOW_AFTER_MS)

    // Trigger 2: Exit-Intent (Maus verlässt nach oben)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !opened) {
        triggerOpen()
      }
    }

    // Trigger 3: 40% gescrollt
    const handleScroll = () => {
      const doc = document.documentElement
      const total = doc.scrollHeight - doc.clientHeight
      if (total > 0 && doc.scrollTop / total > SCROLL_THRESHOLD) {
        triggerOpen()
      }
    }

    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      if (timer) clearTimeout(timer)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Escape-Key
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    // Body scroll lock
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = original
    }
  }, [open])

  if (!mounted) return null

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm"
            aria-hidden
          />

          {/* Modal - Center on Desktop, Bottom-Sheet on Mobile */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="promo-title"
            aria-describedby="promo-desc"
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.95 }}
            transition={{
              type: 'spring',
              damping: 24,
              stiffness: 280,
            }}
            className="fixed inset-x-0 bottom-0 md:inset-0 md:m-auto z-[100] w-full md:w-[min(560px,92vw)] md:h-fit md:max-h-[90vh] bg-deep border border-line md:rounded-sm rounded-t-2xl shadow-2xl shadow-black/60 overflow-hidden flex flex-col"
          >
            {/* Top accent bar */}
            <div
              aria-hidden
              className="h-1 bg-signal w-full"
            />

            {/* Mobile drag handle */}
            <div
              aria-hidden
              className="md:hidden flex justify-center pt-2 pb-1"
            >
              <span className="w-12 h-1 bg-paper-dim/30 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-start justify-between gap-4 px-6 md:px-8 pt-5 md:pt-6">
              <div className="flex items-center gap-2 text-[0.7rem] font-mono uppercase tracking-[0.16em] text-signal-2">
                <span className="w-1.5 h-1.5 rounded-full bg-signal-2 pulse-dot" />
                Aktion · Werbung
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Aktion schließen"
                className="w-11 h-11 -mt-2 -mr-3 flex items-center justify-center text-paper-mute hover:text-paper transition-colors rounded-sm"
              >
                <X className="w-5 h-5" strokeWidth={1.75} />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 md:px-8 pb-6 md:pb-8 overflow-y-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 flex items-center justify-center bg-signal/10 border border-signal/30 rounded-sm text-signal-2 shrink-0">
                  <Camera className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <div>
                  <h2
                    id="promo-title"
                    className="font-serif text-2xl md:text-3xl text-paper leading-tight"
                  >
                    Foto-Shooting für Ihre Website
                  </h2>
                </div>
              </div>

              {/* Price block */}
              <div className="flex items-baseline gap-3 mb-5 mt-6">
                <span className="font-serif text-5xl md:text-6xl text-signal-2 leading-none">
                  €99
                </span>
                <span className="font-serif italic text-2xl text-paper-dim line-through decoration-2">
                  €290
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-signal-2 ml-1">
                  −66 %
                </span>
              </div>

              <p
                id="promo-desc"
                className="text-paper-mute leading-relaxed mb-6"
              >
                Echte Bilder aus Ihrem Büro statt Stockfotos – damit Ihre Website
                authentisch wirkt und Vertrauen aufbaut.
              </p>

              {/* What's included */}
              <ul className="space-y-2.5 mb-6">
                {[
                  'Vor-Ort-Termin in Ihrem Bürogebäude (60–90 Min)',
                  'Ca. 30 bearbeitete Aufnahmen, web-optimiert',
                  'Vollumfängliche Bildrechte für Ihre Website',
                  'Liefertermin innerhalb von 5 Werktagen',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-paper"
                  >
                    <Check className="w-4 h-4 text-signal-2 shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Location notice */}
              <div className="flex items-start gap-2 mb-6 p-3 bg-deep-2 border border-line rounded-sm">
                <MapPin className="w-4 h-4 text-paper-mute shrink-0 mt-0.5" strokeWidth={1.5} />
                <p className="text-xs text-paper-mute leading-relaxed">
                  Termin in Wien (alle 23 Bezirke). Außerhalb von Wien zzgl.
                  Anfahrt: 0,42 €/km ab Stadtgrenze.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/kontakt?topic=foto-shooting"
                  onClick={() => setOpen(false)}
                  className="flex-1 inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-3.5 bg-signal text-deep font-medium text-sm rounded-sm hover:bg-signal-2 transition-colors shadow-[0_8px_30px_-8px_rgba(var(--signal-rgb),0.5)]"
                >
                  Termin anfragen
                </Link>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center min-h-[44px] px-6 py-3.5 text-paper-mute font-medium text-sm border border-line rounded-sm hover:text-paper hover:border-paper-mute transition-colors"
                >
                  Vielleicht später
                </button>
              </div>

              {/* Trust line */}
              <p className="mt-5 text-[0.7rem] text-paper-dim text-center">
                Aktion gültig nur in Verbindung mit einer neuen
                Website-Beauftragung. Kein Aktions-Abo, einmalige Buchung.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
