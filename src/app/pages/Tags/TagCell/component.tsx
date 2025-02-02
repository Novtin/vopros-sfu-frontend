import { cn } from '@/shared/lib/cn';
import { TagCellProps } from './component.props';
import { calculateFontSize } from './constants';

export const TagCell = ({ tag, className }: TagCellProps) => {
  const fontSize = calculateFontSize(tag.name);
  return (
    <div
      className={cn(
        'flex items-center justify-center p-2 min-h-[120px] h-[100%] font-bold rounded-xl text-base-grey-01 dark:text-base-grey-09 transition-transform hover:scale-105 hover:cursor-pointer hover:shadow-lg dark:hover:shadow-[0_4px_6px_rgba(255,255,255,0.25)]',
        className,
      )}
      style={{ fontSize: `${fontSize}px` }}
    >
      {tag.name}
    </div>
  );
};
