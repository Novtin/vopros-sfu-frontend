import { forwardRef, useState } from 'react';
import { cn } from '@/shared/lib/cn';
import { IInputProps } from './component.props';
import { NonVisibilitySvg, VisibilitySvg } from '@/shared/assets';

export const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ label, type = 'text', placeholder, toggleVisibility, error, success, className, ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleToggleVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    return (
      <div className="mb-4">
        <label className="block text-base-blue-02 text-lg font-bold mb-2 transition-colors duration-500 ease-in-out">
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            type={toggleVisibility && isPasswordVisible ? 'text' : type}
            placeholder={placeholder}
            className={cn(
              'w-full text-base-grey-09 py-2 px-3 bg-base-grey-01 border rounded-md hover:border-base-grey-05 focus:outline-none transition-colors duration-500 ease-in-out',
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
              className="absolute right-3 top-3 focus:outline-none opacity-50 text-base-grey-08"
              aria-label="Toggle password visibility"
            >
              {isPasswordVisible ? <VisibilitySvg /> : <NonVisibilitySvg />}
            </button>
          )}
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  },
);
