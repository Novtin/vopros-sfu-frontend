import { useAuth } from '@/app/hooks/useAuth';
import { Header } from '@/shared/components/Header';
import { Navbar } from '@/shared/components/NavBar/component';

export const QuestionPage = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <main>
      <Header />
      <div className="flex flex-row">
        <Navbar />
        <button onClick={handleLogout}>Выйти из аккаунта</button>
      </div>
    </main>
  );
};
