import {Breadcrumbs} from '@/components/layout/breadcrumbs'
import {CaseCard} from '@/components/sections/case-card'
import {CtaBand} from '@/components/sections/cta-band'
import {CASES} from '@/lib/cases'
import {PAGE_META} from '@/lib/seo-metadata'
export const metadata=PAGE_META.referenzen
export default function ReferenzenPage(){return <><Breadcrumbs items={[{label:'Start',href:'/'},{label:'Projekte',href:'/referenzen'}]}/><section className="container-fluid alcor-section"><div className="alcor-section-head"><div><p className="alcor-eyebrow">Websites & Anwendungen</p><h1 className="alcor-page-title">Eigenständige Aufgaben.<br/><span className="text-signal-2">Persönlich umgesetzt.</span></h1></div><p>Einblicke in Kundenprojekte und eigene Produkte. Die Screenshots zeigen konkrete Oberflächen; die Projektseiten erklären den jeweiligen Ansatz.</p></div><div className="grid md:grid-cols-2 xl:grid-cols-3 gap-7">{CASES.map(c=><CaseCard key={c.slug} caseData={c}/>)}</div></section><CtaBand/></>}
