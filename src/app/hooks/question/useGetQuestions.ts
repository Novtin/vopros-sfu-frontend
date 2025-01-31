import { getQuestions } from '@/data/question';
import { QuestionsResponse } from '@/shared/types/question';
import { useQuery } from '@tanstack/react-query';

export const useGetQuestions = (params?: Record<string, string | number | boolean>) => {
  const data = useQuery<QuestionsResponse>({
    queryKey: ['questions', params],
    queryFn: () => getQuestions(params),
  });

  return data;
};
