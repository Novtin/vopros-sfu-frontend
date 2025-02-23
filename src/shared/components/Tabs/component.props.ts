export interface TabsProps {
  tabs: string[];
  initialActiveTab?: string;
  onTabChange?: (activeTab: string) => void;
  className?: string;
}
