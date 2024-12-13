import { THEME } from '@/app/consts';
import { ThemeContext } from '@/app/contexts';
import { useContext } from 'react';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const isDark = theme === THEME.DARK;

  return (
    <button
      onClick={toggleTheme}
      className={`w-12 h-6 flex items-center rounded-full p-1
        ${isDark ? 'justify-end bg-blue-950' : 'justify-start bg-orange-500'}`}
    >
      <span
        className={`w-4 h-4 pb-[1px] bg-white rounded-full shadow-md flex items-center justify-center
          ${isDark ? 'opacity-0' : 'opacity-100'}`}
      >
        ☀️
      </span>
      <span
        className={`w-4 h-4 bg-white rounded-full shadow-md flex items-center justify-center 
          ${isDark ? 'opacity-100' : 'opacity-0'}`}
      >
        🌙
      </span>
    </button>
  );
};
