import { confirmAuthCode } from '@/data/auth';
import { AuthCodeConfirmRequest, AuthCodeConfirmResponse } from '@/shared/types/code';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export const useConfirmAuthCode = (
  mutationOptions?: Omit<
    UseMutationOptions<AuthCodeConfirmResponse, unknown, AuthCodeConfirmRequest>,
    'mutationKey' | 'mutationFn'
  >,
) => {
  return useMutation<AuthCodeConfirmResponse, unknown, AuthCodeConfirmRequest>({
    mutationKey: ['confirmAuthCode'],
    mutationFn: confirmAuthCode,
    ...mutationOptions,
  });
};
