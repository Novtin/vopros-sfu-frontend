import { AuthCodeRequest, AuthCodeResponse } from '@/shared/types/code';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { createOrUpdateAuthCode } from '@/data/auth';

export const useCreateOrUpdateAuthCode = (
  mutationOptions?: Omit<UseMutationOptions<AuthCodeResponse, unknown, AuthCodeRequest>, 'mutationKey' | 'mutationFn'>,
) => {
  return useMutation<AuthCodeResponse, unknown, AuthCodeRequest>({
    mutationKey: ['createOrUpdateAuthCode'],
    mutationFn: createOrUpdateAuthCode,
    ...mutationOptions,
  });
};
