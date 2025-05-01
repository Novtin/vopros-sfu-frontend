import { render, screen, fireEvent } from '@testing-library/react';
import { TagInput } from './component';
import { Tag } from '@/shared/types';

describe('TagInput', () => {
  const allTags: Tag[] = [
    { id: 1, name: 'React' },
    { id: 2, name: 'TypeScript' },
    { id: 3, name: 'JavaScript' },
  ];

  const renderComponent = (selectedTags: Tag[] = [], onChange = jest.fn()) => {
    render(<TagInput allTags={allTags} selectedTags={selectedTags} onChange={onChange} />);
    return { onChange };
  };

  it('должен рендерить выбранные теги', () => {
    renderComponent([{ id: 1, name: 'React' }]);
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('должен обновлять значение input при вводе текста', () => {
    renderComponent();

    const input = screen.getByPlaceholderText('Введите теги');
    fireEvent.change(input, { target: { value: 'Rea' } });

    expect((input as HTMLInputElement).value).toBe('Rea');
  });

  it('должен показывать подсказки по введённому тексту', () => {
    renderComponent();

    const input = screen.getByPlaceholderText('Введите теги');
    fireEvent.change(input, { target: { value: 'typ' } });

    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('должен добавлять тег по клику на подсказку', () => {
    const { onChange } = renderComponent();

    const input = screen.getByPlaceholderText('Введите теги');
    fireEvent.change(input, { target: { value: 'java' } });

    const suggestion = screen.getByText('JavaScript');
    fireEvent.mouseDown(suggestion);
    expect(onChange).toHaveBeenCalledWith([{ id: 3, name: 'JavaScript' }]);
  });

  it('должен добавлять тег по нажатию Enter', () => {
    const { onChange } = renderComponent();

    const input = screen.getByPlaceholderText('Введите теги');
    fireEvent.change(input, { target: { value: 'react' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(onChange).toHaveBeenCalledWith([{ id: 1, name: 'React' }]);
  });

  it('должен добавлять тег по нажатию Space', () => {
    const { onChange } = renderComponent();

    const input = screen.getByPlaceholderText('Введите теги');
    fireEvent.change(input, { target: { value: 'typescript' } });
    fireEvent.keyDown(input, { key: ' ', code: 'Space' });
    expect(onChange).toHaveBeenCalledWith([{ id: 2, name: 'TypeScript' }]);
  });

  it('должен удалять последний тег по Backspace, если input пустой', () => {
    const selectedTags = [
      { id: 1, name: 'React' },
      { id: 2, name: 'TypeScript' },
    ];
    const { onChange } = renderComponent(selectedTags);

    const input = screen.getByPlaceholderText('Введите теги');
    fireEvent.keyDown(input, { key: 'Backspace', code: 'Backspace' });
    expect(onChange).toHaveBeenCalledWith([{ id: 1, name: 'React' }]);
  });

  it('должен удалять тег при клике на кнопку ×', () => {
    const selectedTags = [{ id: 1, name: 'React' }];
    const { onChange } = renderComponent(selectedTags);

    const removeButton = screen.getByText('×');
    fireEvent.click(removeButton);
    expect(onChange).toHaveBeenCalledWith([]);
  });
});
