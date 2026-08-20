import { useEffect } from 'react'
import { RefreshCw, MapPinOff } from 'lucide-react'
import { PageWrapper } from '../components/layout/PageWrapper'
import { WeatherBackground } from '../components/background/WeatherBackground'
import { CurrentWeatherCard } from '../components/weather/CurrentWeatherCard'
import { HourlyForecast } from '../components/weather/HourlyForecast'
import { DailyForecast } from '../components/weather/DailyForecast'
import { TempChart } from '../components/weather/TempChart'
import { WindCompass } from '../components/weather/WindCompass'
import { SunArc } from '../components/weather/SunArc'
import { AQIPanel } from '../components/weather/AQIPanel'
import { UnitToggle } from '../components/weather/UnitToggle'
import { SearchBar } from '../components/search/SearchBar'
import { CardSkeleton } from '../components/common/Skeleton'
import { ErrorState } from '../components/common/ErrorState'
import { EmptyState } from '../components/common/EmptyState'
import { useAppStore } from '../store/useAppStore'
import { useWeather } from '../hooks/useWeather'
import { getWeatherInfo } from '../utils/weatherCodeMap'

export default function Home() {
  const activeCity = useAppStore((s) => s.activeCity)
  const setActiveCity = useAppStore((s) => s.setActiveCity)
  const pushToast = useAppStore((s) => s.pushToast)
  const { data, aqi, loading, error, stale, refresh } = useWeather(activeCity)

  useEffect(() => {
    if (error) pushToast(error, error.includes('offline') ? 'offline' : 'error')
  }, [error, pushToast])

  const theme = data ? getWeatherInfo(data.current.weather_code, data.current.is_day).bg : 'clear'

  if (!activeCity) {
    return (
      <>
        <WeatherBackground theme="clear" />
        <PageWrapper>
          <div className="mx-auto max-w-md space-y-6 pt-10">
            <SearchBar onSelect={setActiveCity} autoFocus />
            <EmptyState
              icon={MapPinOff}
              title="Pick a place to start"
              description="Search for a city or use your current location to see the forecast."
            />
          </div>
        </PageWrapper>
      </>
    )
  }

  return (
    <>
      <WeatherBackground theme={theme} />
      <PageWrapper>
        <div className="space-y-4">
          <SearchBar onSelect={setActiveCity} />

          {loading && !data && (
            <div className="space-y-4">
              <CardSkeleton />
              <CardSkeleton />
            </div>
          )}

          {error && !data && <ErrorState message={error} onRetry={refresh} />}

          {data && (
            <>
              {stale && (
                <div className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs opacity-70">
                  <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
                  Showing saved data{loading ? ' — refreshing…' : '.'}
                </div>
              )}
              <CurrentWeatherCard city={activeCity} current={data.current} timezone={data.timezone} />
              <UnitToggle />
              <HourlyForecast hourly={data.hourly} />
              <TempChart hourly={data.hourly} />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <WindCompass speed={data.current.wind_speed_10m} direction={data.current.wind_direction_10m} />
                <SunArc sunrise={data.daily?.sunrise?.[0]} sunset={data.daily?.sunset?.[0]} />
              </div>
              <AQIPanel aqi={aqi} />
              <DailyForecast daily={data.daily} />
            </>
          )}
        </div>
      </PageWrapper>
    </>
  )
}
