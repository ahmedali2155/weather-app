import { aqiCategory } from '../../api/airQualityApi'

export function AQIPanel({ aqi }) {
  if (!aqi) return null
  const cat = aqiCategory(aqi.us_aqi)

  const pollutants = [
    { label: 'PM2.5', value: aqi.pm2_5, unit: 'µg/m³' },
    { label: 'PM10', value: aqi.pm10, unit: 'µg/m³' },
    { label: 'O₃', value: aqi.ozone, unit: 'µg/m³' },
    { label: 'NO₂', value: aqi.nitrogen_dioxide, unit: 'µg/m³' },
    { label: 'SO₂', value: aqi.sulphur_dioxide, unit: 'µg/m³' },
    { label: 'CO', value: aqi.carbon_monoxide, unit: 'µg/m³' }
  ]

  return (
    <div className="glass rounded-3xl p-5">
      <h2 className="mb-3 text-sm font-medium uppercase tracking-wide opacity-60">Air quality</h2>
      <div className="flex items-center gap-4">
        <div
          className="mono flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-xl font-semibold"
          style={{ background: `${cat.color}22`, color: cat.color }}
        >
          {aqi.us_aqi ?? '--'}
        </div>
        <div>
          <p className="font-medium" style={{ color: cat.color }}>{cat.label}</p>
          <p className="text-xs opacity-60">US AQI index</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        {pollutants.map((p) => (
          <div key={p.label} className="rounded-xl bg-white/5 py-2">
            <p className="mono text-sm">{p.value?.toFixed(0) ?? '--'}</p>
            <p className="text-[10px] opacity-50">{p.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
