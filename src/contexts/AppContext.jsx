import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { AppContext } from './app-context'

const SUPPORTED_LANGUAGES = ['en', 'hi', 'bn', 'mr']
const SUPPORTED_THEMES = ['light', 'dark']

const defaultUser = {
  name: 'Guest User',
  photo:
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
  location: 'Village - Nashik',
  bio: 'Skill learner and sustainable living enthusiast.',
  skills: ['Pottery', 'Composting'],
}

export const AppProvider = ({ children }) => {
  const { i18n } = useTranslation()
  const [language, setLanguage] = useLocalStorage('app_language', 'en')
  const [theme, setTheme] = useLocalStorage('app_theme', 'light')
  const [currentUser, setCurrentUser] = useLocalStorage('app_current_user', defaultUser)
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage('app_authenticated', false)

  useEffect(() => {
    if (!SUPPORTED_LANGUAGES.includes(language)) {
      setLanguage('en')
    }
  }, [language, setLanguage])

  useEffect(() => {
    if (!SUPPORTED_THEMES.includes(theme)) {
      setTheme('light')
    }
  }, [theme, setTheme])

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [i18n, language])

  useEffect(() => {
    const isDark = theme === 'dark'
    document.documentElement.classList.toggle('dark', isDark)
    document.body.classList.toggle('dark', isDark)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  const login = (payload) => {
    setCurrentUser((prev) => ({ ...prev, ...payload }))
    setIsAuthenticated(true)
  }

  const logout = () => setIsAuthenticated(false)

  const value = {
    language,
    setLanguage,
    theme,
    toggleTheme,
    isAuthenticated,
    currentUser,
    login,
    logout,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
