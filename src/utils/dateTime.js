export function formatHour(isoString) {
  const d = new Date(isoString)
  return d.toLocaleTimeString([], { hour: 'numeric' })
}

export function formatDay(isoString, index) {
  if (index === 0) return 'Today'
  const d = new Date(isoString)
  return d.toLocaleDateString([], { weekday: 'short' })
}

export function formatFullDate(isoString) {
  const d = new Date(isoString)
  return d.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })
}

export function formatClock(isoString) {
  const d = new Date(isoString)
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export function isNowDay(sunrise, sunset) {
  const now = Date.now()
  return now >= new Date(sunrise).getTime() && now <= new Date(sunset).getTime()
}

// Returns 0..1 progress of "now" between sunrise and sunset (clamped)
export function dayProgress(sunrise, sunset) {
  const now = Date.now()
  const start = new Date(sunrise).getTime()
  const end = new Date(sunset).getTime()
  if (end <= start) return 0.5
  return Math.min(1, Math.max(0, (now - start) / (end - start)))
}
