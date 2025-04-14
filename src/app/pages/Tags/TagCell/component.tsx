import { cn } from '@/shared/lib/cn';
import { TagCellProps } from './component.props';
import { calculateFontSize } from './constants';
import { useNavigate } from 'react-router-dom';
import { ROUTER_PATHS } from '@/app/consts';
import { forwardRef } from 'react';

export const TagCell = forwardRef<HTMLDivElement, TagCellProps>(({ tag, className }, ref) => {
  const navigate = useNavigate();
  const fontSize = calculateFontSize(tag.name);

  const handleClick = () => {
    navigate(`${ROUTER_PATHS.QUESTIONS}/?tagIds=${tag.id}`);
  };
  return (
    <div
      ref={ref}
      onClick={handleClick}
      className={cn(
        'flex items-center justify-center p-2 min-h-[120px] h-[100%] font-bold rounded-xl text-base-grey-01 dark:text-base-grey-09 transition-all duration-300 ease-in-out hover:scale-105 hover:cursor-pointer hover:shadow-lg dark:hover:shadow-[0_4px_6px_rgba(255,255,255,0.25)]',
        className,
      )}
      style={{ fontSize: `${fontSize}px` }}
    >
      {tag.name}
    </div>
  );
});
