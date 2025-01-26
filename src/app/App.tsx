import { RouterProvider, ThemeProvider } from './providers/';
import { AuthProvider } from './providers/auth';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import '../globals.css';
import { ReactNotifications } from 'react-notifications-component';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});

export const App = () => {
  return (
    <Provider store={store}>
      <ReactNotifications />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider>
            <RouterProvider />
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  );
};
