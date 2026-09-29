import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
const items = [
 {href:'/leistungen/website-erstellung', title:'Eine Website, die zu Ihnen passt.', label:'01 / Website-Erstellung', image:'/media/visual/design', text:'Vom einfachen Basis-Auftritt bis zum eigenständigen Unternehmensdesign. Umfang und Anspruch bestimmen die Lösung.'},
 {href:'/leistungen/relaunch', title:'Ein neuer Auftritt. Mit klarer Richtung.', label:'02 / Website-Relaunch', image:'/media/visual/strategy', text:'Positionierung, Inhalte und Gestaltung gemeinsam überarbeiten — nicht nur die Oberfläche austauschen.'},
 {href:'/leistungen/seo-wien', title:'Verstanden werden. Gefunden werden.', label:'03 / Technische SEO', image:'/media/visual/technology', text:'Klare Inhalte, eine sinnvolle Seitenstruktur und technische Grundlagen für Suchmaschinen. Ohne Ranking-Versprechen.'},
]
export function BentoGrid() {
 return <section className="alcor-section alcor-surface" aria-labelledby="services-title"><div className="container-fluid">
  <div className="alcor-section-head"><div><p className="alcor-eyebrow">Leistungen</p><h2 id="services-title">Die passende Lösung.<br />Nicht einfach mehr Website.</h2></div><p>Design, Entwicklung und technische SEO aus einer Hand. Ich arbeite direkt mit Ihnen — ohne wechselnde Ansprechpartner.</p></div>
  <div className="alcor-service-grid">{items.map(item=><Link className="alcor-service-card" key={item.href} href={item.href}><div className="alcor-service-image"><Image src={item.image} alt="" fill sizes="(min-width: 900px) 32vw, 95vw" unoptimized /></div><div className="alcor-service-body"><p className="alcor-eyebrow">{item.label}</p><h3>{item.title}</h3><p>{item.text}</p><span className="alcor-text-link">Leistung kennenlernen <ArrowUpRight size={20} aria-hidden="true" /></span></div></Link>)}</div>
 </div></section>
}
