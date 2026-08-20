import { useCallback, useEffect, useState } from 'react'
import { fetchWeather } from '../api/weatherApi'
import { fetchAirQuality } from '../api/airQualityApi'

const cacheKey = (city) => `skyline:weather:${city?.id ?? `${city?.lat},${city?.lon}`}`

export function useWeather(city) {
  const [data, setData] = useState(null)
  const [aqi, setAqi] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [stale, setStale] = useState(false)

  const load = useCallback(async (targetCity) => {
    if (!targetCity) return
    const key = cacheKey(targetCity)

    // 1. Show cached data immediately (stale-while-revalidate)
    try {
      const cachedRaw = window.localStorage.getItem(key)
      if (cachedRaw) {
        const cached = JSON.parse(cachedRaw)
        setData(cached.weather)
        setAqi(cached.aqi)
        setStale(true)
      }
    } catch {
      /* ignore corrupt cache */
    }

    setLoading(true)
    setError(null)
    try {
      const [weather, air] = await Promise.all([
        fetchWeather(targetCity.lat, targetCity.lon),
        fetchAirQuality(targetCity.lat, targetCity.lon).catch(() => null)
      ])
      setData(weather)
      setAqi(air)
      setStale(false)
      try {
        window.localStorage.setItem(key, JSON.stringify({ weather, aqi: air, savedAt: Date.now() }))
      } catch {
        /* storage quota — non-fatal */
      }
    } catch (e) {
      const message = !navigator.onLine
        ? "You're offline. Showing the last saved forecast."
        : 'Could not load weather data. Please try again.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load(city)
  }, [city?.id, city?.lat, city?.lon, load])

  return { data, aqi, loading, error, stale, refresh: () => load(city) }
}
