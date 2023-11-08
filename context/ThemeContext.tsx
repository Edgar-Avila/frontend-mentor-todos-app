'use client';

import { Config } from '@/config';
import { ThemeType } from '@/types/types';
import { FC, ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

const today = new Date();
const thisYear = today.getFullYear();
const expires = new Date(today.setFullYear(thisYear + 10));

export const ThemeProvider: FC<{ children: ReactNode, initialValue: ThemeType }> = ({ children, initialValue }) => {
  const [_, setCookie] = useCookies([Config.themeCookieKey]);
  const [theme, setTheme] = useState<ThemeType>(initialValue);
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setCookie(Config.themeCookieKey, newTheme, { expires });
    setTheme(newTheme);
  }

  useEffect(() => {
    setCookie(Config.themeCookieKey, initialValue, { expires });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => useContext(ThemeContext);