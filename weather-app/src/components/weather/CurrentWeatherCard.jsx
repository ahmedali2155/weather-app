import { motion } from 'framer-motion'
import { Droplets, Wind, Gauge, Eye, Star } from 'lucide-react'
import { getWeatherInfo } from '../../utils/weatherCodeMap'
import { formatTemp, formatWind, formatPressure } from '../../utils/unitConversions'
import { formatFullDate } from '../../utils/dateTime'
import { AnimatedNumber } from '../common/AnimatedNumber'
import { useAppStore } from '../../store/useAppStore'

export function CurrentWeatherCard({ city, current, timezone }) {
  const tempUnit = useAppStore((s) => s.tempUnit)
  const windUnit = useAppStore((s) => s.windUnit)
  const pressureUnit = useAppStore((s) => s.pressureUnit)
  const toggleFavorite = useAppStore((s) => s.toggleFavorite)
  const isFavorite = useAppStore((s) => s.isFavorite(city?.id))

  if (!current) return null
  const info = getWeatherInfo(current.weather_code, current.is_day)
  const Icon = info.icon
  const displayTemp = tempUnit === 'F' ? (current.temperature_2m * 9) / 5 + 32 : current.temperature_2m

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass cursor-hover relative overflow-hidden rounded-3xl p-6 sm:p-8"
    >
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold sm:text-3xl">{city?.name}</h1>
          <p className="text-sm opacity-60">
            {[city?.admin1, city?.country].filter(Boolean).join(', ')}
          </p>
          <p className="mt-1 text-xs opacity-50">{formatFullDate(new Date().toISOString())}</p>
        </div>
        <button
          onClick={() => toggleFavorite(city)}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          className="cursor-hover rounded-full p-2 transition hover:bg-white/10"
        >
          <Star size={22} className={isFavorite ? 'fill-dawn text-dawn' : 'text-cloud/70'} />
        </button>
      </div>

      <div className="mt-6 flex items-center gap-6">
        <Icon size={72} className="text-teal drop-shadow-lg" />
        <div>
          <div className="mono text-6xl font-semibold leading-none sm:text-7xl">
            <AnimatedNumber value={displayTemp} decimals={0} />
            <span className="align-top text-3xl">°{tempUnit}</span>
          </div>
          <p className="mt-1 text-sm opacity-70">
            {info.label} · Feels like {formatTemp(current.apparent_temperature, tempUnit)}
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Metric icon={Droplets} label="Humidity" value={`${current.relative_humidity_2m}%`} />
        <Metric icon={Wind} label="Wind" value={formatWind(current.wind_speed_10m, windUnit)} />
        <Metric icon={Gauge} label="Pressure" value={formatPressure(current.surface_pressure, pressureUnit)} />
        <Metric icon={Eye} label="Visibility" value={`${(current.visibility / 1000).toFixed(1)} km`} />
      </div>
    </motion.div>
  )
}

function Metric({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl bg-white/5 p-3 text-center">
      <Icon size={18} className="mx-auto mb-1 text-teal" />
      <p className="mono text-sm font-medium">{value}</p>
      <p className="text-[11px] uppercase tracking-wide opacity-50">{label}</p>
    </div>
  )
}
