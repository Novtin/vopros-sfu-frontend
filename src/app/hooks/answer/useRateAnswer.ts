import { rateAnswer } from '@/data/answer';
import { Answer } from '@/shared/types/question';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useRateAnswer = (answerId: number) => {
  const queryClient = useQueryClient();
  return useMutation<Answer, AxiosError, { id: number; value: 1 | -1 }>({
    mutationFn: rateAnswer,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['answer', answerId]);
      queryClient.setQueryData(['answer', answerId], (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          answers: oldData.answers?.map((answer: Answer) =>
            answer.id === variables.id
              ? {
                  ...answer,
                  likeUserIds:
                    variables.value === 1
                      ? [...(answer.likeUserIds || []), 'temp']
                      : (answer.likeUserIds || []).filter(id => id !== 'temp'),
                }
              : answer,
          ),
        };
      });
    },
  });
};
