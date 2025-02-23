import axios from 'axios';
import { BASE_API_URL } from '@/app/consts';

export interface ExampleAvatarsResponse {
  fileIds: number[];
}

export const fetchUserData = async () => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    throw new Error('Токен не найден');
  }

  const response = await axios.get(`${BASE_API_URL}/user/this`, {
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
