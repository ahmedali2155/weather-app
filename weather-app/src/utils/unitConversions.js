export const cToF = (c) => (c * 9) / 5 + 32
export const fToC = (f) => ((f - 32) * 5) / 9

export const kmhToMph = (kmh) => kmh * 0.621371
export const mphToKmh = (mph) => mph / 0.621371

export const hpaToInHg = (hpa) => hpa * 0.02953
export const inHgToHpa = (inHg) => inHg / 0.02953

export function formatTemp(celsius, unit = 'C', decimals = 0) {
  if (celsius === null || celsius === undefined || Number.isNaN(celsius)) return '--'
  const value = unit === 'F' ? cToF(celsius) : celsius
  return `${value.toFixed(decimals)}°${unit}`
}

export function formatWind(kmh, unit = 'kmh', decimals = 0) {
  if (kmh === null || kmh === undefined) return '--'
  const value = unit === 'mph' ? kmhToMph(kmh) : kmh
  return `${value.toFixed(decimals)} ${unit === 'mph' ? 'mph' : 'km/h'}`
}

export function formatPressure(hpa, unit = 'hpa', decimals = 1) {
  if (hpa === null || hpa === undefined) return '--'
  const value = unit === 'inhg' ? hpaToInHg(hpa) : hpa
  return `${value.toFixed(unit === 'inhg' ? decimals : 0)} ${unit === 'inhg' ? 'inHg' : 'hPa'}`
}

export function degToCompass(deg) {
  const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
  return dirs[Math.round(deg / 22.5) % 16]
}
