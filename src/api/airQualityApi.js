import axios from 'axios'

const BASE_URL = 'https://air-quality-api.open-meteo.com/v1/air-quality'

export async function fetchAirQuality(lat, lon) {
  const { data } = await axios.get(BASE_URL, {
    params: {
      latitude: lat,
      longitude: lon,
      current: ['us_aqi', 'pm2_5', 'pm10', 'ozone', 'nitrogen_dioxide', 'sulphur_dioxide', 'carbon_monoxide'].join(','),
      timezone: 'auto'
    },
    timeout: 10000
  })
  return data.current
}

export function aqiCategory(aqi) {
  if (aqi == null) return { label: 'Unknown', color: '#8891B0' }
  if (aqi <= 50) return { label: 'Good', color: '#3EC9A7' }
  if (aqi <= 100) return { label: 'Moderate', color: '#F2D45C' }
  if (aqi <= 150) return { label: 'Unhealthy (sensitive)', color: '#F2A65A' }
  if (aqi <= 200) return { label: 'Unhealthy', color: '#E8664C' }
  if (aqi <= 300) return { label: 'Very unhealthy', color: '#A15CC9' }
  return { label: 'Hazardous', color: '#7A1F2B' }
}
