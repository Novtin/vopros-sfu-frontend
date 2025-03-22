import { ROUTER_PATHS } from '@/app/consts';
import { memo, useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { NavItemProps } from './component.props';
import { cn } from '@/shared/lib/cn';
import { AuthContext } from '@/app/hooks/authentication/useAuth';
import { Menu01Icon } from 'hugeicons-react';

export const Navbar = () => {
  const LogoSvg = '/images/logo.png';
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    const savedState = localStorage.getItem('navbarOpen');
    return savedState === 'true';
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuth } = useContext(AuthContext);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  useEffect(() => {
    localStorage.setItem('navbarOpen', isCollapsed.toString());
  }, [isCollapsed]);

  return (
    <div
      className={`flex flex-col transition-all duration-500 ease-in-out ${
        isCollapsed ? 'w-16' : 'w-60'
      } bg-base-grey-01 border-r-2 border-base-orange-stroke`}
    >
      <div
        className={cn(
          'flex items-center p-2 border-b-2 border-base-orange-stroke min-h-[60px]',
          !isCollapsed ? 'justify-evenly' : 'justify-center',
        )}
      >
        <Menu01Icon
          color="var(--base-grey-09)"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hover:cursor-pointer"
        />
        <div className="flex items-center">
          {!isCollapsed && <img src={LogoSvg} alt="Logo" className="w-10 h-10 rounded-xl" />}
          {!isCollapsed && <span className="ml-2 text-lg font-bold text-base-orange-01">ВопроСФУ</span>}
        </div>
      </div>
      <nav className="flex flex-col mt-4">
        <NavItem
          icon="🏠"
          text="Главная"
          isCollapsed={isCollapsed}
          isActive={location.pathname === ROUTER_PATHS.HOME}
          onClick={() => handleNavigation(ROUTER_PATHS.HOME)}
        />
        <NavItem
          icon="💬"
          text="Обратная связь"
          isCollapsed={isCollapsed}
          isActive={location.pathname === ROUTER_PATHS.CONTACT}
          onClick={() => handleNavigation(ROUTER_PATHS.CONTACT)}
        />
        <NavItem
          icon="❓"
          text="Вопросы"
          isCollapsed={isCollapsed}
          isActive={location.pathname === ROUTER_PATHS.QUESTIONS}
          onClick={() => handleNavigation(ROUTER_PATHS.QUESTIONS)}
          className="mt-4"
        />
        <NavItem
          icon="🔒"
          text="Теги"
          isCollapsed={isCollapsed}
          isActive={location.pathname === ROUTER_PATHS.TAGS}
          onClick={() => handleNavigation(ROUTER_PATHS.TAGS)}
        />
        <NavItem
          icon="👤"
          text="Пользователи"
          isCollapsed={isCollapsed}
          isActive={location.pathname === ROUTER_PATHS.USERS}
          onClick={() => handleNavigation(ROUTER_PATHS.USERS)}
        />
        {isAuth && (
          <NavItem
            icon="📑"
            text="Сохраненные"
            isCollapsed={isCollapsed}
            isActive={location.pathname === ROUTER_PATHS.SAVED}
            onClick={() => handleNavigation(ROUTER_PATHS.SAVED)}
          />
        )}
      </nav>
      {/* <button className="p-2 m-2 text-gray-600 hover:bg-gray-200 rounded" onClick={() => setIsCollapsed(!isCollapsed)}>
        {isCollapsed ? '>' : '<'}
      </button> */}
    </div>
  );
};

const NavItem = memo<NavItemProps & { isActive: boolean; className?: string }>(
  ({ icon, text, isCollapsed, isActive, onClick, className }) => {
    return (
      <div
        className={cn(
          'flex items-center p-2 cursor-pointer relative text-base-grey-09',
          isActive &&
            'bg-active-navbar text-base-grey-09 before:block before:w-1.5 before:h-full before:bg-base-orange-01 before:absolute before:top-0 before:left-0',
          !isActive && 'hover:bg-base-orange-hover',
          className,
        )}
        onClick={onClick}
      >
        <span className="text-xl pl-3">{icon}</span>
        <span
          className={cn(
            'ml-2 text-sm text-nowrap transition-opacity duration-500 ease-in-out',
            isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto overflow-visible',
          )}
        >
          {text}
        </span>
      </div>
    );
  },
);
