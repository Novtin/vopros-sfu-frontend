export interface StatsItem {
  value: number | string;
  label: string;
}

export interface ProfileStatsProps {
  title?: string;
  items: StatsItem[];
  className?: string;
}
