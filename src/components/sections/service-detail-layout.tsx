import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Check } from 'lucide-react'
import type { Service } from '@/lib/services'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'
import { ProcessSection } from '@/components/sections/process-section'
import { SelectedProjects } from '@/components/sections/selected-projects'
import { CtaBand } from '@/components/sections/cta-band'
import { ServiceSeoSection } from '@/components/sections/service-seo-section'

const COPY = {
  'website-erstellung': {
    kind: 'design',
    title: 'Website erstellen lassen in Wien.',
    intro:
      'Ob einfache Homepage für 599 €, Business-Website ab 1.490 € oder Premium-Projekt ab 2.490 €: Ich entwickle Ihren Webauftritt passend zu Ihren Zielen. Leistungen, Preis und Zeitplan stehen vor Beginn schriftlich fest.',
    features: [
      'Basis: einfache Homepage auf einer Seite, 599 € einmalig; kein individuelles Komplettdesign.',
      'Business: individuelles Design und bis zu fünf vereinbarte Seiten ab 1.490 €.',
      'Premium: Strategie, bis zu zehn vereinbarte Seiten und erweiterte Funktionen ab 2.490 €.',
      'Responsive Darstellung, technische SEO und klare Anfragewege.',
      'Live-Vorschau, schriftlich vereinbarter Umfang und persönliche Übergabe.',
    ],
    note:
      'Das Basis-Paket enthält kein Kontaktformular, keine Animationen und keine Erstellung von Datenschutzerklärung oder anderen Rechtstexten. Erforderliche Inhalte stellt der Auftraggeber bereit.',
  },
  relaunch: {
    kind: 'strategy',
    title: 'Ein neuer Auftritt. Mit klarer Richtung.',
    intro:
      'Eine neue Farbe löst noch kein strukturelles Problem. Gemeinsam prüfen wir, welche Inhalte, Funktionen und Anfragewege Ihre Website tatsächlich braucht.',
    features: [
      'Bestandsaufnahme von Inhalten, Seitenstruktur und technischen Voraussetzungen.',
      'Ein abgestimmtes Konzept statt unverbindlicher Design-Experimente.',
      'Überarbeitung der vereinbarten Seiten und Funktionen.',
      'Berücksichtigung bestehender URLs und nötiger Weiterleitungen.',
      'Live-Vorschau und gebündeltes Feedback innerhalb der vereinbarten Korrekturrunden.',
    ],
    note:
      'Ein Relaunch ist ein individuell vereinbartes Projekt. Aufwand, Zeitplan und einmaliger Preis ergeben sich aus dem festgelegten Leistungsumfang.',
  },
  'seo-wien': {
    kind: 'technology',
    title: 'Verstanden werden. Gefunden werden.',
    intro:
      'Technische SEO und klare Inhalte gehören zusammen. Ich arbeite an nachvollziehbaren Grundlagen Ihrer Website — ohne garantierte Rankings oder erfundene Erfolgszahlen.',
    features: [
      'Prüfung der vereinbarten Seiten auf Indexierbarkeit und technische Hindernisse.',
      'Sinnvolle Seitentitel, Beschreibungen und Überschriftenstruktur.',
      'Interne Verlinkung, Canonicals, Sitemap und strukturierte Daten nach Bedarf.',
      'Abstimmung von Mobilansicht, Bildauslieferung und Ladeverhalten.',
      'Priorisierte Maßnahmen und verständliche Dokumentation.',
    ],
    note:
      'Suchmaschinen entscheiden selbst über Rankings. Umfangreiche laufende SEO-Betreuung und neue Inhalte werden separat vereinbart.',
  },
} as const

