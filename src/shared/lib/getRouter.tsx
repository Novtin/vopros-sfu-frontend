import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import { ConfirmEmail } from '@/app/pages/Auth/ConfirmEmail';
import { ROUTER_PATHS } from '@/app/consts';
import { Auth } from '@/app/pages';
import { HomePage } from '@/app/pages/Home/component';
import { QuestionPage } from '@/app/pages/Questions/component';
import { ErrorPages } from '@/app/pages/ErrorPages';
import { DelayedLoader } from '../components/DelayedLoader';
import { PrivateRoute } from './PrivateRoute';
import { TagsPage } from '@/app/pages/Tags/component';

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
      element: <QuestionPage />,
    },
    {
      path: ROUTER_PATHS.TAGS,
      element: <TagsPage />,
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
          <ErrorPages errorCode="404" message="Страница не найдена" />
        </DelayedLoader>
      ),
    },
  );

  return createBrowserRouter(router);
};
