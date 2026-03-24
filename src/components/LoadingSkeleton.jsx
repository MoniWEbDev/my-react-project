const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="animate-pulse overflow-hidden rounded-2xl border border-emerald-100 bg-white/70 shadow-lg dark:border-emerald-900/70 dark:bg-slate-900/70"
        >
          <div className="h-44 bg-emerald-100/70 dark:bg-emerald-800/30" />
          <div className="space-y-3 p-5">
            <div className="h-4 w-3/4 rounded bg-emerald-100/80 dark:bg-emerald-800/30" />
            <div className="h-3 w-full rounded bg-emerald-100/80 dark:bg-emerald-800/30" />
            <div className="h-3 w-2/3 rounded bg-emerald-100/80 dark:bg-emerald-800/30" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default LoadingSkeleton
