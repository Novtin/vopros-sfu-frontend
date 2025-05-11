import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { deleteRateAnswer } from '@/data/answer';
import { Answer } from '@/shared/types/answer';

export const useDeleteRateAnswer = (answerId: number) => {
  const queryClient = useQueryClient();

  return useMutation<Answer, AxiosError, { id: number; value: 1 | -1 }>({
    mutationFn: deleteRateAnswer,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['answer', answerId]);
      queryClient.setQueryData(['answer', answerId], (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          answers: oldData.answers?.map((a: Answer) =>
            a.id === variables.id
              ? {
                  ...a,
                  likeUserIds: variables.value === 1 ? a.likeUserIds?.slice(0, -1) : a.likeUserIds,
                  dislikeUserIds: variables.value === -1 ? a.dislikeUserIds?.slice(0, -1) : a.dislikeUserIds,
                }
              : a,
          ),
        };
      });
    },
  });
};
