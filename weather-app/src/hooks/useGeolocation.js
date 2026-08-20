import { useCallback, useState } from 'react'
import { reverseGeocode } from '../api/geocodingApi'

export function useGeolocation() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const locate = useCallback(() => {
    return new Promise((resolve) => {
      if (!('geolocation' in navigator)) {
        setError('Geolocation is not supported on this device.')
        resolve(null)
        return
      }
      setLoading(true)
      setError(null)
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          try {
            const { latitude, longitude } = pos.coords
            const city = await reverseGeocode(latitude, longitude)
            setLoading(false)
            resolve(city)
          } catch (e) {
            setError('Could not determine your city from your location.')
            setLoading(false)
            resolve(null)
          }
        },
        (err) => {
          setError(
            err.code === err.PERMISSION_DENIED
              ? 'Location permission denied. Search for a city instead.'
              : 'Unable to retrieve your location.'
          )
          setLoading(false)
          resolve(null)
        },
        { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
      )
    })
  }, [])

  return { locate, loading, error }
}
