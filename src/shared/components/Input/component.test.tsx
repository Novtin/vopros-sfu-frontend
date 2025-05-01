import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './component';

describe('Input', () => {
  it('рендерит инпут с плейсхолдером', () => {
    render(<Input placeholder="Введите текст" />);
    const input = screen.getByPlaceholderText('Введите текст');
    expect(input).toBeInTheDocument();
  });

  it('рендерит лейбл, если передан', () => {
    render(<Input label="Email" />);
    const label = screen.getByText('Email');
    expect(label).toBeInTheDocument();
  });

  it('рендерит текст ошибки, если передан', () => {
    render(<Input placeholder="Email" error="Ошибка ввода" />);
    const errorMessage = screen.getByText('Ошибка ввода');
    expect(errorMessage).toBeInTheDocument();
  });

  it('рендерит кнопку переключения видимости пароля, если toggleVisibility и type="password"', () => {
    render(<Input type="password" toggleVisibility placeholder="Пароль" />);
    const toggleButton = screen.getByRole('button', { name: /toggle password visibility/i });
    expect(toggleButton).toBeInTheDocument();
  });

  it('переключает видимость пароля при клике на кнопку', () => {
    render(<Input type="password" toggleVisibility placeholder="Пароль" />);
    const input = screen.getByPlaceholderText('Пароль') as HTMLInputElement;
    const toggleButton = screen.getByRole('button', { name: /toggle password visibility/i });

    expect(input.type).toBe('password');

    fireEvent.click(toggleButton);
    expect(input.type).toBe('text');

    fireEvent.click(toggleButton);
    expect(input.type).toBe('password');
  });

  it('применяет класс ошибки, если есть ошибка', () => {
    render(<Input placeholder="Email" error="Ошибка" />);
    const input = screen.getByPlaceholderText('Email');
    expect(input).toHaveClass('border-red-500');
  });

  it('применяет класс успеха, если есть success', () => {
    render(<Input placeholder="Email" success />);
    const input = screen.getByPlaceholderText('Email');
    expect(input).toHaveClass('border-green-500');
  });

  it('не рендерит кнопку переключения видимости, если type не password', () => {
    render(<Input type="text" toggleVisibility placeholder="Username" />);
    const toggleButton = screen.queryByRole('button', { name: /toggle password visibility/i });
    expect(toggleButton).not.toBeInTheDocument();
  });
});
