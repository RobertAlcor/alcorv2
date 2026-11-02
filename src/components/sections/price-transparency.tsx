import Link from 'next/link'
import { SITE } from '@/lib/site'

export function PriceTransparency() {
  const formatPrice = (amount: number) => new Intl.NumberFormat('de-AT').format(amount)
  return (
    <section className="container-fluid alcor-section alcor-legal-notes" aria-labelledby="cost-transparency-title">
      <div className="alcor-section-head">
        <div><p className="alcor-eyebrow">Vor dem Auftrag wissen, was dazugehört</p><h2 id="cost-transparency-title">Einmalig, laufend<br />oder zusätzlich?</h2></div>
        <p>Die Erstellung ist nicht dasselbe wie der spätere Betrieb. Im Angebot werden Leistungen und Zuständigkeiten getrennt festgehalten.</p>
      </div>
      <div className="alcor-notes-grid">
        <div><h3>Erstellung der Website</h3><p>Der Projektpreis umfasst die schriftlich vereinbarten Seiten und Funktionen. Die einfache Basis kostet {formatPrice(SITE.pricing.starter)} € einmalig; Business und Premium werden nach Umfang angeboten. Zusätzliche Wünsche werden vor der Umsetzung abgestimmt.</p></div>
        <div><h3>Domain und Hosting</h3><p>Domain und Hosting sind vom Erstellungspreis getrennt. Optionales Hosting ist derzeit mit {formatPrice(SITE.pricing.hostingYearly)} € pro Jahr ausgewiesen. Anbieter, Konten und der enthaltene Betreuungsumfang werden vorab geklärt. Externe Dienste oder Lizenzen können gesonderte Kosten verursachen.</p></div>
        <div><h3>Pflege und spätere Änderungen</h3><p>Eine Website kann auch nach der Veröffentlichung technische Aktualisierungen und Inhaltspflege benötigen. Zuständigkeiten und Umfang werden separat vereinbart. Zusatzarbeiten erfolgen nach Freigabe zum ausgewiesenen Satz von {formatPrice(SITE.pricing.hourlyRate)} € pro Stunde.</p></div>
        <div><h3>Inhalte und Übergabe</h3><p>Sie erhalten den vereinbarten Projektcode und die abgestimmte Übergabe. Eine Oberfläche zum Selbstbearbeiten ist nicht automatisch enthalten. Auch Texte, Bilder, Zugänge und Einweisung werden im Umfang festgehalten. Im Basis-Paket werden keine Rechtstexte erstellt; erforderliche Inhalte stellt der Auftraggeber bereit. Webentwicklung ersetzt keine rechtliche Prüfung.</p></div>
      </div>
      <aside className="mt-9 rounded-lg border border-line p-6 md:p-8" aria-label="Beispielrechnung für die Basis-Homepage">
        <h3 className="text-xl font-semibold text-paper">Beispiel für das erste Jahr</h3>
        <p className="mt-3 text-base leading-relaxed text-paper-mute">Basis-Homepage {formatPrice(SITE.pricing.starter)} € + optionales Hosting für ein Jahr {formatPrice(SITE.pricing.hostingYearly)} € = <strong className="text-paper">{formatPrice(SITE.pricing.starter + SITE.pricing.hostingYearly)} €</strong>. Domain, zusätzliche Betreuung, externe Dienste und Erweiterungen sind in dieser Rechnung nicht enthalten. Aufgrund der Kleinunternehmerregelung wird für die genannten ALCOR-Leistungen keine Umsatzsteuer verrechnet.</p>
        <Link href="/blog/website-kosten-wien-2026" className="alcor-text-link mt-4">Website-Kosten nachvollziehen →</Link>
      </aside>
    </section>
  )
}
