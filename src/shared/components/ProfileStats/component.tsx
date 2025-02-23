import { cn } from '@/shared/lib/cn';
import { ProfileStatsProps } from './component.props';

export const ProfileStats = ({ title = 'Статистика', items, className }: ProfileStatsProps) => {
  return (
    <div>
      <h3 className="text-2xl text-base-grey-09 font-normal mb-2">{title}</h3>
      <div className={cn('p-5 bg-base-grey-01 shadow rounded-xl', 'dark:shadow-[0_4px_12px_rgba(0,0,0,1)]', className)}>
        <div className="flex gap-10 mt-2">
          {items.map((item, index) => (
            <div className="grid text-center text-base-grey-07" key={index}>
              <strong className="text-base-grey-07 text-3xl">{item.value}</strong> {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
