import { BASE_API_URL } from '@/app/consts';
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export const ConfirmEmail = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const confirmEmail = async () => {
      const emailHash = searchParams.get('emailHash');

      if (!emailHash) {
        setStatus('error');
        return;
      }

      try {
        const response = await fetch(`${BASE_API_URL}/auth/confirm-email?emailHash=${encodeURIComponent(emailHash)}`, {
          method: 'GET',
        });

        if (response.ok) {
          setStatus('success');
          const interval = setInterval(() => {
            setCountdown(prev => {
              if (prev <= 1) {
                clearInterval(interval);
                navigate('/login');
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
  }, [searchParams, navigate]);

  return (
    <div>
      {status === 'loading' && <p>Подтверждение email...</p>}
      {status === 'success' && (
        <div>
          <p>Ваш email успешно подтвержден!</p>
          <p>Вы будете перенаправлены на страницу логина через {countdown} секунд...</p>
        </div>
      )}
      {status === 'error' && <p>Ошибка подтверждения email. Проверьте ссылку или свяжитесь с поддержкой.</p>}
    </div>
  );
};
