'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { Code2, RefreshCw, Search, ArrowRight } from 'lucide-react'
import { SERVICES } from '@/lib/services'

const ICONS: Record<string, React.ReactNode> = {
  'website-erstellung': <Code2 className="h-full w-full" strokeWidth={1.25} />,
  relaunch: <RefreshCw className="h-full w-full" strokeWidth={1.25} />,
  'seo-wien': <Search className="h-full w-full" strokeWidth={1.25} />,
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
        className="mb-16 max-w-3xl"
      >
        <p className="text-signal-2 mb-6 text-xs font-semibold tracking-[0.18em] uppercase">
          <span className="bg-signal-2 mr-3 inline-block h-px w-8 align-middle" />
          Leistungen
        </p>
        <h2 className="font-serif text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] text-balance">
          Drei Wege, mit denen ich Ihnen helfe.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
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
        className="group bg-deep-2 border-line hover:border-signal-2 relative flex h-full min-h-[280px] flex-col justify-between overflow-hidden rounded-sm border p-8 transition-all duration-500 md:p-10"
      >
        <BentoPattern kind={patternKind} />

        <div className="relative z-10">
          <div className="text-signal-2 mb-6 h-10 w-10 origin-bottom-left transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
            {icon}
          </div>
          <p className="text-paper-dim mb-2 font-mono text-[0.7rem] tracking-wider uppercase">
            {tagline}
          </p>
          <h3 className="text-paper group-hover:text-signal-2 mb-3 font-serif text-2xl transition-colors md:text-3xl">
            {title}
          </h3>
          <p className="text-paper-mute max-w-md leading-relaxed">{description}</p>
        </div>

        {/* CTA Footer - Button-Look, klar erkennbar */}
        <div className="border-line relative z-10 mt-8 border-t pt-5">
          <span className="bg-deep border-line text-paper group-hover:bg-signal group-hover:text-deep group-hover:border-signal inline-flex items-center gap-2 rounded-sm border px-4 py-2 text-sm font-medium transition-all duration-300">
            {ctaLabel}
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
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
        className="absolute -top-10 -right-10 h-64 w-64 opacity-[0.07] transition-opacity duration-700 group-hover:opacity-[0.15]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(var(--signal-rgb),0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--signal-rgb),0.6) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(circle at top right, black 0%, transparent 70%)',
        }}
      />
    )
  }
  if (kind === 'circle') {
    return (
      <div
        aria-hidden
        className="absolute -right-20 -bottom-20 h-56 w-56 rounded-full opacity-[0.08] transition-opacity duration-700 group-hover:opacity-[0.16]"
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
      className="absolute right-0 bottom-0 flex items-end gap-1 p-6 opacity-[0.10] transition-opacity duration-700 group-hover:opacity-[0.25]"
    >
      {[20, 35, 50, 25, 45, 60, 30].map((h, i) => (
        <span
          key={i}
          className="bg-signal-2 w-1.5 transition-all duration-700"
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
        className="group bg-deep border-signal-2/30 hover:border-signal-2 relative flex h-full min-h-[280px] flex-col justify-between overflow-hidden rounded-sm border p-8 transition-all duration-500 md:p-10"
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-30 transition-opacity duration-700 group-hover:opacity-60"
          style={{
            background:
              'radial-gradient(circle at 30% 50%, rgba(var(--signal-rgb),0.15) 0%, transparent 60%)',
          }}
        />
        <div className="relative z-10">
          <p className="text-signal-2 mb-2 font-mono text-[0.7rem] tracking-wider uppercase">
            Kostenfreies Erstgespräch
          </p>
          <h3 className="text-paper mb-3 font-serif text-2xl md:text-3xl">
            15 Minuten, die <em className="text-signal-2 italic">klären</em>, ob wir
            zusammenpassen.
          </h3>
          <p className="text-paper-mute leading-relaxed">
            Telefon, Video oder vor Ort in Wien. Ehrlich, ohne Verkaufsdruck.
          </p>
        </div>
        <div className="border-signal-2/20 relative z-10 mt-8 border-t pt-5">
          <span className="bg-signal text-deep inline-flex items-center gap-2 rounded-sm px-4 py-2 text-sm font-medium transition-all duration-300 group-hover:gap-3">
            Termin vereinbaren
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  )
}
