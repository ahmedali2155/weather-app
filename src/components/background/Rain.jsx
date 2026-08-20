import { useAppStore } from '../../store/useAppStore'

const DROPS = Array.from({ length: 50 }).map((_, i) => ({
  id: i,
  left: Math.random() * 100,
  duration: 0.6 + Math.random() * 0.6,
  delay: Math.random() * 2,
  height: 12 + Math.random() * 14
}))

export function Rain() {
  const isDark = useAppStore((s) => s.isDark)

  return (
    <div className="absolute inset-0 overflow-hidden">
      {DROPS.map((d) => (
        <span
          key={d.id}
          className={
            isDark
              ? 'absolute top-0 block w-[1.5px] rounded-full bg-gradient-to-b from-transparent to-[#8FB8F0]/70'
              : 'absolute top-0 block w-[1.5px] rounded-full bg-gradient-to-b from-transparent to-[#4A7FC9]/60'
          }
          style={{
            left: `${d.left}%`,
            height: d.height,
            animation: `fall ${d.duration}s linear infinite`,
            animationDelay: `${d.delay}s`
          }}
        />
      ))}
    </div>
  )
}