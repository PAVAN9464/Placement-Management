import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('placement-user');
    return stored ? JSON.parse(stored) : null;
  });

  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('placement-theme');
    return stored || 'light';
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('placement-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('placement-user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('placement-theme', theme);
    document.documentElement.classList.toggle('dark-theme', theme === 'dark');
  }, [theme]);

  const login = (role, name) => setUser({ role, name });
  const logout = () => setUser(null);
  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  const value = useMemo(() => ({ user, login, logout, theme, toggleTheme }), [user, theme]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
