import { useAuth } from '@/app/providers/auth';

export const HomePage = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <main>
      <div>HomePage</div>
      <button onClick={handleLogout}>Выйти из аккаунта</button>
    </main>
  );
};
