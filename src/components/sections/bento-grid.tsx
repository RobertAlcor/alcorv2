'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import {
  Code2,
  RefreshCw,
  Search,
  ArrowRight,
} from 'lucide-react'
import { SERVICES } from '@/lib/services'

const ICONS: Record<string, React.ReactNode> = {
  'website-erstellung': <Code2 className="w-full h-full" strokeWidth={1.25} />,
  relaunch: <RefreshCw className="w-full h-full" strokeWidth={1.25} />,
  'seo-wien': <Search className="w-full h-full" strokeWidth={1.25} />,
}

export function BentoGrid() {
  const [websiteService, relaunchService, seoService] = SERVICES

  return (
    <section className="container-fluid py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl mb-16"
      >
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-signal-2 mb-6">
          <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
          Leistungen
        </p>
        <h2 className="font-serif text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] text-balance">
          Drei Wege, mit denen ich Ihnen helfe.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        {websiteService && (
          <BentoCard
            href={websiteService.href}
            spanClass="lg:col-span-4"
            tagline={websiteService.tagline}
            title={websiteService.title}
            description={websiteService.description}
            icon={ICONS['website-erstellung']}
            patternKind="grid"
            ctaLabel="Details ansehen"
            delay={0}
          />
        )}

        {relaunchService && (
          <BentoCard
            href={relaunchService.href}
            spanClass="lg:col-span-2"
            tagline={relaunchService.tagline}
            title={relaunchService.title}
            description={relaunchService.description}
            icon={ICONS.relaunch}
            patternKind="circle"
            ctaLabel="Details ansehen"
            delay={0.1}
          />
        )}

        {seoService && (
          <BentoCard
            href={seoService.href}
            spanClass="lg:col-span-3"
            tagline={seoService.tagline}
            title={seoService.title}
            description={seoService.description}
            icon={ICONS['seo-wien']}
            patternKind="bars"
            ctaLabel="Details ansehen"
            delay={0.2}
          />
        )}

        <CtaCardKontakt />
      </div>
    </section>
  )
}

type BentoCardProps = {
  href: string
  spanClass: string
  tagline: string
  title: string
  description: string
  icon: React.ReactNode
  patternKind: 'grid' | 'circle' | 'bars'
  ctaLabel: string
  delay?: number
}

function BentoCard({
  href,
  spanClass,
  tagline,
  title,
  description,
  icon,
  patternKind,
  ctaLabel,
  delay = 0,
}: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={spanClass}
    >
      <Link
        href={href}
        className="group relative overflow-hidden block bg-deep-2 border border-line rounded-sm p-8 md:p-10 hover:border-signal-2 transition-all duration-500 min-h-[280px] h-full flex flex-col justify-between"
      >
        <BentoPattern kind={patternKind} />

        <div className="relative z-10">
          <div className="w-10 h-10 text-signal-2 mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 origin-bottom-left">
            {icon}
          </div>
          <p className="font-mono text-[0.7rem] text-paper-dim uppercase tracking-wider mb-2">
            {tagline}
          </p>
          <h3 className="font-serif text-2xl md:text-3xl text-paper mb-3 group-hover:text-signal-2 transition-colors">
            {title}
          </h3>
          <p className="text-paper-mute leading-relaxed max-w-md">
            {description}
          </p>
        </div>

        {/* CTA Footer - Button-Look, klar erkennbar */}
        <div className="relative z-10 mt-8 pt-5 border-t border-line">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-deep border border-line rounded-sm text-sm font-medium text-paper group-hover:bg-signal group-hover:text-deep group-hover:border-signal transition-all duration-300">
            {ctaLabel}
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

function BentoPattern({ kind }: { kind: 'grid' | 'circle' | 'bars' }) {
  if (kind === 'grid') {
    return (
      <div
        aria-hidden
        className="absolute -top-10 -right-10 w-64 h-64 opacity-[0.07] group-hover:opacity-[0.15] transition-opacity duration-700"
        style={{
          backgroundImage:
            'linear-gradient(rgba(var(--signal-rgb),0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--signal-rgb),0.6) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          maskImage:
            'radial-gradient(circle at top right, black 0%, transparent 70%)',
        }}
      />
    )
  }
  if (kind === 'circle') {
    return (
      <div
        aria-hidden
        className="absolute -bottom-20 -right-20 w-56 h-56 rounded-full opacity-[0.08] group-hover:opacity-[0.16] transition-opacity duration-700"
        style={{
          background:
            'radial-gradient(circle, rgba(var(--signal-rgb),1) 0%, transparent 70%)',
        }}
      />
    )
  }
  return (
    <div
      aria-hidden
      className="absolute bottom-0 right-0 flex items-end gap-1 p-6 opacity-[0.10] group-hover:opacity-[0.25] transition-opacity duration-700"
    >
      {[20, 35, 50, 25, 45, 60, 30].map((h, i) => (
        <span
          key={i}
          className="w-1.5 bg-signal-2 transition-all duration-700"
          style={{
            height: `${h}px`,
            transitionDelay: `${i * 50}ms`,
          }}
        />
      ))}
    </div>
  )
}

function CtaCardKontakt() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="lg:col-span-3"
    >
      <Link
        href="/kontakt"
        className="group relative overflow-hidden block bg-deep border border-signal-2/30 rounded-sm p-8 md:p-10 hover:border-signal-2 transition-all duration-500 min-h-[280px] h-full flex flex-col justify-between"
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-30 group-hover:opacity-60 transition-opacity duration-700"
          style={{
            background:
              'radial-gradient(circle at 30% 50%, rgba(var(--signal-rgb),0.15) 0%, transparent 60%)',
          }}
        />
        <div className="relative z-10">
          <p className="font-mono text-[0.7rem] text-signal-2 uppercase tracking-wider mb-2">
            Kostenfreies Erstgespräch
          </p>
          <h3 className="font-serif text-2xl md:text-3xl text-paper mb-3">
            15 Minuten, die <em className="italic text-signal-2">klären</em>, ob
            wir zusammenpassen.
          </h3>
          <p className="text-paper-mute leading-relaxed">
            Telefon, Video oder vor Ort in Wien. Ehrlich, ohne Verkaufsdruck.
          </p>
        </div>
        <div className="relative z-10 mt-8 pt-5 border-t border-signal-2/20">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-signal text-deep rounded-sm text-sm font-medium group-hover:gap-3 transition-all duration-300">
            Termin vereinbaren
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  )
}
