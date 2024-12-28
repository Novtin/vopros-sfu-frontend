import axios from 'axios';
import { useEffect, useState } from 'react';
import { BASE_API_URL } from '@/app/consts';

interface UseConfirmEmailProps {
  emailHash: string | null;
  onSuccess?: () => void;
}

export const useConfirmEmail = ({ emailHash, onSuccess }: UseConfirmEmailProps) => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const confirmEmail = async () => {
      if (!emailHash) {
        setStatus('error');
        return;
      }

      try {
        const response = await axios.post(
          `${BASE_API_URL}/auth/confirm-email`,
          { emailHash },
          { headers: { 'Content-Type': 'application/json' } },
        );

        if (response.status === 200) {
          setStatus('success');
          const interval = setInterval(() => {
            setCountdown(prev => {
              if (prev <= 1) {
                clearInterval(interval);
                onSuccess?.();
              }
              return prev - 1;
            });
          }, 1000);
        } else {
          setStatus('error');
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Ошибка при подтверждении email:', error.response?.data || error.message);
        } else {
          console.error('Ошибка сети:', error);
        }
        setStatus('error');
      }
    };

    confirmEmail();
  }, [emailHash, onSuccess]);

  return { status, countdown };
};
