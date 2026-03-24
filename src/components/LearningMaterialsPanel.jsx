import { Download, Headphones, Image as ImageIcon, ListChecks } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import SmartImage from './SmartImage'

const LearningMaterialsPanel = ({ materials, language }) => {
  const { t } = useTranslation()
  const notes = materials.smartNotes?.[language] ?? materials.smartNotes?.en ?? []
  const steps = materials.stepDiagram?.[language] ?? materials.stepDiagram?.en ?? []
  const guides = materials.guides?.[language] ?? materials.guides?.en ?? []

  return (
    <article className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900/70">
      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{t('learning.materialTitle')}</h3>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="space-y-2 rounded-xl border border-slate-200 p-3 dark:border-slate-700">
          <p className="inline-flex items-center gap-1 text-sm font-medium text-slate-700 dark:text-slate-200">
            <ListChecks size={14} />
            {t('learning.smartNotes')}
          </p>
          <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
            {notes.map((note) => (
              <li key={note}>• {note}</li>
            ))}
          </ul>
        </div>

        <div className="space-y-2 rounded-xl border border-slate-200 p-3 dark:border-slate-700">
          <p className="inline-flex items-center gap-1 text-sm font-medium text-slate-700 dark:text-slate-200">
            <ImageIcon size={14} />
            {t('learning.visualLearning')}
          </p>
          <SmartImage src={materials.infographic} alt={t('learning.fallbackAlt')} className="h-28 w-full rounded-lg object-cover" />
          <div className="text-xs text-slate-600 dark:text-slate-300">
            {steps.join(' -> ')}
          </div>
        </div>

        <div className="space-y-2 rounded-xl border border-slate-200 p-3 dark:border-slate-700">
          <p className="inline-flex items-center gap-1 text-sm font-medium text-slate-700 dark:text-slate-200">
            <Headphones size={14} />
            {t('learning.audioLearning')}
          </p>
          <audio controls preload="none" className="w-full">
            <source src={materials.audioUrl} type="audio/mpeg" />
          </audio>
        </div>

        <div className="space-y-2 rounded-xl border border-slate-200 p-3 dark:border-slate-700">
          <p className="inline-flex items-center gap-1 text-sm font-medium text-slate-700 dark:text-slate-200">
            <Download size={14} />
            {t('learning.guides')}
          </p>
          {guides.map((guide) => (
            <a
              key={guide.url}
              href={guide.url}
              target="_blank"
              rel="noreferrer"
              className="block rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              {guide.label}
            </a>
          ))}
        </div>
      </div>
    </article>
  )
}

export default LearningMaterialsPanel
