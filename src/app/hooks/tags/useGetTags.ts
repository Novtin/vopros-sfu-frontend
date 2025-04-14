import { getTags } from '@/data/tags';
import { GetTagsParams, TagsResponse } from '@/shared/types/tag';
import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query';

export const useTags = (params?: GetTagsParams) => {
  return useInfiniteQuery<TagsResponse, Error>({
    queryKey: ['tags', params],
    queryFn: async ({ pageParam }: QueryFunctionContext<readonly [string, GetTagsParams], unknown>) => {
      const page = (pageParam as number) ?? 1;

      const response = await getTags({
        ...params,
        page,
        pageSize: 50,
      });
      return response;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => (lastPage.items.length === 50 ? allPages.length + 1 : undefined),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
};
