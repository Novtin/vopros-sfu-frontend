import { getTags } from '@/data/tags';
import { GetTagsParams, TagsResponse } from '@/shared/types/tag';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useTags = (
  params?: GetTagsParams,
  queryOptions?: Omit<UseQueryOptions<TagsResponse>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery({
    ...queryOptions,
    queryKey: ['tags', params],
    queryFn: () => getTags(params),
  });
};
