import { useAppStore } from '../../store/useAppStore'

const STARS = Array.from({ length: 60 }).map((_, i) => ({
  id: i,
  top: Math.random() * 70,
  left: Math.random() * 100,
  size: Math.random() * 2 + 1,
  delay: Math.random() * 3
}))

export function NightSky() {
  const isDark = useAppStore((s) => s.isDark)

  return (
    <div className="absolute inset-0">
      {STARS.map((s) => (
        <div
          key={s.id}
          className={`absolute rounded-full animate-twinkle ${
            isDark ? 'bg-white' : 'bg-ink/50'
          }`}
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`
          }}
        />
      ))}

      <div
        className="absolute right-[14%] top-[12%] h-20 w-20 rounded-full shadow-[0_0_60px_10px_rgba(237,239,247,0.35)]"
        style={{
          background: isDark
            ? 'radial-gradient(circle at 35% 35%, #EDEFF7, #B7C0D8 75%)'
            : 'radial-gradient(circle at 35% 35%, #FFFFFF, #8C9AB8 75%)'
        }}
      />
    </div>
  )
}