'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Lock, AlertCircle } from 'lucide-react'

export function LoginForm() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!password) return
    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      const body = await res.json().catch(() => ({}))

      if (!res.ok) {
        setError(body?.error ?? 'Login fehlgeschlagen.')
        setSubmitting(false)
        return
      }

      router.push('/admin')
      router.refresh()
    } catch {
      setError('Netzwerkfehler. Bitte erneut versuchen.')
      setSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-deep-2 border border-line rounded-sm p-7"
    >
      {error && (
        <div
          className="mb-5 p-3 bg-error/10 border border-error/40 rounded-sm flex items-start gap-2"
          role="alert"
        >
          <AlertCircle
            className="w-4 h-4 text-error shrink-0 mt-0.5"
            strokeWidth={1.75}
          />
          <p className="text-sm text-paper">{error}</p>
        </div>
      )}

      <label
        htmlFor="password"
        className="block text-xs font-semibold tracking-[0.12em] uppercase text-paper-mute mb-2"
      >
        Passwort
      </label>
      <div className="relative">
        <Lock
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-paper-mute pointer-events-none"
          strokeWidth={1.75}
        />
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="current-password"
          required
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full min-h-[48px] pl-10 pr-4 py-3 bg-deep border border-paper-dim/30 rounded-sm text-paper placeholder:text-paper-mute/70 focus:border-signal-2 focus:outline-none transition-colors"
        />
      </div>

      <button
        type="submit"
        disabled={submitting || !password}
        className="mt-5 w-full inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-3 bg-signal text-deep font-medium text-sm rounded-sm hover:bg-signal-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Anmelden …
          </>
        ) : (
          'Anmelden'
        )}
      </button>
    </form>
  )
}
