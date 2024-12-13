import { RouterProvider, ThemeProvider } from './providers/';
import { AuthProvider } from './providers/auth';
import '../globals.css';

export const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider />
      </ThemeProvider>
    </AuthProvider>
  );
};
