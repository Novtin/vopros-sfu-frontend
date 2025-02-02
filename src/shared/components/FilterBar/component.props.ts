export interface FilterOption {
  id: string;
  label: string;
}

export interface FiltersProps {
  options: FilterOption[];
  activeFilter: string;
  className?: string;
  onFilterChange: (id: string) => void;
}
