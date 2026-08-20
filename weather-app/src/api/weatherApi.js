import axios from 'axios'

const BASE_URL = 'https://api.open-meteo.com/v1/forecast'

/**
 * Fetch current + hourly + daily forecast for a lat/lon from Open-Meteo.
 * No API key required.
 */
export async function fetchWeather(lat, lon) {
  const params = {
    latitude: lat,
    longitude: lon,
    current: [
      'temperature_2m', 'relative_humidity_2m', 'apparent_temperature',
      'is_day', 'precipitation', 'weather_code', 'surface_pressure',
      'wind_speed_10m', 'wind_direction_10m', 'visibility'
    ].join(','),
    hourly: [
      'temperature_2m', 'precipitation_probability', 'weather_code', 'is_day'
    ].join(','),
    daily: [
      'weather_code', 'temperature_2m_max', 'temperature_2m_min',
      'precipitation_probability_max', 'sunrise', 'sunset', 'uv_index_max'
    ].join(','),
    timezone: 'auto',
    forecast_days: 10
  }

  const { data } = await axios.get(BASE_URL, { params, timeout: 12000 })
  return data
}
