import { memo } from 'react';
import { ISearchProps } from './component.props';
import { cn } from '@/shared/lib/cn';
import { SearchSvg } from '@/shared/assets';

export const Search = memo(({ className, ...props }: ISearchProps) => {
  return (
    <div className={cn('relative', className)}>
      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
        <SearchSvg className="w-5 text-base-grey-08 opacity-50 " />
      </span>
      <input
        type="text"
        placeholder="Искать..."
        className="bg-base-grey-01 text-base-grey-07 border rounded-xl pl-12 pr-4 py-1 w-full hover:border-base-grey-05 focus:outline-none focus:border-base-grey-06 focus:border-1 focus:text-base-grey-07"
        {...props}
      />
    </div>
  );
});
