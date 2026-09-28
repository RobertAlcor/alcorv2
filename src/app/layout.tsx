import type {Metadata,Viewport} from 'next'
import {Header} from '@/components/layout/header'
import {Footer} from '@/components/layout/footer'
import {SkipLink} from '@/components/layout/skip-link'
import {FabStack} from '@/components/layout/fab-stack'
import {AnimatedBackground} from '@/components/layout/animated-background'
import {ConsentMount} from '@/components/consent/consent-mount'
import {GoogleAnalytics} from '@/components/analytics/google-analytics'
import {organizationSchema,websiteSchema} from '@/lib/schema'
import {SITE} from '@/lib/site'
import './globals.css'
import './exclusive.css'
export const viewport:Viewport={themeColor:'#161618',width:'device-width',initialScale:1}
export const metadata:Metadata={metadataBase:new URL(SITE.url),title:{default:'Webdesign Wien für ausgewählte Projekte | ALCOR',template:'%s'},description:'Individuelle Websites aus Wien. Persönliche Entwicklung, klarer Vertrag und Live-Vorschau für ausgewählte Projekte. Einfache Basis-Homepage 599 €.',applicationName:SITE.name,authors:[{name:SITE.founder.name,url:SITE.url}],creator:SITE.founder.name,publisher:SITE.brand,category:'Webdesign',openGraph:{type:'website',locale:'de_AT',url:SITE.url,siteName:SITE.name,title:'Ausgewählte Projekte. Außergewöhnliche Websites. | ALCOR',description:'Persönliche Webentwicklung aus Wien. Kein Standard.'},twitter:{card:'summary_large_image'},robots:{index:true,follow:true,googleBot:{index:true,follow:true,'max-video-preview':-1,'max-image-preview':'large','max-snippet':-1}},icons:{icon:[{url:'/favicon.svg',type:'image/svg+xml'}]}}
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="de-AT" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:"try{localStorage.removeItem('alcor-theme')}catch(e){}"}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(organizationSchema())}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(websiteSchema())}}/></head><body suppressHydrationWarning><AnimatedBackground/><SkipLink/><ConsentMount><GoogleAnalytics/><Header/><main id="main">{children}</main><Footer/><FabStack/></ConsentMount></body></html>}
