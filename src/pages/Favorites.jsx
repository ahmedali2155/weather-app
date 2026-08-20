import { useNavigate } from 'react-router-dom'
import { Star, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageWrapper } from '../components/layout/PageWrapper'
import { WeatherBackground } from '../components/background/WeatherBackground'
import { EmptyState } from '../components/common/EmptyState'
import { CardSkeleton } from '../components/common/Skeleton'
import { useAppStore } from '../store/useAppStore'
import { useWeather } from '../hooks/useWeather'
import { getWeatherInfo } from '../utils/weatherCodeMap'
import { formatTemp } from '../utils/unitConversions'

function FavoriteRow({ city, onOpen, onRemove }) {
  const { data, loading } = useWeather(city)
  const tempUnit = useAppStore((s) => s.tempUnit)
  const info = data ? getWeatherInfo(data.current.weather_code, data.current.is_day) : null
  const Icon = info?.icon

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass flex items-center justify-between rounded-2xl p-4"
    >
      <button onClick={() => onOpen(city)} className="cursor-hover flex flex-1 items-center gap-3 text-left">
        {loading && !data ? (
          <div className="h-8 w-8"><CardSkeleton /></div>
        ) : (
          Icon && <Icon size={28} className="text-teal" />
        )}
        <div>
          <p className="font-medium">{city.name}</p>
          <p className="text-xs opacity-50">{[city.admin1, city.country].filter(Boolean).join(', ')}</p>
        </div>
      </button>
      <div className="flex items-center gap-3">
        {data && <span className="mono text-lg">{formatTemp(data.current.temperature_2m, tempUnit)}</span>}
        <button
          onClick={() => onRemove(city)}
          aria-label={`Remove ${city.name} from favorites`}
          className="cursor-hover rounded-full p-1.5 opacity-50 hover:bg-white/10 hover:opacity-100"
        >
          <X size={16} />
        </button>
      </div>
    </motion.div>
  )
}

export default function Favorites() {
  const navigate = useNavigate()
  const favoriteCities = useAppStore((s) => s.favoriteCities)
  const toggleFavorite = useAppStore((s) => s.toggleFavorite)
  const setActiveCity = useAppStore((s) => s.setActiveCity)

  const openCity = (city) => {
    setActiveCity(city)
    navigate('/')
  }

  return (
    <>
      <WeatherBackground theme="clear" />
      <PageWrapper>
        <h1 className="mb-4 text-2xl font-semibold">Favorites</h1>
        {favoriteCities.length === 0 ? (
          <EmptyState
            icon={Star}
            title="No favorites yet"
            description="Tap the star on any city's weather page to save it here."
          />
        ) : (
          <div className="space-y-3">
            {favoriteCities.map((c) => (
              <FavoriteRow key={c.id} city={c} onOpen={openCity} onRemove={toggleFavorite} />
            ))}
          </div>
        )}
      </PageWrapper>
    </>
  )
}
