import { Tag } from '@/shared/types/tag';

export interface TagsTableProps {
  tags: Tag[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
}
