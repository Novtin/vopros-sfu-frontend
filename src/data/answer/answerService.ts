import { Answer } from '@/shared/types/question';
import { apiClient } from '../apiClient';

export const addNewAnswer = async (questionId: number, text: string): Promise<Answer> => {
  const response = await apiClient.post('/answer', { questionId, text });
  return response.data;
};

export const updateAnswer = async (id: number, text: string): Promise<Answer> => {
  const response = await apiClient.put(`/answer/${id}`, { text });
  return response.data;
};

export const deleteAnswer = async (id: number): Promise<void> => {
  const response = await apiClient.delete(`/answer/${id}`);
  return response.data;
};

export const getAnswerById = async (id: number): Promise<Answer> => {
  const response = await apiClient.get<Answer>(`/answer/${id}`);
  return response.data;
};

export const rateAnswer = async ({ id, value }: { id: number; value: 1 | -1 }) => {
  const response = await apiClient.post(`/answer/${id}/rate`, { value });
  return response.data;
};

export const deleteRateAnswer = async ({ id, value }: { id: number; value: 1 | -1 }) => {
  const response = await apiClient.delete(`/answer/${id}/rate`, {
    data: { value },
  });
  return response.data;
};

export const resolveAnswer = async ({ questionId, answerId }: { questionId: number; answerId: number }) => {
  const response = await apiClient.post(`/answer/resolve/${questionId}`, {
    answerId,
  });
  return response.data;
};

export const unresolveAnswer = async ({ questionId }: { questionId: number }) => {
  const response = await apiClient.delete(`/answer/resolve/${questionId}`);
  return response.data;
};
