import type { Metadata, Viewport } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { SkipLink } from '@/components/layout/skip-link'
import { FabStack } from '@/components/layout/fab-stack'
import { AnimatedBackground } from '@/components/layout/animated-background'
import { SitePathways } from '@/components/layout/site-pathways'
import { ConsentMount } from '@/components/consent/consent-mount'
import { GoogleAnalytics } from '@/components/analytics/google-analytics'
import { organizationSchema, websiteSchema } from '@/lib/schema'
import { SITE } from '@/lib/site'
import './globals.css'
import './exclusive.css'
import './readability.css'

export const viewport: Viewport = {
  themeColor: '#161618',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Webdesign & IT-Service Wien | ALCOR',
    template: '%s',
  },
  description:
    'Webdesign, technische SEO und persönliche PC-Hilfe in Wien: Websites, Windows-Installation, Einrichtung und Fernwartung mit klar vereinbartem Umfang.',
  applicationName: SITE.name,
  authors: [{ name: SITE.founder.name, url: SITE.url }],
  creator: SITE.founder.name,
  publisher: SITE.brand,
  category: 'Webdesign und IT-Service',
  openGraph: {
    type: 'website',
    locale: 'de_AT',
    url: SITE.url,
    siteName: SITE.name,
    title: 'Webdesign & IT-Service Wien | ALCOR',
    description:
      'Persönliche Webentwicklung, technische SEO und PC-Hilfe in Wien — direkt, transparent und ohne Hardware-Reparaturen.',
  },
  twitter: { card: 'summary_large_image' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: { icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }] },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de-AT" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "try{localStorage.removeItem('alcor-theme')}catch(e){}",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
        />
      </head>
      <body suppressHydrationWarning>
        <AnimatedBackground />
        <SkipLink />
        <ConsentMount>
          <GoogleAnalytics />
          <Header />
          <main id="main">{children}</main>
          <SitePathways />
          <Footer />
          <FabStack />
        </ConsentMount>
      </body>
    </html>
  )
}
