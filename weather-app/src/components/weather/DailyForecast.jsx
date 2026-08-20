import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Droplets, Sun } from 'lucide-react'
import { getWeatherInfo } from '../../utils/weatherCodeMap'
import { formatTemp } from '../../utils/unitConversions'
import { formatDay, formatClock } from '../../utils/dateTime'
import { useAppStore } from '../../store/useAppStore'

export function DailyForecast({ daily }) {
  const tempUnit = useAppStore((s) => s.tempUnit)
  const [openIdx, setOpenIdx] = useState(null)
  if (!daily?.time) return null

  return (
    <div className="glass rounded-3xl p-5">
      <h2 className="mb-4 text-sm font-medium uppercase tracking-wide opacity-60">10-day forecast</h2>
      <div className="divide-y divide-white/10">
        {daily.time.map((t, i) => {
          const info = getWeatherInfo(daily.weather_code[i], 1)
          const Icon = info.icon
          const isOpen = openIdx === i
          return (
            <div key={t}>
              <button
                onClick={() => setOpenIdx(isOpen ? null : i)}
                className="cursor-hover flex w-full items-center justify-between gap-3 py-3 text-left"
              >
                <span className="w-16 text-sm opacity-80">{formatDay(t, i)}</span>
                <Icon size={20} className="text-teal" />
                <span className="text-xs opacity-50">{daily.precipitation_probability_max?.[i] ?? 0}%</span>
                <span className="mono flex-1 text-right text-sm">
                  <span className="opacity-50">{formatTemp(daily.temperature_2m_min[i], tempUnit)}</span>
                  {'  '}
                  <span className="font-medium">{formatTemp(daily.temperature_2m_max[i], tempUnit)}</span>
                </span>
                <ChevronDown
                  size={16}
                  className={`opacity-50 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-3 gap-3 pb-4 text-xs opacity-80">
                      <div className="flex items-center gap-1">
                        <Droplets size={14} className="text-teal" /> {daily.precipitation_probability_max?.[i] ?? 0}% rain
                      </div>
                      <div className="flex items-center gap-1">
                        <Sun size={14} className="text-dawn" /> UV {daily.uv_index_max?.[i]?.toFixed(0) ?? '--'}
                      </div>
                      <div>
                        {formatClock(daily.sunrise[i])} – {formatClock(daily.sunset[i])}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </div>
  )
}
