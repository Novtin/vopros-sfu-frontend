import { useEffect, useState } from 'react';
import axios from 'axios';

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
        const response = await axios.post<{ status: number }>('/auth/confirm-email', { emailHash });
        if (response?.data?.status === 200) {
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
        console.error('Ошибка при подтверждении email:', error);
        setStatus('error');
      }
    };

    confirmEmail();
  }, [emailHash, onSuccess]);

  return { status, countdown };
};
