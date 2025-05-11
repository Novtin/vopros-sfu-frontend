import { getAllTags } from '@/data/tags/tagsService';
import { TagsResponse } from '@/shared/types/tag';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

interface UseAllTagsParams {
  pageSize?: number;
}

export const useAllTags = (
  { pageSize = 10000 }: UseAllTagsParams,
  queryOptions?: Omit<UseQueryOptions<TagsResponse>, 'queryKey' | 'queryFn'>,
) => {
  const queryFn = () => getAllTags(pageSize);

  return useQuery<TagsResponse>({
    ...queryOptions,
    queryKey: ['allTags', pageSize],
    queryFn,
  });
};
