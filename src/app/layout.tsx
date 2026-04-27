import type { Metadata, Viewport } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { organizationSchema, websiteSchema } from '@/lib/schema'
import { SITE } from '@/lib/site'
import './globals.css'

export const viewport: Viewport = {
  themeColor: '#0A0E27',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} – ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description:
    'Handgeschriebene Webentwicklung aus Wien. Ohne WordPress, ohne Plugin-Chaos. Eine Person, 20 Jahre, voller Code-Besitz. Lieferung in 7 Tagen ab € 599,–.',
  applicationName: SITE.name,
  authors: [{ name: SITE.founder.name }],
  creator: SITE.founder.name,
  publisher: SITE.brand,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'de_AT',
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} – ${SITE.tagline}`,
    description:
      'Handgeschriebene Webentwicklung aus Wien. Ohne WordPress. Eine Person, voller Code-Besitz.',
    images: [
      {
        url: '/og-default.jpg',
        width: 1200,
        height: 630,
        alt: SITE.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.name,
    description: SITE.tagline,
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
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de-AT">
      <head>
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
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
