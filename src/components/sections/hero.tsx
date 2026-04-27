'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { SITE } from '@/lib/site'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export function Hero() {
  return (
    <section className="relative pt-20 pb-32 md:pt-28 md:pb-40 overflow-hidden grain">
      {/* Atmospheric gradient */}
      <div
        aria-hidden
        className="absolute -top-1/4 -right-1/4 w-[60vw] h-[60vw] pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 60%)',
          filter: 'blur(60px)',
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

        {/* Headline - Variant 4: Der Spiegel */}
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
            Ich bin keine Familie. Ich bin Robert. Ich schreibe Code. Seit 20
            Jahren.
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

        {/* Trust strip */}
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
  { value: `${SITE.founder.yearsActive}+`, label: 'Jahre Code aus Wien' },
  { value: '100+', label: 'Realisierte Projekte' },
  { value: `${SITE.pricing.deliveryDays}`, label: 'Tage Lieferzeit' },
  { value: '0', label: 'WordPress-Plugins' },
] as const
