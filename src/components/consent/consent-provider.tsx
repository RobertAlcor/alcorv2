'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react'
import {
  type ConsentState,
  DEFAULT_CONSENT,
  ACCEPT_ALL_CONSENT,
  getStoredConsent,
  saveConsent,
} from '@/lib/consent'

type ConsentContextValue = {
  consent: ConsentState
  hasMadeChoice: boolean
  mounted: boolean
  isModalOpen: boolean
  setConsent: (state: ConsentState) => void
  acceptAll: () => void
  rejectAll: () => void
  openSettings: () => void
  closeSettings: () => void
}

const ConsentContext = createContext<ConsentContextValue | null>(null)

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsentState] = useState<ConsentState>(DEFAULT_CONSENT)
  const [hasMadeChoice, setHasMadeChoice] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false)

  // Beim Mount: Stored Consent laden
  useEffect(() => {
    const stored = getStoredConsent()
    if (stored) {
      setConsentState(stored.state)
      setHasMadeChoice(true)
    }
    setMounted(true)
  }, [])

  const setConsent = useCallback((state: ConsentState) => {
    setConsentState(state)
    setHasMadeChoice(true)
    saveConsent(state)
  }, [])

  const acceptAll = useCallback(() => {
    setConsent(ACCEPT_ALL_CONSENT)
  }, [setConsent])

  const rejectAll = useCallback(() => {
    setConsent({ ...DEFAULT_CONSENT })
  }, [setConsent])

  const openSettings = useCallback(() => setModalOpen(true), [])
  const closeSettings = useCallback(() => setModalOpen(false), [])

  return (
    <ConsentContext.Provider
      value={{
        consent,
        hasMadeChoice,
        mounted,
        isModalOpen,
        setConsent,
        acceptAll,
        rejectAll,
        openSettings,
        closeSettings,
      }}
    >
      {children}
    </ConsentContext.Provider>
  )
}

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext)
  if (!ctx) {
    throw new Error('useConsent must be used within ConsentProvider')
  }
  return ctx
}
