import { render, screen } from '@testing-library/react';
import { ProfileStats } from './component';

describe('ProfileStats', () => {
  const mockItems = [
    { label: 'Вопросов', value: 10 },
    { label: 'Ответов', value: 5 },
  ];

  it('отображает заголовок по умолчанию, если он не указан', () => {
    render(<ProfileStats items={mockItems} />);
    expect(screen.getByText('Статистика')).toBeInTheDocument();
  });

  it('отображает пользовательский заголовок', () => {
    render(<ProfileStats title="Активность" items={mockItems} />);
    expect(screen.getByText('Активность')).toBeInTheDocument();
  });

  it('корректно отображает все элементы', () => {
    render(<ProfileStats items={mockItems} />);
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('Вопросов')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('Ответов')).toBeInTheDocument();
  });

  it('применяет пользовательское имя класса', () => {
    const { container } = render(<ProfileStats items={mockItems} className="custom-class" />);
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });
});
