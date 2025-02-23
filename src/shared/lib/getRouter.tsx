import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import { ConfirmEmail } from '@/app/pages/Auth/ConfirmEmail';
import { ROUTER_PATHS } from '@/app/consts';
import { Auth } from '@/app/pages';
import { HomePage } from '@/app/pages/Home/component';
import { QuestionPage } from '@/app/pages/Questions/component';
import { ErrorPages } from '@/app/pages/ErrorPages';
import { PrivateRoute } from './PrivateRoute';
import { TagsPage } from '@/app/pages/Tags/component';
import { ProfilePage } from '@/app/pages/ProfilePage/component';
import { PageLayout } from '@/app/pages/PageLayout';
import { EditProfile } from '@/app/pages/EditProfile';

export const getRouter = (isAuth: boolean) => {
  const routes: RouteObject[] = [
    {
      element: <PageLayout />,
      children: [
        {
          path: ROUTER_PATHS.HOME,
          element: (
            <PrivateRoute isAuth={isAuth}>
              <HomePage />
            </PrivateRoute>
          ),
        },
        {
          path: ROUTER_PATHS.PROFILE,
          element: (
            <PrivateRoute isAuth={isAuth}>
              <ProfilePage />
            </PrivateRoute>
          ),
        },
        {
          path: ROUTER_PATHS.EDIT_PROFILE,
          element: (
            <PrivateRoute isAuth={isAuth}>
              <EditProfile />
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
      ],
    },
    {
      element: <Auth.Layout />,
      children: [
        {
          path: ROUTER_PATHS.LOGIN,
          element: <Auth.LoginPage />,
        },
        {
          path: ROUTER_PATHS.REGISTER,
          element: <Auth.RegisterPage />,
        },
      ],
    },
    {
      // Страница подтверждения email (можно оставить без layout или добавить свой)
      path: ROUTER_PATHS.CONFIRM_EMAIL,
      element: <ConfirmEmail />,
    },
    {
      path: '*',
      element: <ErrorPages errorCode="404" message="Страница не найдена" />,
    },
  ];
  return createBrowserRouter(routes);
};
