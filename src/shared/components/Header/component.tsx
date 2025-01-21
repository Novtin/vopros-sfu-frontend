import { memo, useContext } from 'react';
import { IHeaderProps } from './component.props';
import { cn } from '@/shared/lib/cn';
import { ThemeToggle } from '../ThemeToggle';
import { Search } from '../Search';
import { useFetchUserData } from '@/api/useFetchUserData';
import { BellSvg, LogoSvg } from '@/shared/assets';
import { AuthContext } from '@/app/hooks/useAuth';

export const Header: React.FC<IHeaderProps> = memo(({ className, ...props }) => {
  const { avatar, nickname } = useFetchUserData();
  const { isAuth } = useContext(AuthContext);

  return (
    <header
      className={cn(
        'flex items-center justify-between bg-base-grey-01 px-4 py-3 shadow-md border-b-2 border-base-orange-stroke',
        className,
      )}
      {...props}
    >
      <div className="flex items-center flex-grow">
        <img src={LogoSvg} alt="Logo" className="w-10 h-10 rounded-xl" />
        <span className="ml-4 text-lg font-bold text-base-orange-01">ВопроСФУ</span>
        <Search className="ml-10 w-full sm:max-w-[150px] md:max-w-[300px] lg:max-w-[500px] xl:max-w-[800px] 2xl:max-w-[1000px] 3xl:max-w-[1400px] 4xl:max-w-[2000px]" />
        {isAuth && (
          <div className="flex items-center">
            <button className="text-xl ml-4">
              <BellSvg />
            </button>
            <div className="flex items-center ml-7">
              <img src={avatar} alt="User Avatar" className="w-10 h-10 rounded-xl" />
              <span className="ml-3 text-base-grey-07 font-bold">{nickname}</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <ThemeToggle />
      </div>
    </header>
  );
});
