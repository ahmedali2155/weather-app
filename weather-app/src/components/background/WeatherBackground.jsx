import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useAppStore } from '../../store/useAppStore'
import { BG_THEME_COLORS } from '../../utils/weatherCodeMap'
import { Clear } from './Clear'
import { NightSky } from './NightSky'
import { Clouds } from './Clouds'
import { Rain } from './Rain'
import { Snow } from './Snow'
import { Storm } from './Storm'
import { Fog } from './Fog'

const SCENES = {
  clear: Clear,
  night: NightSky,
  clouds: Clouds,
  rain: Rain,
  snow: Snow,
  storm: Storm,
  fog: Fog
}

/** Renders a full-viewport animated background matching the current weather and app theme. */
export function WeatherBackground({ theme = 'clear' }) {
  const animationsEnabled = useAppStore((s) => s.animationsEnabled)
  const isDark = useAppStore((s) => s.isDark)
  const setAccentColor = useAppStore((s) => s.setAccentColor)

  const [paused, setPaused] = useState(document.hidden)

  const Scene = SCENES[theme] || Clear
  const colors = BG_THEME_COLORS[theme] || BG_THEME_COLORS.clear

  // Select the correct weather gradient for Light or Dark mode
  const themeColors = isDark ? colors.dark : colors.light

  useEffect(() => {
    setAccentColor(colors.accent)
  }, [colors.accent, setAccentColor])

  // Pause animations when the tab is inactive to save battery/CPU
  useEffect(() => {
    const onVisibility = () => {
      setPaused(document.hidden)
    }

    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden transition-colors duration-1000"
      style={{
        background: `linear-gradient(160deg, ${themeColors.from}, ${themeColors.to})`
      }}
      aria-hidden="true"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`${theme}-${isDark ? 'dark' : 'light'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {animationsEnabled && !paused ? <Scene /> : null}
        </motion.div>
      </AnimatePresence>

      {/* Adaptive vignette: dark mode gets a dark overlay, light mode stays bright */}
      <div
        className={
          isDark
            ? 'absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-transparent'
            : 'absolute inset-0 bg-gradient-to-t from-white/25 via-transparent to-transparent'
        }
      />
    </div>
  )
}