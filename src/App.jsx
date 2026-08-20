import { useEffect, useRef } from 'react'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { AnimatedCursor } from './components/cursor/AnimatedCursor'
import { ToastStack } from './components/common/Toast'
import { AppRouter } from './router'
import { useAppStore } from './store/useAppStore'
import { useOnlineStatus } from './hooks/useOnlineStatus'

export default function App() {
  const theme = useAppStore((s) => s.theme)
  const setIsDark = useAppStore((s) => s.setIsDark)
  const pushToast = useAppStore((s) => s.pushToast)
  const online = useOnlineStatus()
  const wasOnline = useRef(online)
  const touchStartY = useRef(0)
  const pullTriggered = useRef(false)

  // Apply light/dark/system theme to <html>
  // and keep the resolved theme available to all components
  useEffect(() => {
    const root = document.documentElement

    const apply = (isDark) => {
      root.classList.toggle('dark', isDark)
      root.classList.toggle('light', !isDark)
      setIsDark(isDark)
    }

    if (theme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)')

      apply(mq.matches)

      const handler = (e) => {
        apply(e.matches)
      }

      mq.addEventListener('change', handler)

      return () => {
        mq.removeEventListener('change', handler)
      }
    }

    apply(theme === 'dark')
  }, [theme, setIsDark])

  // Offline / back-online toast
  useEffect(() => {
    if (wasOnline.current && !online) {
      pushToast("You're offline. Showing your last saved forecast.", 'offline')
    } else if (!wasOnline.current && online) {
      pushToast("You're back online.", 'success')
    }

    wasOnline.current = online
  }, [online, pushToast])

  // Simple pull-to-refresh gesture on mobile: pull down at scrollTop 0 to reload
  useEffect(() => {
    const onTouchStart = (e) => {
      if (window.scrollY === 0) {
        touchStartY.current = e.touches[0].clientY
      }
    }

    const onTouchMove = (e) => {
      if (window.scrollY === 0 && !pullTriggered.current) {
        const delta = e.touches[0].clientY - touchStartY.current

        if (delta > 90) {
          pullTriggered.current = true
          window.location.reload()
        }
      }
    }

    const onTouchEnd = () => {
      pullTriggered.current = false
    }

    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd)

    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [])

  return (
    <div className="relative min-h-screen">
      <AnimatedCursor />
      <Navbar />
      <AppRouter />
      <Footer />
      <ToastStack />
    </div>
  )
}