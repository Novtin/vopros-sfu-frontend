import React from 'react';
import { FiltersProps } from './component.props';
import { Button } from '../Button';
import { cn } from '@/shared/lib/cn';

export const FiltersBar = ({ options, activeFilter, className, onFilterChange }: FiltersProps) => {
  return (
    <div
      role="group"
      className={cn('flex py-1 px-4 rounded-xl gap-2 border border-base-grey-07 border-opacity-50 w-fit ', className)}
    >
      {options.map(option => (
        <Button
          key={option.id}
          onClick={() => onFilterChange(option.id)}
          variant="filterBar"
          className={`py-1 px-6 rounded-xl ${
            activeFilter === option.id
              ? 'bg-base-grey-06 text-base-grey-09 font-bold font-opensans'
              : 'bg-base-grey-01 text-base-grey-09 font-opensans hover:bg-base-grey-06 hover:text-base-grey-09'
          }`}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};
