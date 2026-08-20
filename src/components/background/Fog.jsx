import { useAppStore } from '../../store/useAppStore'

export function Fog() {
  const isDark = useAppStore((s) => s.isDark)

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className={`absolute -left-1/4 top-[20%] h-40 w-[150%] rounded-full blur-3xl animate-drift-slow ${
          isDark ? 'bg-white/10' : 'bg-ink/10'
        }`}
      />

      <div
        className={`absolute -left-1/3 top-[45%] h-48 w-[150%] rounded-full blur-3xl animate-drift ${
          isDark ? 'bg-white/[0.07]' : 'bg-ink/[0.07]'
        }`}
      />

      <div
        className={`absolute -left-1/4 top-[70%] h-36 w-[150%] rounded-full blur-3xl animate-drift-slow ${
          isDark ? 'bg-white/[0.08]' : 'bg-ink/[0.08]'
        }`}
      />
    </div>
  )
}