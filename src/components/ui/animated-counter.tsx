'use client'

import { useEffect, useRef, useState } from 'react'

type Props = {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
}

export function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 1400,
}: Props) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLSpanElement | null>(null)
  const animatedRef = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      setDisplay(value)
      animatedRef.current = true
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !animatedRef.current) {
            animatedRef.current = true
            const start = performance.now()
            const tick = (now: number) => {
              const elapsed = now - start
              const progress = Math.min(elapsed / duration, 1)
              const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
              setDisplay(Math.round(value * eased))
              if (progress < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
            observer.disconnect()
          }
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [value, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display}
      {suffix}
    </span>
  )
}
