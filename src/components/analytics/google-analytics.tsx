'use client'

import Script from 'next/script'
import { useEffect } from 'react'
import { useConsent } from '@/components/consent/consent-provider'

const GA_ID = 'G-JHZX0FXSC0'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

export function GoogleAnalytics() {
  // In Development nicht laden - vermeidet falsche Stats
  if (process.env.NODE_ENV !== 'production') return null

  return <GoogleAnalyticsLive />
}

function GoogleAnalyticsLive() {
  const { consent, mounted } = useConsent()

  // Consent updaten wenn der User seine Wahl trifft
  useEffect(() => {
    if (!mounted) return
    if (typeof window === 'undefined') return
    if (!window.gtag) return

    window.gtag('consent', 'update', {
      analytics_storage: consent.statistics ? 'granted' : 'denied',
      ad_storage: consent.marketing ? 'granted' : 'denied',
      ad_user_data: consent.marketing ? 'granted' : 'denied',
      ad_personalization: consent.marketing ? 'granted' : 'denied',
    })
  }, [consent.statistics, consent.marketing, mounted])

  return (
    <>
      {/* Vor GA-Script: Default-Consent auf 'denied' setzen
          (Google Consent Mode v2). GA loadet, aber speichert nichts
          bis User zustimmt. */}
      <Script id="ga-consent-default" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            wait_for_update: 500
          });
        `}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            anonymize_ip: true
          });
        `}
      </Script>
    </>
  )
}
