import Link from 'next/link'
import { SITE } from '@/lib/site'
import { COMPANY_PROFILE } from '@/lib/company-profile'

export function CompanyProfile() {
  return (
    <section id="alcor-profil" className="container-fluid alcor-section border-t border-line" aria-labelledby="company-profile-title">
      <div className="alcor-section-head">
        <div><p className="alcor-eyebrow">Anbieter, Leistungen und Zusammenarbeit</p><h2 id="company-profile-title">ALCOR auf einen Blick.</h2></div>
        <p>{COMPANY_PROFILE.summary}</p>
      </div>
      <dl className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
        <div className="border-t border-line pt-5"><dt className="font-semibold text-paper">Ihr Ansprechpartner</dt><dd className="mt-3 text-paper-mute">{SITE.founder.name}. Konzeption, Gestaltung, Entwicklung und Übergabe werden persönlich betreut.</dd></div>
        <div className="border-t border-line pt-5"><dt className="font-semibold text-paper">Standort</dt><dd className="mt-3 text-paper-mute">{SITE.address.street}, {SITE.address.postalCode} {SITE.address.city}, Donaustadt. Ein persönliches Gespräch wird vorab vereinbart.</dd></div>
        <div className="border-t border-line pt-5"><dt className="font-semibold text-paper">Leistungen</dt><dd className="mt-3 text-paper-mute"><Link href="/leistungen/website-erstellung" className="underline underline-offset-4 hover:text-signal-2">Website-Erstellung</Link>, <Link href="/leistungen/relaunch" className="underline underline-offset-4 hover:text-signal-2">Relaunch</Link>, <Link href="/leistungen/seo-wien" className="underline underline-offset-4 hover:text-signal-2">technische SEO</Link> und <Link href="/website-betreuung" className="underline underline-offset-4 hover:text-signal-2">Website-Betreuung</Link>.</dd></div>
      </dl>
      <div className="mt-12 grid gap-9 lg:grid-cols-2">
        <div><h3 className="text-2xl font-semibold text-paper">Wann passt ALCOR zu Ihrem Vorhaben?</h3><p className="mt-4 text-paper-mute">Wenn Sie mit dem Entwickler direkt zusammenarbeiten und Seiten, Funktionen sowie Projektumfang vor dem Start abstimmen möchten. Die Zusammenarbeit beginnt mit einem unverbindlichen Gespräch und einem schriftlichen Angebot, nicht mit einer automatischen Beauftragung.</p><Link href="/termin" className="alcor-text-link mt-4">Kostenloses 15-Minuten-Erstgespräch →</Link></div>
        <div><h3 className="text-2xl font-semibold text-paper">Was kostet eine Website bei ALCOR?</h3><p className="mt-4 text-paper-mute">Die Basis-Homepage kostet {SITE.pricing.starter} € einmalig: eine einfache Seite mit bereitgestellten Inhalten, responsiver Darstellung und Basis-SEO. Kontaktformular, Animationen, individuelles Komplettdesign und die Erstellung von Rechtstexten sind nicht enthalten. Business und Premium werden individuell kalkuliert. Domain, Hosting und Betreuung sind separate Leistungen; es wird keine Umsatzsteuer verrechnet.</p><Link href="/preise" className="alcor-text-link mt-4">Leistungsumfang und Preise vergleichen →</Link></div>
        <div><h3 className="text-2xl font-semibold text-paper">Welche Arbeiten können Sie sich ansehen?</h3><p className="mt-4 text-paper-mute">Die Projektseiten zeigen konkrete Oberflächen und Funktionen: etwa die Angebotsstruktur von <Link href="/referenzen/cleankos" className="underline underline-offset-4 hover:text-signal-2">CleanKos</Link>, den Praxisauftritt von <Link href="/referenzen/massagewelt-wien" className="underline underline-offset-4 hover:text-signal-2">Massagewelt Wien</Link> und die Produktinformationen von <Link href="/referenzen/etikettendruck24" className="underline underline-offset-4 hover:text-signal-2">Etikettendruck24</Link>. Eigene Produkte sind im Portfolio als solche gekennzeichnet.</p><Link href="/referenzen" className="alcor-text-link mt-4">Alle Referenzen mit Live-Links →</Link></div>
        <div><h3 className="text-2xl font-semibold text-paper">Was wird vor Projektbeginn vereinbart?</h3><p className="mt-4 text-paper-mute">Leistungen, Zeitplan, Mitwirkung und Abnahme stehen im Vertrag. Es gibt keine pauschale Lieferfrist für jedes Projekt und keine Garantie für Google-Platzierungen oder KI-Empfehlungen. Technische SEO schafft Grundlagen; Suchdienste entscheiden selbst über ihre Ergebnisse.</p><Link href="/kontakt" className="alcor-text-link mt-4">Fragen zum eigenen Projekt stellen →</Link></div>
      </div>
      <nav aria-label="Offizielle ALCOR-Profile" className="mt-10 flex flex-wrap gap-x-7 gap-y-4 border-t border-line pt-6">
        <a href={COMPANY_PROFILE.mapsUrl} className="alcor-text-link" target="_blank" rel="noopener noreferrer">ALCOR bei Google Maps ↗</a>
        <a href={COMPANY_PROFILE.facebookUrl} className="alcor-text-link" target="_blank" rel="noopener noreferrer">ALCOR auf Facebook ↗</a>
        <Link href="/impressum" className="alcor-text-link">Anbieterangaben im Impressum →</Link>
      </nav>
    </section>
  )
}
