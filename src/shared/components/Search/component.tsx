import { memo } from 'react';
import { ISearchProps } from './component.props';
import { cn } from '@/shared/lib/cn';
import { SearchSvg } from '@/shared/assets';

export const Search = memo(({ className, ...props }: ISearchProps) => {
  return (
    <div className="relative w-fit">
      <input
        type="text"
        placeholder="Искать..."
        className={cn(
          'bg-base-grey-01 text-base-grey-07 border rounded-xl px-4 py-1 pl-10 hover:border-base-grey-05 focus:outline-none focus:border-base-grey-06 focus:border-1 focus:text-base-grey-07 transition-colors duration-500',
          className,
        )}
        {...props}
      />
      <span className="absolute left-3 top-1 text-gray-500 transition-colors duration-500">
        <SearchSvg className="w-5 text-base-grey-08 opacity-50 transition-colors duration-500 ease-in-out" />
      </span>
    </div>
  );
});
