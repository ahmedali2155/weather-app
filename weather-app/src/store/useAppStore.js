import { create } from 'zustand'

const read = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw !== null ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

const write = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* ignore */
  }
}

export const useAppStore = create((set, get) => ({
  // ---- theme: 'light' | 'dark' | 'system'
  theme: read('skyline:theme', 'system'),
  setTheme: (theme) => {
    write('skyline:theme', theme)
    set({ theme })
  },

  // ---- resolved theme
  // true = dark mode
  // false = light mode
  isDark: false,
  setIsDark: (isDark) => set({ isDark }),

  // ---- units
  tempUnit: read('skyline:tempUnit', 'C'),
  windUnit: read('skyline:windUnit', 'kmh'),
  pressureUnit: read('skyline:pressureUnit', 'hpa'),
  setTempUnit: (u) => {
    write('skyline:tempUnit', u)
    set({ tempUnit: u })
  },
  setWindUnit: (u) => {
    write('skyline:windUnit', u)
    set({ windUnit: u })
  },
  setPressureUnit: (u) => {
    write('skyline:pressureUnit', u)
    set({ pressureUnit: u })
  },

  // ---- live accent color, driven by current weather background theme
  accentColor: '#3EC9A7',
  setAccentColor: (color) => set({ accentColor: color }),

  // ---- animation preferences
  animationsEnabled: read('skyline:animationsEnabled', true),
  cursorEnabled: read('skyline:cursorEnabled', true),
  setAnimationsEnabled: (v) => {
    write('skyline:animationsEnabled', v)
    set({ animationsEnabled: v })
  },
  setCursorEnabled: (v) => {
    write('skyline:cursorEnabled', v)
    set({ cursorEnabled: v })
  },

  // ---- active city
  activeCity: read('skyline:activeCity', null),
  setActiveCity: (city) => {
    write('skyline:activeCity', city)

    set((state) => ({
      activeCity: city,
      recentCities: addRecent(state.recentCities, city)
    }))

    write('skyline:recentCities', get().recentCities)
  },

  // ---- recent searches (max 5)
  recentCities: read('skyline:recentCities', []),

  // ---- favorites
  favoriteCities: read('skyline:favoriteCities', []),
  toggleFavorite: (city) => {
    set((state) => {
      const exists = state.favoriteCities.some((c) => c.id === city.id)

      const favoriteCities = exists
        ? state.favoriteCities.filter((c) => c.id !== city.id)
        : [...state.favoriteCities, city]

      write('skyline:favoriteCities', favoriteCities)

      return { favoriteCities }
    })
  },
  isFavorite: (id) => get().favoriteCities.some((c) => c.id === id),

  // ---- comparison list
  compareCities: read('skyline:compareCities', []),
  toggleCompare: (city) => {
    set((state) => {
      const exists = state.compareCities.some((c) => c.id === city.id)

      const compareCities = exists
        ? state.compareCities.filter((c) => c.id !== city.id)
        : [...state.compareCities, city].slice(0, 4)

      write('skyline:compareCities', compareCities)

      return { compareCities }
    })
  },

  // ---- toasts
  toasts: [],
  pushToast: (message, variant = 'info') => {
    const id = `${Date.now()}-${Math.random()}`

    set((state) => ({
      toasts: [...state.toasts, { id, message, variant }]
    }))

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id)
      }))
    }, 4500)
  },

  dismissToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id)
    }))
}))

function addRecent(recents, city) {
  const filtered = recents.filter((c) => c.id !== city.id)
  return [city, ...filtered].slice(0, 5)
}