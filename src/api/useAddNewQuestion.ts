import { BASE_API_URL } from '@/app/consts';
import axios from 'axios';

export const AddNewQuestion = async (title: string, description: string, tagNames: string[]) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('Токен не найден');
      return;
    }

    const payload = {
      title,
      description,
      tagNames,
    };

    const response = await axios.post(`${BASE_API_URL}/question`, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Ошибка при создании вопроса:', error.response?.data || error.message);
    } else {
      console.error('Ошибка сети:', error);
    }
  }
};
