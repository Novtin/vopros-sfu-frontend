import { QuestionsResponse } from '@/shared/types/question';
import { apiClient, getAuthHeaders } from '../apiClient';

export const getQuestionCount = async (): Promise<number> => {
  const response = await apiClient.get<{ count: number }>('/question/count');
  return response.data.count;
};

export const addNewQuestion = async (title: string, description: string, tagNames: string[]): Promise<number> => {
  const response = await apiClient.post('/question', { title, description, tagNames }, { headers: getAuthHeaders() });

  return response.status;
};

export const getQuestions = async (params?: Record<string, string | number | boolean>): Promise<QuestionsResponse> => {
  const response = await apiClient.get<QuestionsResponse>('/question', { params });
  return response.data;
};
