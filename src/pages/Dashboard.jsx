import { Link } from 'react-router-dom'
import { motion as Motion } from 'framer-motion'
import { Award, Gauge, Sparkles, Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { gifts } from '../data/gifts'
import GiftCard from '../components/GiftCard'
import WasteChart from '../components/WasteChart'
import { useRecycling } from '../hooks/useRecycling'
import { getTierMeta, nextLevelProgress } from '../utils/rewardEngine'

const tierOrder = { none: 0, low: 1, medium: 2, premium: 3 }

const Dashboard = () => {
  const { t } = useTranslation()
  const { entries, totalWeight, tier, points, clearEntries } = useRecycling()
  const tierMeta = getTierMeta(tier)
  const progressInfo = nextLevelProgress(totalWeight)

  const eligibleRewards = gifts.filter((gift) => tierOrder[gift.tier] <= tierOrder[tier])

  return (
    <section className="px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <Motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-emerald-200/70 bg-white/70 p-6 shadow-2xl shadow-emerald-900/10 backdrop-blur-sm dark:border-emerald-900 dark:bg-slate-900/70"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">{t('dashboard.title')}</h1>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{t('dashboard.subtitle')}</p>
            </div>
            <button
              onClick={clearEntries}
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-50 dark:border-rose-900/50 dark:hover:bg-rose-950/40"
            >
              <Trash2 size={16} />
              {t('dashboard.reset')}
            </button>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-emerald-50 p-4 dark:bg-slate-800/70">
              <p className="text-xs uppercase tracking-wide text-slate-500">{t('dashboard.totalWaste')}</p>
              <p className="mt-1 text-2xl font-bold text-emerald-700 dark:text-emerald-300">{totalWeight.toFixed(1)} {t('common.kg')}</p>
            </div>
            <div className="rounded-2xl bg-emerald-50 p-4 dark:bg-slate-800/70">
              <p className="text-xs uppercase tracking-wide text-slate-500">{t('dashboard.tier')}</p>
              <p className="mt-1 inline-flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-slate-100">
                <Award size={16} className="text-amber-500" />
                {tierMeta.label}
              </p>
            </div>
            <div className="rounded-2xl bg-emerald-50 p-4 dark:bg-slate-800/70">
              <p className="text-xs uppercase tracking-wide text-slate-500">{t('dashboard.points')}</p>
              <p className="mt-1 inline-flex items-center gap-2 text-2xl font-bold text-teal-700 dark:text-teal-300">
                <Sparkles size={16} />
                {points}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
              <span className="inline-flex items-center gap-2">
                <Gauge size={14} />
                {t('dashboard.levelProgress')}
              </span>
              <span>{Math.round(progressInfo.progress)}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-emerald-100 dark:bg-emerald-950">
              <div
                className="h-full bg-linear-to-r from-emerald-500 to-teal-500"
                style={{ width: `${progressInfo.progress}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{progressInfo.target}</p>
          </div>
        </Motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-emerald-200/70 bg-white/70 p-6 shadow-lg shadow-emerald-900/10 backdrop-blur-sm dark:border-emerald-900 dark:bg-slate-900/70">
            <h2 className="mb-4 text-lg font-semibold">{t('dashboard.breakdown')}</h2>
            <WasteChart entries={entries} />
          </div>

          <div className="rounded-3xl border border-emerald-200/70 bg-white/70 p-6 shadow-lg shadow-emerald-900/10 backdrop-blur-sm dark:border-emerald-900 dark:bg-slate-900/70">
            <h2 className="mb-4 text-lg font-semibold">{t('dashboard.eligibleRewards')}</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {t('dashboard.redeemLine', { count: eligibleRewards.length })}
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {eligibleRewards.slice(0, 4).map((gift, index) => (
                <GiftCard key={gift.id} gift={gift} delay={index * 0.06} />
              ))}
            </div>
            <Link
              to="/gifts"
              className="mt-4 inline-block rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
            >
              {t('dashboard.exploreGifts')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Dashboard
