import { BASE_API_URL } from '@/app/consts';
import { ResponseUserData } from '@/shared/types/user';
import axios from 'axios';

export const uploadAvatarImage = async (userId: number, file: File): Promise<ResponseUserData> => {
  console.log(file);
  const token = localStorage.getItem('accessToken');
  if (!token) {
    throw new Error('Токен не найден');
  }

  const formData = new FormData();
  formData.append('imageFile', file);

  const response = await axios.post<ResponseUserData>(`${BASE_API_URL}/user/${userId}/image`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
