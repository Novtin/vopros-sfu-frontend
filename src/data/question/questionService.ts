import axios from 'axios';
import { BASE_API_URL } from '@/app/consts';
import { QuestionsResponse } from '@/shared/types/question';

export const getQuestionCount = async (): Promise<number> => {
  const response = await axios.get(`${BASE_API_URL}/question/count`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data.count;
};

export const addNewQuestion = async (title: string, description: string, tagNames: string[]): Promise<number> => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    throw new Error('Токен не найден');
  }

  const response = await axios.post(
    `${BASE_API_URL}/question`,
    { title, description, tagNames },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.status;
};

export const getQuestions = async (params?: Record<string, string | number | boolean>): Promise<QuestionsResponse> => {
  const { data } = await axios.get(`${BASE_API_URL}/question`, { params });
  return data;
};
