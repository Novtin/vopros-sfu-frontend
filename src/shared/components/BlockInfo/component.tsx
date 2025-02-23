import { cn } from '@/shared/lib/cn';
import { BlockInfoProps } from './component.props';
import { Link } from 'react-router-dom';
import { COMMIN_CLASSES } from './constants';

export const BlockInfo = ({ title, descroption, highlightText, className, link }: BlockInfoProps) => {
  return (
    <div>
      <h3 className="text-2xl text-base-grey-09 font-normal mb-2">{title}</h3>
      <div
        className={cn(
          'flex justify-center items-center bg-base-grey-01 p-4 shadow rounded-xl',
          'dark:shadow-[0_4px_12px_rgba(0,0,0,1)]',
          className,
        )}
      >
        <p className="text-gray-500">
          {descroption}{' '}
          {link ? (
            <Link to={link} className={COMMIN_CLASSES}>
              {highlightText}
            </Link>
          ) : (
            <span className={COMMIN_CLASSES}>{highlightText}</span>
          )}
        </p>
      </div>
    </div>
  );
};
