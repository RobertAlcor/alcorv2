import { Breadcrumbs } from '@/components/layout/breadcrumbs'
import { BentoGrid } from '@/components/sections/bento-grid'
import { ProcessSection } from '@/components/sections/process-section'
import { CtaBand } from '@/components/sections/cta-band'
import { PAGE_META } from '@/lib/seo-metadata'
export const metadata=PAGE_META.leistungen
export default function LeistungenPage(){return <><Breadcrumbs items={[{label:'Start',href:'/'},{label:'Leistungen',href:'/leistungen'}]}/><section className="container-fluid alcor-section"><p className="alcor-eyebrow">Konzept · Design · Entwicklung</p><h1 className="alcor-page-title">Eine klare Aufgabe.<br/><span className="text-signal-2">Eine passende Lösung.</span></h1><p className="alcor-intro">Vom einfachen Basis-Auftritt bis zum individuell entwickelten Web-Projekt. Ich begleite ausgewählte Vorhaben persönlich und halte Umfang, Zeitrahmen und Preis vorab schriftlich fest.</p></section><BentoGrid/><ProcessSection/><CtaBand/></>}
