import { cn } from '../../lib/cn';
import { IInputProps } from './component.props';

export const Input = ({ className, label, type = 'text', placeholder, ...props }: IInputProps) => {
  return (
    <div className="mb-4 ">
      <label className="block text-base-blue-02 text-lg font-bold mb-2 transition-colors duration-500 ease-in-out">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className={cn(
          'w-full px-3 py-2 bg-base-grey-01 border border-base-grey-04 rounded-md hover:border-base-grey-05 focus:outline-none focus:border-base-grey-06 focus:border-1 transition-colors duration-500 ease-in-out',
          className,
        )}
        {...props}
      />
    </div>
  );
};
