import React from 'react';
import { Header } from '@/shared/components/Header';
import { Navbar } from '@/shared/components/NavBar/component';
import { PageLayoutProps } from './component.props';
import { cn } from '@/shared/lib/cn';

export const PageLayout = ({ className, children }: PageLayoutProps) => {
  return (
    <main className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-row flex-1 bg-base-grey-01 overflow-hidden">
        <Navbar />
        <div className={cn('flex flex-col w-full overflow-y-auto', className)}>{children}</div>
      </div>
    </main>
  );
};
