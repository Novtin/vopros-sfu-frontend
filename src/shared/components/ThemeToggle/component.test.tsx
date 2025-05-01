import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from './component';
import { ThemeContext } from '@/app/contexts';
import { THEME } from '@/app/consts';

jest.mock('@/app/consts/server', () => ({
  SERVER_URL: 'http://mocked-server',
  BASE_API_URL: 'http://mocked-server/api',
  API_VERSION: 'v1',
}));

describe('ThemeToggle', () => {
  const toggleThemeMock = jest.fn();

  const renderComponent = (theme = THEME.LIGHT) => {
    render(
      <ThemeContext.Provider value={{ theme, toggleTheme: toggleThemeMock }}>
        <ThemeToggle />
      </ThemeContext.Provider>,
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('должен отображать солнце при светлой теме', () => {
    renderComponent(THEME.LIGHT);

    expect(screen.getByText('☀️')).toHaveClass('opacity-100');
    expect(screen.getByText('🌙')).toHaveClass('opacity-0');
  });

  it('должен отображать луну при тёмной теме', () => {
    renderComponent(THEME.DARK);

    expect(screen.getByText('🌙')).toHaveClass('opacity-100');
    expect(screen.getByText('☀️')).toHaveClass('opacity-0');
  });

  it('должен вызывать toggleTheme при клике на кнопку', () => {
    renderComponent();

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(toggleThemeMock).toHaveBeenCalledTimes(1);
  });

  it('должен иметь класс фона для светлой темы', () => {
    renderComponent(THEME.LIGHT);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-orange-500');
    expect(button).toHaveClass('justify-start');
  });

  it('должен иметь класс фона для тёмной темы', () => {
    renderComponent(THEME.DARK);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-blue-950');
    expect(button).toHaveClass('justify-end');
  });
});
