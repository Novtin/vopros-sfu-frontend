import { updateAnswer } from '@/data/answer';
import { Answer } from '@/shared/types/question';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export const useUpdateAnswer = (
  queryOptions?: Omit<UseMutationOptions<Answer, Error, { id: number; text: string }>, 'mutationFn'>,
) => {
  return useMutation({
    ...queryOptions,
    mutationFn: ({ id, text }) => updateAnswer(id, text),
  });
};
