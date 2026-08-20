import axios from 'axios'

const GEOCODE_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const REVERSE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client'

/** Search cities by name (autocomplete). Returns [] if nothing found. */
export async function searchCities(query, count = 6) {
  if (!query || query.trim().length < 2) return []
  const { data } = await axios.get(GEOCODE_URL, {
    params: { name: query.trim(), count, language: 'en', format: 'json' },
    timeout: 8000
  })
  return (data.results || []).map((r) => ({
    id: `${r.id}`,
    name: r.name,
    admin1: r.admin1,
    country: r.country,
    countryCode: r.country_code,
    lat: r.latitude,
    lon: r.longitude,
    timezone: r.timezone
  }))
}

/** Reverse-geocode coordinates (e.g. from browser geolocation) to a city name. */
export async function reverseGeocode(lat, lon) {
  const { data } = await axios.get(REVERSE_URL, {
    params: { latitude: lat, longitude: lon, localityLanguage: 'en' },
    timeout: 8000
  })
  return {
    id: `${lat.toFixed(2)},${lon.toFixed(2)}`,
    name: data.city || data.locality || data.principalSubdivision || 'Current location',
    admin1: data.principalSubdivision,
    country: data.countryName,
    countryCode: data.countryCode,
    lat,
    lon
  }
}
