import { BASE_API_URL } from '@/app/consts';
import { useEffect, useState } from 'react';

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
        const response = await fetch(`${BASE_API_URL}/auth/confirm-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ emailHash }),
        });

        if (response.ok) {
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
        console.error('Ошибка сети:', error);
        setStatus('error');
      }
    };

    confirmEmail();
  }, [emailHash, onSuccess]);

  return { status, countdown };
};
