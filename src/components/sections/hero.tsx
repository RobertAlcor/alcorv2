'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'
import { SITE } from '@/lib/site'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export function Hero() {
  const glowRef = useRef<HTMLDivElement | null>(null)

  // Subtle cursor-following glow (desktop only, respects reduced-motion)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return
    const isTouch = window.matchMedia('(hover: none)').matches
    if (isTouch) return

    const glow = glowRef.current
    if (!glow) return

    let raf = 0
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const rect = glow.parentElement?.getBoundingClientRect()
        if (!rect) return
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        glow.style.transform = `translate3d(${x - rect.width / 2}px, ${y - rect.height / 2}px, 0)`
      })
    }

    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section className="relative pt-20 pb-32 md:pt-28 md:pb-40 overflow-hidden grain">
      {/* Static atmospheric gradient */}
      <div
        aria-hidden
        className="absolute -top-1/4 -right-1/4 w-[60vw] h-[60vw] pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Cursor-following glow (desktop only) */}
      <div
        aria-hidden
        ref={glowRef}
        className="hidden md:block absolute top-1/2 left-1/2 w-[40vw] h-[40vw] pointer-events-none transition-transform duration-300 ease-out will-change-transform"
        style={{
          background:
            'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 50%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="container-fluid relative z-10">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="flex items-center gap-3 mb-8 text-xs font-semibold tracking-[0.18em] uppercase text-signal-2"
        >
          <span className="inline-block w-8 h-px bg-signal-2" />
          <span>WEBDESIGN ALCOR · WIEN · SEIT 2002</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="font-serif font-normal text-[clamp(2.5rem,8vw,6.5rem)] leading-[0.95] tracking-[-0.025em] text-balance max-w-5xl"
        >
          Sie waren heute schon auf 8 Webagentur-Seiten.
          <br />
          <em className="not-italic text-signal-2 font-serif italic">
            Alle sahen gleich aus.
          </em>
        </motion.h1>

        {/* Subline */}
        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          className="mt-10 font-serif italic text-[clamp(1.25rem,2.4vw,1.75rem)] leading-snug text-paper-mute max-w-3xl text-pretty"
        >
          Stockfotos. Lila Gradients. „Wir sind Ihre digitale Familie."
          <br />
          <span className="text-paper">
            Ich bin keine Familie. Ich bin Robert. Ich schreibe Code. Seit{' '}
            {SITE.founder.yearsActive} Jahren.
          </span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
          className="mt-12 flex flex-wrap items-center gap-4"
        >
          <Link
            href="/kontakt"
            className="group inline-flex items-center gap-2 px-7 py-4 bg-signal text-paper font-medium text-sm rounded-sm hover:bg-signal-2 transition-all duration-300 shadow-[0_8px_30px_-8px_rgba(37,99,235,0.5)]"
          >
            Projekt anfragen
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>

          <Link
            href="/referenzen"
            className="inline-flex items-center gap-2 px-7 py-4 text-paper-mute font-medium text-sm border border-line rounded-sm hover:text-paper hover:border-paper-mute transition-all duration-300"
          >
            Was ich baue
          </Link>
        </motion.div>

        {/* Trust strip - ehrlich und prüfbar */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.75 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl"
        >
          {TRUST_POINTS.map((item) => (
            <div key={item.label} className="flex flex-col gap-1">
              <span className="font-serif italic text-3xl text-signal-2">
                {item.value}
              </span>
              <span className="text-xs font-medium text-paper-mute tracking-wide">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

const TRUST_POINTS = [
  { value: `${SITE.founder.yearsActive}+`, label: 'Jahre in Wien' },
  { value: `${SITE.pricing.deliveryDays}`, label: 'Tage Lieferzeit' },
  { value: '< 1s', label: 'Ladezeit' },
  { value: '0', label: 'Plugin-Updates' },
] as const
