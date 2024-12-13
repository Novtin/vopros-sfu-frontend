import { RouterProvider as ReactRouterProvider } from 'react-router-dom';
import { getRouter } from '../../shared/lib';
import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export const RouterProvider = () => {
  const { refreshAccessToken } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsAuthenticated(true);
    } else {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        refreshAccessToken(refreshToken)
          .then(() => setIsAuthenticated(true))
          .catch(() => setIsAuthenticated(false));
      }
    }
  }, [refreshAccessToken]);

  const router = getRouter(isAuthenticated);

  return <ReactRouterProvider router={router} />;
};
