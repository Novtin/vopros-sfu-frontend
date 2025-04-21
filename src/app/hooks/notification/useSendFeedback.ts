import { sendFeedback } from '@/data/notification/notificationService';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export const useSendFeedback = (
  queryOptions?: Omit<
    UseMutationOptions<void, Error, { title: string; text: string; email: string; imageFiles: File[] }>,
    'mutationFn'
  >,
) => {
  return useMutation({
    ...queryOptions,
    mutationFn: ({ title, text, email, imageFiles }) => sendFeedback(title, text, email, imageFiles),
  });
};
