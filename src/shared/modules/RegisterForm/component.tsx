import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { BASE_API_URL } from '@/app/consts';
import { Button } from '@/shared/components/Button';
import { IFormProps } from './component.props';
import { LogoSvg } from '@/shared/assets';
import { Input } from '@/shared/components/Input';
import { cn } from '@/shared/lib/cn';
import { REGISTER_SCHEMA } from './constants';
import { yupResolver } from '@hookform/resolvers/yup';

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

  const onSubmit = async (data: IFormProps) => {
    try {
      const response = await fetch(`${BASE_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          nickname: data.nickname,
          description: 'Описание пользователя',
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Успешная регистрация:', result);
        setIsRegistered(true);
        onRegisterSuccess?.();
      } else {
        console.error('Ошибка при регистрации:', response.statusText);
      }
    } catch (error) {
      console.error('Ошибка сети:', error);
    }
  };

  return (
    <div
      className={cn('w-full text-center max-w-lg mx-auto mt-8 bg-base-grey-01 p-6 rounded-md shadow-md', className)}
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
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-base-blue-01 mb-4">
            Мы отправили сообщение вам на почту для подтверждения.
          </h2>
          <p className="text-base-grey-09">Пожалуйста, проверьте свою почту и следуйте инструкциям.</p>
        </div>
      )}
    </div>
  );
};
