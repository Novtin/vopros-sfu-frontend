import { Tag } from '@/shared/types';

export interface FilterModalProps {
  currentFilters: {
    isWithoutAnswer: boolean;
    isWithoutView: boolean;
    isWithoutRating: boolean;
    isResolved: boolean;
    tagIds: number[];
  };
  onApplyFilters: (filters: FilterModalProps['currentFilters']) => void;
  initialSelectedTags?: Tag[];
}
