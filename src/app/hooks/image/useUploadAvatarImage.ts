import { uploadAvatarImage } from '@/data/img';
import { ResponseUserData } from '@/shared/types/user';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export const useUploadAvatarImage = (
  queryOptions?: Omit<UseMutationOptions<ResponseUserData, Error, { userId: number; file: File }>, 'mutationFn'>,
) => {
  return useMutation({
    ...queryOptions,
    mutationFn: ({ userId, file }) => uploadAvatarImage(userId, file),
  });
};
