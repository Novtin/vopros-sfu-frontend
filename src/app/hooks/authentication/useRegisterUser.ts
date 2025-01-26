import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_API_URL } from '@/app/consts';

interface RegisterUserData {
  email: string;
  password: string;
  nickname: string;
  description: string;
}

export const useRegisterUser = (
  mutationOptions?: Omit<UseMutationOptions<void, unknown, RegisterUserData>, 'mutationKey' | 'mutationFn'>,
) => {
  return useMutation({
    ...mutationOptions,
    mutationKey: ['registerUser'],
    mutationFn: async (data: RegisterUserData) => {
      const response = await axios.post(`${BASE_API_URL}/auth/register`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    },
  });
};
