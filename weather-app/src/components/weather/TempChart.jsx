import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { formatHour } from '../../utils/dateTime'
import { useAppStore } from '../../store/useAppStore'
import { cToF } from '../../utils/unitConversions'

export function TempChart({ hourly }) {
  const tempUnit = useAppStore((s) => s.tempUnit)
  if (!hourly?.time) return null

  const now = Date.now()
  const startIdx = Math.max(0, hourly.time.findIndex((t) => new Date(t).getTime() >= now))
  const points = hourly.time.slice(startIdx, startIdx + 24).map((t, i) => {
    const idx = startIdx + i
    const c = hourly.temperature_2m[idx]
    return {
      time: formatHour(t),
      temp: tempUnit === 'F' ? cToF(c) : c,
      precip: hourly.precipitation_probability?.[idx] ?? 0
    }
  })

  return (
    <div className="glass rounded-3xl p-5">
      <h2 className="mb-4 text-sm font-medium uppercase tracking-wide opacity-60">Temperature trend</h2>
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={points} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3EC9A7" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#3EC9A7" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis dataKey="time" tick={{ fill: '#EDEFF7', fontSize: 11, opacity: 0.6 }} axisLine={false} tickLine={false} interval={3} />
            <YAxis tick={{ fill: '#EDEFF7', fontSize: 11, opacity: 0.6 }} axisLine={false} tickLine={false} width={36} />
            <Tooltip
              contentStyle={{ background: '#0E1220', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, fontSize: 12 }}
              labelStyle={{ color: '#EDEFF7' }}
              formatter={(value, name) => [name === 'temp' ? `${value.toFixed(0)}°${tempUnit}` : `${value}%`, name === 'temp' ? 'Temp' : 'Rain']}
            />
            <Area type="monotone" dataKey="temp" stroke="#3EC9A7" strokeWidth={2} fill="url(#tempGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
