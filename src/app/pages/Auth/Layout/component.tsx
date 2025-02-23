import { Header } from '@/shared/components/Header';
import { Navbar } from '@/shared/components/NavBar';
import { Outlet } from 'react-router-dom';

export const Layout = () => (
  <main className="h-screen flex flex-row">
    <Navbar />
    <div className="flex flex-col flex-1 bg-base-grey-01 overflow-hidden">
      <Header />
      <div className="flex flex-col flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  </main>
);
