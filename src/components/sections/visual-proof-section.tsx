'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowRight, Code2, Search, Smartphone, Gauge } from 'lucide-react'

const PROOFS = [
  {
    src: '/referenzen/psychologen-webdesign.webp',
    alt: 'Spezialisierte ALCOR Website für Psychologie und Psychotherapie',
    title: 'Nicht nur schön. Auf eine Zielgruppe gebaut.',
    text: 'Positionierung, lokale Auffindbarkeit und klare Anfragewege werden gemeinsam mit dem Design entwickelt.',
    href: '/referenzen/psychologen-webdesign',
    className: 'md:col-span-7',
  },
  {
    src: '/referenzen/buero-reinigung.webp',
    alt: 'ALCOR Web-Anwendung für Reinigungsbetriebe',
    title: 'Websites dürfen arbeiten.',
    text: 'Wenn ein Prozess mehr braucht als Seiten und Formulare, entstehen individuelle Web-Anwendungen.',
    href: '/referenzen/buero-reinigung',
    className: 'md:col-span-5',
  },
] as const

const PRINCIPLES = [
  {
    icon: Smartphone,
    label: 'Mobile zuerst',
    text: 'Entscheidende Inhalte und Anfragewege funktionieren auch auf kleinen Displays ohne Umwege.',
  },
  {
    icon: Gauge,
    label: 'Performance',
    text: 'Bilder, Komponenten und Code werden so ausgeliefert, dass Gestaltung nicht unnötig Ladezeit kostet.',
  },
  {
    icon: Search,
    label: 'Auffindbarkeit',
    text: 'Struktur, Inhalte und technische SEO werden nicht erst nach dem Design ergänzt.',
  },
  {
    icon: Code2,
    label: 'Eigener Code',
    text: 'Die technische Basis wird passend zum Projekt gebaut statt aus einem Theme zusammengesetzt.',
  },
] as const

export function VisualProofSection() {
  return (
    <section className="border-line border-t">
      <div className="container-fluid py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-end"
        >
          <div>
            <p className="text-signal-2 mb-6 text-xs font-semibold tracking-[0.18em] uppercase">
              <span className="bg-signal-2 mr-3 inline-block h-px w-8 align-middle" />
              Design mit Funktion
            </p>
            <h2 className="max-w-3xl font-serif text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] text-balance">
              Der erste Eindruck zählt. Danach muss die Website überzeugen.
            </h2>
          </div>
          <p className="text-paper-mute max-w-xl leading-relaxed lg:justify-self-end">
            Mehr Bilder allein machen keine bessere Website. Deshalb zeige ich reale Arbeiten dort,
            wo sie Vertrauen schaffen — und verbinde sie mit klarer Positionierung, Technik und
            einem nächsten Schritt.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-12">
          {PROOFS.map((proof, index) => (
            <motion.article
              key={proof.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.65, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={proof.className}
            >
              <Link
                href={proof.href}
                className="group border-line bg-deep-2 hover:border-signal-2/50 flex h-full flex-col overflow-hidden rounded-sm border transition-colors duration-500"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={proof.src}
                    alt={proof.alt}
                    fill
                    sizes={index === 0 ? '(min-width: 768px) 58vw, 100vw' : '(min-width: 768px) 42vw, 100vw'}
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                  />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-deep/40 to-transparent" />
                </div>
                <div className="flex flex-1 items-end justify-between gap-6 p-6 md:p-8">
                  <div>
                    <h3 className="text-paper mb-2 font-serif text-2xl md:text-3xl">{proof.title}</h3>
                    <p className="text-paper-mute max-w-xl text-sm leading-relaxed">{proof.text}</p>
                  </div>
                  <ArrowRight className="text-signal-2 h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="border-line mt-4 grid border md:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map(({ icon: Icon, label, text }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.07 }}
              className="border-line bg-deep p-6 md:border-r md:last:border-r-0"
            >
              <Icon className="text-signal-2 mb-5 h-5 w-5" strokeWidth={1.5} />
              <h3 className="text-paper mb-2 text-sm font-semibold">{label}</h3>
              <p className="text-paper-mute text-xs leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
