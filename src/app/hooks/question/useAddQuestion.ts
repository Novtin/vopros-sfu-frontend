import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { addNewQuestion } from '@/data/question';

export const useAddNewQuestion = (
  queryOptions?: Omit<
    UseMutationOptions<number, Error, { title: string; description: string; tagNames: string[] }>,
    'mutationFn'
  >,
) => {
  return useMutation({
    ...queryOptions,
    mutationFn: ({ title, description, tagNames }) => addNewQuestion(title, description, tagNames),
  });
};
