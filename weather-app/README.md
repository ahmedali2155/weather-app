# Skyline — Weather

A fast, professional weather app built with React, Vite, and Tailwind CSS. Live conditions, hourly and 10-day forecasts, air quality, and weather-matched animated backgrounds — powered entirely by free, key-free APIs.

## Setup

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

```bash
npm run build      # production build to dist/
npm run preview    # preview the production build
```

## Data sources (no API keys required)

- **[Open-Meteo](https://open-meteo.com)** — current conditions, hourly and daily forecast, UV index
- **[Open-Meteo Geocoding](https://open-meteo.com/en/docs/geocoding-api)** — city name search/autocomplete
- **[Open-Meteo Air Quality](https://open-meteo.com/en/docs/air-quality-api)** — AQI and pollutant breakdown
- **[BigDataCloud reverse geocoding](https://www.bigdatacloud.com/free-api/free-reverse-geocode-to-city-api)** — turns your coordinates into a city name
- Browser **Geolocation API** — "Use my current location"

## Features

- Current conditions, feels-like, humidity, wind, pressure, visibility, UV, sunrise/sunset, air quality
- Scrollable 24-hour forecast + interactive temperature chart (Recharts)
- Expandable 10-day forecast
- Animated wind compass and sunrise/sunset arc visualizations
- City search with debounced autocomplete, recent searches, favorites, and multi-city comparison
- Light / dark / system theme, with °C/°F, km/h/mph, hPa/inHg unit toggles — all persisted to `localStorage`
- Weather-matched animated backgrounds (clear day/night, clouds, rain, snow, thunderstorm, fog), built from layered CSS/SVG — no video or image assets, GPU-friendly transforms, capped particle counts, and paused when the browser tab is inactive
- Custom spring-physics cursor with a weather-tinted trailing glow — automatically disabled on touch devices, and toggleable in Settings
- Skeleton loading states, animated number counters, toast notifications, pull-to-refresh on mobile
- Stale-while-revalidate caching: the last successful forecast is shown instantly from `localStorage` while fresh data loads in the background, so the app is useful even when offline
- Installable as a PWA with an offline fallback page
- Responsive from 375px to 1440px+, keyboard-navigable, and respects `prefers-reduced-motion`

## Folder structure

```
src/
├── api/            Open-Meteo + geocoding + air quality clients
├── components/
│   ├── background/  Per-condition animated scenes (Rain, Snow, Storm, Fog, Clouds, Clear, NightSky)
│   ├── cursor/       Custom animated cursor
│   ├── common/       Skeleton, Toast, ErrorState, EmptyState, AnimatedNumber
│   ├── layout/        Navbar, Footer, PageWrapper
│   ├── search/        SearchBar, SearchResults, RecentSearches
│   ├── theme/          ThemeToggle
│   └── weather/         CurrentWeatherCard, HourlyForecast, DailyForecast, TempChart, WindCompass, SunArc, AQIPanel, UnitToggle
├── hooks/           useGeolocation, useWeather, useDebounce, useLocalStorage, useOnlineStatus
├── pages/           Home, Search, Compare, Favorites, Settings, NotFound
├── store/           Zustand global store (theme, units, cities, favorites, toasts)
├── utils/           weatherCodeMap.js, unitConversions.js, dateTime.js
├── App.jsx
├── router.jsx
└── main.jsx
```

## Notes

- All weather-code-to-icon/label/background logic lives in one place: `src/utils/weatherCodeMap.js`.
- The custom cursor uses `pointer-events: none` and only activates on `(pointer: fine)` devices, so it never blocks clicks and never appears on phones or tablets.
- Background animations use only `transform`/`opacity`, cap particle counts at ~50–60, and pause via the Page Visibility API when the tab isn't active.
