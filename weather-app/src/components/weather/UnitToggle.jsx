import { useAppStore } from '../../store/useAppStore'

function Segmented({ value, options, onChange }) {
  return (
    <div className="cursor-hover inline-flex rounded-full bg-white/5 p-1 text-xs">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`rounded-full px-3 py-1 transition ${
            value === opt.value ? 'bg-teal text-night font-medium' : 'opacity-60 hover:opacity-100'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

export function UnitToggle() {
  const tempUnit = useAppStore((s) => s.tempUnit)
  const setTempUnit = useAppStore((s) => s.setTempUnit)
  const windUnit = useAppStore((s) => s.windUnit)
  const setWindUnit = useAppStore((s) => s.setWindUnit)
  const pressureUnit = useAppStore((s) => s.pressureUnit)
  const setPressureUnit = useAppStore((s) => s.setPressureUnit)

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Segmented
        value={tempUnit}
        onChange={setTempUnit}
        options={[{ value: 'C', label: '°C' }, { value: 'F', label: '°F' }]}
      />
      <Segmented
        value={windUnit}
        onChange={setWindUnit}
        options={[{ value: 'kmh', label: 'km/h' }, { value: 'mph', label: 'mph' }]}
      />
      <Segmented
        value={pressureUnit}
        onChange={setPressureUnit}
        options={[{ value: 'hpa', label: 'hPa' }, { value: 'inhg', label: 'inHg' }]}
      />
    </div>
  )
}
