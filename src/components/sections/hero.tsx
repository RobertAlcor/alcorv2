'use client'
import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, ArrowRight, Clock3 } from 'lucide-react'
import { POSITIONING } from '@/lib/positioning'

export function Hero() {
  const section = useRef<HTMLElement>(null)
  function move(event: React.PointerEvent<HTMLElement>) {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = section.current
    if (!el) return
    const box = el.getBoundingClientRect()
    el.style.setProperty('--glow-x', `${event.clientX - box.left}px`)
    el.style.setProperty('--glow-y', `${event.clientY - box.top}px`)
  }
  return (
    <section ref={section} className="alcor-hero" onPointerMove={move}>
      <div className="alcor-hero-glow" aria-hidden="true" />
      <div className="container-fluid alcor-hero-grid">
        <div className="alcor-hero-copy">
          <p className="alcor-eyebrow"><span className="alcor-dot" /> Ausgewählte Projekte · Persönliche Webentwicklung</p>
          <h1>Webdesign Wien.<br /><span>Gut aussehen ist erst der Anfang.</span></h1>
          <p className="alcor-intro">Verstehen Besucher sofort, warum sie gerade Sie anfragen sollten? Ich entwickle Websites für Unternehmen, Praxen und Dienstleister, die ihr Angebot klar erklären, Vertrauen aufbauen und den Kontakt einfach machen. Persönlich umgesetzt von Robert Alchimowicz.</p>
          <div className="alcor-actions">
            <Link className="alcor-button" href={POSITIONING.applicationHref}>Projekt bewerben <ArrowUpRight size={20} aria-hidden="true" /></Link>
            <Link className="alcor-button alcor-button-outline" href={POSITIONING.callHref}><Clock3 size={20} aria-hidden="true" />15 Minuten kennenlernen</Link>
          </div>
          <p className="alcor-note">Ausgewählte Projekte, persönlich betreut. Eine kurze Beschreibung Ihrer Idee genügt für den ersten Kontakt.</p>
          <div className="alcor-hero-footer"><span>ALCOR · Robert Alchimowicz · 1220 Wien</span><Link href="/preise">Pakete & einmalige Preise <ArrowRight size={17} aria-hidden="true" /></Link></div>
        </div>
        <Link href="/referenzen/umzugsmeister" className="alcor-hero-art" aria-label="Projekt Umzugsmeister ansehen">
          <Image src="/media/studio.webp" alt="" fill sizes="(min-width: 1100px) 50vw, 100vw" className="alcor-art-backdrop" />
          <div className="alcor-art-top"><span>Ausgewählte Arbeit / 03</span><span>ALCOR</span></div>
          <div className="alcor-device">
            <div className="alcor-device-bar" aria-hidden="true"><span>● ● ●</span><span>umzugsmeister.at</span><ArrowUpRight size={15} /></div>
            <Image src="/media/umzugsmeister.webp" alt="Startseite des Projekts Umzugsmeister mit Online-Umzugsangebot" width={1280} height={735} sizes="(min-width: 1100px) 45vw, 90vw" priority />
          </div>
          <div className="alcor-art-caption"><div><span>Konzept. Design. Entwicklung.</span><p>Vom ersten Interesse<br />zur konkreten Anfrage.</p></div><span className="alcor-circle"><ArrowUpRight aria-hidden="true" /></span></div>
        </Link>
      </div>
      <div className="alcor-trust"><div className="container-fluid">{['Direkter Ansprechpartner', 'Live-Einblick ins Projekt', 'Klarer Vertrag vor dem Start', 'Ihr Projekt. Ihr Quellcode.'].map((item,i)=><div key={item}><span>0{i+1}</span>{item}</div>)}</div></div>
    </section>
  )
}
