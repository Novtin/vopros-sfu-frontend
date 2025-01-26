import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import axios from 'axios';

type CheckNicknameResponse = {
  available: boolean;
};

export const useCheckNicknameValidation = (
  mutationOptions?: Omit<UseMutationOptions<CheckNicknameResponse, unknown, string>, 'mutationKey' | 'mutationFn'>,
) => {
  return useMutation({
    ...mutationOptions,
    mutationKey: ['checkNicknameValidation'],
    mutationFn: async (nickname: string) => {
      const response = await axios.post<CheckNicknameResponse>('/auth/check-nickname', { nickname });
      return response.data;
    },
  });
};
