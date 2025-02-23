import { useState } from 'react';
import { SelectProps } from './component.props';
import { Button } from '../Button';
import { cn } from '@/shared/lib/cn';
import { ArrowRight01Icon } from 'hugeicons-react';

export const Select = ({ label, options, selected, onChange, className }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn('relative w-[300px]', className)}>
      {label && <label className="block text-xl text-base-grey-07 mb-2">{label}</label>}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-3 py-1 border border-base-grey-07 rounded-lg text-base font-medium text-base-grey-09 bg-base-grey-01 hover:bg-base-grey-02 focus:border-base-grey-07 shadow-sm"
      >
        {selected.label}
        <ArrowRight01Icon color="var(--base-grey-08)" width="24px" height="24px" className="rotate-90" />
      </Button>
      {isOpen && (
        <ul className="absolute w-full bg-base-grey-01 hover:bg-base-grey-02 border rounded-lg shadow-md mt-0.5 z-10">
          {options.map(option => (
            <li
              key={option.value}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className="px-3 py-1 text-base font-medium text-base-grey-09 cursor-pointer"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
