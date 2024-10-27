import { useContext } from 'react';
import { THEME } from '../../../consts';
import { ThemeContext } from '../../../contexts';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-500 
        ${theme === THEME.DARK ? 'justify-end bg-blue-950' : 'justify-start bg-orange-500'}`}
    >
      <span
        className={`w-4 h-4 pb-[2px] bg-white rounded-full shadow-md flex items-center justify-center transition-colors duration-500
          ${theme === THEME.DARK ? 'opacity-0' : 'opacity-100'}`}
      >
        ☀️
      </span>
      <span
        className={`w-4 h-4 bg-white rounded-full shadow-md flex items-center justify-center 
          ${theme === THEME.DARK ? 'opacity-100' : 'opacity-0'}`}
      >
        🌙
      </span>
    </button>
  );
};
