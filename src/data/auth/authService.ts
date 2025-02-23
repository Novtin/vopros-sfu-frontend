import { BASE_API_URL } from '@/app/consts';
import {
  AuthCodeConfirmRequest,
  AuthCodeConfirmResponse,
  AuthCodeRequest,
  AuthCodeResponse,
} from '@/shared/types/code';
import { RegisterUserData, ResponseUserData } from '@/shared/types/user';
import axios from 'axios';

export const registerUser = async (data: RegisterUserData): Promise<ResponseUserData> => {
  const response = await axios.post<ResponseUserData>(`${BASE_API_URL}/auth/register`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(response);
  return response.data;
};

export const createOrUpdateAuthCode = async (data: AuthCodeRequest): Promise<AuthCodeResponse> => {
  const response = await axios.post(`${BASE_API_URL}/auth-code`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const confirmAuthCode = async (data: AuthCodeConfirmRequest): Promise<AuthCodeConfirmResponse> => {
  const response = await axios.post<AuthCodeConfirmResponse>(`${BASE_API_URL}/auth-code/confirm`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};
