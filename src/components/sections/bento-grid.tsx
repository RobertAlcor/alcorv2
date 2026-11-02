import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
const items = [
 {href:'/leistungen/website-erstellung', title:'Ihr Angebot auf den Punkt bringen.', label:'01 / Website-Erstellung', image:'/media/visual/design', text:'Sie starten neu oder möchten endlich professionell auftreten? Ihre Website soll zeigen, für wen Sie arbeiten, was Sie anbieten und wie Interessenten Sie erreichen.'},
 {href:'/leistungen/relaunch', title:'Gute Leistungen. Veraltete Website?', label:'02 / Website-Relaunch', image:'/media/visual/strategy', text:'Ihr Unternehmen hat sich weiterentwickelt, die Website nicht? Wir prüfen, was bleiben kann und wo Inhalte, Gestaltung oder Kontaktwege eine neue Richtung brauchen.'},
 {href:'/leistungen/seo-wien', title:'Wird Ihr Angebot bei Google gefunden?', label:'03 / Technische SEO', image:'/media/visual/technology', text:'Ich prüfe technische Hindernisse und die Verständlichkeit Ihrer Inhalte. Daraus entstehen priorisierte Verbesserungen statt einer beliebigen Liste von SEO-Aufgaben.'},
]
export function BentoGrid() {
 return <section className="alcor-section alcor-surface" aria-labelledby="services-title"><div className="container-fluid">
  <div className="alcor-section-head"><div><p className="alcor-eyebrow">Leistungen</p><h2 id="services-title">Was soll Ihre Website<br />für Sie leisten?</h2></div><p>Eine neue Website, ein sinnvoller Relaunch oder bessere Auffindbarkeit: Wir beginnen bei Ihrer Aufgabe. Sie sprechen direkt mit der Person, die Ihre Website entwickelt.</p></div>
  <div className="alcor-service-grid">{items.map(item=><Link className="alcor-service-card" key={item.href} href={item.href}><div className="alcor-service-image"><Image src={item.image} alt="" fill sizes="(min-width: 900px) 32vw, 95vw" unoptimized /></div><div className="alcor-service-body"><p className="alcor-eyebrow">{item.label}</p><h3>{item.title}</h3><p>{item.text}</p><span className="alcor-text-link">Leistung kennenlernen <ArrowUpRight size={20} aria-hidden="true" /></span></div></Link>)}</div>
 </div></section>
}
