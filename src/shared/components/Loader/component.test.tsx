import { render, screen } from '@testing-library/react';
import { Loader } from './component';

describe('Loader', () => {
  it('рендерит контейнер с правильным data-testid', () => {
    render(<Loader />);
    const loaderContainer = screen.getByTestId('loader');
    expect(loaderContainer).toBeInTheDocument();
  });

  it('рендерит спиннер внутри контейнера', () => {
    render(<Loader />);
    const loaderContainer = screen.getByTestId('loader');
    const spinner = loaderContainer.querySelector('span');
    expect(spinner).toBeInTheDocument();
  });

  it('применяет правильные стили', () => {
    render(<Loader />);
    const loaderContainer = screen.getByTestId('loader');
    expect(loaderContainer).toHaveStyle('height: calc(100vh - 210px)');
    expect(loaderContainer).toHaveClass('flex', 'justify-center', 'items-center');
  });
});
