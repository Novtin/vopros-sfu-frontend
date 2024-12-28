import { ROUTER_PATHS } from '@/app/consts';
import React, { memo, useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { NavItemProps } from './component.props';
import { cn } from '@/shared/lib/cn';
import { AuthContext } from '@/app/hooks/useAuth';

export const Navbar: React.FC = () => {
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
        isCollapsed ? 'w-16' : 'w-64'
      } bg-base-grey-01 border-r border-base-grey-05`}
      style={{ height: 'calc(100vh - 73px)' }}
    >
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
          isActive={location.pathname === ROUTER_PATHS.HOME + ROUTER_PATHS.QUESTIONS}
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
      {/* Кнопка сворачивания */}
      <button className="p-2 m-2 text-gray-600 hover:bg-gray-200 rounded" onClick={() => setIsCollapsed(!isCollapsed)}>
        {isCollapsed ? '>' : '<'}
      </button>
    </div>
  );
};

export const NavItem = memo<NavItemProps & { isActive: boolean; className?: string }>(
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
        {!isCollapsed && <span className="ml-2 text-sm text-nowrap">{text}</span>}
      </div>
    );
  },
);
