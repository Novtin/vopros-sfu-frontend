import React from 'react';
import { Header } from '@/shared/components/Header';
import { Navbar } from '@/shared/components/NavBar/component';
import { Outlet } from 'react-router-dom';

export const PageLayout = () => {
  return (
    <main className="h-screen flex flex-row">
      <Navbar />
      <div className="flex flex-col flex-1 bg-base-grey-01 overflow-hidden">
        <Header />
        <div className="flex flex-col overflow-y-auto h-full">
          <Outlet />
        </div>
      </div>
    </main>
  );
};
