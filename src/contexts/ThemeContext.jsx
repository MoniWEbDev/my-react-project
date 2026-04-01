import React, { useEffect, useMemo, useState } from 'react';
import ThemeContext from './themeContext';

const THEME_STORAGE_KEY = 'theme';
const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'light';

  try {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }
  } catch {
    // Ignore storage access issues and fall back to system preference.
  }

  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.body.classList.toggle('theme-dark', theme === 'dark');
    document.body.classList.toggle('theme-light', theme === 'light');

    const root = document.getElementById('root');
    if (root) {
      root.classList.toggle('theme-dark', theme === 'dark');
      root.classList.toggle('theme-light', theme === 'light');
    }

    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore storage write errors in restricted environments.
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((previousTheme) => (previousTheme === 'light' ? 'dark' : 'light'));
  };

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
