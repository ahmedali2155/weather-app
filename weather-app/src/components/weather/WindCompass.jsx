import { motion } from 'framer-motion'
import { degToCompass, formatWind } from '../../utils/unitConversions'
import { useAppStore } from '../../store/useAppStore'

export function WindCompass({ speed, direction }) {
  const windUnit = useAppStore((s) => s.windUnit)
  if (speed === undefined) return null

  return (
    <div className="glass flex flex-col items-center rounded-3xl p-5">
      <h2 className="mb-3 self-start text-sm font-medium uppercase tracking-wide opacity-60">Wind</h2>
      <div className="relative h-32 w-32">
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
          {['N', 'E', 'S', 'W'].map((d, i) => (
            <text
              key={d}
              x={50 + 38 * Math.sin((i * Math.PI) / 2)}
              y={50 - 38 * Math.cos((i * Math.PI) / 2) + 3}
              textAnchor="middle"
              fontSize="8"
              fill="#EDEFF7"
              opacity="0.5"
            >
              {d}
            </text>
          ))}
          <motion.g
            initial={false}
            animate={{ rotate: direction }}
            transition={{ type: 'spring', stiffness: 60, damping: 12 }}
            style={{ originX: '50px', originY: '50px' }}
          >
            <polygon points="50,14 45,50 50,44 55,50" fill="#3EC9A7" />
            <polygon points="50,86 45,50 50,56 55,50" fill="#6C63AC" />
          </motion.g>
          <circle cx="50" cy="50" r="4" fill="#EDEFF7" />
        </svg>
      </div>
      <p className="mono mt-3 text-lg font-medium">{formatWind(speed, windUnit)}</p>
      <p className="text-xs opacity-50">{degToCompass(direction)} · {direction.toFixed(0)}°</p>
    </div>
  )
}
