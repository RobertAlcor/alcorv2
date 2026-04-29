'use client'

import { Cookie } from 'lucide-react'
import { useConsent } from './consent-provider'

export function ConsentButton() {
  const { mounted, hasMadeChoice, openSettings } = useConsent()

  // Nur sichtbar wenn User bereits eine Wahl getroffen hat
  // (vorher zeigt der Banner ja schon Buttons)
  if (!mounted || !hasMadeChoice) return null

  return (
    <button
      type="button"
      onClick={openSettings}
      aria-label="Cookie-Einstellungen ändern"
      className="fixed bottom-4 left-4 z-30 w-11 h-11 inline-flex items-center justify-center bg-deep-2 border border-line rounded-full shadow-lg text-paper-mute hover:text-signal-2 hover:border-signal-2/40 transition-colors"
    >
      <Cookie className="w-5 h-5" strokeWidth={1.75} />
    </button>
  )
}
