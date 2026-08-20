import { Clock, X } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'

export function RecentSearches({ onSelect }) {
  const recentCities = useAppStore((s) => s.recentCities)

  if (!recentCities?.length) return null

  return (
    <div>
      <h2 className="mb-3 flex items-center gap-2 text-sm font-medium uppercase tracking-wide opacity-60">
        <Clock size={14} /> Recent
      </h2>
      <div className="flex flex-wrap gap-2">
        {recentCities.map((c) => (
          <button
            key={c.id}
            onClick={() => onSelect(c)}
            className="cursor-hover glass rounded-full px-4 py-2 text-sm transition hover:bg-white/10"
          >
            {c.name}
          </button>
        ))}
      </div>
    </div>
  )
}
