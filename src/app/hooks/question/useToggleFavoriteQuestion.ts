import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { addFavoriteQuestion, removeFromFavorites } from '@/data/question';
import notify from '@/utils/notify';

export const useToggleFavoriteQuestion = (
  queryOptions?: Omit<UseMutationOptions<void, Error, { id: number; isFavorite: boolean }>, 'mutationFn'>,
) => {
  return useMutation({
    ...queryOptions,
    mutationFn: async ({ id, isFavorite }: { id: number; isFavorite: boolean }) => {
      if (isFavorite) {
        await removeFromFavorites(id);
        notify('Удален!', 'Вопрос успешно удален из избранных!', 'warning');
      } else {
        await addFavoriteQuestion(id);
        notify('Добавлен!', 'Вопрос успешно добавлен в избранные!', 'success');
      }
    },
  });
};
