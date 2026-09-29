import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
export const FEATURED_PROJECTS = [
 {slug:'psychotherapie-hrdlicka', name:'Psychotherapie Hrdlicka', type:'Praxis-Website · Mödling', image:'/referenzen/psychotherapie-hrdlicka.webp', note:'Ein ruhiger, klarer Einstieg in ein sensibles Thema.'},
 {slug:'schmerzfrei-wien', name:'schmerzfrei.wien', type:'Praxis & Terminbuchung · Wien', image:'/referenzen/schmerzfrei-wien.webp', note:'Behandlungen verstehen und den nächsten Schritt finden.'},
 {slug:'umzugsmeister', name:'Umzugsmeister', type:'Dienstleistung · Wien', image:'/media/umzugsmeister.webp', note:'Leistungen zeigen und strukturiert zum Angebot führen.'},
 {slug:'buero-reinigung', name:'TAKT', type:'Eigenes Produkt · Branchensoftware', image:'/referenzen/buero-reinigung.webp', note:'Digitale Abläufe für Reinigungsbetriebe statt Insellösungen.'},
] as const
export function SelectedProjects() {
 return <section className="container-fluid alcor-section" id="projekte" aria-labelledby="projects-title">
  <div className="alcor-section-head"><div><p className="alcor-eyebrow">Ausgewählte Projekte</p><h2 id="projects-title">Nicht behaupten.<br /><span className="text-signal-2">Zeigen.</span></h2></div><div><p>Unterschiedliche Aufgaben. Eigenständige Lösungen. Hier sehen Sie, was aus einer Zusammenarbeit entstehen kann.</p><Link className="alcor-text-link" href="/referenzen">Alle Projekte ansehen <ArrowRight size={19} aria-hidden="true" /></Link></div></div>
  <div className="alcor-project-grid">{FEATURED_PROJECTS.map((p,i)=><article className="alcor-project" key={p.slug}>
   <Link href={`/referenzen/${p.slug}`} className="alcor-project-image" aria-label={`${p.name}: Projekt ansehen`}><Image src={p.image} alt={`Website-Ansicht von ${p.name}`} fill sizes="(min-width: 1500px) 24vw, (min-width: 700px) 48vw, 95vw" className="object-cover object-top" /><span className="alcor-project-number">0{i+1}</span><span className="alcor-circle"><ArrowUpRight aria-hidden="true" /></span></Link>
   <p className="alcor-project-type">{p.type}</p><h3><Link href={`/referenzen/${p.slug}`}>{p.name}</Link></h3><p>{p.note}</p>
  </article>)}</div>
 </section>
}
