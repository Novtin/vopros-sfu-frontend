import { render, screen, fireEvent } from '@testing-library/react';
import { Tabs } from './component';

describe('Tabs', () => {
  const tabs = ['Таб 1', 'Таб 2', 'Таб 3'];

  it('должен рендерить все вкладки', () => {
    render(<Tabs tabs={tabs} initialActiveTab="Таб 1" onTabChange={jest.fn()} />);

    tabs.forEach(tab => {
      expect(screen.getByText(tab)).toBeInTheDocument();
    });
  });

  it('должен устанавливать начальную активную вкладку', () => {
    render(<Tabs tabs={tabs} initialActiveTab="Таб 2" onTabChange={jest.fn()} />);

    const activeTab = screen.getByText('Таб 2');
    expect(activeTab).toHaveClass('bg-base-orange-01');
  });

  it('по умолчанию должен выбирать первую вкладку, если initialActiveTab не задан', () => {
    render(<Tabs tabs={tabs} onTabChange={jest.fn()} />);

    const firstTab = screen.getByText('Таб 1');
    expect(firstTab).toHaveClass('bg-base-orange-01');
  });

  it('должен вызывать onTabChange при клике на вкладку', () => {
    const onTabChange = jest.fn();

    render(<Tabs tabs={tabs} initialActiveTab="Таб 1" onTabChange={onTabChange} />);

    const tab2 = screen.getByText('Таб 2');
    fireEvent.click(tab2);

    expect(onTabChange).toHaveBeenCalledTimes(1);
    expect(onTabChange).toHaveBeenCalledWith('Таб 2');
  });

  it('должен менять активную вкладку при клике', () => {
    render(<Tabs tabs={tabs} initialActiveTab="Таб 1" onTabChange={jest.fn()} />);

    const tab2 = screen.getByText('Таб 2');
    fireEvent.click(tab2);

    expect(tab2).toHaveClass('bg-base-orange-01');
    const tab1 = screen.getByText('Таб 1');
    expect(tab1).not.toHaveClass('bg-base-orange-01');
  });

  it('должен применять className к контейнеру', () => {
    render(<Tabs tabs={tabs} initialActiveTab="Таб 1" onTabChange={jest.fn()} className="custom-tabs" />);

    const container = screen.getByRole('group');
    expect(container).toHaveClass('custom-tabs');
  });
});
