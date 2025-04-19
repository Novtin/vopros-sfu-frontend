import { uploadQuestionImages } from '@/data/img';
import { Question } from '@/shared/types/question';
import notify from '@/utils/notify';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export const useUploadQuestionImages = (
  options?: Omit<UseMutationOptions<Question, Error, { id: number; imageFiles: File[] }>, 'mutationFn'>,
) => {
  return useMutation({
    ...options,
    mutationFn: async ({ id, imageFiles }) => {
      const updatedQuestion = await uploadQuestionImages(id, imageFiles);
      return updatedQuestion;
    },
  });
};
