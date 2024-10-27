import { THEME, LOCAL_STORAGE_THEME, DEFAULT_THEME } from '../../consts';

export const loadTheme = (): THEME => {
  const storedTheme = localStorage.getItem(LOCAL_STORAGE_THEME);
  let actualTheme: THEME;
  if (storedTheme && Object.values(THEME).map(String).includes(storedTheme)) {
    actualTheme = storedTheme as THEME;
  } else {
    actualTheme = DEFAULT_THEME;
  }
  document.documentElement.setAttribute(LOCAL_STORAGE_THEME, actualTheme);
  return actualTheme;
};
