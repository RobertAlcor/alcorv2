import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'
import { PricingCards } from '@/components/sections/pricing-card'
import { CtaBand } from '@/components/sections/cta-band'

export const metadata: Metadata = {
  title: 'Preise',
  description:
    'Drei Pakete für drei Situationen. Starter ab 599 Euro. Business und Premium individuell kalkuliert. Keine versteckten Kosten.',
  alternates: { canonical: '/preise' },
}

const PRINZIPIEN = [
  {
    title: 'Festpreis vor Projektstart',
    description:
      'Kein Stundensatz-Roulette. Sie wissen vor dem ersten Code-Buchstaben, was das Projekt kostet.',
  },
  {
    title: 'Keine versteckten Folgekosten',
    description:
      'Handgeschriebener Code braucht keine Wartung, keine Lizenzen, keine monatlichen Plugin-Updates.',
  },
  {
    title: 'Alles inklusive',
    description:
      'SEO, DSGVO, Performance, Hosting-Setup, Suchmaschinen-Anmeldung – im Preis enthalten.',
  },
] as const

export default function PreisePage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Start', href: '/' },
          { label: 'Preise', href: '/preise' },
        ]}
      />

      <section className="container-fluid pt-12 md:pt-16 pb-12">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-signal-2 mb-6">
            <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
            Preise
          </p>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] tracking-[-0.02em] text-balance mb-8">
            Klare Preise. <em className="text-signal-2 italic">Keine Überraschungen.</em>
          </h1>
          <p className="font-serif italic text-xl md:text-2xl text-paper-mute max-w-3xl leading-snug">
            Drei Pakete als Ausgangspunkt. Den genauen Festpreis legen wir nach
            unserem ersten Gespräch fest – schriftlich, verbindlich, ohne Überraschungen.
          </p>
        </div>
      </section>

      <section className="container-fluid pt-8 pb-24">
        <PricingCards />
      </section>

      {/* Prinzipien */}
      <section className="container-fluid py-20 md:py-24 border-t border-line">
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-signal-2 mb-6">
            <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
            Wie ich abrechne
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-paper text-balance">
            Drei Prinzipien, die für alle Pakete gelten.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {PRINZIPIEN.map((p, idx) => (
            <div key={p.title} className="bg-deep-2 border border-line p-8 rounded-sm">
              <div className="font-mono text-xs text-paper-dim mb-3">0{idx + 1}</div>
              <h3 className="font-serif text-2xl text-paper mb-3">{p.title}</h3>
              <p className="text-paper-mute leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Spätere Änderungen / Stundensatz */}
      <section className="container-fluid py-20 md:py-24 border-t border-line">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-signal-2 mb-6">
              <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
              Nach dem Launch
            </p>
            <h2 className="font-serif text-3xl text-paper text-balance">
              Was passiert mit späteren Änderungen?
            </h2>
          </div>
          <div className="space-y-6">
            <p className="text-paper leading-relaxed text-lg text-pretty">
              Sollten Sie später Texte ändern, neue Inhalte hinzufügen oder kleine
              Erweiterungen wünschen, wird das nach tatsächlichem Aufwand
              stundenweise abgerechnet und monatlich in Rechnung gestellt.
            </p>
            <p className="text-paper-mute leading-relaxed text-pretty">
              Sie zahlen also nur, wenn Sie wirklich etwas brauchen – kein
              Wartungsvertrag, keine Pauschale für nichts. Wenn Sie selbst
              Inhalte ändern wollen, baue ich auf Wunsch ein schlankes Mini-CMS
              ein, das Ihnen erlaubt, das ohne mich zu tun.
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        title="Festpreis für Ihr Projekt?"
        subtitle="Im kostenfreien Erstgespräch klären wir Umfang und Festpreis. Schriftlich, verbindlich, ohne versteckte Kosten."
      />
    </>
  )
}
