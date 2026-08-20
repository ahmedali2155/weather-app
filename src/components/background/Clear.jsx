export function Clear() {
  return (
    <div className="absolute inset-0">
      <div
        className="absolute right-[12%] top-[14%] h-40 w-40 rounded-full blur-2xl animate-pulse"
        style={{ background: 'radial-gradient(circle, #F2A65A 0%, transparent 70%)' }}
      />
      <div
        className="absolute right-[15%] top-[17%] h-24 w-24 rounded-full"
        style={{ background: 'radial-gradient(circle, #FFE7B8 0%, #F2A65A 70%)' }}
      />
      {/* rotating rays */}
      <div className="absolute right-[15%] top-[17%] h-24 w-24 animate-[spin_30s_linear_infinite] opacity-40">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 h-24 w-[2px] origin-top bg-dawn/60"
            style={{ transform: `rotate(${i * 30}deg) translateY(-48px)` }}
          />
        ))}
      </div>
    </div>
  )
}
