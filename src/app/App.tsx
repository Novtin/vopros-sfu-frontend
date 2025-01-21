import { RouterProvider, ThemeProvider } from './providers/';
import { AuthProvider } from './providers/auth';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import '../globals.css';

export const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider>
          <RouterProvider />
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  );
};
