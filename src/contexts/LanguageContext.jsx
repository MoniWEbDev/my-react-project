import React, { createContext, useEffect, useState, useContext } from 'react';
import { translations } from '../translations';

const LanguageContext = createContext();
const LANGUAGE_STORAGE_KEY = 'kb_language';

const getStoredLanguage = () => {
  try {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return saved && translations[saved] ? saved : 'en';
  } catch {
    return 'en';
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(getStoredLanguage);

  useEffect(() => {
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch {
      // Ignore storage write failures in restricted environments.
    }
    document.documentElement.lang = language;
  }, [language]);

  // Utility to quickly pull translation lines
  const t = (key) => translations[language][key] || translations['en'][key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
