/**
 * Lightweight Rate-Limit + Spam-Schutz für API-Routes.
 *
 * - In-memory Map (kein Redis, kein externes Tool nötig)
 * - 5 Anfragen pro Stunde pro IP
 * - Auto-Cleanup älter als 1h
 *
 * Achtung: bei mehreren Server-Instanzen (Vercel-Edge etc.) ist
 * das nur ein Schutz pro Instanz. Für saubere Production-Lösung
 * kommt später Cloudflare Turnstile oder Upstash Redis dazu.
 */

type Entry = {
  count: number
  windowStart: number
}

const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000 // 1 Stunde

// Module-level storage (lebt für Lifetime des Serverless-Function-Containers)
const store = new Map<string, Entry>()

export type RateLimitResult = {
  allowed: boolean
  remaining: number
  retryAfterSeconds: number
}

export function checkRateLimit(identifier: string): RateLimitResult {
  const now = Date.now()
  const entry = store.get(identifier)

  // Cleanup älterer Entries (bei jedem Aufruf, max 100 Entries auf einmal)
  let cleaned = 0
  for (const [key, value] of store.entries()) {
    if (now - value.windowStart > RATE_LIMIT_WINDOW_MS) {
      store.delete(key)
      cleaned++
      if (cleaned >= 100) break
    }
  }

  // Neue Session
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    store.set(identifier, { count: 1, windowStart: now })
    return {
      allowed: true,
      remaining: RATE_LIMIT_MAX - 1,
      retryAfterSeconds: 0,
    }
  }

  // Innerhalb des Windows
  if (entry.count >= RATE_LIMIT_MAX) {
    const elapsed = now - entry.windowStart
    const retryAfter = Math.ceil((RATE_LIMIT_WINDOW_MS - elapsed) / 1000)
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: retryAfter,
    }
  }

  entry.count++
  store.set(identifier, entry)
  return {
    allowed: true,
    remaining: RATE_LIMIT_MAX - entry.count,
    retryAfterSeconds: 0,
  }
}

/**
 * IP-Adresse aus Request-Headers extrahieren.
 * Funktioniert mit Vercel, Cloudflare, hinter Proxies.
 */
export function getClientIp(headers: Headers): string {
  // Vercel
  const forwardedFor = headers.get('x-forwarded-for')
  if (forwardedFor) {
    const first = forwardedFor.split(',')[0]?.trim()
    if (first) return first
  }
  // Cloudflare
  const cfIp = headers.get('cf-connecting-ip')
  if (cfIp) return cfIp
  // Real IP
  const realIp = headers.get('x-real-ip')
  if (realIp) return realIp
  // Fallback
  return 'unknown'
}

/**
 * Submission-Heuristik: Hat der Nutzer das Form unrealistisch schnell ausgefüllt?
 * Erkennt einfache Bot-Submissions die in <2 Sekunden alle Felder ausfüllen.
 */
export function isSuspiciousSpeed(submitTimeMs: number, formLoadTimeMs: number): boolean {
  const elapsed = submitTimeMs - formLoadTimeMs
  return elapsed < 2000 // unter 2 Sekunden = verdächtig
}
