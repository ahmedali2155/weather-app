import { useAppStore } from '../../store/useAppStore'

function CloudShape({ className }) {
  return (
    <svg viewBox="0 0 200 80" className={className} fill="currentColor">
      <ellipse cx="50" cy="50" rx="45" ry="26" />
      <ellipse cx="95" cy="35" rx="50" ry="32" />
      <ellipse cx="150" cy="50" rx="40" ry="24" />
    </svg>
  )
}

export function Clouds() {
  const isDark = useAppStore((s) => s.isDark)

  const cloudColors = isDark
    ? {
        base: 'text-white/10',
        second: 'text-white/[0.07]',
        third: 'text-white/[0.09]',
        fourth: 'text-white/[0.06]'
      }
    : {
        base: 'text-ink/10',
        second: 'text-ink/[0.07]',
        third: 'text-ink/[0.09]',
        fourth: 'text-ink/[0.06]'
      }

  return (
    <div className={`absolute inset-0 ${cloudColors.base}`}>
      <CloudShape
        className="absolute -left-20 top-[10%] w-64 animate-drift-slow"
      />

      <CloudShape
        className={`absolute -left-40 top-[28%] w-80 animate-drift ${cloudColors.second}`}
      />

      <CloudShape
        className={`absolute -left-10 top-[50%] w-56 animate-drift-slow ${cloudColors.third}`}
      />

      <CloudShape
        className={`absolute -left-32 top-[65%] w-72 animate-drift ${cloudColors.fourth}`}
      />
    </div>
  )
}