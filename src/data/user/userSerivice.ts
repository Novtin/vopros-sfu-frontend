import { UsersResponse } from '@/shared/types/user';
import { apiClient } from '../apiClient';

export interface ExampleAvatarsResponse {
  fileIds: number[];
}

export const fetchUsers = async ({
  page = 1,
  pageSize = 100,
  id,
  sort = 'rating',
  query,
  withDeleted = false,
}: {
  page?: number;
  pageSize?: number;
  id?: number;
  sort?: 'rating';
  query?: string;
  withDeleted?: boolean;
}): Promise<UsersResponse> => {
  const params: Record<string, string> = {
    page: String(page),
    pageSize: String(pageSize),
    sort,
  };

  if (id !== undefined) params.id = String(id);
  if (query) params.query = query; // исправлено
  if (withDeleted) params.withDeleted = 'true';

  const response = await apiClient.get<UsersResponse>('/user', { params });
  return response.data;
};

export const fetchUserData = async (id?: number) => {
  const url = id ? `/user/${id}` : '/user/this';
  const response = await apiClient.get(url);
  return response.data;
};

export const fetchExampleAvatars = async (): Promise<number[]> => {
  const response = await apiClient.get<ExampleAvatarsResponse>('/file/examples-images');
  return response.data.fileIds;
};

export const updateUser = async (id: number, userData: { description: string; nickname: string }) => {
  const response = await apiClient.put(`/user/${id}`, { id, ...userData });
  return response.data;
};
