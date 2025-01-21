import { memo } from 'react';
import type { IButtonProps, Variant } from './component.props';
import { cn } from '@/shared/lib/cn';

const variants: Record<Variant, string> = {
  primary:
    'border-2 border-transparent bg-base-orange-01 text-base-grey-01 text-lg hover:bg-base-orange-hover disabled:bg-base-orange-disabled focus:border-base-orange-border focus:border-2 focus:outline-none disabled:bg-base-orange-disabled font-bold',
  secondary: 'border-2 border-transparent bg-base-blue-01 text-white text-base hover:bg-base-blue-hover font-bold',
  filterBar: 'text-sm',
};

export const Button: React.FC<IButtonProps> = memo(({ variant = 'primary', className, children, ...props }) => {
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
