import { getQuestionById } from '@/data/question';
import { Question } from '@/shared/types/question';
import { useQuery } from '@tanstack/react-query';

export const useGetQuestionById = (id: string) => {
  return useQuery<Question, Error>({
    queryKey: ['question', id],
    queryFn: () => getQuestionById(id),
    enabled: Boolean(id),
  });
};
