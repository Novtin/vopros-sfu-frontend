import { useAuth } from '@/app/hooks/useAuth';
import { Navbar } from '@/shared/components/NavBar/component';

export const HomePage = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <main>
      <Navbar />
      <div>HomePage</div>
      <button onClick={handleLogout}>Выйти из аккаунта</button>
    </main>
  );
};
