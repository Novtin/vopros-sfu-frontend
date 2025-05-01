import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { NotificationDropdown } from './component';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore([]);

const renderWithStore = (store: ReturnType<typeof mockStore>) =>
  render(
    <Provider store={store}>
      <NotificationDropdown />
    </Provider>,
  );

describe('NotificationDropdown', () => {
  it('отображает кнопку уведомления', () => {
    const store = mockStore({ notifications: { items: [] } });
    renderWithStore(store);
    expect(screen.getByLabelText('Уведомления')).toBeInTheDocument();
  });

  it('переключает выпадающий список при нажатии кнопки', () => {
    const store = mockStore({ notifications: { items: [] } });
    renderWithStore(store);
    fireEvent.click(screen.getByLabelText('Уведомления'));
    expect(screen.getByText('Уведомления')).toBeInTheDocument();
  });

  it('показывает пустое сообщение при отсутствии уведомлений', () => {
    const store = mockStore({ notifications: { items: [] } });
    renderWithStore(store);
    fireEvent.click(screen.getByLabelText('Уведомления'));
    expect(screen.getByText('Нет новых уведомлений')).toBeInTheDocument();
  });

  it('отображает уведомления, если они присутствуют (анализируется из строки)', () => {
    const store = mockStore({
      notifications: {
        items: [
          JSON.stringify({
            id: '1',
            payload: { message: 'Новое сообщение' },
            createdAt: new Date().toISOString(),
          }),
        ],
      },
    });
    renderWithStore(store);
    fireEvent.click(screen.getByLabelText('Уведомления'));
    expect(screen.getByText('Новое сообщение')).toBeInTheDocument();
  });

  it('отображает резервный вариант, если сообщение отсутствует в полезной нагрузке', () => {
    const store = mockStore({
      notifications: {
        items: [
          {
            id: '2',
            createdAt: new Date().toISOString(),
            payload: {},
          },
        ],
      },
    });
    renderWithStore(store);
    fireEvent.click(screen.getByLabelText('Уведомления'));
    expect(screen.getByText('Новое уведомление')).toBeInTheDocument();
  });
});
