import { NotificationRequest, NotificationResponse } from '@/shared/types/notification';
import { apiClient } from '../apiClient';

export const getNotifications = async (params: NotificationRequest): Promise<NotificationResponse> => {
  const response = await apiClient.get<NotificationResponse>('/notification', { params });
  return response.data;
};

export const sendFeedback = async (title: string, text: string, email: string, imageFiles: File[]): Promise<void> => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('text', text);
  formData.append('email', email);

  imageFiles.forEach(file => {
    formData.append('imageFiles', file);
  });

  const response = await apiClient.post('/notification/feedback', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
