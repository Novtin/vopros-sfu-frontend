import { getAnswerById } from '@/data/answer';
import { Answer } from '@/shared/types/question';
import { useQuery } from '@tanstack/react-query';

export const useGetANswerById = (id: number) => {
  return useQuery<Answer, Error>({
    queryKey: ['answer', id],
    queryFn: () => getAnswerById(id),
    enabled: Boolean(id),
  });
};
