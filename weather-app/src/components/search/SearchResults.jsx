import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'

export function SearchResults({ results, onSelect }) {
  if (!results?.length) return null
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {results.map((r, i) => (
        <motion.button
          key={r.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.04 }}
          onClick={() => onSelect(r)}
          className="cursor-hover glass flex items-center gap-3 rounded-2xl p-4 text-left transition hover:bg-white/10"
        >
          <MapPin size={20} className="text-teal" />
          <div>
            <p className="font-medium">{r.name}</p>
            <p className="text-xs opacity-60">{[r.admin1, r.country].filter(Boolean).join(', ')}</p>
          </div>
        </motion.button>
      ))}
    </div>
  )
}
