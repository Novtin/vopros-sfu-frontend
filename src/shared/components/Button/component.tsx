import { memo } from 'react';
import type { IButtonProps } from './component.props';
import { cn } from '@/shared/lib/cn';
import { VARIANTS } from './constants';

export const Button = memo(({ variant = 'primary', className, children, ...props }: IButtonProps) => {
  return (
    <button
      className={cn(
        'custom-flex rounded-button cursor-pointer disabled:cursor-not-allowed ',
        VARIANTS[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
});
