import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ROUTER_PATHS } from '../../consts';
import { Auth } from '../../pages';

export const getRouter = (isAuth: boolean) => {
  const router: RouteObject[] = [];

  if (isAuth) {
    router.push({
      path: '*',
      element: <Navigate to={ROUTER_PATHS.HOME} />,
    });
  } else {
    router.push(
      {
        path: '*',
        element: <Navigate to={ROUTER_PATHS.HOME + ROUTER_PATHS.LOGIN} />,
      },
      {
        path: ROUTER_PATHS.HOME + ROUTER_PATHS.LOGIN,
        element: <Auth.Layout />,
        children: [
          {
            index: true,
            element: <Auth.LoginPage />,
          },
        ],
      },
      {
        path: ROUTER_PATHS.HOME + ROUTER_PATHS.REGISTER,
        element: <Auth.Layout />,
        children: [
          {
            index: true,
            element: <Auth.RegisterPage />,
          },
        ],
      },
    );
  }

  return createBrowserRouter(router);
};
