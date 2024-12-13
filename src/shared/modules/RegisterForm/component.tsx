import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { BASE_API_URL } from '@/app/consts';
import { Button } from '@/shared/components/Button';
import { IFormProps } from './component.props';
import { LogoSvg } from '@/shared/assets';
import { Input } from '@/shared/components/Input';
import { cn } from '@/shared/lib/cn';

export const RegisterForm = ({ className, onRegisterSuccess, ...props }: IFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, touchedFields },
    setError,
  } = useForm<IFormProps>({
    mode: 'onChange',
    criteriaMode: 'all',
  });

  const [isRegistered, setIsRegistered] = useState(false);
  const password = watch('password', '') || '';

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
      className={cn('w-full text-center max-w-lg mx-auto mt-10 bg-base-grey-01 p-6 rounded-md shadow-md', className)}
      {...props}
    >
      {!isRegistered ? (
        <>
          <div className="flex justify-center mb-3">
            <img src={LogoSvg} alt="Logo" className="w-16 h-16 rounded-xl" />
          </div>
          <h2 className="text-center text-2xl font-bold text-base-blue-01 mb-4">Создать аккаунт</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <Input
              label="Никнейм"
              placeholder="Ivanchik"
              {...register('nickname', {
                required: 'Никнейм обязателен',
                validate: async value => {
                  if (!touchedFields.nickname) return true;
                  const isAvailable = true;
                  // const isAvailable = await checkNicknameValidation(value);

                  if (!isAvailable) {
                    setError('nickname', { type: 'manual', message: 'Никнейм уже занят' });
                  }
                  return isAvailable || 'Никнейм уже занят';
                },
              })}
              error={touchedFields.nickname && errors.nickname?.message}
              success={watch('nickname') && !errors.nickname}
            />

            <Input
              label="Почта"
              type="email"
              placeholder="example@stud.sfu-kras.ru"
              {...register('email', {
                required: 'Почта обязательна',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@stud\.sfu-kras\.ru$/,
                  message: 'Введите корректный университетский email',
                },
              })}
              error={touchedFields.email && errors.email?.message}
              success={watch('email') && !errors.email}
            />

            <Input
              label="Пароль"
              type="password"
              placeholder="Пароль"
              toggleVisibility={true}
              {...register('password', {
                required: 'Пароль обязателен',
                minLength: { value: 8, message: 'Минимум 8 символов' },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                  message: 'Должен содержать букву и цифру',
                },
              })}
              error={touchedFields.password && errors.password?.message}
              success={watch('password') && !errors.password}
            />

            <Input
              label="Подтверждение пароля"
              type="password"
              placeholder="Подтверждение пароля"
              toggleVisibility={true}
              {...register('confirmPassword', {
                required: 'Подтвердите пароль',
                validate: value => value === password || 'Пароли не совпадают',
              })}
              error={touchedFields.confirmPassword && errors.confirmPassword?.message}
              success={watch('confirmPassword') && !errors.confirmPassword}
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
