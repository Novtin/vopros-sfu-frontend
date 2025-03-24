import { ResponseUserData } from '@/shared/types/user';
import { apiClient, getAuthHeaders } from '../apiClient';

export const uploadAvatarImage = async (userId: number, file: File): Promise<ResponseUserData> => {
  const formData = new FormData();
  formData.append('imageFile', file);

  try {
    const response = await apiClient.post<ResponseUserData>(`/user/${userId}/image`, formData, {
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 413) {
        throw new Error('Файл слишком большой. Попробуйте выбрать изображение меньшего размера.');
      }
      throw new Error(`Ошибка загрузки: ${error.response.status} ${error.response.statusText}`);
    }
    throw new Error('Ошибка сети или сервера. Проверьте подключение.');
  }
};
