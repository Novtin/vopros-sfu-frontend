import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  isAuth: boolean;
  children: JSX.Element;
}

export const PrivateRoute = ({ isAuth, children }: PrivateRouteProps) => {
  return isAuth ? children : <Navigate to="/login" />;
};
