import { updateQuestion } from '@/data/question';
import { Question } from '@/shared/types/question';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

type UpdateQuestionParams = {
  id: number;
  title: string;
  description: string;
  tagNames: string[];
};

export const useUpdateQuestion = (
  queryOptions?: Omit<UseMutationOptions<Question, Error, UpdateQuestionParams>, 'mutationFn'>,
) => {
  return useMutation({
    ...queryOptions,
    mutationFn: ({ id, title, description, tagNames }) => updateQuestion(id, title, description, tagNames),
  });
};
