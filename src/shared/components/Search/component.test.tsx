import { render, screen, fireEvent } from '@testing-library/react';
import { Search } from './component';

describe('Search', () => {
  it('должен корректно рендериться и показывать иконку поиска', () => {
    render(<Search />);

    const icon = screen.getByTestId('search-icon');
    expect(icon).toBeInTheDocument();

    const input = screen.getByPlaceholderText('Искать...');
    expect(input).toBeInTheDocument();
  });

  it('должен обновлять значение input при вводе текста', () => {
    render(<Search />);

    const input = screen.getByPlaceholderText('Искать...');

    fireEvent.change(input, { target: { value: 'тест' } });

    expect(input.value).toBe('тест');
  });

  it('должен принимать className через пропсы', () => {
    render(<Search className="custom-class" />);

    const searchContainer = screen.getByTestId('search-container');
    expect(searchContainer).toHaveClass('custom-class');
  });
});
