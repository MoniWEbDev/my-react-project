import { BookOpen, Lock, ShieldCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import SmartImage from './SmartImage'

const getLocalizedValue = (value, language) => {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value[language] ?? value.en ?? Object.values(value)[0]
  }

  return value
}

const ExploreSkillCard = ({ skill, progress, onOpen, language }) => {
  const { t } = useTranslation()
  const locked = !progress || progress.completedVideos.length === 0
  const completedUnits =
    (progress?.completedVideos?.length ?? 0) +
    (progress?.testResult ? 1 : 0) +
    (progress?.assignmentCompleted ? 1 : 0)
  const totalUnits = skill.videos.length + 2
  const progressPercent = Math.round((completedUnits / totalUnits) * 100)

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white/80 shadow-sm shadow-slate-900/5 transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/70">
      <SmartImage
        src={skill.image}
        fallbackSrc={skill.fallbackImage}
        alt={getLocalizedValue(skill.name, language)}
        className="h-36 w-full object-cover"
      />
      <div className="space-y-3 p-4">
        <div>
          <h3 className="line-clamp-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
            {getLocalizedValue(skill.name, language)}
          </h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {t(`categories.${skill.category}`, skill.category)} • {t(`difficulty.${skill.difficulty}`, skill.difficulty)}
          </p>
          <p className="mt-1 line-clamp-3 text-xs text-slate-600 dark:text-slate-300">
            {getLocalizedValue(skill.description, language)}
          </p>
        </div>

        <div>
          <div className="mb-1 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>{t('learning.skillProgress')}</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
            <div className="h-full bg-linear-to-r from-emerald-400 to-teal-500" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <span className="inline-flex items-center gap-1">
            <BookOpen size={12} />
            3 {t('learning.modules')}
          </span>
          <span className="inline-flex items-center gap-1">
            {locked ? <Lock size={12} /> : <ShieldCheck size={12} />}
            {locked ? t('learning.notStarted') : t('learning.inProgress')}
          </span>
        </div>

        <button
          type="button"
          onClick={onOpen}
          className="w-full rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
        >
          {t('common.openSkill')}
        </button>
      </div>
    </article>
  )
}

export default ExploreSkillCard
