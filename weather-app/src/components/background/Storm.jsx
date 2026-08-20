import { useAppStore } from '../../store/useAppStore'
import { Rain } from './Rain'

export function Storm() {
  const isDark = useAppStore((s) => s.isDark)

  const flashColor = isDark ? 'bg-white' : 'bg-ink/20'

  return (
    <div className="absolute inset-0">
      <Rain />

      <div
        className={`absolute inset-0 ${flashColor} animate-flash`}
      />

      <div
        className={`absolute inset-0 ${flashColor} animate-flash`}
        style={{
          animationDelay: '3.2s',
          animationDuration: '11s'
        }}
      />
    </div>
  )
}