import axios from 'axios';
import { BASE_API_URL } from '@/app/consts';

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

export const fetchFile = async (id: number, isExample: boolean = true) => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    throw new Error('Токен не найден');
  }

  const response = await axios.get(`${BASE_API_URL}/file/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    params: {
      isExample,
    },
    responseType: 'blob',
  });
  return response.data;
};
