'use client'

import { Cookie } from 'lucide-react'
import { useConsent } from '@/components/consent/consent-provider'

export function CookieSettingsLink() {
  const { openSettings } = useConsent()

  return (
    <button
      type="button"
      onClick={openSettings}
      className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 bg-signal/15 text-signal-2 border border-signal/30 text-sm font-medium rounded-sm hover:bg-signal/25 transition-colors"
    >
      <Cookie className="w-4 h-4" strokeWidth={1.75} />
      Cookie-Einstellungen ändern
    </button>
  )
}
