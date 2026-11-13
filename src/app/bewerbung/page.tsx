import Link from 'next/link'
import { Clock3, ArrowUpRight } from 'lucide-react'
import { KontaktForm } from '@/components/sections/kontakt-form'
import { pageMetadata } from '@/lib/seo-metadata'

export const metadata = pageMetadata({
  title: 'Projekt anfragen | Webdesign & SEO von ALCOR',
  description:
    'Website-, Relaunch- oder SEO-Projekt kostenlos und unverbindlich bei ALCOR anfragen. Ziele, Umfang und Preisrahmen persönlich mit Robert Alchimowicz klären.',
  path: '/bewerbung',
})

export default function BewerbungPage() {
  return (
    <section className="container-fluid alcor-section">
      <div className="alcor-application">
        <div>
          <p className="alcor-eyebrow">Der erste Schritt</p>
          <h1 className="alcor-page-title">
            Fragen Sie Ihr Projekt
            <br />
            <span className="text-signal-2">unverbindlich an.</span>
          </h1>
          <p className="alcor-intro">
            Sie benötigen noch kein fertiges Konzept. Beschreiben Sie kurz, was
            Sie anbieten, wen Sie erreichen möchten und was Ihre Website künftig
            besser machen soll. Stichpunkte reichen für den ersten Austausch.
          </p>
          <div className="alcor-application-note">
            <h2>Was ich für die Einordnung benötige.</h2>
            <p>
              Geht es um eine neue Website oder um einen bestehenden Auftritt?
              Was ist Ihnen besonders wichtig? Eine vorhandene Webadresse sowie
              ein ungefährer Zeit- oder Budgetrahmen helfen bei der Einordnung –
              offene Fragen klären wir gemeinsam.
            </p>
            <h2 className="mt-6">Was danach passiert.</h2>
            <p>
              Ich ordne Ihr Vorhaben persönlich ein und melde mich mit dem
              passenden nächsten Schritt. Im Gespräch klären wir Umfang,
              Preisrahmen und Zeitplan. Erst ein schriftlicher Vertrag begründet
              den Auftrag – Ihre Anfrage ist kostenlos und unverbindlich.
            </p>
          </div>
          <Link
            className="alcor-button alcor-button-outline"
            href="/termin"
          >
            <Clock3 size={19} aria-hidden="true" />
            Zuerst 15 Minuten kennenlernen
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <div className="alcor-form-panel">
          <KontaktForm application />
        </div>
      </div>
    </section>
  )
}
