import { useEffect, useRef, useState } from 'react'
import { useAppStore } from '../../store/useAppStore'

/** Counts smoothly from the previous value to `value` whenever it changes. */
export function AnimatedNumber({ value, decimals = 0, suffix = '', className = '' }) {
  const animationsEnabled = useAppStore((s) => s.animationsEnabled)
  const [display, setDisplay] = useState(value)
  const fromRef = useRef(value)
  const rafRef = useRef(null)

  useEffect(() => {
    if (value === undefined || value === null || Number.isNaN(value)) return

    if (!animationsEnabled) {
      setDisplay(value)
      return
    }

    const from = fromRef.current ?? value
    const to = value
    const duration = 600
    const start = performance.now()

    cancelAnimationFrame(rafRef.current)
    const step = (now) => {
      const progress = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(from + (to - from) * eased)
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step)
      } else {
        fromRef.current = to
      }
    }
    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current)
  }, [value, animationsEnabled])

  return (
    <span className={className}>
      {display?.toFixed(decimals)}
      {suffix}
    </span>
  )
}
