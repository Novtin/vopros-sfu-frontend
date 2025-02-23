import { registerUser } from '@/data/auth';
import { RegisterUserData, ResponseUserData } from '@/shared/types/user';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export const useRegisterUser = (
  mutationOptions?: Omit<UseMutationOptions<ResponseUserData, unknown, RegisterUserData>, 'mutationKey' | 'mutationFn'>,
) => {
  return useMutation<ResponseUserData, unknown, RegisterUserData>({
    ...mutationOptions,
    mutationKey: ['registerUser'],
    mutationFn: registerUser,
  });
};
