import { BookOpen, ClipboardCheck, Flame, LayoutDashboard, UserCircle2 } from 'lucide-react'

const items = [
  { id: 'profile', label: 'Profile', icon: UserCircle2 },
  { id: 'videos', label: 'Video Learning', icon: BookOpen },
  { id: 'quizzes', label: 'Quizzes', icon: ClipboardCheck },
  { id: 'games', label: 'Mini Games', icon: Flame },
  { id: 'activities', label: 'Activities', icon: LayoutDashboard },
]

const LearningSidebar = ({ active, onSelect }) => {
  return (
    <aside className="rounded-2xl border border-slate-200 bg-white/75 p-4 shadow-sm shadow-slate-900/5 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/70">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Learning Hub</h2>
      <nav className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = active === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm transition ${
                isActive
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              <Icon size={15} />
              {item.label}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}

export default LearningSidebar
