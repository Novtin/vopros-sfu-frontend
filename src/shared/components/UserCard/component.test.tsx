import { render, screen, fireEvent } from '@testing-library/react';
import { UserCard } from './component';
import { BrowserRouter } from 'react-router-dom';
import { useFileUrl } from '@/app/hooks/user/useGetFile';

jest.mock('@/app/consts/server', () => ({
  SERVER_URL: '',
  BASE_API_URL: '',
  API_VERSION: '',
}));

jest.mock('@/app/hooks/user/useGetFile', () => ({
  useFileUrl: jest.fn(),
}));

const mockUserData = {
  id: 123,
  email: 'test@example.com',
  nickname: 'Test User',
  description: 'Test description',
  isOnline: true,
  wasOnlineAt: '2025-04-27T12:00:00Z',
  avatar: {
    id: 1,
    name: 'test-avatar.png',
    size: 1024,
    mimetype: 'image/png',
  },
  countQuestions: 10,
  countAnswers: 5,
  rating: 100,
};

const renderComponent = (props = {}) =>
  render(
    <BrowserRouter>
      <UserCard userData={mockUserData} {...props} />
    </BrowserRouter>,
  );

describe('UserCard', () => {
  it('отображает лоадер, если аватар загружается', () => {
    (useFileUrl as jest.Mock).mockReturnValue({
      fileUrl: '',
      isLoading: true,
    });

    renderComponent();

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('отображает аватар и никнейм после загрузки', () => {
    (useFileUrl as jest.Mock).mockReturnValue({
      fileUrl: 'https://example.com/avatar.png',
      isLoading: false,
    });

    renderComponent();

    const avatar = screen.getByAltText('User Avatar') as HTMLImageElement;
    expect(avatar).toBeInTheDocument();
    expect(avatar.src).toBe('https://example.com/avatar.png');

    expect(screen.getByText('Test User')).toBeInTheDocument();
  });

  it('отображает описание пользователя, если variant = usersTable', () => {
    (useFileUrl as jest.Mock).mockReturnValue({
      fileUrl: 'https://example.com/avatar.png',
      isLoading: false,
    });

    renderComponent({ variant: 'usersTable' });

    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('не отображает описание пользователя, если variant !== usersTable', () => {
    (useFileUrl as jest.Mock).mockReturnValue({
      fileUrl: 'https://example.com/avatar.png',
      isLoading: false,
    });

    renderComponent({ variant: 'default' });

    expect(screen.queryByText('Test description')).not.toBeInTheDocument();
  });

  it('оборачивает всю карточку в правильный линк', () => {
    (useFileUrl as jest.Mock).mockReturnValue({
      fileUrl: 'https://example.com/avatar.png',
      isLoading: false,
    });

    renderComponent();

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/profile/123`);
  });

  it('заменяет аватар на заглушку при ошибке загрузки', () => {
    (useFileUrl as jest.Mock).mockReturnValue({
      fileUrl: 'https://broken-link.com/avatar.png',
      isLoading: false,
    });

    renderComponent();

    const avatar = screen.getByAltText('User Avatar') as HTMLImageElement;
    fireEvent.error(avatar);

    expect(avatar.src).toContain('/images/plugAvatar.png');
  });
});
