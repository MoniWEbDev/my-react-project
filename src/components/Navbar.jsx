import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, Moon, Recycle, Sun, X } from 'lucide-react'
import { motion as Motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useApp } from '../hooks/useApp'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useTranslation()
  const { language, setLanguage, theme, toggleTheme } = useApp()

  const navItems = [
    { label: t('nav.home'), to: '/' },
    { label: t('nav.waste'), to: '/waste' },
    { label: t('nav.gifts'), to: '/gifts' },
    { label: t('nav.dashboard'), to: '/dashboard' },
    { label: t('nav.learning'), to: '/learning' },
    { label: t('nav.community'), to: '/community' },
  ]

  const toggleMenu = () => setIsMenuOpen((prev) => !prev)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/40 bg-white/70 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/70">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold text-emerald-700 dark:text-emerald-300" onClick={closeMenu}>
          <Recycle size={26} />
          EcoRewards
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-xl px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-100'
                    : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-emerald-300'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <select
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            className="rounded-xl border border-emerald-200 bg-white/60 px-2 py-2 text-xs font-semibold text-emerald-700 outline-none dark:border-emerald-900 dark:bg-slate-900/80 dark:text-emerald-200"
            aria-label="Language switcher"
          >
            <option value="en">EN</option>
            <option value="hi">HI</option>
            <option value="bn">BN</option>
            <option value="mr">MR</option>
          </select>

          <button
            onClick={toggleTheme}
            type="button"
            className="rounded-xl border border-emerald-200 bg-white/60 p-2.5 text-emerald-700 transition hover:scale-105 dark:border-emerald-900 dark:bg-slate-900/80 dark:text-emerald-200"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={toggleMenu}
            type="button"
            className="rounded-xl border border-emerald-200 bg-white/60 p-2.5 text-emerald-700 md:hidden dark:border-emerald-900 dark:bg-slate-900/80 dark:text-emerald-200"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <Motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-emerald-100 bg-white/90 px-4 pb-4 pt-2 backdrop-blur-xl md:hidden dark:border-slate-800 dark:bg-slate-950/90"
        >
          <div className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `block rounded-xl px-4 py-2 text-sm font-medium ${
                    isActive
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-100'
                      : 'text-slate-700 dark:text-slate-300'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </Motion.div>
      )}
    </header>
  )
}

export default Navbar
