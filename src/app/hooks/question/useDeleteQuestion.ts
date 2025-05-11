import { deleteQuestion } from '@/data/question';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export const useDeleteQuestion = (
  queryOptions?: Omit<UseMutationOptions<void, Error, { id: number }>, 'mutationFn'>,
) => {
  return useMutation({
    ...queryOptions,
    mutationFn: ({ id }) => deleteQuestion(id),
  });
};
