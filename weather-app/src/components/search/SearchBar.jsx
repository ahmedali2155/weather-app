import { useEffect, useState } from 'react'
import { Search as SearchIcon, MapPin, Loader2 } from 'lucide-react'
import { searchCities } from '../../api/geocodingApi'
import { useDebounce } from '../../hooks/useDebounce'
import { useGeolocation } from '../../hooks/useGeolocation'
import { useAppStore } from '../../store/useAppStore'

export function SearchBar({ onSelect, autoFocus = false }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const debounced = useDebounce(query, 300)
  const { locate, loading: locating } = useGeolocation()
  const pushToast = useAppStore((s) => s.pushToast)

  useEffect(() => {
    let cancelled = false
    if (debounced.trim().length < 2) {
      setResults([])
      return
    }
    setLoading(true)
    searchCities(debounced)
      .then((r) => !cancelled && setResults(r))
      .catch(() => !cancelled && pushToast('City search failed. Check your connection.', 'error'))
      .finally(() => !cancelled && setLoading(false))
    return () => { cancelled = true }
  }, [debounced, pushToast])

  const handleSelect = (city) => {
    setQuery('')
    setResults([])
    setOpen(false)
    onSelect(city)
  }

  const handleLocate = async () => {
    const city = await locate()
    if (city) {
      onSelect(city)
    } else {
      pushToast('Could not use your location. Try searching instead.', 'error')
    }
  }

  return (
    <div className="relative">
      <div className="glass flex items-center gap-2 rounded-2xl px-4 py-3">
        <SearchIcon size={18} className="opacity-50" />
        <input
          autoFocus={autoFocus}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          placeholder="Search for a city…"
          aria-label="Search for a city"
          className="flex-1 bg-transparent text-sm outline-none placeholder:opacity-40"
        />
        {loading && <Loader2 size={16} className="animate-spin opacity-50" />}
        <button
          onClick={handleLocate}
          disabled={locating}
          aria-label="Use my current location"
          className="cursor-hover flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-xs transition hover:bg-white/20"
        >
          {locating ? <Loader2 size={14} className="animate-spin" /> : <MapPin size={14} />}
          <span className="hidden sm:inline">Nearby</span>
        </button>
      </div>

      {open && results.length > 0 && (
        <div className="glass absolute z-20 mt-2 w-full overflow-hidden rounded-2xl">
          {results.map((r) => (
            <button
              key={r.id}
              onClick={() => handleSelect(r)}
              className="cursor-hover flex w-full items-center justify-between px-4 py-3 text-left text-sm transition hover:bg-white/10"
            >
              <span>{r.name}</span>
              <span className="text-xs opacity-50">{[r.admin1, r.country].filter(Boolean).join(', ')}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
