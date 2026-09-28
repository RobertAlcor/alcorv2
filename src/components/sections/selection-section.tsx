import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Check } from 'lucide-react'
export function SelectionSection() {
 return <section className="container-fluid alcor-section alcor-selection" aria-labelledby="selection-title">
  <div className="alcor-selection-image"><Image src="/media/studio.webp" alt="Konzeptionelle Studioaufnahme: Bildschirm und Arbeitsfläche für die Website-Gestaltung" fill sizes="(min-width: 1000px) 45vw, 95vw" className="object-cover" /><span className="alcor-image-label">Raum für gute Ideen.</span></div>
  <div><p className="alcor-eyebrow">Zusammenarbeit, bewusst gewählt</p><h2 id="selection-title">Nicht für jedes Projekt.<br /><span className="text-signal-2">Vielleicht für Ihres.</span></h2><p className="alcor-intro">Ich arbeite nur an ausgewählten Projekten, die ich persönlich betreue. Ihre Bewerbung ist der Anfang — nicht automatisch eine Beauftragung.</p>
  <ul className="alcor-selection-points">{['Eine konkrete Aufgabe statt austauschbarer Oberfläche.', 'Direkte Entscheidungen und konstruktives Feedback.', 'Ein realistischer Umfang, ein klarer Vertrag und gegenseitiges Vertrauen.'].map(t=><li key={t}><Check size={21} aria-hidden="true" />{t}</li>)}</ul>
  <Link href="/bewerbung" className="alcor-button">Erzählen Sie mir von Ihrem Projekt <ArrowUpRight size={20} aria-hidden="true" /></Link></div>
 </section>
}
