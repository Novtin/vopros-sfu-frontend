import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { BlockInfo } from './component';

const renderWithRouter = (ui: React.ReactElement) => {
  const router = createMemoryRouter([{ path: '*', element: ui }], {
    future: {
      v7_relativeSplatPath: true,
    },
  });

  return render(<RouterProvider router={router} />);
};

describe('BlockInfo', () => {
  it('должен отобразить заголовок', () => {
    renderWithRouter(<BlockInfo title="Заголовок" description="Описание" highlightText="Выделено" />);
    expect(screen.getByText('Заголовок')).toBeInTheDocument();
  });

  it('должен отобразить описание и выделенный текст без ссылки', () => {
    renderWithRouter(<BlockInfo title="Заголовок" description="Описание" highlightText="Выделено" />);
    expect(screen.getByText('Описание')).toBeInTheDocument();
    expect(screen.getByText('Выделено')).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('должен оборачивать выделенный текст в ссылку, если передан link', () => {
    renderWithRouter(<BlockInfo title="Заголовок" description="Описание" highlightText="Выделено" link="/some-path" />);
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/some-path');
    expect(link).toHaveTextContent('Выделено');
  });

  it('должен отображать спиннер при isLoading=true', () => {
    renderWithRouter(<BlockInfo title="Заголовок" description="Описание" highlightText="Выделено" isLoading />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.queryByText('Описание')).not.toBeInTheDocument();
    expect(screen.queryByText('Выделено')).not.toBeInTheDocument();
  });
});
