import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Check } from 'lucide-react'

export function SelectionSection() {
  return (
    <section
      className="container-fluid alcor-section alcor-selection"
      aria-labelledby="selection-title"
    >
      <div className="alcor-selection-image">
        <Image
          src="/media/studio.webp"
          alt="Konzeptionelle Studioaufnahme: Bildschirm und Arbeitsfläche für die Website-Gestaltung"
          fill
          sizes="(min-width: 1000px) 45vw, 95vw"
          className="object-cover"
        />
        <span className="alcor-image-label">Raum für gute Ideen.</span>
      </div>
      <div>
        <p className="alcor-eyebrow">Persönliche Zusammenarbeit</p>
        <h2 id="selection-title">
          Ihr Projekt.
          <br />
          <span className="text-signal-2">Direkt betreut.</span>
        </h2>
        <p className="alcor-intro">
          Ich betreue nur so viele Projekte parallel, dass Konzept, Gestaltung
          und Entwicklung persönlich bleiben. Ihre Idee muss noch nicht fertig
          sein. Wichtig ist eine klare Aufgabe, die wir gemeinsam lösen können.
        </p>
        <ul className="alcor-selection-points">
          {[
            'Ihr Angebot soll verständlicher werden – nicht nur anders aussehen.',
            'Sie wünschen einen direkten Ansprechpartner und klare Empfehlungen.',
            'Wir stimmen Umfang, Budget und Feedback ab, bevor die Entwicklung startet.',
          ].map((text) => (
            <li key={text}>
              <Check size={21} aria-hidden="true" />
              {text}
            </li>
          ))}
        </ul>
        <Link href="/bewerbung" className="alcor-button">
          Projekt unverbindlich anfragen
          <ArrowUpRight size={20} aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
