import { render, screen, fireEvent } from '@testing-library/react';
import { useFileUrl } from '@/app/hooks/user/useGetFile';
import { ImageWithHook } from './component';

jest.mock('@/app/hooks/user/useGetFile', () => ({
  useFileUrl: jest.fn(),
}));

describe('ImageWithHook', () => {
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('отображает лоадер, если данные загружаются', () => {
    (useFileUrl as jest.Mock).mockReturnValue({ fileUrl: '', isLoading: true });

    render(<ImageWithHook id={1} title="Test Image" onDelete={mockOnDelete} />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('отображает изображение, когда загрузка завершена', () => {
    (useFileUrl as jest.Mock).mockReturnValue({
      fileUrl: 'https://example.com/image.jpg',
      isLoading: false,
    });

    render(<ImageWithHook id={1} title="Test Image" onDelete={mockOnDelete} />);

    const image = screen.getByAltText('Изображение к вопросу Test Image');
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('открывает модальное окно при клике на изображение', () => {
    (useFileUrl as jest.Mock).mockReturnValue({
      fileUrl: 'https://example.com/image.jpg',
      isLoading: false,
    });

    render(<ImageWithHook id={1} title="Test Image" onDelete={mockOnDelete} />);

    const image = screen.getByAltText('Изображение к вопросу Test Image');
    fireEvent.click(image);

    expect(screen.getAllByAltText('Изображение к вопросу Test Image')[1]).toBeInTheDocument();
  });

  it('вызывает onDelete при клике на кнопку удаления', () => {
    (useFileUrl as jest.Mock).mockReturnValue({
      fileUrl: 'https://example.com/image.jpg',
      isLoading: false,
    });

    render(<ImageWithHook id={1} title="Test Image" onDelete={mockOnDelete} />);

    fireEvent.click(screen.getByTitle('Удалить'));

    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });
});
