import { Outlet } from 'react-router-dom';

export const Layout = () => (
  <div className="min-h-full bg-base-grey-03 transition-colors duration-500">
    <Outlet />
  </div>
);
