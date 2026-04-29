/**
 * Cookie-Consent Storage und Types.
 * SSR-safe: alle storage-funktionen prüfen window.
 */

export type ConsentCategory = 'necessary' | 'statistics' | 'marketing'

export type ConsentState = {
  necessary: true // immer true, nicht abwählbar
  statistics: boolean
  marketing: boolean
}

export type StoredConsent = {
  state: ConsentState
  timestamp: number
  version: number
}

/**
 * Wenn das Schema sich grundlegend ändert, version erhöhen.
 * Banner taucht dann bei allen Usern wieder auf.
 */
export const CONSENT_VERSION = 1

export const STORAGE_KEY = 'alcor-consent-v1'

/** 12 Monate, danach Banner wieder zeigen */
export const CONSENT_TTL_MS = 365 * 24 * 60 * 60 * 1000

export const DEFAULT_CONSENT: ConsentState = {
  necessary: true,
  statistics: false,
  marketing: false,
}

export const ACCEPT_ALL_CONSENT: ConsentState = {
  necessary: true,
  statistics: true,
  marketing: true,
}

export function getStoredConsent(): StoredConsent | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as StoredConsent
    // Version-Check
    if (parsed.version !== CONSENT_VERSION) return null
    // Expiry-Check
    if (Date.now() - parsed.timestamp > CONSENT_TTL_MS) return null
    // Schema validieren
    if (
      typeof parsed.state?.necessary !== 'boolean' ||
      typeof parsed.state?.statistics !== 'boolean' ||
      typeof parsed.state?.marketing !== 'boolean'
    ) {
      return null
    }
    return parsed
  } catch {
    return null
  }
}

export function saveConsent(state: ConsentState): void {
  if (typeof window === 'undefined') return
  try {
    const stored: StoredConsent = {
      state: { ...state, necessary: true },
      timestamp: Date.now(),
      version: CONSENT_VERSION,
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
  } catch {
    /* ignore */
  }
}

export function clearConsent(): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    /* ignore */
  }
}

export const CONSENT_CATEGORY_INFO: Record<
  ConsentCategory,
  { label: string; description: string; required: boolean }
> = {
  necessary: {
    label: 'Notwendig',
    description:
      'Technisch notwendige Cookies und lokaler Speicher für Funktionen wie Login (Admin-Bereich), Kontaktformular-Spam-Schutz und Cookie-Einstellungen. Können nicht deaktiviert werden.',
    required: true,
  },
  statistics: {
    label: 'Statistik',
    description:
      'Hilft mir zu verstehen, wie Besucher die Seite nutzen. Anonymisierte Reichweiten- und Nutzungsdaten via Google Analytics. Werden nur mit Ihrer Einwilligung geladen.',
    required: false,
  },
  marketing: {
    label: 'Marketing',
    description:
      'Aktuell nicht im Einsatz. Reserviert für mögliche zukünftige Werbe- oder Remarketing-Tools.',
    required: false,
  },
}
