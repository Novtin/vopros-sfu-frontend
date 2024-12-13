import { BASE_API_URL } from '@/app/consts';

export const registerUser = async (data: {
  email: string;
  password: string;
  nickname: string;
  description: string;
}): Promise<void> => {
  try {
    const response = await fetch(`${BASE_API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error('Ошибка при регистрации:', response.statusText);
      throw new Error(response.statusText);
    }

    const result = await response.json();
    console.log('Успешная регистрация:', result);
  } catch (error) {
    console.error('Ошибка сети:', error);
    throw error;
  }
};
