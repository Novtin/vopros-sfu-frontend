import { LogoSvg } from '@/shared/assets';
import { Input } from '@/shared/components/Input';
import { Button } from '@/shared/components/Button';
import { useCallback, useEffect, useState } from 'react';
import notify from '@/utils/notify';
import { useCreateOrUpdateAuthCode } from '@/app/hooks/authentication/useCreateOrUpdateAuthCode';
import { AuthCodeType } from '@/shared/types/code';
import { CodeInput } from '@/shared/components/CodeInput';
import { useConfirmAuthCode } from '@/app/hooks/authentication/useConfirmAuthCode';
import { NOTIFY_MESSAGES } from '../RegisterForm/constants';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { EMAIL_SCHEMA, PASSWORD_SCHEMA } from './constants';
import { ResetPasswordFormProps } from './component.props';

export const ResetPasswordForm = ({ onClose, ...props }: ResetPasswordFormProps) => {
  // Форма для шага 1: ввод email
  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: emailErrors },
  } = useForm({
    resolver: yupResolver(EMAIL_SCHEMA),
  });

  // Форма для шага 2: ввод нового пароля и кода
  const {
    register: registerReset,
    handleSubmit: handleSubmitReset,
    formState: { errors: resetErrors },
  } = useForm({
    resolver: yupResolver(PASSWORD_SCHEMA),
  });

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [resetPassword, setResetPassword] = useState(false);
  const [attempts, setAttempts] = useState<number>(null);

  // Состояние для анимации
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    setAnimate(true);
  }, []);

  // Создание или обновление кода
  const createOrUpdateAuthCode = useCreateOrUpdateAuthCode({
    onSuccess: data => {
      const availableAttempts = data?.availableAttempts ?? 0;
      setAttempts(availableAttempts);
    },
    onError: error => {
      console.error('Ошибка при создании/обновлении кода:', error);
    },
  });

  // Отправка email для получения кода
  const onEmailSubmit = (data: { email: string }) => {
    setEmail(data.email);
    createOrUpdateAuthCode.mutate({
      email: data.email,
      type: AuthCodeType.RESET_PASSWORD_USER,
    });
    setResetPassword(true);
    notify('Успех', NOTIFY_MESSAGES.NEW_CODE_SENT, 'success');
  };

  // Подтверждение кода
  const { mutate: confirmCode } = useConfirmAuthCode({
    onSuccess: data => {
      if (data?.isConfirmed) {
        notify('Успех', NOTIFY_MESSAGES.SUCCESS_CHANGE_PASSWORD, 'success');
        onClose();
      } else if (!data?.isConfirmed) {
        setAttempts(prev => prev - 1);
        if (attempts - 1 <= 0) {
          notify('Ошибка', NOTIFY_MESSAGES.ERROR_CODE_EXHAUSTED, 'danger');
        } else {
          notify('Ошибка', NOTIFY_MESSAGES.ERROR_WRONG_CODE(attempts - 1), 'warning');
        }
      }
    },
    onError: error => {
      console.error('Ошибка подтверждения кода:', error);
      if (attempts - 1 <= 0) {
        notify('Ошибка', NOTIFY_MESSAGES.NEW_CODE_SENT, 'danger');
      }
    },
  });

  // Функция для получения кода из CodeInput
  const handleComplete = useCallback((completeCode: string) => {
    setCode(completeCode);
  }, []);

  // Отправка нового пароля и кода на сервер
  const onResetSubmit = (data: { password: string }) => {
    confirmCode({
      email: email,
      type: AuthCodeType.RESET_PASSWORD_USER,
      code: code,
      payload: { password: data.password },
    });
  };

  return (
    <div {...props}>
      {/* Модальное окно */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
          animate ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />
        <div className="relative bg-base-grey-06 rounded-lg shadow-lg p-6 w-full max-w-lg mx-auto">
          <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-300 text-2xl">
            &times;
          </button>
          {resetPassword ? (
            <div className="flex flex-col space-y-4">
              <h2 className="text-xl font-bold text-base-grey-09">Проверьте свою электронную почту!</h2>
              <p className="text-sm text-base-grey-09">
                В ближайшие несколько минут вы должны получить письмо с шестизначным кодом, который вы можете ввести
                ниже.
              </p>
              <form onSubmit={handleSubmitReset(onResetSubmit)}>
                <Input
                  label="Новый пароль"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Новый пароль"
                  toggleVisibility={true}
                  {...registerReset('password')}
                  error={resetErrors.password?.message}
                />
                <CodeInput onComplete={handleComplete} />
                <Button className="w-[250px] h-10 mt-4" type="submit">
                  Сбросить пароль
                </Button>
              </form>
              <p className="text-sm text-base-grey-09">
                Не пришел код?{' '}
                <button
                  onClick={() => {
                    createOrUpdateAuthCode.mutate({
                      email: email,
                      type: AuthCodeType.RESET_PASSWORD_USER,
                    });
                    notify('Успех', 'Новый код был отправлен на почту!', 'success');
                  }}
                  className="text-base-blue-01"
                >
                  Запросить ещё раз
                </button>
              </p>
            </div>
          ) : (
            <>
              <div className="flex justify-center mb-4">
                <img src={LogoSvg} alt="Logo" className="w-16 h-16 rounded-xl" />
              </div>
              <h2 className="text-center text-2xl font-bold text-base-blue-01 mb-6">Сброс пароля</h2>
              <form onSubmit={handleSubmitEmail(onEmailSubmit)}>
                <Input
                  label="Введите почту для сброса пароля"
                  type="email"
                  autoComplete="email"
                  placeholder="example@stud.sfu-kras.ru"
                  {...registerEmail('email')}
                  error={emailErrors.email?.message}
                />
                <Button className="w-[250px] h-10" type="submit">
                  Сбросить пароль
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
