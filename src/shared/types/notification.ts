export interface NotificationRequest {
  userId: number;
  page?: number;
  pageSize?: number;
  isViewed?: boolean;
  id?: number;
}

export interface NotificationItem {
  id: number;
  userId: string;
  payload: Record<string, any>;
  createdAt: string;
  isViewed: boolean;
}

export interface NotificationResponse {
  total: number;
  items: NotificationItem[];
}
