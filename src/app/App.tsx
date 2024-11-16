import { RouterProvider, ThemeProvider } from './providers/';
import { AuthProvider } from './providers/auth';

export const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider />
      </ThemeProvider>
    </AuthProvider>
  );
};
