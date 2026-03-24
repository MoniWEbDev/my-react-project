import { Bell, Bookmark, PlayCircle } from 'lucide-react'

const LearningTopHeader = ({ user, notificationCount, continueItem }) => {
  return (
    <header className="rounded-2xl border border-slate-200 bg-white/75 p-5 shadow-sm shadow-slate-900/5 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/70">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={user.avatar} alt={user.name} className="h-12 w-12 rounded-xl object-cover" />
          <div>
            <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Learning Hub</h1>
            <p className="text-sm text-slate-600 dark:text-slate-300">Welcome back, {user.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 dark:bg-amber-900/40">
            <Bookmark size={12} />
            Continue Learning
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-2.5 py-1 dark:bg-sky-900/40">
            <Bell size={12} />
            {notificationCount} updates
          </span>
        </div>
      </div>

      {continueItem && (
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/80">
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Continue Learning</p>
          <p className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-slate-700 dark:text-slate-200">
            <PlayCircle size={14} />
            {continueItem}
          </p>
        </div>
      )}
    </header>
  )
}

export default LearningTopHeader
