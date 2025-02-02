import { useConfirmEmail } from '@/app/hooks/authentication/useConfirmEmail';
import { useSearchParams, useNavigate } from 'react-router-dom';

export const ConfirmEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const emailHash = searchParams.get('emailHash') ? decodeURIComponent(searchParams.get('emailHash')!) : null;

  const { status, countdown } = useConfirmEmail({
    emailHash,
    onSuccess: () => navigate('/login'),
  });

  return (
    <div className="min-h-screen bg-base-grey-01 text-base-grey-09 flex flex-col justify-center items-center">
      <div>
        {status === 'loading' && <p>Подтверждение email...</p>}
        {status === 'success' && (
          <div className="text-center">
            <p>Ваш email успешно подтвержден!</p>
            <p>Вы будете перенаправлены на страницу логина через {countdown} секунд...</p>
          </div>
        )}
        {status === 'error' && <p>Ошибка подтверждения email. Проверьте ссылку или свяжитесь с поддержкой.</p>}
      </div>
    </div>
  );
};
