import { CheckCircle2, Gift, Lock, UploadCloud } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const getLocalizedValue = (value, language) => {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value[language] ?? value.en ?? Object.values(value)[0]
  }

  return value
}

const AssignmentCard = ({
  activity,
  completed,
  onComplete,
  assignment,
  assignmentUnlocked,
  assignmentFile,
  onAssignmentUpload,
  onAssignmentComplete,
  language,
}) => {
  const { t } = useTranslation()

  if (assignment) {
    return (
      <article className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm shadow-slate-900/5 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/70">
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{t('learning.practicalAssignment')}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{getLocalizedValue(assignment.instruction, language)}</p>

        {!assignmentUnlocked && (
          <p className="mt-3 inline-flex items-center gap-1 rounded-xl border border-dashed border-slate-300 px-3 py-2 text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
            <Lock size={12} />
            {t('learning.assignmentLocked')}
          </p>
        )}

        <div className={`mt-4 space-y-3 ${!assignmentUnlocked ? 'pointer-events-none opacity-50' : ''}`}>
          <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
            <UploadCloud size={14} />
            {t('common.uploadProof')}
            <input
              type="file"
              accept="image/*,video/*"
              onChange={onAssignmentUpload}
              className="hidden"
            />
          </label>

          {assignmentFile && (
            <div className="rounded-xl bg-slate-100 px-3 py-2 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {t('learning.uploaded')}: {assignmentFile.name || t('learning.assignmentFileAttached')}
            </div>
          )}

          <button
            type="button"
            onClick={onAssignmentComplete}
            disabled={completed || !assignmentFile}
            className="w-full rounded-xl bg-violet-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {completed ? t('common.completed') : t('common.markComplete')}
          </button>
        </div>

        {completed && (
          <p className="mt-3 inline-flex items-center gap-1 rounded-xl bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
            <CheckCircle2 size={12} />
            {t('common.certificateUnlocked')}
          </p>
        )}
      </article>
    )
  }

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

export default AssignmentCard
