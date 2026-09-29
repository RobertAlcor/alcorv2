'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'
import { MobileMenu } from './mobile-menu'
const nav=[['Leistungen','/leistungen'],['Projekte','/referenzen'],['Pakete & Preise','/preise'],['Über mich','/ueber-mich'],['Journal','/blog']]
export function Header(){const path=usePathname();return <header className="alcor-header"><div className="container-fluid alcor-header-inner"><Link href="/" className="alcor-brand" aria-label="ALCOR – Startseite"><span><b>A</b>LCOR</span><small>Independent Web Development</small></Link><nav aria-label="Hauptnavigation" className="alcor-navigation">{nav.map(([label,href])=><Link href={href!} key={href} aria-current={path.startsWith(href!)?'page':undefined}>{label}</Link>)}</nav><div className="alcor-header-actions"><Link href="/bewerbung" className="alcor-button">Projekt bewerben <ArrowUpRight size={18} aria-hidden="true"/></Link><MobileMenu/></div></div></header>}
