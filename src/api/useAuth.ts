import axios from 'axios';
import { BASE_API_URL } from '@/app/consts';

export const registerUser = async (data: {
  email: string;
  password: string;
  nickname: string;
  description: string;
}): Promise<void> => {
  try {
    const response = await axios.post(`${BASE_API_URL}/auth/register`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Успешная регистрация:', response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Ошибка при регистрации:', error.response?.data || error.message);
    } else {
      console.error('Ошибка сети:', error);
    }
    throw error;
  }
};
