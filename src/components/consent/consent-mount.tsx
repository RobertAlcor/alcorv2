'use client'

import { ConsentProvider } from './consent-provider'
import { ConsentBanner } from './consent-banner'
import { ConsentModal } from './consent-modal'
import { ConsentButton } from './consent-button'
import type { ReactNode } from 'react'

/**
 * Wrapper für das ganze Consent-System.
 * In layout.tsx um children herum verwenden.
 *
 * Beispiel:
 * <ConsentMount>
 *   <Header />
 *   {children}
 *   <Footer />
 * </ConsentMount>
 */
export function ConsentMount({ children }: { children: ReactNode }) {
  return (
    <ConsentProvider>
      {children}
      <ConsentBanner />
      <ConsentModal />
      <ConsentButton />
    </ConsentProvider>
  )
}
