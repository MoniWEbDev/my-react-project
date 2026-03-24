import { motion as Motion } from 'framer-motion'
import { ArrowRight, Leaf, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Home = () => {
  const { t } = useTranslation()

  const highlights = [
    t('home.highlight1'),
    t('home.highlight2'),
    t('home.highlight3'),
  ]

  return (
    <div className="px-4 pb-20 pt-6 sm:px-6 lg:px-8">
      <section className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-emerald-200/80 bg-linear-to-br from-emerald-100 via-white to-teal-100 px-6 py-14 shadow-2xl shadow-emerald-900/10 dark:border-emerald-900 dark:from-emerald-950 dark:via-slate-950 dark:to-teal-950 md:px-10">
        <div className="pointer-events-none absolute -left-10 top-16 h-40 w-40 rounded-full bg-emerald-300/30 blur-3xl dark:bg-emerald-700/20" />
        <div className="pointer-events-none absolute -right-10 top-4 h-52 w-52 rounded-full bg-teal-300/30 blur-3xl dark:bg-teal-700/20" />

        <div className="relative grid items-center gap-10 lg:grid-cols-2">
          <Motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-300/70 bg-white/70 px-3 py-1 text-xs font-semibold text-emerald-700 backdrop-blur-sm dark:border-emerald-700 dark:bg-slate-900/60 dark:text-emerald-300">
              <Leaf size={14} />
              {t('home.badge')}
            </div>
            <h1 className="text-4xl font-bold leading-tight text-slate-900 dark:text-slate-50 sm:text-5xl">
              {t('home.title1')}
              <span className="block text-emerald-600 dark:text-emerald-300">{t('home.title2')}</span>
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
              {t('home.subtitle')}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/waste"
                className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-emerald-500 to-teal-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:scale-[1.02]"
              >
                {t('home.start')}
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/dashboard"
                className="rounded-xl border border-emerald-300/70 bg-white/70 px-5 py-3 text-sm font-semibold text-emerald-700 backdrop-blur-sm transition hover:bg-emerald-50 dark:border-emerald-800 dark:bg-slate-900/70 dark:text-emerald-300"
              >
                {t('home.viewDashboard')}
              </Link>
            </div>
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl border border-white/60 bg-white/60 p-6 shadow-xl backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/70"
          >
            <h2 className="mb-4 inline-flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
              <Sparkles size={18} className="text-emerald-500" />
              {t('home.why')}
            </h2>
            <div className="space-y-3">
              {highlights.map((item, index) => (
                <Motion.div
                  key={item}
                  initial={{ opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="rounded-xl bg-emerald-50/80 px-4 py-3 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  {item}
                </Motion.div>
              ))}
            </div>
          </Motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
