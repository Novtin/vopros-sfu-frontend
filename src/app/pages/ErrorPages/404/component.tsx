import { ROUTER_PATHS } from '@/app/consts';
import { Link } from 'react-router-dom';

export const Error404 = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#ffffff] dark:bg-[#030005]">
      <h1 className="text-[224px] font-extrabold text-[#030005] leading-none tracking-tighter shadow-text">404</h1>
      <h2
        style={{ textShadow: '0px 2px 0px #8400ff' }}
        className="text-2xl md:text-4xl font-bold text-base-grey-09 uppercase tracking-[6px] whitespace-nowrap"
      >
        Страница не найдена
      </h2>
      <Link
        to={ROUTER_PATHS.HOME}
        className="mt-8 inline-block uppercase border-2 border-pink-500 text-pink-500 hover:text-purple-600 hover:border-purple-600 px-8 py-2 text-sm font-bold transition-all duration-300"
      >
        Главная
      </Link>
    </div>
  );
};
