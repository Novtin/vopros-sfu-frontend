import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ConfirmEmail } from '@/app/pages/Auth/ConfirmEmail';
import { ROUTER_PATHS } from '@/app/consts';
import { Auth } from '@/app/pages';
import { HomePage } from '@/app/pages/Home/component';

export const getRouter = (isAuth: boolean) => {
  const router: RouteObject[] = [];

  if (isAuth) {
    router.push(
      {
        path: ROUTER_PATHS.HOME,
        element: <HomePage />,
      },
      {
        path: '*',
        element: <Navigate to={ROUTER_PATHS.HOME} replace />,
      },
    );
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
      {
        path: ROUTER_PATHS.HOME + ROUTER_PATHS.CONFIRM_EMAIL,
        element: <ConfirmEmail />,
      },
    );
  }

  return createBrowserRouter(router);
};
