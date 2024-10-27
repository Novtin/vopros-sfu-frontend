import { Link } from 'react-router-dom';
import { LogoSvg } from '../../assets';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { cn } from '../../lib/cn';
import { IFormProps } from './component.props';
import { ROUTER_PATHS } from '../../../consts';

export const LoginForm = ({ className, ...props }: IFormProps) => {
  return (
    <div
      className={cn(
        'w-full text-center max-w-sm mx-auto mt-10 bg-base-grey-01 p-6 rounded-md shadow-md transition-colors duration-500 ease-in-out',
        className,
      )}
      {...props}
    >
      <div className="flex justify-center mb-4">
        <img src={LogoSvg} alt="Logo" className="w-16 h-16 rounded-xl" />
      </div>
      <h2 className="text-center text-2xl font-bold text-base-blue-01 mb-6 transition-colors duration-500 ease-in-out">
        Вход в аккаунт
      </h2>
      <Input label="Почта" type="email" placeholder="example@stud.sfu-kras.ru" />
      <Input label="Пароль" type="password" placeholder="Пароль" />
      <div className="text-center mb-4">
        <Link
          to={ROUTER_PATHS.HOME + ROUTER_PATHS.REGISTER}
          className="text-sm font-bold text-base-blue-01 hover:underline"
        >
          Забыли пароль?
        </Link>
      </div>
      <Button className="w-[250px] h-10">Войти</Button>
    </div>
  );
};
