import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import { ConfirmEmail } from '@/app/pages/Auth/ConfirmEmail';
import { ROUTER_PATHS } from '@/app/consts';
import { Auth } from '@/app/pages';
import { HomePage } from '@/app/pages/Home/component';
import { QuestionPage } from '@/app/pages/Questions/component';
import { Error404 } from '@/app/pages/ErrorPages/404';
import { DelayedLoader } from '../components/DelayedLoader';
import { PrivateRoute } from './PrivateRoute';

export const getRouter = (isAuth: boolean) => {
  const router: RouteObject[] = [];

  router.push(
    {
      path: ROUTER_PATHS.HOME,
      element: (
        <PrivateRoute isAuth={isAuth}>
          <HomePage />
        </PrivateRoute>
      ),
    },
    {
      path: ROUTER_PATHS.QUESTIONS,
      element: (
        <PrivateRoute isAuth={isAuth}>
          <QuestionPage />
        </PrivateRoute>
      ),
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
    {
      path: '*',
      element: (
        <DelayedLoader delay={10}>
          <Error404 />
        </DelayedLoader>
      ),
    },
  );

  return createBrowserRouter(router);
};
