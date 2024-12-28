import { BASE_API_URL } from '@/app/consts';
import axios from 'axios';

export const getQuestionCount = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('Токен не найден');
      return;
    }

    const response = await axios.get(`${BASE_API_URL}/question/count`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.count;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Ошибка при получении количества вопросов:', error.response?.data || error.message);
    } else {
      console.error('Ошибка сети:', error);
    }
  }
};
