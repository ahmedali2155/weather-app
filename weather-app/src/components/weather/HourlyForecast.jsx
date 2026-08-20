import { getWeatherInfo } from '../../utils/weatherCodeMap'
import { formatTemp } from '../../utils/unitConversions'
import { formatHour } from '../../utils/dateTime'
import { useAppStore } from '../../store/useAppStore'

export function HourlyForecast({ hourly }) {
  const tempUnit = useAppStore((s) => s.tempUnit)
  if (!hourly?.time) return null

  const now = Date.now()
  const startIdx = hourly.time.findIndex((t) => new Date(t).getTime() >= now)
  const items = hourly.time.slice(Math.max(0, startIdx), Math.max(0, startIdx) + 24)

  return (
    <div className="glass rounded-3xl p-5">
      <h2 className="mb-4 text-sm font-medium uppercase tracking-wide opacity-60">Next 24 hours</h2>
      <div className="scrollbar-hide flex gap-3 overflow-x-auto pb-2">
        {items.map((t, i) => {
          const idx = Math.max(0, startIdx) + i
          const info = getWeatherInfo(hourly.weather_code[idx], hourly.is_day[idx])
          const Icon = info.icon
          return (
            <div
              key={t}
              className="cursor-hover flex min-w-[64px] flex-col items-center gap-2 rounded-2xl bg-white/5 px-3 py-4 transition hover:bg-white/10"
            >
              <span className="text-xs opacity-60">{i === 0 ? 'Now' : formatHour(t)}</span>
              <Icon size={22} className="text-teal" />
              <span className="mono text-sm font-medium">
                {formatTemp(hourly.temperature_2m[idx], tempUnit)}
              </span>
              <span className="text-[10px] opacity-50">{hourly.precipitation_probability?.[idx] ?? 0}%</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
