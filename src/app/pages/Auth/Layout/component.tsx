import { Header } from '@/shared/components/Header';
import { Navbar } from '@/shared/components/NavBar';
import { Outlet } from 'react-router-dom';

export const Layout = () => (
  <main className="h-screen flex flex-col">
    <Header />
    <div className="flex flex-row flex-1 bg-base-grey-01 overflow-hidden">
      <Navbar />
      <div className="flex flex-col w-full overflow-y-auto">
        <Outlet />
      </div>
    </div>
  </main>
);
