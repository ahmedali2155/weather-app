import { useAppStore } from '../../store/useAppStore'

const FLAKES = Array.from({ length: 45 }).map((_, i) => ({
  id: i,
  left: Math.random() * 100,
  size: 2 + Math.random() * 3,
  duration: 5 + Math.random() * 6,
  delay: Math.random() * 5,
  drift: Math.random() > 0.5 ? 1 : -1
}))

export function Snow() {
  const isDark = useAppStore((s) => s.isDark)

  return (
    <div className="absolute inset-0 overflow-hidden">
      {FLAKES.map((f) => (
        <span
          key={f.id}
          className={`absolute top-0 block rounded-full ${
            isDark ? 'bg-white/80' : 'bg-ink/40'
          }`}
          style={{
            left: `${f.left}%`,
            width: f.size,
            height: f.size,
            animation: `fall ${f.duration}s linear infinite`,
            animationDelay: `${f.delay}s`,
            filter: 'blur(0.2px)'
          }}
        />
      ))}
    </div>
  )
}