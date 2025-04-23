import { useNavigate } from 'react-router-dom';
import { IFormProps } from './component.props';
import { cn } from '@/shared/lib/cn';
import { Input } from '@/shared/components/Input';
import { ROUTER_PATHS } from '@/app/consts';
import { Button } from '@/shared/components/Button';
import { useEffect, useState } from 'react';
import { useAuth } from '@/app/hooks/authentication/useAuth';
import notify from '@/utils/notify';
import { ResetPasswordForm } from '../ResetPasswordForm';

export const LoginForm = ({ className, ...props }: IFormProps) => {
  const LogoSvg = '/images/logo.png';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetPassword, setResetPassword] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, isAuth } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка при авторизации';
      notify('Ошибка авторизации', errorMessage, 'danger');
      setError(errorMessage);
    }
  };

  useEffect(() => {
    if (isAuth) {
      navigate(ROUTER_PATHS.HOME);
    }
  }, [isAuth, navigate]);

  return (
    <div
      className={cn('w-full text-center max-w-md mx-auto bg-base-grey-03 p-6 rounded-md shadow-md', className)}
      {...props}
    >
      {resetPassword && <ResetPasswordForm onClose={() => setResetPassword(false)} />}
      <div className="flex justify-center mb-4">
        <img src={LogoSvg} alt="Logo" className="w-16 h-16 rounded-xl" />
      </div>
      <h2 className="text-center text-2xl font-bold text-base-blue-01 mb-6">Вход в аккаунт</h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="Почта"
          type="email"
          autoComplete="email"
          placeholder="example@stud.sfu-kras.ru"
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          label="Пароль"
          type="password"
          autoComplete="current-password"
          placeholder="Пароль"
          onChange={e => setPassword(e.target.value)}
          toggleVisibility={true}
        />
        <div className="text-center mb-4">
          <a
            className="text-sm font-bold text-base-blue-01 hover:cursor-pointer"
            onClick={() => setResetPassword(true)}
          >
            Забыли пароль?
          </a>
        </div>
        <Button className="w-[250px] h-10" type="submit">
          Войти
        </Button>
      </form>
      {/* </>
      )} */}
    </div>
  );
};
