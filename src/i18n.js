import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './locales/en.json'
import hi from './locales/hi.json'
import mr from './locales/mr.json'
import bn from './locales/bn.json'

const resources = {
  en: { translation: en },
  hi: { translation: hi },
  mr: { translation: mr },
  bn: { translation: bn },
}

const storedLanguage = localStorage.getItem('app_language') || 'en'

i18n.use(initReactI18next).init({
  resources,
  lng: storedLanguage,
  fallbackLng: 'en',
  supportedLngs: ['en', 'hi', 'bn', 'mr'],
  interpolation: { escapeValue: false },
})

export default i18n
