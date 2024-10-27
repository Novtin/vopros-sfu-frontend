import { Link } from 'react-router-dom';
import { LogoSvg } from '../../assets';
import { Search } from '../Search';
import { ThemeToggle } from '../ThemeToggle';
import { ROUTER_PATHS } from '../../../consts';
import { memo } from 'react';
import { IHeaderProps } from './component.props';
import { cn } from '../../lib/cn';

export const Header = memo(({ className, ...props }: IHeaderProps) => {
  return (
    <header
      className={cn(
        'flex items-center justify-between bg-base-grey-01 p-4 shadow-md transition-colors duration-500',
        className,
      )}
      {...props}
    >
      <div className="flex items-center space-x-4">
        <img src={LogoSvg} alt="Logo" className="w-10 h-10 rounded-xl" />
        <span className="text-lg font-bold text-base-orange-01">ВопроСФУ</span>
        <nav className="flex space-x-4 text-base-grey-07 ">
          <Link to={ROUTER_PATHS.HOME} className="hover:text-base-grey-06 transition-colors duration-500">
            Главная
          </Link>
          <Link to={ROUTER_PATHS.QUESTIONS} className="hover:text-base-grey-06 transition-colors duration-500">
            Вопросы
          </Link>
          <Link to={ROUTER_PATHS.ABOUT} className="hover:text-base-grey-06 transition-colors duration-500">
            О нас
          </Link>
        </nav>
      </div>

      <div className="flex items-center space-x-4">
        <Search className="w-[400px]" />
        <ThemeToggle />
      </div>
    </header>
  );
});
