import { getQuestionCount } from '@/data/question';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useQuestionCount = (queryOptions?: Omit<UseQueryOptions<number>, 'queryKey' | 'queryFn'>) => {
  return useQuery({
    ...queryOptions,
    queryKey: ['questionCount'],
    queryFn: getQuestionCount,
  });
};
