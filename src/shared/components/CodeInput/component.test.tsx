import { render, screen, fireEvent } from '@testing-library/react';
import { CodeInput } from './component';

describe('CodeInput', () => {
  const mockOnComplete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('отображает 6 полей ввода', () => {
    render(<CodeInput onComplete={mockOnComplete} />);
    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(6);
  });

  it('позволяет ввести цифру и переключить внимание на следующий ввод', () => {
    render(<CodeInput onComplete={mockOnComplete} />);
    const inputs = screen.getAllByRole('textbox');

    fireEvent.change(inputs[0], { target: { value: '1' } });
    expect(inputs[0]).toHaveValue('1');
    expect(inputs[1]).toHaveFocus();
  });

  it('предотвращает ввод нечисловых данных', () => {
    render(<CodeInput onComplete={mockOnComplete} />);
    const inputs = screen.getAllByRole('textbox');

    fireEvent.change(inputs[0], { target: { value: 'a' } });
    expect(inputs[0]).toHaveValue('');
  });

  it('перемещает фокус обратно на Backspace, когда поле ввода пустое', () => {
    render(<CodeInput onComplete={mockOnComplete} />);
    const inputs = screen.getAllByRole('textbox');

    fireEvent.change(inputs[0], { target: { value: '1' } });
    fireEvent.keyDown(inputs[0], { key: 'Backspace' });
  });

  it('обрабатывает вставку допустимого кода', () => {
    render(<CodeInput onComplete={mockOnComplete} />);
    const inputs = screen.getAllByRole('textbox');

    fireEvent.paste(inputs[0], {
      clipboardData: { getData: () => '123456' },
    });

    expect(inputs[0]).toHaveValue('1');
    expect(inputs[1]).toHaveValue('2');
    expect(inputs[2]).toHaveValue('3');
    expect(inputs[3]).toHaveValue('4');
    expect(inputs[4]).toHaveValue('5');
    expect(inputs[5]).toHaveValue('6');
  });

  it('не позволяет вставлять нечисловой код', () => {
    render(<CodeInput onComplete={mockOnComplete} />);
    const inputs = screen.getAllByRole('textbox');

    fireEvent.paste(inputs[0], {
      clipboardData: { getData: () => '12abc' },
    });

    expect(inputs[0]).toHaveValue('');
    expect(inputs[1]).toHaveValue('');
    expect(inputs[2]).toHaveValue('');
  });

  it('вызывает неполадку, когда код введен полностью', () => {
    render(<CodeInput onComplete={mockOnComplete} />);
    const inputs = screen.getAllByRole('textbox');

    fireEvent.change(inputs[0], { target: { value: '1' } });
    fireEvent.change(inputs[1], { target: { value: '2' } });
    fireEvent.change(inputs[2], { target: { value: '3' } });
    fireEvent.change(inputs[3], { target: { value: '4' } });
    fireEvent.change(inputs[4], { target: { value: '5' } });
    fireEvent.change(inputs[5], { target: { value: '6' } });
    expect(mockOnComplete).toHaveBeenCalledWith('123456');
  });

  it('не вызывает неполадку, если код является неполным', () => {
    render(<CodeInput onComplete={mockOnComplete} />);
    const inputs = screen.getAllByRole('textbox');

    fireEvent.change(inputs[0], { target: { value: '1' } });
    expect(mockOnComplete).not.toHaveBeenCalled();
  });
});
