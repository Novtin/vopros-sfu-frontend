import { ROUTER_PATHS } from '@/app/consts';
import { RegisterForm } from '@/shared/modules/RegisterForm';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const RegisterPage = () => {
  const [isRegistered, setIsRegistered] = useState(false);

  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <RegisterForm onRegisterSuccess={() => setIsRegistered(true)} />
      {!isRegistered && (
        <Link to={ROUTER_PATHS.LOGIN} className="mt-4 text-body-2 text-base-grey-08">
          У вас уже есть аккаунт? <span className="text-base-blue-01 font-bold">Войти</span>
        </Link>
      )}
    </div>
  );
};
