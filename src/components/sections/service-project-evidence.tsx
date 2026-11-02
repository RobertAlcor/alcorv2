import Link from 'next/link'

const PROJECTS = [
  { href: '/referenzen/massagewelt-wien', name: 'Massagewelt Wien', detail: 'Praxis-Website: getrennte Leistungsseiten, persönliche Vorstellung, Preisliste und direkte Kontaktmöglichkeiten.' },
  { href: '/referenzen/cleankos', name: 'CleanKos', detail: 'Unternehmenswebsite: sechs Bereiche für Reinigung und Hausbetreuung, mit eigenen Leistungsseiten und Kontaktwegen.' },
  { href: '/referenzen/etikettendruck24', name: 'Etikettendruck24', detail: 'Produktwebsite: Material- und Druckdateninformationen mit Bestelllinks zum vorhandenen PRINTSHOP-Onlineshop.' },
] as const

export function ServiceProjectEvidence() {
  return (
    <section className="mt-12 border-t border-line pt-9" aria-labelledby="service-project-evidence">
      <h3 id="service-project-evidence" className="text-2xl font-semibold text-paper">Wie sieht das in konkreten Projekten aus?</h3>
      <p className="mt-4 max-w-4xl text-paper-mute">Drei unterschiedliche Aufgaben aus dem Portfolio. Die Projektseiten zeigen die umgesetzten Funktionen, Original-Screenshots und den jeweiligen Live-Auftritt.</p>
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {PROJECTS.map((project) => <div key={project.href} className="rounded-lg border border-line p-6"><Link href={project.href} className="alcor-text-link">{project.name} →</Link><p className="mt-3 text-paper-mute">{project.detail}</p></div>)}
      </div>
    </section>
  )
}
