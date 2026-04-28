import type { Metadata } from 'next'
import { Globe, Server, Clock, Wrench } from 'lucide-react'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'
import { PricingCards } from '@/components/sections/pricing-card'
import { CtaBand } from '@/components/sections/cta-band'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Preise',
  description:
    'Drei Pakete für drei Situationen. Starter ab 599 Euro. Hosting-Pauschale 99 Euro pro Jahr inkl. kleinerer Updates. Stundensatz 85 Euro netto. Keine versteckten Kosten.',
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

const HOSTING_INKLUSIVE = [
  'Verwaltetes Hosting auf Vercel oder vergleichbarer Plattform (EU-Server)',
  'SSL-Zertifikat dauerhaft kostenlos',
  'Domain-Setup und DNS-Verwaltung',
  'Kleinere Updates und Inhaltsänderungen bis 15 Minuten pro Vorgang',
  'Backup und Restore bei technischen Problemen',
  'Monitoring und Verfügbarkeits-Checks',
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
            Klare Preise.{' '}
            <em className="text-signal-2 italic">Keine Überraschungen.</em>
          </h1>
          <p className="font-serif italic text-xl md:text-2xl text-paper-mute max-w-3xl leading-snug">
            Drei Pakete als Ausgangspunkt. Den genauen Festpreis legen wir nach
            unserem ersten Gespräch fest – schriftlich, verbindlich, ohne
            Überraschungen.
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
            <div
              key={p.title}
              className="bg-deep-2 border border-line p-8 rounded-sm"
            >
              <div className="font-mono text-xs text-paper-dim mb-3">
                0{idx + 1}
              </div>
              <h3 className="font-serif text-2xl text-paper mb-3">{p.title}</h3>
              <p className="text-paper-mute leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Domain-Beratung */}
      <section className="container-fluid py-20 md:py-24 border-t border-line">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-signal-2 mb-6">
              <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
              Vor dem Start
            </p>
            <Globe
              className="w-10 h-10 text-signal-2 mb-4"
              strokeWidth={1.5}
            />
            <h2 className="font-serif text-3xl text-paper text-balance">
              Domain-Beratung kostenlos.
            </h2>
          </div>
          <div className="space-y-5 max-w-2xl">
            <p className="text-paper leading-relaxed text-lg text-pretty">
              Falls Sie noch keine Domain haben, beraten wir gemeinsam, welcher
              Name am besten zu Ihrem Geschäft, Ihrer Zielgruppe und Ihrem SEO
              passt.
            </p>
            <p className="text-paper-mute leading-relaxed text-pretty">
              Eine .at-Domain kostet typischerweise 15–25 Euro pro Jahr beim
              Registrar Ihrer Wahl – das ist kein Posten, an dem ich verdiene.
              Falls Sie schon eine Domain haben, übernehmen wir die einfach.
            </p>
          </div>
        </div>
      </section>

      {/* Hosting-Pauschale */}
      <section className="container-fluid py-20 md:py-24 border-t border-line">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-signal-2 mb-6">
              <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
              Optional: Hosting bei mir
            </p>
            <Server className="w-10 h-10 text-signal-2 mb-4" strokeWidth={1.5} />
            <h2 className="font-serif text-3xl text-paper text-balance mb-4">
              Alles aus einer Hand.
            </h2>
            <div className="bg-deep-2 border border-signal-2/40 rounded-sm p-6">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-serif text-5xl text-signal-2 leading-none">
                  €{SITE.pricing.hostingYearly}
                </span>
                <span className="font-mono text-xs text-paper-mute uppercase tracking-wider">
                  / Jahr · netto
                </span>
              </div>
              <p className="text-sm text-paper-mute mt-2">
                Pauschal für das ganze Jahr
              </p>
            </div>
          </div>
          <div className="max-w-2xl">
            <p className="text-paper leading-relaxed text-lg text-pretty mb-6">
              Wenn Sie sich nicht selbst um Hosting kümmern wollen: Ich übernehme
              das gesamte technische Drumherum für eine Jahres-Pauschale.
            </p>
            <p className="text-[0.7rem] font-mono uppercase tracking-wider text-signal-2 mb-3">
              Was inkludiert ist
            </p>
            <ul className="space-y-2.5 mb-6">
              {HOSTING_INKLUSIVE.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-paper-mute leading-relaxed"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-signal-2 mt-2 shrink-0"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="p-5 bg-deep border-l-2 border-paper-dim/40 rounded-sm">
              <p className="text-sm text-paper-mute leading-relaxed">
                <strong className="text-paper">Hinweis:</strong> Die Pauschale
                deckt kleinere Vorgänge bis 15 Minuten Aufwand ab. Größere
                Änderungen (neue Seiten, Funktionserweiterungen, Re-Designs)
                werden separat nach Stundensatz abgerechnet – siehe unten.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stundensatz */}
      <section className="container-fluid py-20 md:py-24 border-t border-line">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-signal-2 mb-6">
              <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
              Größere Erweiterungen
            </p>
            <Wrench className="w-10 h-10 text-signal-2 mb-4" strokeWidth={1.5} />
            <h2 className="font-serif text-3xl text-paper text-balance mb-4">
              Stundensatz.
            </h2>
            <div className="bg-deep-2 border border-line rounded-sm p-6">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-serif text-5xl text-signal-2 leading-none">
                  €{SITE.pricing.hourlyRate}
                </span>
                <span className="font-mono text-xs text-paper-mute uppercase tracking-wider">
                  / h · netto
                </span>
              </div>
              <p className="text-sm text-paper-mute mt-2">
                Für Arbeiten über 15 Min
              </p>
            </div>
          </div>
          <div className="space-y-6 max-w-2xl">
            <p className="text-paper leading-relaxed text-lg text-pretty">
              Größere Änderungen nach dem Launch – neue Seiten, Funktionserweiterungen,
              Re-Designs einzelner Bereiche – werden nach tatsächlichem Aufwand
              stundenweise abgerechnet. Vor jedem Auftrag schätze ich den Aufwand
              und stimme ihn mit Ihnen ab.
            </p>
            <p className="text-paper-mute leading-relaxed text-pretty">
              Sie zahlen also nur, wenn Sie wirklich etwas brauchen – kein
              Wartungsvertrag, keine Pauschale für nichts. Wenn Sie selbst
              Inhalte ändern wollen, baue ich auf Wunsch ein schlankes Mini-CMS
              ein, das Ihnen erlaubt, das ohne mich zu tun.
            </p>
            <div className="flex items-start gap-3 p-5 bg-deep-2 border-l-2 border-signal-2 rounded-sm">
              <Clock
                className="w-5 h-5 text-signal-2 shrink-0 mt-0.5"
                strokeWidth={1.5}
              />
              <div className="text-sm text-paper leading-relaxed">
                <strong>Transparente Abrechnung:</strong> Jede Stunde wird
                dokumentiert mit Datum, Aufgabe und tatsächlicher Dauer.
                Monatliche Rechnung mit nachvollziehbarem Auszug.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Zahlungsmodalitäten */}
      <section className="container-fluid py-20 md:py-24 border-t border-line">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-signal-2 mb-6">
            <span className="inline-block w-8 h-px bg-signal-2 mr-3 align-middle" />
            Zahlungsablauf
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-paper text-balance mb-8">
            Klar geregelt, fair für beide Seiten.
          </h2>
          <div className="space-y-5 text-paper-mute leading-relaxed">
            <p>
              <strong className="text-paper">Anzahlung 50 %</strong> bei
              Auftragsbestätigung – damit ich verbindlich für Sie reservieren
              und mit der Arbeit beginnen kann.
            </p>
            <p>
              <strong className="text-paper">Restzahlung 50 %</strong> bei
              Fertigstellung, fällig binnen 3 Tagen nach Live-Schaltung.
            </p>
            <p>
              Bezahlung per <strong className="text-paper">Online-Banking
              (SEPA)</strong> oder{' '}
              <strong className="text-paper">PayPal</strong>. Sie bekommen eine
              Rechnung mit Ihrer einmaligen Referenznummer für eine eindeutige
              Zuordnung.
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
