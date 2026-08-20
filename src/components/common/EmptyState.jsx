import { motion } from 'framer-motion'

export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass flex flex-col items-center gap-3 rounded-3xl p-10 text-center"
    >
      {Icon && <Icon size={40} className="text-dawn" />}
      <h3 className="text-lg font-semibold">{title}</h3>
      {description && <p className="max-w-xs text-sm opacity-70">{description}</p>}
      {action}
    </motion.div>
  )
}
