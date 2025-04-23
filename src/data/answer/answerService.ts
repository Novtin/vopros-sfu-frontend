import { Answer } from '@/shared/types/question';
import { apiClient } from '../apiClient';

export const addNewAnswer = async (questionId: number, text: string): Promise<Answer> => {
  const response = await apiClient.post('/answer', { questionId, text });
  return response.data;
};
