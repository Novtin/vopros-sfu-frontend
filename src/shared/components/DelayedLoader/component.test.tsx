import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { DelayedLoader } from './component';

jest.useFakeTimers();

describe('DelayedLoader', () => {
  it('показывает Loader сразу после рендера', () => {
    render(
      <DelayedLoader>
        <div>Контент</div>
      </DelayedLoader>,
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.queryByText('Контент')).toBeNull();
  });

  it('показывает children после стандартной задержки', () => {
    render(
      <DelayedLoader>
        <div>Контент</div>
      </DelayedLoader>,
    );

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(screen.getByText('Контент')).toBeInTheDocument();
    expect(screen.queryByTestId('loader')).toBeNull();
  });

  it('работает с кастомной задержкой', () => {
    render(
      <DelayedLoader delay={1000}>
        <div>Контент</div>
      </DelayedLoader>,
    );

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(screen.queryByText('Контент')).toBeNull();

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(screen.getByText('Контент')).toBeInTheDocument();
    expect(screen.queryByTestId('loader')).toBeNull();
  });

  it('очищает таймер при размонтировании', () => {
    const { unmount } = render(
      <DelayedLoader delay={1000}>
        <div>Контент</div>
      </DelayedLoader>,
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();

    unmount();
  });
});
