import { getAllTags } from '@/data/tags/tagsService';
import { TagsResponse } from '@/shared/types/tag';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useAllTags = (queryOptions?: Omit<UseQueryOptions<TagsResponse>, 'queryKey' | 'queryFn'>) => {
  return useQuery<TagsResponse>({
    ...queryOptions,
    queryKey: ['allTags'],
    queryFn: getAllTags,
  });
};
