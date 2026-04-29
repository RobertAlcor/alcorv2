import { cookies } from 'next/headers'
import { createHmac, timingSafeEqual } from 'crypto'

/**
 * Single-User Admin Auth.
 *
 * Konzept:
 * - Password in env als ADMIN_PASSWORD (Klartext, im Vercel-Dashboard als Env-Var)
 * - Session-Secret in env als ADMIN_SESSION_SECRET (random string)
 * - Login: Password-Check, dann signed Cookie setzen
 * - Cookie-Inhalt: timestamp.signature (HMAC-SHA256)
 * - Cookie ist HttpOnly + Secure + SameSite=Strict
 * - Session-Dauer: 30 Tage
 */

const COOKIE_NAME = 'admin_session'
const SESSION_DURATION_DAYS = 30
const SESSION_DURATION_MS = SESSION_DURATION_DAYS * 24 * 60 * 60 * 1000

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret || secret.length < 32) {
    throw new Error(
      'ADMIN_SESSION_SECRET muss gesetzt sein (mind. 32 Zeichen)',
    )
  }
  return secret
}

function getPassword(): string {
  const pw = process.env.ADMIN_PASSWORD
  if (!pw || pw.length < 8) {
    throw new Error('ADMIN_PASSWORD muss gesetzt sein (mind. 8 Zeichen)')
  }
  return pw
}

function sign(value: string): string {
  return createHmac('sha256', getSecret()).update(value).digest('hex')
}

/**
 * Verifiziert Login-Versuch via Constant-Time-Compare
 */
export function verifyPassword(input: string): boolean {
  const expected = getPassword()
  if (input.length !== expected.length) {
    // Constant-time compare braucht gleiche Länge - hier kurzer Mock
    timingSafeEqual(Buffer.from('a'), Buffer.from('a'))
    return false
  }
  return timingSafeEqual(Buffer.from(input), Buffer.from(expected))
}

/**
 * Erzeugt Session-Cookie-Wert
 */
export function createSessionToken(): string {
  const expiresAt = Date.now() + SESSION_DURATION_MS
  const payload = String(expiresAt)
  const signature = sign(payload)
  return `${payload}.${signature}`
}

/**
 * Validiert Session-Cookie. Return true wenn gültig und nicht abgelaufen.
 * Wirft NICHT bei fehlendem Secret - returnt einfach false (ungültige Session).
 */
export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false
  const parts = token.split('.')
  if (parts.length !== 2) return false
  const [payload, signature] = parts
  if (!payload || !signature) return false

  let secret: string
  try {
    secret = getSecret()
  } catch {
    // Env-Var fehlt - keine Session möglich
    return false
  }

  const expectedSig = createHmac('sha256', secret).update(payload).digest('hex')
  try {
    if (
      !timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))
    )
      return false
  } catch {
    return false
  }

  const expiresAt = Number(payload)
  if (isNaN(expiresAt)) return false
  if (Date.now() > expiresAt) return false
  return true
}

/**
 * Server-Component-Helper: Liest Cookie und prüft ob admin eingeloggt
 */
export async function isAdminLoggedIn(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  return verifySessionToken(token)
}

/**
 * Cookie-Optionen für Set-Cookie
 */
export function getSessionCookieOptions() {
  return {
    name: COOKIE_NAME,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    path: '/',
    maxAge: SESSION_DURATION_MS / 1000, // in seconds
  }
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME
