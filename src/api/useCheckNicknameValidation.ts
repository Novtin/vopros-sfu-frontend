import axios from 'axios';
import { BASE_API_URL } from '@/app/consts';

export const useCheckNicknameValidation = async (nickname: string): Promise<boolean> => {
  try {
    const response = await axios.post(
      `${BASE_API_URL}/auth/check-nickname`,
      { nickname },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );

    return response.data.available;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Ошибка при проверке никнейма:', error.response?.data || error.message);
    } else {
      console.error('Ошибка сети:', error);
    }
    return false;
  }
};
