import { useTranslation } from 'react-i18next'

const SellerEarningsCard = ({ soldCount, earnings }) => {
  const { t } = useTranslation()

  return (
    <article className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm shadow-slate-900/5 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/70">
      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{t('community.income')}</h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-slate-100 px-4 py-3 dark:bg-slate-800">
          <p className="text-xs text-slate-500 dark:text-slate-400">{t('community.productsSold')}</p>
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{soldCount}</p>
        </div>
        <div className="rounded-xl bg-slate-100 px-4 py-3 dark:bg-slate-800">
          <p className="text-xs text-slate-500 dark:text-slate-400">{t('community.totalEarnings')}</p>
          <p className="text-lg font-semibold text-emerald-700 dark:text-emerald-300">Rs. {earnings}</p>
        </div>
      </div>
      <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
        {t('community.incomeNote')}
      </p>
    </article>
  )
}

export default SellerEarningsCard
