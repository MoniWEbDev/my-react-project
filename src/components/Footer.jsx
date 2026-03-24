import { Leaf, Mail, MapPin } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-emerald-100 bg-white/60 px-4 py-10 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
        <div>
          <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-emerald-700 dark:text-emerald-300">
            <Leaf size={18} />
            {t('footer.brand')}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {t('footer.tagline')}
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{t('footer.platform')}</h3>
          <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <li>{t('footer.item1')}</li>
            <li>{t('footer.item2')}</li>
            <li>{t('footer.item3')}</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{t('footer.contact')}</h3>
          <p className="mb-2 flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
            <MapPin size={16} />
            {t('footer.address')}
          </p>
          <p className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
            <Mail size={16} />
            hello@ecorewards.app
          </p>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl border-t border-emerald-100 pt-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
        <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
      </div>
    </footer>
  )
}

export default Footer
