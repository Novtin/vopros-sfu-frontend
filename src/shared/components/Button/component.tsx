import { memo } from 'react';
import type { IButtonProps, Variant } from './component.props';
import { cn } from '@/shared/lib/cn';

const variants: Record<Variant, string> = {
  primary:
    'border-2 border-transparent bg-base-orange-01 text-base-grey-01 dark:text-base-grey-09 text-lg hover:bg-base-orange-hover disabled:bg-base-orange-disabled focus:border-base-orange-border focus:border-2 focus:outline-none disabled:bg-base-orange-disabled font-bold',
  secondary: 'border-2 border-transparent bg-base-blue-01 text-white text-base hover:bg-base-blue-hover font-bold',
  filterBar: 'bg-base-grey-06 text-base-grey-09 font-bold text-sm hover:bg-base-grey-07 hover:text-base-grey-03',
};

export const Button = memo(({ variant = 'primary', className, children, ...props }: IButtonProps) => {
  return (
    <button
      className={cn(
        'custom-flex rounded-button cursor-pointer disabled:cursor-not-allowed ',
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
});
