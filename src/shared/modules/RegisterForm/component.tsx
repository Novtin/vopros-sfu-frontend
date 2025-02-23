import { useForm } from 'react-hook-form';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@/shared/components/Button';
import { IFormProps } from './component.props';
import { LogoSvg } from '@/shared/assets';
import { Input } from '@/shared/components/Input';
import { cn } from '@/shared/lib/cn';
import { AUTH_CODE_TYPE, ERROR_MESSAGES, NOTIFY_MESSAGES, REGISTER_SCHEMA } from './constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRegisterUser } from '@/app/hooks/authentication/useRegisterUser';
import notify from '@/utils/notify';
import axios from 'axios';
import { CodeInput } from '@/shared/components/CodeInput';
import { useCreateOrUpdateAuthCode } from '@/app/hooks/authentication/useCreateOrUpdateAuthCode';
import { useConfirmAuthCode } from '@/app/hooks/authentication/useConfirmAuthCode';
import { useNavigate } from 'react-router-dom';
import { ROUTER_PATHS } from '@/app/consts';

export const RegisterForm = ({ className, onRegisterSuccess, ...props }: IFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, dirtyFields },
  } = useForm<IFormProps>({
    mode: 'onChange',
    resolver: yupResolver(REGISTER_SCHEMA),
  });

  const [isRegistered, setIsRegistered] = useState(false);
  const [attempts, setAttempts] = useState<number>(null);
  const navigate = useNavigate();

  // Регистрация пользователя
  const { mutate: registerUser, data: userData } = useRegisterUser({
    onSuccess: () => {
      setIsRegistered(true);
    },
  });

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

  const handleCreateOrUpdate = useCallback(() => {
    if (userData.email) {
      createOrUpdateAuthCode.mutate({
        email: userData.email,
        type: AUTH_CODE_TYPE,
      });
    }
  }, [createOrUpdateAuthCode, userData]);

  const hasRequestedCode = useRef(false);

  useEffect(() => {
    if (userData?.email && !hasRequestedCode.current) {
      handleCreateOrUpdate();
      hasRequestedCode.current = true;
    }
  }, [userData, handleCreateOrUpdate]);

  // Подтверждение кода
  const { mutate: confirmCode } = useConfirmAuthCode({
    onSuccess: data => {
      if (data?.isConfirmed) {
        notify('Успех', NOTIFY_MESSAGES.SUCCESS_REGISTER, 'success');
        navigate(ROUTER_PATHS.LOGIN);
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
        notify('Ошибка', 'Попытки исчерпаны, запросите новый код', 'danger');
      }
    },
  });

  const handleComplete = useCallback(
    (code: string) => {
      confirmCode({
        email: userData?.email,
        type: AUTH_CODE_TYPE,
        code,
      });
    },
    [confirmCode, userData?.email],
  );

  const onSubmit = (data: IFormProps) => {
    registerUser(
      {
        email: data.email,
        password: data.password,
        nickname: data.nickname,
      },
      {
        onSuccess: () => {
          onRegisterSuccess?.();
        },
        onError: error => {
          if (axios.isAxiosError(error) && error.response && error.response.data && error.response.data.message) {
            const messages = error.response.data.message;
            const firstMessage = Array.isArray(messages) ? messages[0] : messages;
            const errorMessage = firstMessage.toLowerCase().includes('email')
              ? ERROR_MESSAGES.EMAIL_TAKEN
              : ERROR_MESSAGES.NICKNAME_TAKEN;
            notify('Ошибка регистрации', errorMessage, 'danger');
          }
        },
      },
    );
  };

  return (
    <div
      className={cn('w-full text-center max-w-lg mx-auto mt-8 bg-base-grey-03 p-6 rounded-md shadow-md', className)}
      {...props}
    >
      {!isRegistered ? (
        <>
          <div className="flex justify-center mb-3">
            <img src={LogoSvg} alt="Logo" className="w-12 h-12 rounded-xl" />
          </div>
          <h2 className="text-center text-xl font-bold text-base-blue-01 mb-4">Создать аккаунт</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <Input
              label="Никнейм"
              autoComplete="username"
              placeholder="Ivanchik"
              {...register('nickname')}
              error={errors.nickname?.message}
              success={!!(!errors.nickname && (dirtyFields.nickname || watch('nickname')))}
            />
            <Input
              label="Почта"
              type="email"
              autoComplete="email"
              placeholder="example@stud.sfu-kras.ru"
              {...register('email')}
              error={errors.email?.message}
              success={!!(!errors.email && (dirtyFields.email || watch('email')))}
            />
            <Input
              label="Пароль"
              type="password"
              autoComplete="new-password"
              placeholder="Пароль"
              toggleVisibility={true}
              {...register('password')}
              error={errors.password?.message}
              success={!!(!errors.password && (dirtyFields.password || watch('password')))}
            />
            <Input
              label="Подтверждение пароля"
              type="password"
              autoComplete="new-password"
              placeholder="Подтверждение пароля"
              toggleVisibility={true}
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
              success={!!(!errors.confirmPassword && (dirtyFields.confirmPassword || watch('confirmPassword')))}
            />
            <Button type="submit" className="w-[250px] h-10" disabled={!isValid}>
              Зарегистрироваться
            </Button>
          </form>
        </>
      ) : (
        <div className="flex flex-wrap items-center flex-col space-y-4">
          <h2 className="text-xl font-bold text-base-grey-09">Проверьте свою электронную почту!</h2>
          <p className="text-left text-sm text-base-grey-09">
            В ближайшие несколько минут вы должны получить электронное письмо, в котором будет указан шестизначный код
            для входа в систему, который вы можете ввести ниже.
          </p>
          <CodeInput onComplete={handleComplete} />
          <p className="text-sm text-base-grey-09">
            Не пришел код?{' '}
            <button
              onClick={() => {
                handleCreateOrUpdate();
                notify('Успех', NOTIFY_MESSAGES.NEW_CODE_SENT, 'success');
              }}
              className="text-base-blue-01"
            >
              Запросить ещё раз
            </button>{' '}
          </p>
        </div>
      )}
    </div>
  );
};
