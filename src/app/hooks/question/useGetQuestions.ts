import { useInfiniteQuery } from '@tanstack/react-query';
import { getQuestions } from '@/data/question';
import { QuestionsResponse } from '@/shared/types/question';

export const useGetQuestions = (params?: Record<string, string | number | boolean>) => {
  return useInfiniteQuery<QuestionsResponse, Error>({
    queryKey: ['questions', params],
    queryFn: async ({ pageParam }: { pageParam: unknown }) => {
      const page = typeof pageParam === 'number' ? pageParam : 1;
      const response = await getQuestions({ ...params, page });
      return response as QuestionsResponse;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => (lastPage.items.length > 0 ? allPages.length + 1 : undefined),
  });
};
