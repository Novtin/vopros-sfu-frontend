import { rateQuestion } from '@/data/question';
import { Question } from '@/shared/types/question';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useRateQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation<Question, AxiosError, { id: number; value: 1 | -1 }>({
    mutationFn: rateQuestion,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['question', variables.id]);
      queryClient.setQueryData(['question', variables.id], (oldData: Question) => {
        if (oldData) {
          const newLikes = variables.value === 1 ? oldData.countLikes + 1 : oldData.countLikes;
          const newDislikes = variables.value === -1 ? oldData.countDislikes + 1 : oldData.countDislikes;
          return { ...oldData, countLikes: newLikes, countDislikes: newDislikes };
        }
        return oldData;
      });
    },
  });
};
