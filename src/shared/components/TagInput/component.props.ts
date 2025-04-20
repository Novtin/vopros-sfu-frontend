import { Tag } from '@/shared/types';

export interface TagInputProps {
  allTags: Tag[];
  selectedTags: Tag[];
  onChange: (tags: Tag[]) => void;
}
