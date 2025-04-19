import { ResponseUserData } from '@/shared/types/user';
import { apiClient, getAuthHeaders } from '../apiClient';
import { Question } from '@/shared/types/question';
import { fetchExampleAvatars } from '../user';

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

export const fetchFile = async (id: number, isMiniature?: boolean) => {
  const exampleAvatars = await fetchExampleAvatars();
  const isExample = exampleAvatars.includes(id);

  const params = {
    ...(isExample && { isExample: true }),
    ...(isMiniature !== undefined && { isMiniature }),
  };

  const response = await apiClient.get(`/file/${id}`, {
    headers: getAuthHeaders(),
    params,
    responseType: 'blob',
  });

  return response.data;
};

export const uploadQuestionImages = async (id: number, imageFiles: File[]): Promise<Question> => {
  const formData = new FormData();
  imageFiles.forEach(file => {
    formData.append('imageFiles', file);
  });

  const response = await apiClient.post(`/question/${id}/images`, formData, {
    headers: { ...getAuthHeaders(), 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};
