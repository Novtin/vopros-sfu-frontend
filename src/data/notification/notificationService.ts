import { NotificationRequest, NotificationResponse } from '@/shared/types/notification';
import { apiClient } from '../apiClient';

export const getNotifications = async (params: NotificationRequest): Promise<NotificationResponse> => {
  const response = await apiClient.get<NotificationResponse>('/notification', { params });
  return response.data;
};
