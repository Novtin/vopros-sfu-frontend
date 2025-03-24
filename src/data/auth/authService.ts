import { BASE_API_URL } from '@/app/consts';
import {
  AuthCodeConfirmRequest,
  AuthCodeConfirmResponse,
  AuthCodeRequest,
  AuthCodeResponse,
} from '@/shared/types/code';
import { RegisterUserData, ResponseUserData } from '@/shared/types/user';
import { apiClient } from '../apiClient';

export const registerUser = async (data: RegisterUserData): Promise<ResponseUserData> => {
  const response = await apiClient.post<ResponseUserData>('/auth/register', data);
  return response.data;
};

export const createOrUpdateAuthCode = async (data: AuthCodeRequest): Promise<AuthCodeResponse> => {
  const response = await apiClient.post<AuthCodeResponse>('/auth-code', data);
  return response.data;
};

export const confirmAuthCode = async (data: AuthCodeConfirmRequest): Promise<AuthCodeConfirmResponse> => {
  const response = await apiClient.post<AuthCodeConfirmResponse>('/auth-code/confirm', data);
  return response.data;
};
