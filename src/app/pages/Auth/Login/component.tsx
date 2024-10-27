import { Link } from 'react-router-dom';
import { Header } from '../../../shared/components/Header';
import { LoginForm } from '../../../shared/modules/LoginForm';
import { ROUTER_PATHS } from '../../../consts';

export const LoginPage = () => (
  <main className="w-full min-h-screen">
    <Header />
    <div className="flex flex-col items-center justify-center" style={{ minHeight: `calc(100vh - 72px)` }}>
      <LoginForm />
      <Link to={ROUTER_PATHS.HOME + ROUTER_PATHS.REGISTER} className="mt-8 text-body-2 text-base-grey-08">
        Еще нет аккаунта? <span className="font-bold text-base-blue-01">Зарегистрируйтесь</span>
      </Link>
    </div>
  </main>
);
