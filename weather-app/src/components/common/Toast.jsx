import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle, CheckCircle2, Info, X, WifiOff } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'

const ICONS = { error: AlertTriangle, success: CheckCircle2, info: Info, offline: WifiOff }

export function ToastStack() {
  const toasts = useAppStore((s) => s.toasts)
  const dismissToast = useAppStore((s) => s.dismissToast)

  return (
    <div className="fixed bottom-4 left-1/2 z-[100] flex w-full max-w-sm -translate-x-1/2 flex-col gap-2 px-4 sm:bottom-6">
      <AnimatePresence>
        {toasts.map((t) => {
          const Icon = ICONS[t.variant] || Info
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="glass flex items-center gap-3 rounded-2xl px-4 py-3 text-sm shadow-lg"
              role="status"
            >
              <Icon size={18} className="shrink-0 text-teal" />
              <span className="flex-1">{t.message}</span>
              <button
                onClick={() => dismissToast(t.id)}
                aria-label="Dismiss notification"
                className="opacity-60 hover:opacity-100"
              >
                <X size={16} />
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
