import { forwardRef, useState } from 'react';
import { cn } from '@/shared/lib/cn';
import { IInputProps, Variant } from './component.props';
import { ViewIcon, ViewOffSlashIcon } from 'hugeicons-react';

const variants: Record<Variant, string> = {
  login: 'block text-base-blue-01 text-base font-bold mb-2',
  primary: 'block text-base-grey-07 text-xl font-bold mb-2',
};

export const Input = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      label,
      type = 'text',
      placeholder,
      toggleVisibility,
      error,
      success,
      className,
      variant = 'login',
      optionalMargin = false,
      ...props
    },
    ref,
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleToggleVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    return (
      <div className={`${!optionalMargin ? 'mb-4' : 'mb-0'}`}>
        {label && <label className={variants[variant]}>{label}</label>}
        <div className="relative">
          <input
            ref={ref}
            type={toggleVisibility && isPasswordVisible ? 'text' : type}
            placeholder={placeholder}
            className={cn(
              'w-full text-base-grey-09 py-1 px-3 bg-base-grey-01 border rounded-md hover:border-base-grey-05 focus:outline-none',
              {
                'border-red-500': error,
                'border-green-500': success,
              },
              className,
            )}
            {...props}
          />
          {toggleVisibility && type === 'password' && (
            <button
              type="button"
              onClick={handleToggleVisibility}
              className="absolute right-3 top-1 focus:outline-none opacity-50 text-base-grey-08"
              aria-label="Toggle password visibility"
            >
              {isPasswordVisible ? <ViewIcon /> : <ViewOffSlashIcon />}
            </button>
          )}
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  },
);
