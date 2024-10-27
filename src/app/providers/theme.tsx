import { useCallback, useEffect, useMemo, useState } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { loadTheme } from '../shared/lib';
import type { IDefaultProps } from '../shared/types/defaultProps';
import { LOCAL_STORAGE_THEME, THEME } from '../consts';

export const ThemeProvider = ({ children }: IDefaultProps) => {
  const [themeState, setThemeState] = useState(loadTheme());

  useEffect(() => {
    document.documentElement.classList.toggle('dark', themeState === THEME.DARK);
  }, [themeState]);

  const toggleTheme = useCallback(() => {
    const newTheme = themeState === THEME.LIGHT ? THEME.DARK : THEME.LIGHT;
    setThemeState(newTheme);
    localStorage.setItem(LOCAL_STORAGE_THEME, newTheme);
  }, [themeState]);

  const value = useMemo(
    () => ({
      theme: themeState,
      toggleTheme,
    }),
    [themeState, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
