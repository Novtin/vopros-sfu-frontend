import { RouterProvider, ThemeProvider } from './providers/';

export const App = () => {
  return (
    <ThemeProvider>
      <RouterProvider />
    </ThemeProvider>
  );
};
