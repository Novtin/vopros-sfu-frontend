import { deleteAnswer } from '@/data/answer';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export const useDeleteAnswer = (queryOptions?: Omit<UseMutationOptions<void, Error, { id: number }>, 'mutationFn'>) => {
  return useMutation({
    ...queryOptions,
    mutationFn: ({ id }) => deleteAnswer(id),
  });
};
