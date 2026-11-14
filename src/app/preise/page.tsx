import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'
import { PricingCards } from '@/components/sections/pricing-card'
import { CtaBand } from '@/components/sections/cta-band'
import { ProcessSection } from '@/components/sections/process-section'
import { PriceTransparency } from '@/components/sections/price-transparency'
import { PAGE_META } from '@/lib/seo-metadata'

export const metadata = PAGE_META.preise

export default function PreisePage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Start', href: '/' },
          { label: 'Pakete & Preise', href: '/preise' },
        ]}
      />
      <section className="container-fluid alcor-section">
        <div className="alcor-section-head">
          <div>
            <p className="alcor-eyebrow">Pakete & einmalige Preise</p>
            <h1 className="alcor-page-title">
              Webdesign Preise in Wien.
              <br />
              <span className="text-signal-2">Transparent vor dem Gespräch.</span>
            </h1>
          </div>
          <p>
            Basis 599 € fix, Business ab 1.490 € und Premium ab 2.490 €.
            Individuelle Web-Apps und Sonderentwicklungen beginnen ab 3.900 €.
            Der endgültige Umfang steht vor Projektbeginn schriftlich fest.
          </p>
        </div>
        <PricingCards />
        <p className="mt-8 max-w-3xl text-paper-mute">
          Welche Leistungen sind in welchem Website-Paket enthalten?{' '}
          <Link
            href="/leistungen/website-erstellung"
            className="alcor-text-link"
          >
            Website-Erstellung und Leistungsumfang im Detail ansehen
          </Link>
          . Zur individuellen Planung können Sie ein{' '}
          <Link href="/termin" className="alcor-text-link">
            kostenloses Erstgespräch vereinbaren
          </Link>
          .
        </p>
      </section>

      <section className="container-fluid alcor-section border-t border-line">
        <div className="alcor-section-head">
          <div>
            <p className="alcor-eyebrow">PC-Hilfe & IT-Service</p>
            <h2>
              Computerhilfe mit
              <br />
              klaren Einstiegspreisen.
            </h2>
          </div>
          <p>
            Vor Ort in Wien ohne eigene Anfahrtskosten oder per Fernwartung.
            Außerhalb Wiens wird Kilometergeld vor dem Termin vereinbart.
            Hardware-Reparaturen sind nicht Teil des Angebots.
          </p>
        </div>
        <div className="alcor-notes-grid">
          <div>
            <h3>Fernwartung</h3>
            <p>Ab 39 € für eine vereinbarte Software- oder Einstellungshilfe.</p>
          </div>
          <div>
            <h3>PC- und Laptop-Einrichtung</h3>
            <p>Ab 69 € für Benutzerkonto, Updates und vereinbarte Programme.</p>
          </div>
          <div>
            <h3>Windows-Installation</h3>
            <p>Ab 99 € für Installation und Grundeinrichtung; Lizenz nicht enthalten.</p>
          </div>
          <div>
            <h3>WLAN, Drucker & Backup</h3>
            <p>Ab 69 € beziehungsweise ab 79 €, abhängig von Geräten und Datenmenge.</p>
          </div>
        </div>
        <Link href="/it-service-wien" className="alcor-text-link mt-8">
          Alle IT-Leistungen und Grenzen ansehen
          <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </section>

      <section className="alcor-surface">
        <div className="container-fluid alcor-section alcor-selection">
          <div className="alcor-selection-image">
            <Image
              src="/media/visual/strategy"
              alt="Illustration einer strukturierten Projektplanung"
              fill
              sizes="(min-width:1000px) 45vw,95vw"
              unoptimized
            />
          </div>
          <div>
            <p className="alcor-eyebrow">Zahlung in zwei Schritten</p>
            <h2>
              Vor dem ersten Entwurf
              <br />
              steht die Vereinbarung.
            </h2>
            <p className="alcor-intro">
              Zwischen Ihnen und ALCOR wird ein Vertrag geschlossen. Darin
              stehen Leistungen, Zeitrahmen, Mitwirkungspflichten, Abnahme und
              die Anzahl der Korrekturrunden.
            </p>
            <ul className="alcor-contract-list">
              <li>
                <strong>60 %</strong>
                <span>Anzahlung bei Auftragserteilung.</span>
              </li>
              <li>
                <strong>40 %</strong>
                <span>Restzahlung nach erfolgreicher Abnahme.</span>
              </li>
              <li>
                <strong>Bis 5×</strong>
                <span>
                  Vereinbarte Korrekturrunden innerhalb des freigegebenen
                  Konzepts. Kein vollständiges Redesign.
                </span>
              </li>
            </ul>
            <p className="alcor-note">
              Die Live-Vorschau ermöglicht laufende Abstimmung. Ein geänderter
              Leistungsumfang wird vor zusätzlicher Arbeit separat vereinbart.
            </p>
          </div>
        </div>
      </section>

      <ProcessSection />
      <PriceTransparency />
      <CtaBand
        title="Welcher Umfang passt zu Ihrem Unternehmen?"
        secondaryLabel="Projekt unverbindlich anfragen"
      />
    </>
  )
}
