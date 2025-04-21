import { memo, useCallback, useContext } from 'react';
import { IHeaderProps } from './component.props';
import { cn } from '@/shared/lib/cn';
import { ThemeToggle } from '../ThemeToggle';
import { Search } from '../Search';
import { useFetchUserData } from '@/app/hooks/user/useFetchUserData';
import { AuthContext, useAuth } from '@/app/hooks/authentication/useAuth';
import { Button } from '../Button';
import { Link, useLocation } from 'react-router-dom';
import { ROUTER_PATHS } from '@/app/consts';
import { useFileUrl } from '@/app/hooks/user/useGetFile';
import { ClipLoader } from 'react-spinners';
import { Logout02Icon } from 'hugeicons-react';
import { NotificationDropdown } from '../NotificationDropdown/component';
import { useSocket } from '@/app/hooks/socket/useSocket';

export const Header = memo(({ className, ...props }: IHeaderProps) => {
  const { data } = useFetchUserData();
  const { fileUrl, isLoading } = useFileUrl(data?.avatar?.id, true);

  const { isAuth } = useContext(AuthContext);
  const { logout } = useAuth();
  const location = useLocation();

  useSocket(data?.id);

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  const isAuthPage = location.pathname === ROUTER_PATHS.LOGIN || location.pathname === ROUTER_PATHS.REGISTER;

  return (
    <header
      className={cn(
        'flex items-center justify-between bg-base-grey-01 px-4 min-h-[60px] shadow-md border-b-2 border-base-orange-stroke',
        className,
      )}
      {...props}
    >
      <div className="flex items-center flex-grow">
        <Search className="ml-10 w-full sm:max-w-[150px] md:max-w-[300px] lg:max-w-[500px] xl:max-w-[800px] 2xl:max-w-[1000px] 3xl:max-w-[1400px] 4xl:max-w-[2000px]" />
        {isAuth && (
          <div className="flex items-center mr-24">
            <NotificationDropdown userId={data?.id} />
            <Link to={ROUTER_PATHS.PROFILE}>
              <div className="flex items-center ml-7">
                {isLoading ? (
                  <ClipLoader color="#ff5722" size={30} />
                ) : (
                  fileUrl && (
                    <div className="w-10 h-10 rounded-xl overflow-hidden">
                      <img src={fileUrl} alt="User Avatar" className="w-full h-full object-cover" />
                    </div>
                  )
                )}
                <span className="ml-3 text-base-grey-07 font-bold">{data?.nickname}</span>
              </div>
            </Link>
          </div>
        )}
      </div>
      <div className="flex items-center space-x-3">
        {isAuth ? (
          <button>
            <Logout02Icon color="var(--base-grey-08)" onClick={handleLogout} />
          </button>
        ) : (
          !isAuthPage && (
            <Link to={ROUTER_PATHS.LOGIN}>
              <Button className="mr-4 text-sm py-1 px-3">Войти</Button>
            </Link>
          )
        )}
        <ThemeToggle />
      </div>
    </header>
  );
});
