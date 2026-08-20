import { Sparkles, MousePointer2, Info } from 'lucide-react'
import { PageWrapper } from '../components/layout/PageWrapper'
import { WeatherBackground } from '../components/background/WeatherBackground'
import { ThemeToggle } from '../components/theme/ThemeToggle'
import { UnitToggle } from '../components/weather/UnitToggle'
import { useAppStore } from '../store/useAppStore'

function Row({ icon: Icon, title, description, control }) {
  return (
    <div className="glass flex items-center justify-between gap-4 rounded-2xl p-4">
      <div className="flex items-start gap-3">
        {Icon && <Icon size={20} className="mt-0.5 shrink-0 text-teal" />}
        <div>
          <p className="font-medium">{title}</p>
          {description && <p className="text-xs opacity-60">{description}</p>}
        </div>
      </div>
      {control}
    </div>
  )
}

function Switch({ checked, onChange, label }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`cursor-hover relative h-7 w-12 shrink-0 rounded-full transition ${checked ? 'bg-teal' : 'bg-white/15'}`}
    >
      <span
        className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`}
      />
    </button>
  )
}

export default function Settings() {
  const animationsEnabled = useAppStore((s) => s.animationsEnabled)
  const setAnimationsEnabled = useAppStore((s) => s.setAnimationsEnabled)
  const cursorEnabled = useAppStore((s) => s.cursorEnabled)
  const setCursorEnabled = useAppStore((s) => s.setCursorEnabled)

  return (
    <>
      <WeatherBackground theme="clouds" />
      <PageWrapper>
        <h1 className="mb-6 text-2xl font-semibold">Settings</h1>

        <div className="space-y-6">
          <section className="space-y-3">
            <h2 className="text-sm font-medium uppercase tracking-wide opacity-60">Appearance</h2>
            <Row title="Theme" description="Light, dark, or match your system" control={<ThemeToggle />} />
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium uppercase tracking-wide opacity-60">Units</h2>
            <Row title="Measurement units" control={<UnitToggle />} />
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium uppercase tracking-wide opacity-60">Motion</h2>
            <Row
              icon={Sparkles}
              title="Animated backgrounds"
              description="Weather-matched scenes: rain, snow, stars, clouds"
              control={<Switch checked={animationsEnabled} onChange={setAnimationsEnabled} label="Toggle animated backgrounds" />}
            />
            <Row
              icon={MousePointer2}
              title="Custom cursor"
              description="Spring-following cursor with glow (disabled automatically on touch)"
              control={<Switch checked={cursorEnabled} onChange={setCursorEnabled} label="Toggle custom cursor" />}
            />
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium uppercase tracking-wide opacity-60">About</h2>
            <Row
              icon={Info}
              title="Skyline Weather"
              description="Weather data from Open-Meteo. Geocoding from Open-Meteo & BigDataCloud. No API keys, no tracking."
            />
          </section>
        </div>
      </PageWrapper>
    </>
  )
}
