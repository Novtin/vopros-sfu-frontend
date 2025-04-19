import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { addNewQuestion } from '@/data/question';
import { Question } from '@/shared/types/question';

export const useAddNewQuestion = (
  queryOptions?: Omit<
    UseMutationOptions<Question, Error, { title: string; description: string; tagNames: string[] }>,
    'mutationFn'
  >,
) => {
  return useMutation({
    ...queryOptions,
    mutationFn: ({ title, description, tagNames }) => addNewQuestion(title, description, tagNames),
  });
};
