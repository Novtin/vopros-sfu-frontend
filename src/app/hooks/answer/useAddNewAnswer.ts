import { addNewAnswer } from '@/data/answer';
import { AddAnswerParams } from '@/shared/types/answer';
import { Answer } from '@/shared/types/question';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export const useAddNewAnswer = (
  queryOptions?: Omit<UseMutationOptions<Answer, Error, AddAnswerParams>, 'mutationFn'>,
) => {
  return useMutation({
    ...queryOptions,
    mutationFn: ({ questionId, text }) => addNewAnswer(questionId, text),
  });
};
