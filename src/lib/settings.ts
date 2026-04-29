import { supabaseAdmin } from './supabase'

/**
 * Generic settings lib mit in-memory cache (5 Min TTL).
 * Settings werden in der DB-Tabelle "settings" als key/value JSON gespeichert.
 */

const CACHE_TTL_MS = 5 * 60 * 1000 // 5 Min
const cache = new Map<string, { value: unknown; expiresAt: number }>()

async function getSetting<T>(key: string, fallback: T): Promise<T> {
  const cached = cache.get(key)
  if (cached && cached.expiresAt > Date.now()) {
    return cached.value as T
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('settings')
      .select('value')
      .eq('key', key)
      .maybeSingle()

    if (error || !data) {
      return fallback
    }

    const value = (data.value as T) ?? fallback
    cache.set(key, { value, expiresAt: Date.now() + CACHE_TTL_MS })
    return value
  } catch {
    return fallback
  }
}

async function setSetting<T>(key: string, value: T): Promise<void> {
  const { error } = await supabaseAdmin
    .from('settings')
    .upsert({ key, value: value as object }, { onConflict: 'key' })

  if (error) throw new Error(`Setting save failed: ${error.message}`)

  // Cache invalidieren
  cache.delete(key)
}

// ============================================================
// Working-Hours
// ============================================================

export type WorkingHours = {
  start: number // Stunde 0-23
  end: number // Stunde 0-23 (exklusiv: Termin muss bis 'end' enden)
}

const WORKING_HOURS_DEFAULTS: WorkingHours = { start: 9, end: 18 }

export async function getWorkingHours(): Promise<WorkingHours> {
  const value = await getSetting<WorkingHours>(
    'working_hours',
    WORKING_HOURS_DEFAULTS,
  )
  // Validierung: Werte müssen valide Stunden sein
  if (
    typeof value.start === 'number' &&
    typeof value.end === 'number' &&
    value.start >= 0 &&
    value.start <= 23 &&
    value.end >= 1 &&
    value.end <= 24 &&
    value.start < value.end
  ) {
    return value
  }
  return WORKING_HOURS_DEFAULTS
}

export async function setWorkingHours(hours: WorkingHours): Promise<void> {
  if (
    typeof hours.start !== 'number' ||
    typeof hours.end !== 'number' ||
    hours.start < 0 ||
    hours.start > 23 ||
    hours.end < 1 ||
    hours.end > 24 ||
    hours.start >= hours.end
  ) {
    throw new Error('Ungültige Arbeitszeiten')
  }
  await setSetting('working_hours', hours)
}
