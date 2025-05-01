import { render, screen, fireEvent } from '@testing-library/react';
import { Textarea } from './component';

describe('Textarea', () => {
  it('должен рендерить label, если он передан', () => {
    render(<Textarea label="Описание" placeholder="Введите текст" />);

    expect(screen.getByText('Описание')).toBeInTheDocument();
  });

  it('должен отображать placeholder', () => {
    render(<Textarea placeholder="Введите описание" />);

    expect(screen.getByPlaceholderText('Введите описание')).toBeInTheDocument();
  });

  it('должен отображать сообщение об ошибке и красную рамку', () => {
    render(<Textarea error="Ошибка ввода" />);

    expect(screen.getByText('Ошибка ввода')).toBeInTheDocument();
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('border-red-500');
  });

  it('должен отображать зелёную рамку при success', () => {
    render(<Textarea success />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('border-green-500');
  });

  it('должен вызывать onChange при изменении текста', () => {
    const handleChange = jest.fn();
    render(<Textarea onChange={handleChange} />);

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Новый текст' } });

    expect(handleChange).toHaveBeenCalled();
  });

  it('должен применять дополнительные классы через className', () => {
    render(<Textarea className="custom-class" />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('custom-class');
  });

  it('должен применять кастомные стили к label через labelSx', () => {
    render(<Textarea label="Комментарий" labelSx="text-red-700" />);

    const label = screen.getByText('Комментарий');
    expect(label).toHaveClass('text-red-700');
  });
});
