import { ROUTER_PATHS } from '@/app/consts';
import { Header } from '@/shared/components/Header';
import { Navbar } from '@/shared/components/NavBar/component';
import { LoginForm } from '@/shared/modules/LoginForm';
import { Link } from 'react-router-dom';

export const LoginPage = () => (
  <main className="w-full min-h-screen">
    <Header />
    <div className="flex flex-row" style={{ minHeight: `calc(100vh - 73px)` }}>
      <Navbar />
      <div className="flex flex-col flex-1 items-center justify-center">
        <LoginForm />
        <Link to={ROUTER_PATHS.HOME + ROUTER_PATHS.REGISTER} className="mt-8 text-body-2 text-base-grey-08">
          У вас нет учетной записи? <span className="font-bold text-base-blue-01">Зарегистрируйтесь</span>
        </Link>
      </div>
    </div>
  </main>
);
