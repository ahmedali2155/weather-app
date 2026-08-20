import { X, Plus, LayoutGrid } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { PageWrapper } from '../components/layout/PageWrapper'
import { WeatherBackground } from '../components/background/WeatherBackground'
import { EmptyState } from '../components/common/EmptyState'
import { CardSkeleton } from '../components/common/Skeleton'
import { useAppStore } from '../store/useAppStore'
import { useWeather } from '../hooks/useWeather'
import { getWeatherInfo } from '../utils/weatherCodeMap'
import { formatTemp } from '../utils/unitConversions'

function CompareCard({ city, onRemove }) {
  const { data, loading } = useWeather(city)
  const tempUnit = useAppStore((s) => s.tempUnit)

  if (loading && !data) return <CardSkeleton />

  const info = data ? getWeatherInfo(data.current.weather_code, data.current.is_day) : null
  const Icon = info?.icon

  return (
    <div className="glass relative rounded-3xl p-5">
      <button
        onClick={() => onRemove(city)}
        aria-label={`Remove ${city.name} from comparison`}
        className="cursor-hover absolute right-3 top-3 rounded-full p-1 opacity-50 hover:bg-white/10 hover:opacity-100"
      >
        <X size={16} />
      </button>
      <h3 className="font-medium">{city.name}</h3>
      <p className="text-xs opacity-50">{[city.admin1, city.country].filter(Boolean).join(', ')}</p>
      {data && (
        <div className="mt-4 flex items-center gap-3">
          {Icon && <Icon size={32} className="text-teal" />}
          <div>
            <p className="mono text-2xl font-semibold">{formatTemp(data.current.temperature_2m, tempUnit)}</p>
            <p className="text-xs opacity-60">{info.label}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Compare() {
  const navigate = useNavigate()
  const compareCities = useAppStore((s) => s.compareCities)
  const toggleCompare = useAppStore((s) => s.toggleCompare)
  const favoriteCities = useAppStore((s) => s.favoriteCities)
  const recentCities = useAppStore((s) => s.recentCities)

  const addable = [...favoriteCities, ...recentCities].filter(
    (c, i, arr) => arr.findIndex((x) => x.id === c.id) === i && !compareCities.some((cc) => cc.id === c.id)
  ).slice(0, 6)

  return (
    <>
      <WeatherBackground theme="clouds" />
      <PageWrapper>
        <h1 className="mb-4 text-2xl font-semibold">Compare cities</h1>

        {compareCities.length === 0 ? (
          <EmptyState
            icon={LayoutGrid}
            title="Nothing to compare yet"
            description="Add a couple of cities below to see them side by side."
          />
        ) : (
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {compareCities.map((c) => (
              <CompareCard key={c.id} city={c} onRemove={toggleCompare} />
            ))}
          </div>
        )}

        {addable.length > 0 && (
          <div>
            <h2 className="mb-3 text-sm font-medium uppercase tracking-wide opacity-60">Add a city</h2>
            <div className="flex flex-wrap gap-2">
              {addable.map((c) => (
                <button
                  key={c.id}
                  onClick={() => toggleCompare(c)}
                  className="cursor-hover glass flex items-center gap-1 rounded-full px-4 py-2 text-sm transition hover:bg-white/10"
                >
                  <Plus size={14} /> {c.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {addable.length === 0 && compareCities.length < 4 && (
          <button
            onClick={() => navigate('/search')}
            className="cursor-hover mt-4 text-sm text-teal underline underline-offset-4"
          >
            Search for more cities to add
          </button>
        )}
      </PageWrapper>
    </>
  )
}
