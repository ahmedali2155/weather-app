// Central mapping of Open-Meteo WMO weather codes -> label, icon, and background theme.
// https://open-meteo.com/en/docs (WMO Weather interpretation codes)
import {
  Sun, Moon, CloudSun, CloudMoon, Cloud, Cloudy, CloudFog,
  CloudDrizzle, CloudRain, CloudSnow, CloudLightning, CloudHail
} from 'lucide-react'

const TABLE = {
  0:  { label: 'Clear sky', bg: 'clear' },
  1:  { label: 'Mostly clear', bg: 'clear' },
  2:  { label: 'Partly cloudy', bg: 'clouds' },
  3:  { label: 'Overcast', bg: 'clouds' },
  45: { label: 'Fog', bg: 'fog' },
  48: { label: 'Depositing rime fog', bg: 'fog' },
  51: { label: 'Light drizzle', bg: 'rain' },
  53: { label: 'Drizzle', bg: 'rain' },
  55: { label: 'Dense drizzle', bg: 'rain' },
  56: { label: 'Light freezing drizzle', bg: 'rain' },
  57: { label: 'Freezing drizzle', bg: 'rain' },
  61: { label: 'Light rain', bg: 'rain' },
  63: { label: 'Rain', bg: 'rain' },
  65: { label: 'Heavy rain', bg: 'rain' },
  66: { label: 'Light freezing rain', bg: 'rain' },
  67: { label: 'Freezing rain', bg: 'rain' },
  71: { label: 'Light snow', bg: 'snow' },
  73: { label: 'Snow', bg: 'snow' },
  75: { label: 'Heavy snow', bg: 'snow' },
  77: { label: 'Snow grains', bg: 'snow' },
  80: { label: 'Light rain showers', bg: 'rain' },
  81: { label: 'Rain showers', bg: 'rain' },
  82: { label: 'Violent rain showers', bg: 'rain' },
  85: { label: 'Light snow showers', bg: 'snow' },
  86: { label: 'Heavy snow showers', bg: 'snow' },
  95: { label: 'Thunderstorm', bg: 'storm' },
  96: { label: 'Thunderstorm w/ hail', bg: 'storm' },
  99: { label: 'Severe thunderstorm w/ hail', bg: 'storm' }
}

export function getWeatherInfo(code, isDay = 1) {
  const entry = TABLE[code] ?? { label: 'Unknown', bg: 'clouds' }
  let bg = entry.bg

  if (bg === 'clear' && !isDay) {
    bg = 'night'
  }

  const icon = pickIcon(code, isDay)

  return {
    code,
    label: entry.label,
    bg,
    icon
  }
}

function pickIcon(code, isDay) {
  if (code === 0 || code === 1) return isDay ? Sun : Moon
  if (code === 2) return isDay ? CloudSun : CloudMoon
  if (code === 3) return Cloudy
  if ([45, 48].includes(code)) return CloudFog
  if ([51, 53, 55, 56, 57].includes(code)) return CloudDrizzle
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return CloudRain
  if ([71, 73, 75, 77, 85, 86].includes(code)) return CloudSnow
  if ([96, 99].includes(code)) return CloudHail
  if (code === 95) return CloudLightning

  return Cloud
}

export const BG_THEME_COLORS = {
  clear: {
    accent: '#3EC9A7',
    dark: {
      from: '#1a2a52',
      to: '#0B1026'
    },
    light: {
      from: '#87CEEB',
      to: '#EAF8FF'
    }
  },

  night: {
    accent: '#6C63AC',
    dark: {
      from: '#0B1026',
      to: '#050714'
    },
    light: {
      from: '#B8C5E8',
      to: '#E9EDFA'
    }
  },

  clouds: {
    accent: '#8891B0',
    dark: {
      from: '#2b3350',
      to: '#0f1330'
    },
    light: {
      from: '#AAB7C9',
      to: '#EEF2F6'
    }
  },

  rain: {
    accent: '#4A7FC9',
    dark: {
      from: '#111a33',
      to: '#050a16'
    },
    light: {
      from: '#7894B5',
      to: '#DCE8F2'
    }
  },

  snow: {
    accent: '#EDEFF7',
    dark: {
      from: '#26314f',
      to: '#0d1226'
    },
    light: {
      from: '#C9DCF0',
      to: '#F8FBFF'
    }
  },

  storm: {
    accent: '#F2A65A',
    dark: {
      from: '#171233',
      to: '#050512'
    },
    light: {
      from: '#8994B0',
      to: '#D9DDEA'
    }
  },

  fog: {
    accent: '#B7C0D8',
    dark: {
      from: '#232a42',
      to: '#0d1120'
    },
    light: {
      from: '#B8C1CB',
      to: '#F0F2F4'
    }
  }
}