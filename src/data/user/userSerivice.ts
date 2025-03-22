import axios from 'axios';
import { BASE_API_URL } from '@/app/consts';
import { UsersResponse } from '@/shared/types/user';

export interface ExampleAvatarsResponse {
  fileIds: number[];
}

export const fetchUsers = async ({
  page = 1,
  pageSize = 100,
  id,
  filter = 'rating',
  query,
  withDeleted = false,
}: {
  page?: number;
  pageSize?: number;
  id?: number;
  filter?: 'rating';
  query?: string;
  withDeleted?: boolean;
}): Promise<UsersResponse> => {
  const params = new URLSearchParams();
  params.append('page', String(page));
  params.append('pageSize', String(pageSize));
  if (id) params.append('id', String(id));
  if (filter) params.append('filter', filter);
  if (query) params.append('rating', query);
  if (withDeleted) params.append('withDeleted', 'true');

  const response = await axios.get(`${BASE_API_URL}/user`, {
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  });
  console.log(response.data);
  return response.data;
};

export const fetchUserData = async (id?: number) => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    throw new Error('Токен не найден');
  }

  const url = id ? `${BASE_API_URL}/user/${id}` : `${BASE_API_URL}/user/this`;
  const response = await axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const fetchExampleAvatars = async (): Promise<number[]> => {
  const response = await axios.get<ExampleAvatarsResponse>(`${BASE_API_URL}/file/examples-images`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data.fileIds;
};

export const fetchFile = async (id: number) => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    throw new Error('Токен не найден');
  }

  const exampleAvatars = await fetchExampleAvatars();
  const isExample = exampleAvatars.includes(id);
  const params = isExample ? { isExample } : {};

  const response = await axios.get(`${BASE_API_URL}/file/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    params,
    responseType: 'blob',
  });
  return response.data;
};

export const updateUser = async (id: number, userData: { description: string; nickname: string }) => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    throw new Error('Токен не найден');
  }

  const response = await axios.put(`${BASE_API_URL}/user/${id}`, userData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
