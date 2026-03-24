import { useTranslation } from 'react-i18next'

const WasteChart = ({ entries }) => {
  const { t } = useTranslation()
  const grouped = entries.reduce((acc, item) => {
    acc[item.type] = (acc[item.type] ?? 0) + Number(item.weight)
    return acc
  }, {})

  const points = Object.entries(grouped)
  const maxValue = Math.max(...points.map(([, weight]) => weight), 1)

  if (!points.length) {
    return (
      <div className="rounded-xl border border-dashed border-emerald-300/80 p-6 text-sm text-slate-600 dark:border-emerald-800 dark:text-slate-300">
        {t('chart.empty')}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {points.map(([type, weight]) => {
        const ratio = (weight / maxValue) * 100
        return (
          <div key={type} className="space-y-1.5">
            <div className="flex items-center justify-between text-sm font-medium text-slate-700 dark:text-slate-200">
              <span className="capitalize">{type}</span>
              <span>{weight.toFixed(1)} {t('common.kg')}</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-emerald-100 dark:bg-emerald-950">
              <div
                className="h-full rounded-full bg-linear-to-r from-emerald-400 to-teal-500"
                style={{ width: `${Math.max(8, ratio)}%` }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default WasteChart
