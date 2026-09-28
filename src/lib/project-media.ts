import type { Case } from './cases'
export function projectScreenshot(project:Case):string|undefined {
 if(project.slug==='umzugsmeister')return '/media/umzugsmeister.webp'
 if(project.slug==='alcorleads')return '/media/alcorleads-dashboard-2026.webp'
 return project.screenshot
}
export const LEADS_GALLERY=[
 {src:'/media/alcorleads-dashboard-2026.webp',label:'Dashboard – Kontakte und Aktivitäten im Überblick',width:800,height:674},
 {src:'/media/alcorleads-suche.webp',label:'Neue Suche – Kriterien und Suchauftrag erfassen',width:720,height:411},
 {src:'/media/alcorleads-archiv.webp',label:'Audit-Archiv – gespeicherte Auswertungen wiederfinden',width:960,height:412},
] as const
