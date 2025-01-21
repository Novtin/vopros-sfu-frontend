import React, { forwardRef } from 'react';
import { ITextareaProps } from './component.props';
import { cn } from '@/shared/lib/cn';

const Textarea: React.FC<ITextareaProps> = forwardRef<HTMLTextAreaElement, ITextareaProps>(
  ({ label, placeholder, error, success, className, ...props }, ref) => {
    return (
      <div className="mb-4">
        {label && <label className="block text-xl text-base-grey-07 font-bold mb-2">{label}</label>}
        <textarea
          ref={ref}
          placeholder={placeholder}
          className={cn(
            'w-full mt-1 p-2 bg-base-grey-01 text-base-grey-09 border rounded-md hover:border-base-grey-05 focus:outline-none',
            {
              'border-red-500': !!error,
              'border-green-500': success,
            },
            className,
          )}
          {...props}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';

export { Textarea };
