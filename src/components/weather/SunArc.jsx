import { useAppStore } from '../../store/useAppStore'
import { formatClock, dayProgress } from '../../utils/dateTime'

export function SunArc({ sunrise, sunset }) {
  const isDark = useAppStore((s) => s.isDark)

  if (!sunrise || !sunset) return null

  const progress = dayProgress(sunrise, sunset)
  const angle = Math.PI * (1 - progress)

  const cx = 100
  const cy = 90
  const r = 78

  const sunX = cx + r * Math.cos(angle)
  const sunY = cy - r * Math.sin(angle)

  // Different line colors for Light and Dark mode
  const arcColor = isDark
    ? 'rgba(255,255,255,0.25)'
    : 'rgba(11,16,38,0.35)'

  const horizonColor = isDark
    ? 'rgba(255,255,255,0.18)'
    : 'rgba(11,16,38,0.25)'

  return (
    <div className="glass rounded-3xl p-5">
      <h2 className="mb-2 text-sm font-medium uppercase tracking-wide opacity-60">
        Sun
      </h2>

      <svg viewBox="0 0 200 100" className="w-full">
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke={arcColor}
          strokeWidth="2"
          strokeDasharray="4 4"
        />

        <line
          x1={cx - r - 6}
          y1={cy}
          x2={cx + r + 6}
          y2={cy}
          stroke={horizonColor}
          strokeWidth="1"
        />

        <circle
          cx={sunX}
          cy={sunY}
          r="14"
          fill="#F2A65A"
          opacity="0.25"
          style={{
            transition: 'cx 0.6s ease, cy 0.6s ease'
          }}
        />

        <circle
          cx={sunX}
          cy={sunY}
          r="7"
          fill="#F2A65A"
          style={{
            transition: 'cx 0.6s ease, cy 0.6s ease'
          }}
        />
      </svg>

      <div className="mt-2 flex justify-between text-xs opacity-70">
        <span>↑ {formatClock(sunrise)}</span>
        <span>↓ {formatClock(sunset)}</span>
      </div>
    </div>
  )
}