export function ServiceDetailLayout({ service }: { service: Service }) {
  const data =
    COPY[service.slug as keyof typeof COPY] || COPY['website-erstellung']

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Start', href: '/' },
          { label: 'Leistungen', href: '/leistungen' },
          { label: service.shortTitle, href: service.href },
        ]}
      />

      <section className="container-fluid alcor-section alcor-selection">
        <div>
          <p className="alcor-eyebrow">{service.shortTitle} · ALCOR Wien</p>
          <h1 className="alcor-page-title">{service.h1 || data.title}</h1>
          <p className="alcor-intro">{data.intro}</p>
          <div className="alcor-actions">
            <Link href="/termin" className="alcor-button">
              Kostenloses Erstgespräch
              <ArrowUpRight size={20} aria-hidden="true" />
            </Link>
            <Link href="/preise" className="alcor-button alcor-button-outline">
              Pakete & Preise
            </Link>
          </div>
        </div>
        <div className="alcor-selection-image">
          <Image
            src={`/media/visual/${data.kind}`}
            alt={`Illustration: ${service.shortTitle}`}
            fill
            sizes="(min-width:1000px) 45vw,95vw"
            unoptimized
            priority
          />
        </div>
      </section>

      <section className="alcor-surface">
        <div className="container-fluid alcor-section">
          <div className="alcor-section-head">
            <div>
              <p className="alcor-eyebrow">Leistung mit klarem Rahmen</p>
              <h2>
                Was wir für Ihr
                <br />
                Projekt vereinbaren.
              </h2>
            </div>
            <p>
              Keine unbegrenzten Pauschalversprechen: Seiten, Funktionen und
              Zeitplan stehen vor der Umsetzung im Vertrag.
            </p>
          </div>
          <ul className="max-w-5xl space-y-5">
            {data.features.map((feature) => (
              <li
                key={feature}
                className="flex gap-4 border-b border-line pb-5 text-lg text-paper-mute"
              >
                <Check
                  className="mt-1 shrink-0 text-signal-2"
                  size={22}
                  aria-hidden="true"
                />
                {feature}
              </li>
            ))}
          </ul>
          <p className="alcor-note mt-8 max-w-4xl">
            {data.note} Aufgrund der Kleinunternehmerregelung wird keine
            Umsatzsteuer verrechnet.
          </p>
        </div>
      </section>

      <SelectedProjects />

      {service.slug === 'website-erstellung' && (
        <section className="container-fluid alcor-section border-t border-line">
          <div className="max-w-5xl">
            <p className="alcor-eyebrow">Homepage erstellen lassen · Wien</p>
            <h2 className="mb-6 font-serif text-3xl text-paper md:text-4xl">
              Drei klare Pakete. Ein schriftlich vereinbarter Umfang.
            </h2>
            <p className="mb-8 text-lg text-paper-mute">
              Eine professionelle Website muss Ihr Angebot verständlich
              erklären, auf Mobilgeräten funktionieren und interessierte
              Besucher zur passenden Kontaktmöglichkeit führen. Die Pakete
              geben einen realistischen Preisrahmen; das Angebot hält den
              tatsächlichen Umfang fest.
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <h3 className="mb-3 font-serif text-2xl text-paper">
                  Basis · 599 €
                </h3>
                <p className="text-paper-mute">
                  Eine Seite mit bereitgestellten Texten und Bildern,
                  responsiver Darstellung und Basis-SEO. Ohne Kontaktformular,
                  Animationen oder Erstellung von Rechtstexten.
                </p>
              </div>
              <div>
                <h3 className="mb-3 font-serif text-2xl text-paper">
                  Business · ab 1.490 €
                </h3>
                <p className="text-paper-mute">
                  Individuelles Design, bis zu fünf vereinbarte Seiten,
                  Kontaktformular, technische SEO, Local-SEO-Grundlagen und
                  strukturierte Daten.
                </p>
              </div>
              <div>
                <h3 className="mb-3 font-serif text-2xl text-paper">
                  Premium · ab 2.490 €
                </h3>
                <p className="text-paper-mute">
                  Strategie, bis zu zehn vereinbarte Seiten, vertiefte SEO/GEO
                  und ein erweiterter Funktionsbereich nach Vereinbarung.
                </p>
              </div>
            </div>
            <p className="mt-8 text-paper-mute">
              Individuelle Web-Apps, Portale oder umfangreiche
              Schnittstellenprojekte beginnen ab 3.900 €. Details zu den{' '}
              <Link href="/preise" className="alcor-text-link">
                Webdesign-Preisen in Wien
              </Link>
              , dem{' '}
              <Link
                href="/blog/homepage-erstellen-lassen-wien"
                className="alcor-text-link"
              >
                Ablauf der Homepage-Erstellung
              </Link>{' '}
              und den{' '}
              <Link href="/referenzen" className="alcor-text-link">
                Referenzen
              </Link>{' '}
              helfen bei Ihrer Entscheidung.
            </p>
            <div className="alcor-actions mt-8">
              <Link href="/termin" className="alcor-button">
                15-Minuten-Erstgespräch
                <ArrowUpRight size={20} aria-hidden="true" />
              </Link>
              <Link
                href="/bewerbung"
                className="alcor-button alcor-button-outline"
              >
                Projekt unverbindlich anfragen
              </Link>
            </div>
          </div>
        </section>
      )}

      <ProcessSection />
      <ServiceSeoSection service={service} />
      <CtaBand />
    </>
  )
}
