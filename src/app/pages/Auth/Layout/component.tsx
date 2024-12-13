import { Outlet } from 'react-router-dom';

export const Layout = () => (
  <div className="min-h-full bg-base-grey-03">
    <Outlet />
  </div>
);
