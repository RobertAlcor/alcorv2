'use client'

/**
 * Animated Background - sehr dezent, organisch.
 * Nur weiche Lichtflecken, kein Grid. CSS-only animations.
 */
export function AnimatedBackground() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
    >
      {/* Soft Orb 1 - top left, sehr langsam */}
      <div
        className="absolute -top-[30vh] -left-[20vw] w-[80vw] h-[80vw] rounded-full opacity-[0.10] orb-soft-1 will-change-transform"
        style={{
          background:
            'radial-gradient(circle, rgba(var(--signal-rgb), 0.7) 0%, transparent 65%)',
          filter: 'blur(120px)',
        }}
      />

      {/* Soft Orb 2 - bottom right */}
      <div
        className="absolute -bottom-[40vh] -right-[20vw] w-[90vw] h-[90vw] rounded-full opacity-[0.08] orb-soft-2 will-change-transform"
        style={{
          background:
            'radial-gradient(circle, rgba(var(--signal-rgb), 0.6) 0%, transparent 65%)',
          filter: 'blur(140px)',
        }}
      />

      {/* Sehr feines Vignette overlay - macht Mitte weicher */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
        }}
      />
    </div>
  )
}
