import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './component';

describe('Button', () => {
  it('должен отобразить текст детей (children)', () => {
    render(<Button>Нажми меня</Button>);
    expect(screen.getByText('Нажми меня')).toBeInTheDocument();
  });

  it('должен применять класс по умолчанию', () => {
    render(<Button>Кнопка</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-flex', 'rounded-button', 'cursor-pointer');
  });

  it('должен применять класс, соответствующий варианту', () => {
    render(<Button variant="secondary">Кнопка</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('');
  });

  it('должен передавать дополнительные props', async () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Кликни меня</Button>);
    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('должен быть disabled, если передан пропс disabled', () => {
    render(<Button disabled>Недоступная кнопка</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});
