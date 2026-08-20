import { motion } from 'framer-motion'
import { CloudOff, RotateCw } from 'lucide-react'

export function ErrorState({ message = 'Something went wrong.', onRetry }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass flex flex-col items-center gap-4 rounded-3xl p-10 text-center"
    >
      <CloudOff size={48} className="text-storm" />
      <p className="max-w-xs text-sm opacity-80">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 rounded-full bg-teal/90 px-5 py-2 text-sm font-medium text-night transition hover:bg-teal"
        >
          <RotateCw size={16} /> Try again
        </button>
      )}
    </motion.div>
  )
}
