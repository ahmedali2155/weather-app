import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageWrapper } from '../components/layout/PageWrapper'
import { WeatherBackground } from '../components/background/WeatherBackground'
import { SearchResults } from '../components/search/SearchResults'
import { RecentSearches } from '../components/search/RecentSearches'
import { EmptyState } from '../components/common/EmptyState'
import { useAppStore } from '../store/useAppStore'
import { searchCities } from '../api/geocodingApi'
import { useDebounce } from '../hooks/useDebounce'
import { Search as SearchIcon } from 'lucide-react'
import { useEffect } from 'react'

export default function Search() {
  const navigate = useNavigate()
  const setActiveCity = useAppStore((s) => s.setActiveCity)
  const pushToast = useAppStore((s) => s.pushToast)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const debounced = useDebounce(query, 300)

  useEffect(() => {
    if (debounced.trim().length < 2) {
      setResults([])
      return
    }
    let cancelled = false
    searchCities(debounced, 10)
      .then((r) => !cancelled && setResults(r))
      .catch(() => pushToast('City search failed.', 'error'))
    return () => { cancelled = true }
  }, [debounced, pushToast])

  const handleSelect = (city) => {
    setActiveCity(city)
    navigate('/')
  }

  return (
    <>
      <WeatherBackground theme="clouds" />
      <PageWrapper>
        <h1 className="mb-4 text-2xl font-semibold">Explore cities</h1>
        <div className="space-y-6">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a city…"
            aria-label="Search for a city"
            className="glass w-full rounded-2xl px-4 py-3 text-sm outline-none placeholder:opacity-40"
          />
          {results.length > 0 ? (
            <SearchResults results={results} onSelect={handleSelect} />
          ) : query.trim().length >= 2 ? (
            <EmptyState icon={SearchIcon} title="No cities found" description="Try a different spelling or a nearby larger city." />
          ) : (
            <RecentSearches onSelect={handleSelect} />
          )}
        </div>
      </PageWrapper>
    </>
  )
}
