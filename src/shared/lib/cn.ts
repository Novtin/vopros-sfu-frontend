import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const tw = extendTailwindMerge({
  override: {},
  extend: {
    theme: {
      colors: [
        'base-grey-01',
        'base-grey-02',
        'base-grey-03',
        'base-grey-04',
        'base-grey-05',
        'base-grey-06',
        'base-grey-07',
        'base-grey-08',
        'base-blue-01',
        'base-blue-02',
        'base-blue-03',
        'base-orange-01',
        'base-orange-02',
        'base-orange-border',
        'base-orange-hover',
        'base-orange-disabled',
        'base-green-01',
        'base-green-02',
      ],
      borderRadius: ['button'],
    },
  },
});

export const cn = (...classes: ClassValue[]) => tw(clsx(classes));
