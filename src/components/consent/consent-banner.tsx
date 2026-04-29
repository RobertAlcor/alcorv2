'use client'

import Link from 'next/link'
import { useConsent } from './consent-provider'

export function ConsentBanner() {
  const { mounted, hasMadeChoice, acceptAll, rejectAll, openSettings } =
    useConsent()

  // Vor Mount: nichts rendern (SSR mismatch verhindern)
  if (!mounted) return null
  // Nach Entscheidung: Banner verschwindet
  if (hasMadeChoice) return null

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-banner-title"
      className="fixed bottom-0 inset-x-0 z-40 px-4 pb-4 sm:px-6 sm:pb-6 pointer-events-none"
    >
      <div className="pointer-events-auto max-w-3xl mx-auto bg-deep-2 border border-line rounded-sm shadow-2xl p-5 sm:p-6">
        <h2
          id="consent-banner-title"
          className="font-serif text-lg sm:text-xl text-paper mb-2"
        >
          Cookies & Privatsphäre
        </h2>
        <p className="text-sm text-paper-mute leading-relaxed mb-5">
          Diese Seite nutzt nur technisch notwendige Cookies. Mit Ihrer
          Zustimmung lade ich zusätzlich Google Analytics, um anonymisierte
          Nutzungsstatistiken zu sammeln. Sie können Ihre Wahl jederzeit ändern.{' '}
          <Link
            href="/datenschutz"
            className="text-signal-2 hover:text-signal underline underline-offset-2"
          >
            Mehr in der Datenschutzerklärung
          </Link>
          .
        </p>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button
            type="button"
            onClick={acceptAll}
            className="min-h-[44px] px-5 py-2.5 inline-flex items-center justify-center bg-signal text-deep text-sm font-medium rounded-sm hover:bg-signal-2 transition-colors"
          >
            Alle akzeptieren
          </button>
          <button
            type="button"
            onClick={rejectAll}
            className="min-h-[44px] px-5 py-2.5 inline-flex items-center justify-center bg-transparent text-paper border border-paper-dim/40 text-sm font-medium rounded-sm hover:bg-deep transition-colors"
          >
            Nur notwendige
          </button>
          <button
            type="button"
            onClick={openSettings}
            className="min-h-[44px] px-5 py-2.5 inline-flex items-center justify-center text-paper-mute text-sm hover:text-paper transition-colors sm:ml-auto"
          >
            Einstellungen
          </button>
        </div>
      </div>
    </div>
  )
}
