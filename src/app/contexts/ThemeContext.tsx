import { createContext } from 'react';
import type { THEME } from '../consts';
import { DEFAULT_THEME } from '../consts';

type Context = {
  theme: THEME;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<Context>({
  theme: DEFAULT_THEME,
  toggleTheme: () => console.warn('toggleTheme() is not implemented!'),
});
