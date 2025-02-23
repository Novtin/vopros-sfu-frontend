import { RouterProvider as ReactRouterProvider } from 'react-router-dom';
import { getRouter } from '../../shared/lib';
import { useEffect } from 'react';
import { useAuth } from '../hooks/authentication/useAuth';
import { ClipLoader } from 'react-spinners';

export const RouterProvider = () => {
  const { refreshAccessToken, isAuth, isLoading, logout } = useAuth();

  useEffect(() => {
    if (isAuth) {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (!accessToken || !refreshToken) {
        logout();
      } else {
        refreshAccessToken(refreshToken);
      }
    }
  }, [isAuth, refreshAccessToken, logout]);

  if (isLoading) {
    return <ClipLoader size={50} />;
  }

  const router = getRouter(isAuth);

  return <ReactRouterProvider router={router} />;
};
