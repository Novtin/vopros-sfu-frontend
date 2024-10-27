import { RouterProvider as ReactRouterProvider } from 'react-router-dom';
import { getRouter } from '../shared/lib';
// import { useAppSelector } from '../hooks';
// import { selectors } from '@/entities/Auth/model';

export const RouterProvider = () => {
  const isAuth = false;
  //   const isInit = useAppSelector(selectors.getIsInit);

  //   if (!isInit) return null;
  const router = getRouter(isAuth);

  return <ReactRouterProvider router={router} />;
};
