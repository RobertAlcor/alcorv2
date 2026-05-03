'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'
import { Calendar, Clock, Zap, Shield, ArrowRight } from 'lucide-react'
import { SITE } from '@/lib/site'
import { AnimatedCounter } from '@/components/ui/animated-counter'
import { LiveIndicator } from '@/components/ui/live-indicator'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export function Hero() {
  const glowRef = useRef<HTMLDivElement | null>(null)

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
    <section className="grain relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32">
      {/* Static atmospheric gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/4 -right-1/4 h-[60vw] w-[60vw]"
        style={{
          background:
            'radial-gradient(circle, rgba(var(--signal-rgb),0.18) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Cursor-following glow (desktop) */}
      <div
        aria-hidden
        ref={glowRef}
        className="pointer-events-none absolute top-1/2 left-1/2 hidden h-[40vw] w-[40vw] transition-transform duration-300 ease-out will-change-transform md:block"
        style={{
          background:
            'radial-gradient(circle, rgba(var(--signal-rgb),0.08) 0%, transparent 50%)',
          filter: 'blur(40px)',
        }}
      />

      <FloatingAccent />

      <div className="container-fluid relative z-10">
        {/* Live Indicator + Eyebrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
          className="mb-6 flex flex-wrap items-center gap-3"
        >
          <LiveIndicator text="Verfügbar — bereit für neue Projekte" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="text-signal-2 mb-8 flex items-center gap-3 text-xs font-semibold tracking-[0.18em] uppercase"
        >
          <span className="bg-signal-2 inline-block h-px w-8" />
          <span>WEBDESIGN ALCOR · WIEN · SEIT 2002</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="max-w-5xl font-serif text-[clamp(2.5rem,8vw,6.5rem)] leading-[0.95] font-normal tracking-[-0.025em] text-balance"
        >
          Sie waren heute schon auf 8 Webagentur-Seiten.
          <br />
          <em className="shimmer font-serif italic not-italic">Alle sahen gleich aus.</em>
        </motion.h1>

        {/* Subline */}
        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          className="text-paper-mute mt-10 max-w-3xl font-serif text-[clamp(1.25rem,2.4vw,1.75rem)] leading-snug text-pretty italic"
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
          <MagneticLink
            href="/kontakt"
            className="group bg-signal text-deep hover:bg-signal-2 inline-flex min-h-[48px] items-center gap-2 rounded-sm px-7 py-4 text-sm font-medium shadow-[0_8px_30px_-8px_rgba(var(--signal-rgb),0.5)] transition-all duration-300"
          >
            Projekt anfragen
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </MagneticLink>

          <Link
            href="/preise"
            className="text-paper-mute border-line hover:text-paper hover:border-paper-mute inline-flex min-h-[48px] items-center gap-2 rounded-sm border px-7 py-4 text-sm font-medium transition-all duration-300"
          >
            Preise ansehen
          </Link>

          <Link
            href="/referenzen"
            className="text-paper-mute hover:text-paper inline-flex min-h-[48px] items-center gap-2 px-7 py-4 text-sm font-medium transition-colors"
          >
            Was ich baue →
          </Link>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.75 }}
          className="mt-20"
        >
          <div className="bg-line grid max-w-5xl grid-cols-2 gap-px md:grid-cols-4">
            {TRUST_POINTS.map((item) => (
              <TrustStat key={item.label} {...item} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function MagneticLink({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLAnchorElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(hover: none)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      el.style.transform = `translate(${x * 0.15}px, ${y * 0.2}px)`
    }
    const onLeave = () => {
      el.style.transform = ''
    }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <Link
      ref={ref}
      href={href}
      className={className}
      style={{
        transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1), background-color 0.3s',
      }}
    >
      {children}
    </Link>
  )
}

function FloatingAccent() {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 0.5 }}
      className="pointer-events-none absolute top-[20%] right-[5%] hidden h-32 w-32 lg:block"
    >
      <motion.div
        className="border-signal-2/20 absolute inset-0 rounded-full border"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="border-signal-2/10 absolute inset-4 rounded-full border"
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="bg-signal-2/5 absolute inset-8 rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  )
}

type StatProps = {
  icon: React.ReactNode
  value: number | string
  suffix?: string
  label: string
  hint: string
  isCounter?: boolean
}

function TrustStat({ icon, value, suffix, label, hint, isCounter }: StatProps) {
  return (
    <div className="group bg-deep hover:bg-deep-2/40 relative p-5 transition-colors duration-500 md:p-6">
      <span
        aria-hidden
        className="bg-signal-2 absolute top-0 left-0 h-px w-0 transition-all duration-500 group-hover:w-full"
      />
      <div className="text-signal-2 mb-3 origin-left transition-transform duration-500 group-hover:scale-110">
        {icon}
      </div>
      <div className="mb-2 flex items-baseline gap-1">
        <span className="text-paper font-sans text-4xl leading-none font-light tracking-tight md:text-5xl">
          {isCounter && typeof value === 'number' ? (
            <AnimatedCounter value={value} suffix={suffix} />
          ) : (
            <>
              {value}
              {suffix}
            </>
          )}
        </span>
      </div>
      <span className="text-paper mb-1 block text-sm font-medium">{label}</span>
      <span className="text-paper-mute block text-xs leading-snug">{hint}</span>
    </div>
  )
}

const TRUST_POINTS: StatProps[] = [
  {
    icon: <Calendar className="h-5 w-5" strokeWidth={1.5} />,
    value: SITE.founder.yearsActive,
    suffix: '+',
    label: 'Jahre Erfahrung',
    hint: 'Seit 2002 in Wien',
    isCounter: true,
  },
  {
    icon: <Clock className="h-5 w-5" strokeWidth={1.5} />,
    value: SITE.pricing.deliveryDays,
    label: 'Tage zur Live-Schaltung',
    hint: 'Statt 4–8 Wochen Wartezeit',
    isCounter: true,
  },
  {
    icon: <Zap className="h-5 w-5" strokeWidth={1.5} />,
    value: '<1s',
    label: 'Ladezeit',
    hint: 'Statt 2–5 Sekunden bei WordPress',
  },
  {
    icon: <Shield className="h-5 w-5" strokeWidth={1.5} />,
    value: '€0',
    label: 'Wartungskosten / Monat',
    hint: 'Keine Plugin-Gebühren, keine Abos',
  },
]
