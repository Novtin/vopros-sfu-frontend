import { BASE_API_URL } from '@/app/consts';

export const useCheckNicknameValidation = async (nickname: string): Promise<boolean> => {
  try {
    const response = await fetch(`${BASE_API_URL}/auth/check-nickname`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nickname }),
    });

    if (!response.ok) {
      console.error('Ошибка при проверке никнейма:', response.statusText);
      return false;
    }

    const result = await response.json();
    return result.available;
  } catch (error) {
    console.error('Ошибка сети:', error);
    return false;
  }
};
