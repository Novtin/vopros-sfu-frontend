import React from 'react';
import { FiltersProps } from './component.props';
import { Button } from '../Button';

export const FiltersBar = ({ options, activeFilter, onFilterChange }: FiltersProps) => {
  return (
    <div className="flex py-2 px-4 rounded-xl gap-2 border border-base-grey-07 border-opacity-50 w-fit">
      {options.map(option => (
        <Button
          key={option.id}
          onClick={() => onFilterChange(option.id)}
          variant="filterBar"
          className={`py-1 px-6 rounded-xl ${
            activeFilter === option.id
              ? 'bg-base-grey-07 text-base-grey-01 font-opensans'
              : 'bg-base-grey-04 text-base-grey-09 font-opensans hover:bg-gray-500'
          }`}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};
