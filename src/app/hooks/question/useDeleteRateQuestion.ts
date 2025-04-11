import { deleteRateQuestion } from '@/data/question';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useDeleteRateQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, { id: number; value: 1 | -1 }>({
    mutationFn: deleteRateQuestion,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['question', variables.id]);
      queryClient.setQueryData(['question', variables.id], (oldData: any) => {
        if (oldData) {
          const newLikes = variables.value === 1 ? oldData.countLikes - 1 : oldData.countLikes;
          const newDislikes = variables.value === -1 ? oldData.countDislikes - 1 : oldData.countDislikes;
          return { ...oldData, countLikes: newLikes, countDislikes: newDislikes };
        }
        return oldData;
      });
    },
  });
};
