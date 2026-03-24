import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const UserAuthCard = ({ isAuthenticated, currentUser, onLogin, onLogout }) => {
  const { t } = useTranslation()
  const [form, setForm] = useState({
    name: currentUser.name,
    location: currentUser.location,
  })

  const submit = (event) => {
    event.preventDefault()
    onLogin(form)
  }

  return (
    <article className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm shadow-slate-900/5 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/70">
      <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">{t('community.userSystem')}</h2>
      {isAuthenticated ? (
        <div className="mt-3 space-y-3">
          <p className="text-sm text-slate-600 dark:text-slate-300">{t('community.signedInAs', { name: currentUser.name })}</p>
          <button
            type="button"
            onClick={onLogout}
            className="rounded-xl border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-600 transition hover:bg-rose-50 dark:border-rose-900/50 dark:hover:bg-rose-950/30"
          >
            {t('community.logout')}
          </button>
        </div>
      ) : (
        <form className="mt-3 space-y-3" onSubmit={submit}>
          <input
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
            placeholder={t('community.name')}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none dark:border-slate-700 dark:bg-slate-950"
          />
          <input
            value={form.location}
            onChange={(event) => setForm((prev) => ({ ...prev, location: event.target.value }))}
            placeholder={t('community.location')}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none dark:border-slate-700 dark:bg-slate-950"
          />
          <button className="w-full rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white">
            {t('community.loginSignup')}
          </button>
        </form>
      )}
    </article>
  )
}

export default UserAuthCard
