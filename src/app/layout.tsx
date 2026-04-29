import type { Metadata, Viewport } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { SkipLink } from '@/components/layout/skip-link'
import { FabStack } from '@/components/layout/fab-stack'
import { PromoModal } from '@/components/layout/promo-modal'
import { AnimatedBackground } from '@/components/layout/animated-background'
import { ConsentMount } from '@/components/consent/consent-mount'
import { GoogleAnalytics } from '@/components/analytics/google-analytics'
import { organizationSchema, websiteSchema } from '@/lib/schema'
import { SITE } from '@/lib/site'
import './globals.css'

export const viewport: Viewport = {
  themeColor: '#161618',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    // SEO-optimierter Default-Title mit Hauptkeyword "Webdesign Wien".
    // Wird genutzt wenn eine Page keinen eigenen Title definiert.
    default: 'Webdesign Wien | Webagentur ohne WordPress | Webdesign Alcor',
    template: `%s · ${SITE.name}`,
  },
  description:
    'Webdesign Wien — handgeschriebene Websites ohne WordPress, ohne Plugin-Chaos. Eine Person, 10+ Jahre Erfahrung, voller Code-Besitz. Lieferung in 7 Tagen ab €599.',
  keywords: [
    ...SITE.seo.primaryKeywords,
    ...SITE.seo.secondaryKeywords,
  ].join(', '),
  applicationName: SITE.name,
  authors: [{ name: SITE.founder.name, url: SITE.url }],
  creator: SITE.founder.name,
  publisher: SITE.brand,
  category: 'Webdesign',
  alternates: {
    canonical: '/',
    languages: {
      'de-AT': '/',
      'x-default': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'de_AT',
    url: SITE.url,
    siteName: SITE.name,
    title: 'Webdesign Wien | Webagentur ohne WordPress | Webdesign Alcor',
    description:
      'Handgeschriebene Websites aus Wien — schnell, sicher, ohne Plugin-Chaos. Eine Person, 10+ Jahre Erfahrung. Lieferung in 7 Tagen ab €599.',
    // Bilder werden automatisch aus opengraph-image.tsx geladen
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Webdesign Wien | Webdesign Alcor',
    description:
      'Handgeschriebene Websites aus Wien. Ohne WordPress. Lieferung in 7 Tagen ab €599.',
  },
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
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
  // Geo-Tags für lokales SEO
  other: {
    'geo.region': 'AT-9',
    'geo.placename': 'Wien',
    'geo.position': `${SITE.address.geo.lat};${SITE.address.geo.lng}`,
    ICBM: `${SITE.address.geo.lat}, ${SITE.address.geo.lng}`,
  },
}

function CleanupScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `try{localStorage.removeItem('alcor-theme')}catch(e){}`,
      }}
    />
  )
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de-AT" suppressHydrationWarning>
      <head>
        <CleanupScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema()),
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <AnimatedBackground />
        <SkipLink />
        <ConsentMount>
          <GoogleAnalytics />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <FabStack />
          <PromoModal />
        </ConsentMount>
      </body>
    </html>
  )
}
