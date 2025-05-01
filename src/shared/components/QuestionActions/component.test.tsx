import { render, screen, fireEvent } from '@testing-library/react';
import { useToggleFavoriteQuestion } from '@/app/hooks/question/useToggleFavoriteQuestion';
import { useRateQuestion } from '@/app/hooks/question/useRateQuestion';
import { useDeleteRateQuestion } from '@/app/hooks/question/useDeleteRateQuestion';
import { Provider } from 'react-redux';
import { QuestionActions } from './component';
import configureMockStore from 'redux-mock-store';

jest.mock('@/app/consts/server', () => ({
  SERVER_URL: 'http://mocked-server',
  BASE_API_URL: 'http://mocked-server/api',
  API_VERSION: 'v1',
}));

jest.mock('hugeicons-react', () => ({
  TriangleIcon: ({ ...props }) => <div data-testid="triangle-icon" {...props} />,
  Bookmark01Icon: ({ ...props }) => <div data-testid="bookmark-icon" {...props} />,
}));

jest.mock('@/app/hooks/question/useToggleFavoriteQuestion');
jest.mock('@/app/hooks/question/useRateQuestion');
jest.mock('@/app/hooks/question/useDeleteRateQuestion');

const mockStore = configureMockStore([]);
const mockMutate = jest.fn();

const setup = (customState = {}) => {
  const store = mockStore({
    ratings: {
      123: {
        currentRating: 'none',
        ...customState,
      },
    },
  });

  // Приведение к jest.Mock и установка возврата
  (useToggleFavoriteQuestion as jest.Mock).mockReturnValue({ mutate: mockMutate });
  (useRateQuestion as jest.Mock).mockReturnValue({ mutate: mockMutate });
  (useDeleteRateQuestion as jest.Mock).mockReturnValue({ mutate: mockMutate });

  render(
    <Provider store={store}>
      <QuestionActions
        questionId={123}
        countLikes={10}
        countDislikes={2}
        isFavoriteInitial={false}
        isLiked={false}
        isDisliked={false}
      />
    </Provider>,
  );

  return store;
};

describe('QuestionActions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('рендеринг с начальными значениями', () => {
    setup();
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByTestId('bookmark-icon')).toBeInTheDocument();
  });

  it('переключает избранное по щелчку мыши', () => {
    setup();
    const favButton = screen.getByTestId('bookmark-icon').parentElement!;
    fireEvent.click(favButton);

    expect(mockMutate).toHaveBeenCalledWith({ id: 123, isFavorite: false }, expect.any(Object));
  });

  it('оценивает вопрос, если он не оценен', () => {
    const store = setup();
    const upButton = screen.getAllByTestId('triangle-icon')[0].parentElement!;
    fireEvent.click(upButton);

    expect(mockMutate).toHaveBeenCalledWith({ id: 123, value: 1 });
    const actions = store.getActions();
    expect(actions).toContainEqual({ type: 'ratings/setRating', payload: { questionId: 123, rating: 'up' } });
  });

  it('удаляет повышенный голос, если он уже был повышен', () => {
    const store = setup({ currentRating: 'up' });
    const upButton = screen.getAllByTestId('triangle-icon')[0].parentElement!;
    fireEvent.click(upButton);

    expect(mockMutate).toHaveBeenCalledWith({ id: 123, value: 1 });
    const actions = store.getActions();
    expect(actions).toContainEqual({ type: 'ratings/resetRating', payload: 123 });
  });

  it('переключается с понижающего на повышающий голос', () => {
    const store = setup({ currentRating: 'down' });
    const upButton = screen.getAllByTestId('triangle-icon')[0].parentElement!;
    fireEvent.click(upButton);

    expect(mockMutate).toHaveBeenCalledWith({ id: 123, value: -1 });
    const actions = store.getActions();
    expect(actions).toContainEqual({ type: 'ratings/setRating', payload: { questionId: 123, rating: 'none' } });
  });

  it('снижает оценку вопроса, если он не оценен', () => {
    const store = setup();
    const downButton = screen.getAllByTestId('triangle-icon')[1].parentElement!;
    fireEvent.click(downButton);

    expect(mockMutate).toHaveBeenCalledWith({ id: 123, value: -1 });
    const actions = store.getActions();
    expect(actions).toContainEqual({ type: 'ratings/setRating', payload: { questionId: 123, rating: 'down' } });
  });

  it('удаляет понижающий голос, если он уже был понижен', () => {
    const store = setup({ currentRating: 'down' });
    const downButton = screen.getAllByTestId('triangle-icon')[1].parentElement!;
    fireEvent.click(downButton);

    expect(mockMutate).toHaveBeenCalledWith({ id: 123, value: -1 });
    const actions = store.getActions();
    expect(actions).toContainEqual({ type: 'ratings/resetRating', payload: 123 });
  });

  it('переключается с повышающего на понижающий голос', () => {
    const store = setup({ currentRating: 'up' });
    const downButton = screen.getAllByTestId('triangle-icon')[1].parentElement!;
    fireEvent.click(downButton);

    expect(mockMutate).toHaveBeenCalledWith({ id: 123, value: 1 });
    const actions = store.getActions();
    expect(actions).toContainEqual({ type: 'ratings/setRating', payload: { questionId: 123, rating: 'none' } });
  });
});
