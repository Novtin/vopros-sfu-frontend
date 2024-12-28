import { ROUTER_PATHS } from '@/app/consts';
import { Header } from '@/shared/components/Header';
import { Navbar } from '@/shared/components/NavBar/component';
import { RegisterForm } from '@/shared/modules/RegisterForm';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const RegisterPage = () => {
  const [isRegistered, setIsRegistered] = useState(false);

  return (
    <main className="w-full min-h-screen">
      <Header />
      <div className="flex flex-row" style={{ minHeight: `calc(100vh - 73px)` }}>
        <Navbar />
        <div className="flex flex-col flex-1 items-center justify-center">
          <RegisterForm onRegisterSuccess={() => setIsRegistered(true)} />
          {!isRegistered && (
            <Link to={ROUTER_PATHS.HOME + ROUTER_PATHS.LOGIN} className="mt-4 text-body-2 text-base-grey-08">
              У вас уже есть аккаунт? <span className="text-base-blue-01">Войти</span>
            </Link>
          )}
        </div>
      </div>
    </main>
  );
};
