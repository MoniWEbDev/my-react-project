import { CheckCircle2, Gift } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const ActivityCard = ({ activity, completed, onComplete }) => {
  const { t } = useTranslation()

  return (
    <article className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm shadow-slate-900/5 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/70">
      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{activity.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{activity.instructions}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="inline-flex items-center gap-1 rounded-full bg-violet-100 px-2.5 py-1 text-xs font-medium text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
          <Gift size={12} />
          +{activity.points} pts
        </span>

        <button
          type="button"
          onClick={onComplete}
          disabled={completed}
          className={`inline-flex items-center gap-1 rounded-xl px-3 py-2 text-xs font-semibold transition ${
            completed
              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200'
              : 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white'
          }`}
        >
          <CheckCircle2 size={13} />
          {completed ? t('common.completed') : t('common.markComplete')}
        </button>
      </div>
    </article>
  )
}

export default ActivityCard
