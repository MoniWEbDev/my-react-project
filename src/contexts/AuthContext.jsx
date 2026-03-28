/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useMemo, useState } from 'react';

const AUTH_STORAGE_KEY = 'kb_current_user';
const AuthContext = createContext();

const readStoredUser = () => {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    return {
      name: parsed.name || '',
      email: parsed.email || '',
      role: parsed.role || 'user',
    };
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(readStoredUser);

  const login = (authUser) => {
    const normalizedUser = {
      name: authUser?.name || '',
      email: authUser?.email || '',
      role: authUser?.role || 'user',
    };
    setUser(normalizedUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(normalizedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === 'admin',
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
