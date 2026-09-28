import Image from 'next/image'
import type { Case } from '@/lib/cases'
import { projectScreenshot } from '@/lib/project-media'
export function CaseMockup({caseData,large=false}:{caseData:Case;large?:boolean}){
 const src=projectScreenshot(caseData)
 return <div className={`relative w-full overflow-hidden rounded-lg border border-line bg-deep ${large?'aspect-[16/10]':'aspect-[4/3]'}`}>
  <div aria-hidden="true" className="absolute inset-x-0 top-0 flex h-9 items-center gap-2 border-b border-line bg-deep-2 px-3"><span className="text-xs tracking-widest text-paper-dim">● ● ●</span><span className="ml-3 truncate font-mono text-[11px] text-paper-mute">{caseData.liveUrl.replace('https://','')}</span></div>
  <div className="absolute inset-x-0 bottom-0 top-9 overflow-hidden">{src?<Image src={src} alt={`Website-Ansicht von ${caseData.client}`} fill sizes={large?'(min-width:1200px) 1100px,95vw':'(min-width:1280px) 31vw,(min-width:768px) 47vw,95vw'} priority={large} className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transform-none"/>:<div className="flex h-full items-center justify-center text-7xl font-semibold text-white" style={{background:caseData.brandColor}}><span aria-label={caseData.client}>{caseData.initials}</span></div>}</div>
 </div>
}
