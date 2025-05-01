import { useState } from 'react';
import { TabsProps } from './component.props';
import { cn } from '@/shared/lib/cn';
import { Button } from '../Button';

export const Tabs = ({ tabs, initialActiveTab, onTabChange, className }: TabsProps) => {
  const [activeTab, setActiveTab] = useState<string>(initialActiveTab ?? tabs[0]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <div role="group" className={cn('flex gap-4 mt-4', className)}>
      {tabs.map(tab => (
        <Button
          key={tab}
          onClick={() => handleTabClick(tab)}
          className={`w-[150px] text-base font-normal ${
            activeTab === tab ? 'bg-base-orange-01 border-none text-base-grey-01' : 'bg-base-grey-06'
          }`}
        >
          {tab}
        </Button>
      ))}
    </div>
  );
};
