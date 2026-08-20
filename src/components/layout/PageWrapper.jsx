import { motion } from 'framer-motion'

export function PageWrapper({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="mx-auto min-h-[70vh] max-w-5xl px-4 py-6 sm:px-6"
    >
      {children}
    </motion.main>
  )
}
