import type {Metadata} from 'next'
import {SITE} from './site'
export function pageMetadata(args:{title:string;description:string;path:string;keywords?:string[];ogImage?:string}):Metadata {
 const image=args.ogImage||`${SITE.url}/opengraph-image`
 return {title:args.title,description:args.description,alternates:{canonical:args.path},openGraph:{type:'website',locale:'de_AT',url:`${SITE.url}${args.path}`,siteName:SITE.name,title:args.title,description:args.description,images:[{url:image,width:1200,height:630,alt:args.title}]},twitter:{card:'summary_large_image',title:args.title,description:args.description,images:[image]}}
}
export const PAGE_META={
 home:pageMetadata({title:'Webdesign Wien für ausgewählte Projekte | ALCOR',description:'Individuelle Websites aus Wien. Persönliche Konzeption und Entwicklung für ausgewählte Projekte. Basis-Homepage 599 €, Business und Premium nach Vereinbarung.',path:'/'}),
 leistungen:pageMetadata({title:'Webdesign, Relaunch & technische SEO Wien | ALCOR',description:'Konzeption, Gestaltung, Entwicklung und technische SEO. Direkte Zusammenarbeit, klarer Vertrag und Live-Vorschau. Projekt bei ALCOR bewerben.',path:'/leistungen'}),
 websiteErstellung:pageMetadata({title:'Website erstellen lassen in Wien | Basis, Business & Premium',description:'Einfache Basis-Homepage für 599 €. Business und Premium individuell geplant. Einmalige Projektpreise, klarer Vertrag und persönliche Entwicklung aus Wien.',path:'/leistungen/website-erstellung'}),
 relaunch:pageMetadata({title:'Website-Relaunch Wien | Neuer Auftritt mit ALCOR',description:'Struktur, Inhalte und Gestaltung Ihrer Website neu denken. Persönliche Umsetzung mit Live-Vorschau und klar vereinbartem Umfang.',path:'/leistungen/relaunch'}),
 seoWien:pageMetadata({title:'Technische SEO Wien | Struktur & Sichtbarkeit | ALCOR',description:'Technische Suchmaschinenoptimierung: verständliche Inhalte, interne Verlinkung, Metadaten und Performance. Nachvollziehbare Maßnahmen statt Ranking-Garantien.',path:'/leistungen/seo-wien'}),
 preise:pageMetadata({title:'Webdesign-Pakete | Basis 599 €, Business & Premium | ALCOR',description:'Einmalige Projektpreise ohne Umsatzsteuer. Basis-Homepage 599 €, Business und Premium nach Vereinbarung. 60 % Anzahlung, 40 % nach erfolgreicher Abnahme.',path:'/preise'}),
 referenzen:pageMetadata({title:'Ausgewählte Webdesign-Projekte & Anwendungen | ALCOR',description:'Einblicke in Psychotherapie Hrdlicka, schmerzfrei.wien, Umzugsmeister, TAKT und weitere Projekte. Mit Screenshots, Aufgaben und Live-Links.',path:'/referenzen'}),
 uebermich:pageMetadata({title:'Robert Alchimowicz | Unabhängige Webentwicklung Wien',description:'Die Person hinter ALCOR. Persönliche Konzeption, Gestaltung und Entwicklung für ausgewählte Projekte. Direkte Zusammenarbeit aus Wien.',path:'/ueber-mich'}),
 blog:pageMetadata({title:'ALCOR Journal | Webdesign, SEO & Entwicklung',description:'Gedanken und Fachbeiträge zu Websites, Gestaltung, technischer SEO und Zusammenarbeit. Das Journal von Webdesign Alcor aus Wien.',path:'/blog'}),
 termin:pageMetadata({title:'15 Minuten: Passen wir zusammen? | ALCOR',description:'Kostenloses, unverbindliches Kennenlernen mit Robert Alchimowicz. Projekt, Anspruch und Zusammenarbeit persönlich besprechen.',path:'/termin'}),
 kontakt:pageMetadata({title:'Kontakt & Projektanfrage | Webdesign Alcor Wien',description:'Direkter Kontakt zu ALCOR: Telefon, E-Mail oder Formular. Beschreiben Sie Ihr Vorhaben oder vereinbaren Sie ein 15-Minuten-Kennenlernen.',path:'/kontakt'}),
 impressum:pageMetadata({title:'Impressum',description:'Angaben zum Anbieter Webdesign Alcor – Robert Alchimowicz, Wien.',path:'/impressum'}),
 datenschutz:pageMetadata({title:'Datenschutzerklärung',description:'Informationen zur Verarbeitung personenbezogener Daten bei Webdesign Alcor.',path:'/datenschutz'}),
} as const
