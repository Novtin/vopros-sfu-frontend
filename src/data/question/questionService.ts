import { Question, QuestionsParams, QuestionsResponse } from '@/shared/types/question';
import { apiClient, getAuthHeaders } from '../apiClient';

export const getQuestionCount = async (): Promise<number> => {
  const response = await apiClient.get<{ count: number }>('/question/count');
  return response.data.count;
};

export const addNewQuestion = async (title: string, description: string, tagNames: string[]): Promise<Question> => {
  const response = await apiClient.post('/question', { title, description, tagNames }, { headers: getAuthHeaders() });
  return response.data;
};

export const getQuestions = async (params?: QuestionsParams): Promise<QuestionsResponse> => {
  const response = await apiClient.get<QuestionsResponse>('/question', { params });
  return response.data;
};

export const getQuestionById = async (id: string | number): Promise<Question> => {
  const response = await apiClient.get<Question>(`/question/${id}`, { headers: getAuthHeaders() });
  return response.data;
};

export const addFavoriteQuestion = async (id: number): Promise<void> => {
  await apiClient.post(`/question/${id}/favorite`, {}, { headers: getAuthHeaders() });
};

export const removeFromFavorites = async (id: number): Promise<void> => {
  await apiClient.delete(`/question/${id}/favorite`, { headers: getAuthHeaders() });
};

export const rateQuestion = async ({ id, value }: { id: number; value: 1 | -1 }) => {
  const response = await apiClient.post(`/question/${id}/rate`, { value }, { headers: getAuthHeaders() });
  return response.data;
};

export const deleteRateQuestion = async ({ id, value }: { id: number; value: 1 | -1 }) => {
  const response = await apiClient.delete(`/question/${id}/rate`, {
    headers: getAuthHeaders(),
    data: { value },
  });
  return response.data;
};
