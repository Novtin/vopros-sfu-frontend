import { setFavoriteTags } from '@/data/tags/tagsService';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

interface SetFavoriteTagsParams {
  tagsIds: number[];
}

export const useSetFavoriteTags = (
  queryOptions?: Omit<UseMutationOptions<void, Error, SetFavoriteTagsParams>, 'mutationFn'>,
) => {
  return useMutation({
    ...queryOptions,
    mutationFn: ({ tagsIds }) => setFavoriteTags(tagsIds),
  });
};
