import { resolveAnswer, unresolveAnswer } from '@/data/answer';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useResolveAnswer = () => {
  const queryClient = useQueryClient();

  const markAsResolved = useMutation({
    mutationFn: ({ questionId, answerId }: { questionId: number; answerId: number }) =>
      resolveAnswer({ questionId, answerId }),
    onSuccess: () => {
      queryClient.invalidateQueries(['question']);
    },
  });

  const unmarkAsResolved = useMutation({
    mutationFn: ({ questionId }: { questionId: number }) => unresolveAnswer({ questionId }),
    onSuccess: () => {
      queryClient.invalidateQueries(['question']);
    },
  });

  return { markAsResolved, unmarkAsResolved };
};
