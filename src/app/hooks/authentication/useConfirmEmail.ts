import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_API_URL } from '@/app/consts';

interface UseConfirmEmailProps {
  emailHash: string | null;
  onSuccess?: () => void;
}

export const useConfirmEmail = ({ emailHash, onSuccess }: UseConfirmEmailProps) => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const confirmEmail = async () => {
      if (!emailHash) {
        setStatus('error');
        return;
      }
      try {
        const response = await axios.post<{ status: number }>(`${BASE_API_URL}/auth/confirm-email`, { emailHash });
        if (response.status === 204) {
          setStatus('success');
        } else {
          setStatus('error');
        }
      } catch (error) {
        console.error('Ошибка при подтверждении email:', error);
        setStatus('error');
      }
    };
    confirmEmail();
    return () => clearInterval(interval);
  }, [emailHash]);

  useEffect(() => {
    if (status === 'success') {
      const interval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            onSuccess?.();
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [status, onSuccess]);

  return { status, countdown };
};
