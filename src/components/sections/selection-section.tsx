import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Check } from 'lucide-react'
export function SelectionSection() {
 return <section className="container-fluid alcor-section alcor-selection" aria-labelledby="selection-title">
  <div className="alcor-selection-image"><Image src="/media/studio.webp" alt="Konzeptionelle Studioaufnahme: Bildschirm und Arbeitsfläche für die Website-Gestaltung" fill sizes="(min-width: 1000px) 45vw, 95vw" className="object-cover" /><span className="alcor-image-label">Raum für gute Ideen.</span></div>
  <div><p className="alcor-eyebrow">Zusammenarbeit, bewusst gewählt</p><h2 id="selection-title">Ausgewählte Projekte.<br /><span className="text-signal-2">Persönlich betreut.</span></h2><p className="alcor-intro">Ich wähle Projekte bewusst aus, damit ich Konzept, Gestaltung und Entwicklung selbst betreuen kann. Ihre Idee muss noch nicht fertig sein. Wichtig ist, dass wir gemeinsam eine klare Aufgabe lösen.</p>
  <ul className="alcor-selection-points">{['Ihr Angebot soll verständlicher werden – nicht nur anders aussehen.', 'Sie wünschen einen direkten Ansprechpartner und klare Empfehlungen.', 'Wir stimmen Umfang, Budget und Feedback ab, bevor die Entwicklung startet.'].map(t=><li key={t}><Check size={21} aria-hidden="true" />{t}</li>)}</ul>
  <Link href="/bewerbung" className="alcor-button">Erzählen Sie mir von Ihrem Projekt <ArrowUpRight size={20} aria-hidden="true" /></Link></div>
 </section>
}
