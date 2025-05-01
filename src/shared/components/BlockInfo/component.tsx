import { cn } from '@/shared/lib/cn';
import { BlockInfoProps } from './component.props';
import { Link } from 'react-router-dom';
import { COMMIN_CLASSES } from './constants';
import { ClipLoader } from 'react-spinners';

export const BlockInfo = ({ title, description, highlightText, className, link, isLoading }: BlockInfoProps) => {
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
        {isLoading ? (
          <ClipLoader color="#ff5722" size={48} data-testid="spinner" />
        ) : (
          <p className={`${link ? 'text-gray-500' : 'text-base-grey-09'}`}>
            {description}{' '}
            {link ? (
              <Link to={link} className={COMMIN_CLASSES}>
                {highlightText}
              </Link>
            ) : (
              <span className={COMMIN_CLASSES}>{highlightText}</span>
            )}
          </p>
        )}
      </div>
    </div>
  );
};
