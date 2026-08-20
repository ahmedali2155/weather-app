import { Sun, Moon, Monitor } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'

const OPTIONS = [
  { value: 'light', icon: Sun, label: 'Light' },
  { value: 'dark', icon: Moon, label: 'Dark' },
  { value: 'system', icon: Monitor, label: 'System' }
]

export function ThemeToggle() {
  const theme = useAppStore((s) => s.theme)
  const setTheme = useAppStore((s) => s.setTheme)

  return (
    <div className="cursor-hover inline-flex rounded-full bg-white/5 p-1">
      {OPTIONS.map((opt) => {
        const Icon = opt.icon
        const active = theme === opt.value
        return (
          <button
            key={opt.value}
            onClick={() => setTheme(opt.value)}
            aria-label={`${opt.label} theme`}
            aria-pressed={active}
            className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs transition ${
              active ? 'bg-teal text-night font-medium' : 'opacity-60 hover:opacity-100'
            }`}
          >
            <Icon size={14} />
            <span className="hidden sm:inline">{opt.label}</span>
          </button>
        )
      })}
    </div>
  )
}
