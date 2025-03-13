import { updateUser } from '@/data/user';
import { ResponseUserData } from '@/shared/types/user';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export const useUpdateUser = (
  options?: UseMutationOptions<
    ResponseUserData,
    Error,
    { id: number; userData: { description: string; nickname: string } }
  >,
) => {
  return useMutation({
    mutationFn: ({ id, userData }) => updateUser(id, userData),
    ...options,
  });
};
