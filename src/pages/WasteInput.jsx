import { useMemo, useState } from 'react'
import { motion as Motion } from 'framer-motion'
import { Upload, Weight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useRecycling } from '../hooks/useRecycling'

const wasteTypes = ['plastic', 'metal', 'organic', 'paper', 'glass', 'e-waste']

const WasteInput = () => {
  const { t } = useTranslation()
  const [form, setForm] = useState({ type: 'plastic', weight: '' })
  const [error, setError] = useState('')
  const [uploadFeedback, setUploadFeedback] = useState('')
  const { entries, totalWeight, addEntry, addBulkEntries } = useRecycling()

  const onSubmit = (event) => {
    event.preventDefault()
    const parsedWeight = Number(form.weight)

    if (!form.type || !Number.isFinite(parsedWeight) || parsedWeight <= 0) {
      setError(t('waste.errors.invalidInput'))
      return
    }

    addEntry({ type: form.type, weight: parsedWeight })
    setForm((prev) => ({ ...prev, weight: '' }))
    setError('')
  }

  const onUploadFile = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const raw = await file.text()
      const parsed = JSON.parse(raw)
      const rows = Array.isArray(parsed) ? parsed : parsed.entries

      if (!Array.isArray(rows)) {
        setUploadFeedback(t('waste.errors.invalidJsonShape'))
        return
      }

      const added = addBulkEntries(rows)
      setUploadFeedback(t('waste.uploadedCount', { count: added }))
    } catch {
      setUploadFeedback(t('waste.errors.invalidJsonFile'))
    }
  }

  const recentEntries = useMemo(() => entries.slice(-6).reverse(), [entries])

  return (
    <section className="px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-emerald-200/70 bg-white/70 p-6 shadow-2xl shadow-emerald-900/10 backdrop-blur-sm dark:border-emerald-900 dark:bg-slate-900/70"
        >
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 sm:text-3xl">{t('waste.title')}</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            {t('waste.subtitle')}
          </p>

          <form onSubmit={onSubmit} className="mt-6 grid gap-4 sm:grid-cols-3">
            <select
              value={form.type}
              onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value }))}
              className="rounded-xl border border-emerald-200 bg-white px-4 py-3 text-sm capitalize outline-none ring-emerald-400 transition focus:ring-2 dark:border-emerald-900 dark:bg-slate-950"
            >
              {wasteTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <div className="relative">
              <Weight size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" />
              <input
                type="number"
                min="0.1"
                step="0.1"
                value={form.weight}
                onChange={(e) => setForm((prev) => ({ ...prev, weight: e.target.value }))}
                placeholder={t('waste.weightPlaceholder')}
                className="w-full rounded-xl border border-emerald-200 bg-white py-3 pl-9 pr-3 text-sm outline-none ring-emerald-400 transition focus:ring-2 dark:border-emerald-900 dark:bg-slate-950"
              />
            </div>

            <button
              type="submit"
              className="rounded-xl bg-linear-to-r from-emerald-500 to-teal-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:scale-[1.01]"
            >
              {t('waste.addEntry')}
            </button>
          </form>

          {error && <p className="mt-3 text-sm text-rose-600">{error}</p>}

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-emerald-200 px-4 py-2 text-sm font-medium text-emerald-700 dark:border-emerald-900 dark:text-emerald-300">
              <Upload size={16} />
              {t('waste.uploadJson')}
              <input type="file" accept="application/json" onChange={onUploadFile} className="hidden" />
            </label>
            <p className="text-sm text-slate-600 dark:text-slate-300">{t('waste.totalSubmitted', { total: totalWeight.toFixed(1) })}</p>
          </div>

          {uploadFeedback && <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">{uploadFeedback}</p>}
        </Motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-emerald-200/70 bg-white/70 p-6 shadow-lg shadow-emerald-900/10 backdrop-blur-sm dark:border-emerald-900 dark:bg-slate-900/70">
            <h2 className="text-lg font-semibold">{t('waste.recentEntries')}</h2>
            <div className="mt-4 space-y-2">
              {recentEntries.length === 0 && (
                <p className="text-sm text-slate-600 dark:text-slate-300">{t('waste.noEntries')}</p>
              )}
              {recentEntries.map((entry) => (
                <div key={entry.id} className="flex items-center justify-between rounded-xl bg-emerald-50/70 px-3 py-2 text-sm dark:bg-slate-800/70">
                  <span className="capitalize text-slate-700 dark:text-slate-200">{entry.type}</span>
                  <span className="font-semibold text-emerald-700 dark:text-emerald-300">{entry.weight} {t('common.kg')}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-200/70 bg-linear-to-br from-emerald-500 to-teal-500 p-6 text-white shadow-lg shadow-emerald-500/30">
            <h2 className="text-lg font-semibold">{t('waste.ctaTitle')}</h2>
            <p className="mt-2 text-sm text-white/90">
              {t('waste.ctaSubtitle')}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/gifts"
                className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:scale-105"
              >
                {t('waste.viewGifts')}
              </Link>
              <Link
                to="/dashboard"
                className="rounded-xl border border-white/60 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {t('waste.openDashboard')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WasteInput
