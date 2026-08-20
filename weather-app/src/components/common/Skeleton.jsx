export function Skeleton({ className = '' }) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-ink/10 dark:bg-white/10 ${className}`}
    >
      <div
        className="
          absolute inset-0 -translate-x-full
          animate-[shimmer_1.6s_infinite]
          bg-gradient-to-r
          from-transparent via-ink/10 to-transparent
          dark:via-white/20
        "
      />
      <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="glass space-y-4 rounded-3xl p-6">
      <Skeleton className="h-5 w-1/3" />
      <Skeleton className="h-16 w-2/3" />

      <div className="flex gap-3">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  )
}