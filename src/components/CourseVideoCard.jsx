import { CheckCircle2, Lock, PlayCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import SmartImage from './SmartImage'

const getLocalizedValue = (value, language) => {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value[language] ?? value.en ?? Object.values(value)[0]
  }

  return value
}

const CourseVideoCard = ({ video, isCompleted, isLocked, onComplete, language }) => {
  const { t } = useTranslation()

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white/80 shadow-sm shadow-slate-900/5 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/70">
      <div className="relative h-40 overflow-hidden">
        <SmartImage
          src={video.thumbnail}
          alt={getLocalizedValue(video.title, language) || t('learning.fallbackAlt')}
          className="h-full w-full object-cover"
        />
        <span
          className={`absolute right-3 top-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
            isCompleted
              ? 'bg-emerald-500 text-white'
              : isLocked
                ? 'bg-slate-900/80 text-white'
                : 'bg-white/90 text-slate-700'
          }`}
        >
          {isCompleted ? <CheckCircle2 size={12} /> : isLocked ? <Lock size={12} /> : <PlayCircle size={12} />}
          {isCompleted ? t('common.completed') : isLocked ? t('common.locked') : t('common.ready')}
        </span>
      </div>

      <div className="space-y-3 p-4">
        <h3 className="line-clamp-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
          {getLocalizedValue(video.title, language)}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">{t('learning.duration')}: {video.duration}</p>
        <button
          type="button"
          onClick={onComplete}
          disabled={isLocked || isCompleted}
          className="w-full rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
        >
          {isCompleted ? t('learning.videoCompleted') : t('learning.markVideoComplete')}
        </button>
      </div>
    </article>
  )
}

export default CourseVideoCard
