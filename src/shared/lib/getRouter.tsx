import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import { ConfirmEmail } from '@/app/pages/Auth/ConfirmEmail';
import { ROUTER_PATHS } from '@/app/consts';
import { Auth } from '@/app/pages';
import { HomePage } from '@/app/pages/Home/component';
import { QuestionPage } from '@/app/pages/Questions/component';
import { ErrorPage } from '@/app/pages/ErrorPage';
import { PrivateRoute } from './PrivateRoute';
import { TagsPage } from '@/app/pages/Tags/component';
import { ProfilePage } from '@/app/pages/ProfilePage/component';
import { PageLayout } from '@/app/pages/PageLayout';
import { EditProfile } from '@/app/pages/EditProfile';
import { UsersPage } from '@/app/pages/Users';
import { AnswerQuestion } from '@/app/pages/AnswerQuestion';
import { FavoritesPage } from '@/app/pages/FavoritesPage';

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
          path: `${ROUTER_PATHS.PROFILE}/:id`,
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
          path: ROUTER_PATHS.ANSWER_QUESTION,
          element: <AnswerQuestion />,
        },
        {
          path: ROUTER_PATHS.TAGS,
          element: <TagsPage />,
        },
        {
          path: ROUTER_PATHS.USERS,
          element: <UsersPage />,
        },
        {
          path: ROUTER_PATHS.FAVOURITES_QUESTIONS,
          element: (
            <PrivateRoute isAuth={isAuth}>
              <FavoritesPage />
            </PrivateRoute>
          ),
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
      path: ROUTER_PATHS.CONFIRM_EMAIL,
      element: <ConfirmEmail />,
    },
    {
      path: ROUTER_PATHS.ERROR_404,
      element: <ErrorPage errorCode="404" message="Страница не найдена" />,
    },
    {
      path: '*',
      element: <ErrorPage errorCode="404" message="Страница не найдена" />,
    },
  ];
  return createBrowserRouter(routes);
};
