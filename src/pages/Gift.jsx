import { useEffect, useMemo, useState } from 'react'
import { gifts } from '../data/gifts'
import GiftCard from '../components/GiftCard'
import LoadingSkeleton from '../components/LoadingSkeleton'
import { useTranslation } from 'react-i18next'
import { useRecycling } from '../hooks/useRecycling'

const tierOrder = { none: 0, low: 1, medium: 2, premium: 3 }

const Gift = () => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(true)
  const { tier, totalWeight } = useRecycling()

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 450)
    return () => clearTimeout(timer)
  }, [])

  const filtered = useMemo(
    () => gifts.filter((gift) => tierOrder[gift.tier] <= tierOrder[tier]),
    [tier],
  )

  return (
    <section className="px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-3xl border border-emerald-200/70 bg-white/70 p-6 shadow-lg shadow-emerald-900/10 backdrop-blur-sm dark:border-emerald-900 dark:bg-slate-900/70">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 sm:text-3xl">{t('gifts.title')}</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            {t('gifts.subtitle', { total: totalWeight.toFixed(1) })}
          </p>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((gift, index) => (
              <GiftCard key={gift.id} gift={gift} delay={index * 0.05} />
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="mt-6 rounded-2xl border border-dashed border-emerald-300/80 p-6 text-sm text-slate-600 dark:border-emerald-800 dark:text-slate-300">
            {t('gifts.empty')}
          </div>
        )}
      </div>
    </section>
  )
}

export default Gift
