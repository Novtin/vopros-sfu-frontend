import { getNotifications } from '@/data/notification/notificationService';
import { useQuery } from '@tanstack/react-query';

export const useNotifications = (userId: number, page: number = 1, pageSize: number = 10) => {
  return useQuery({
    queryKey: ['notifications', userId, page, pageSize],
    queryFn: () => getNotifications({ userId, page, pageSize }),
    enabled: !!userId,
    staleTime: 30_000,
  });
};
