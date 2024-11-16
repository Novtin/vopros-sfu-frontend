import { memo } from 'react';
import type { IButtonProps, Variant } from './component.props';
import { cn } from '@/shared/lib/cn';

const variants: Record<Variant, string> = {
  primary:
    'border-2 border-transparent bg-base-orange-01 text-base-grey-01 text-lg hover:bg-base-orange-hover disabled:bg-base-orange-disabled focus:border-base-orange-border focus:border-2 focus:outline-none disabled:bg-base-orange-disabled',
};

export const Button = memo(({ variant = 'primary', className, children, ...props }: IButtonProps) => (
  <button
    className={cn(
      'custom-flex rounded-button cursor-pointer disabled:cursor-not-allowed font-bold transition-colors duration-500 ease-in-out',
      variants[variant],
      className,
    )}
    {...props}
  >
    {children}
  </button>
));
