import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
const STEPS = [
 ['Bewerbung & Kennenlernen', 'Sie beschreiben Ihr Vorhaben. In 15 Minuten klären wir, ob Projekt, Anspruch und Zusammenarbeit passen.'],
 ['Angebot & Vertrag', 'Leistungsumfang, Zeitplan, Preis und Korrekturrunden halten wir schriftlich fest. 60 % Anzahlung sind sofort bei Auftragserteilung fällig.'],
 ['Entwicklung mit Live-Einblick', 'Sie verfolgen den aktuellen Entwicklungsstand online. Feedback sammeln wir in den vereinbarten Runden — maximal fünf, innerhalb des vereinbarten Konzepts.'],
 ['Abnahme & Übergabe', 'Wir prüfen die vereinbarten Leistungen. Nach erfolgreicher Abnahme folgen die restlichen 40 %, die abgestimmte Veröffentlichung und die Übergabe.'],
]
export function ProcessSection(){return <section className="container-fluid alcor-section" aria-labelledby="process-title"><div className="alcor-section-head"><div><p className="alcor-eyebrow">Von der Idee zur Website</p><h2 id="process-title">Klare Schritte.<br />Keine Überraschungen.</h2></div><p>Sie sehen nicht erst am Ende, woran ich arbeite. Die Live-Vorschau begleitet die Umsetzung; der Vertrag definiert den Rahmen.</p></div><ol className="alcor-process">{STEPS.map(([t,d],i)=><li key={t}><span className="alcor-process-number">0{i+1}</span><h3>{t}</h3><p>{d}</p></li>)}</ol><div className="alcor-process-note"><p>Bis zu fünf Korrekturrunden sind keine fünf Redesigns. Ein neues Konzept oder zusätzliche Funktionen werden separat vereinbart.</p><Link className="alcor-text-link" href="/preise">Pakete & Vertragsrahmen <ArrowUpRight size={18} aria-hidden="true" /></Link></div></section>}
