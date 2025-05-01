import { render, screen, fireEvent } from '@testing-library/react';
import { FiltersBar } from './component';
import { FiltersProps } from './component.props';

describe('FiltersBar', () => {
  const options: FiltersProps['options'] = [
    { id: 'all', label: 'Все' },
    { id: 'popular', label: 'Популярные' },
    { id: 'new', label: 'Новые' },
  ];

  const setup = (activeFilter = 'all', onFilterChange = jest.fn()) => {
    render(<FiltersBar options={options} activeFilter={activeFilter} onFilterChange={onFilterChange} />);
    return { onFilterChange };
  };

  it('рендерит все опции', () => {
    setup();

    expect(screen.getByText('Все')).toBeInTheDocument();
    expect(screen.getByText('Популярные')).toBeInTheDocument();
    expect(screen.getByText('Новые')).toBeInTheDocument();
  });

  it('подсвечивает активный фильтр', () => {
    setup('popular');

    const activeButton = screen.getByText('Популярные');
    expect(activeButton).toHaveClass('bg-base-grey-06');
    expect(activeButton).toHaveClass('font-bold');
  });

  it('вызывает onFilterChange при клике', () => {
    const { onFilterChange } = setup();

    const newButton = screen.getByText('Новые');
    fireEvent.click(newButton);

    expect(onFilterChange).toHaveBeenCalledTimes(1);
    expect(onFilterChange).toHaveBeenCalledWith('new');
  });

  it('применяет дополнительный класс', () => {
    render(<FiltersBar options={options} activeFilter="all" onFilterChange={() => {}} className="custom-class" />);

    const container = screen.getByRole('group');
    expect(container).toHaveClass('custom-class');
  });
});
