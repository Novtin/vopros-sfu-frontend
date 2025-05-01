import { render, screen, fireEvent } from '@testing-library/react';
import { Select } from './component';
import { Option } from './component.props';

describe('Select', () => {
  const options: Option[] = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
  ];

  const selected = options[0];

  it('должен рендерить лейбл и выбранный элемент', () => {
    render(<Select label="Выберите опцию" options={options} selected={selected} onChange={jest.fn()} />);

    expect(screen.getByText('Выберите опцию')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('должен открывать и закрывать список опций при клике на кнопку', () => {
    render(<Select label="Выберите опцию" options={options} selected={selected} onChange={jest.fn()} />);
    const button = screen.getByRole('button');
    expect(screen.queryByText('Option 2')).not.toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.getByText('Option 2')).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
  });

  it('должен вызывать onChange при выборе новой опции', () => {
    const onChange = jest.fn();

    render(<Select label="Выберите опцию" options={options} selected={selected} onChange={onChange} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const option2 = screen.getByText('Option 2');
    fireEvent.click(option2);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(options[1]);
  });

  it('должен применять className к контейнеру', () => {
    render(
      <Select
        label="Тестовый лейбл"
        options={options}
        selected={selected}
        onChange={jest.fn()}
        className="custom-container"
      />,
    );

    const container = screen.getByText('Тестовый лейбл').parentElement;
    expect(container).toHaveClass('custom-container');
  });

  it('должен рендерить иконку ArrowRight01Icon', () => {
    render(<Select label="Тестовый лейбл" options={options} selected={selected} onChange={jest.fn()} />);

    const svgIcon = screen.getByTestId('arrow-icon');
    expect(svgIcon).toBeInTheDocument();
  });
});
