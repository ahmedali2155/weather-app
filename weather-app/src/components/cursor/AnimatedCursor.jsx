import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useAppStore } from '../../store/useAppStore'

/**
 * Replaces the system cursor with a spring-following dot + trailing glow.
 * Disabled automatically on touch devices and when the user turns it off in Settings.
 */
export function AnimatedCursor() {
  const cursorEnabled = useAppStore((s) => s.cursorEnabled)
  const accent = useAppStore((s) => s.accentColor) || '#3EC9A7'
  const [isTouch, setIsTouch] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springConfig = { damping: 28, stiffness: 320, mass: 0.4 }
  const sx = useSpring(x, springConfig)
  const sy = useSpring(y, springConfig)
  const glowSpring = { damping: 22, stiffness: 120, mass: 0.6 }
  const gx = useSpring(x, glowSpring)
  const gy = useSpring(y, glowSpring)

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    setIsTouch(!mq.matches)
    const handler = (e) => setIsTouch(!e.matches)
    mq.addEventListener?.('change', handler)
    return () => mq.removeEventListener?.('change', handler)
  }, [])

  useEffect(() => {
    if (isTouch || !cursorEnabled) {
      document.body.classList.remove('cursor-enabled')
      return
    }
    document.body.classList.add('cursor-enabled')

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
    }
    const leave = () => setVisible(false)
    const over = (e) => {
      const target = e.target.closest('button, a, [role="button"], input, .cursor-hover')
      setHovering(Boolean(target))
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    document.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      document.removeEventListener('mouseleave', leave)
      document.body.classList.remove('cursor-enabled')
    }
  }, [isTouch, cursorEnabled, x, y])

  if (isTouch || !cursorEnabled) return null

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[200] rounded-full mix-blend-screen"
        style={{
          x: gx,
          y: gy,
          translateX: '-50%',
          translateY: '-50%',
          width: hovering ? 90 : 60,
          height: hovering ? 90 : 60,
          background: `radial-gradient(circle, ${accent}55 0%, transparent 70%)`,
          opacity: visible ? 1 : 0,
          transition: 'width 0.25s, height 0.25s, opacity 0.2s'
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[201] rounded-full"
        style={{
          x: sx,
          y: sy,
          translateX: '-50%',
          translateY: '-50%',
          width: hovering ? 26 : 12,
          height: hovering ? 26 : 12,
          border: `1.5px solid ${accent}`,
          background: hovering ? `${accent}33` : 'transparent',
          opacity: visible ? 1 : 0,
          transition: 'width 0.2s, height 0.2s, background 0.2s, opacity 0.2s'
        }}
      />
    </>
  )
}
