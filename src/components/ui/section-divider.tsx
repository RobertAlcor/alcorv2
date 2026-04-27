'use client'

import { motion } from 'motion/react'

type Props = {
  variant?: 'line' | 'wave' | 'pulse'
}

/**
 * Decorative section divider - SVG line that draws itself on scroll-into-view.
 * Use between sections to add visual rhythm without being loud.
 */
export function SectionDivider({ variant = 'line' }: Props) {
  if (variant === 'wave') {
    return (
      <div className="container-fluid py-8" aria-hidden>
        <svg
          viewBox="0 0 1200 40"
          className="w-full h-10 opacity-40"
          fill="none"
        >
          <motion.path
            d="M0 20 Q 200 0 400 20 T 800 20 T 1200 20"
            stroke="rgba(var(--signal-rgb), 0.6)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
      </div>
    )
  }

  if (variant === 'pulse') {
    return (
      <div className="container-fluid py-10 flex justify-center" aria-hidden>
        <div className="flex items-center gap-3">
          <motion.span
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="h-px bg-line"
          />
          <motion.span
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3, ease: 'backOut' }}
            className="w-1.5 h-1.5 rounded-full bg-signal-2"
          />
          <motion.span
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="h-px bg-line"
          />
        </div>
      </div>
    )
  }

  // default: line
  return (
    <div className="container-fluid py-6" aria-hidden>
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="h-px bg-gradient-to-r from-transparent via-signal-2/30 to-transparent origin-left"
      />
    </div>
  )
}
