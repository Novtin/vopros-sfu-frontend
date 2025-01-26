import { ROUTER_PATHS } from '@/app/consts';
import { LoginForm } from '@/shared/modules/LoginForm';
import { Link } from 'react-router-dom';

export const LoginPage = () => (
  <div className="flex flex-col flex-1 items-center justify-center">
    <LoginForm />
    <Link to={ROUTER_PATHS.REGISTER} className="mt-8 text-body-2 text-base-grey-08">
      У вас нет учетной записи? <span className="font-bold text-base-blue-01">Зарегистрируйтесь</span>
    </Link>
  </div>
);
