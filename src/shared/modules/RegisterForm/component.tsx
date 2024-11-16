import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
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
    formState: { errors, isValid },
    clearErrors,
  } = useForm<IFormProps>({
    mode: 'onChange',
    criteriaMode: 'all',
  });

  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);
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

  useEffect(() => {
    if (emailValid) clearErrors('email');
  }, [emailValid, clearErrors]);

  useEffect(() => {
    if (passwordValid) clearErrors('password');
  }, [passwordValid, clearErrors]);

  return (
    <div
      className={cn(
        'w-full text-center max-w-lg mx-auto mt-10 bg-base-grey-01 p-6 rounded-md shadow-md transition-colors duration-500 ease-in-out',
        className,
      )}
      {...props}
    >
      {!isRegistered ? (
        <>
          <div className="flex justify-center mb-3">
            <img src={LogoSvg} alt="Logo" className="w-16 h-16 rounded-xl" />
          </div>
          <h2 className="text-center text-2xl font-bold text-base-blue-01 mb-4 transition-colors duration-500 ease-in-out">
            Создать аккаунт
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
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
                onChange: e => setEmailValid(e.target.value.match(/^[a-zA-Z0-9._%+-]+@stud\.sfu-kras\.ru$/) !== null),
              })}
              error={errors.email?.message}
              success={emailValid && !errors.email}
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
                onChange: e =>
                  setPasswordValid(e.target.value.length >= 8 && /^(?=.*[A-Za-z])(?=.*\d)/.test(e.target.value)),
              })}
              error={errors.password?.message}
              success={passwordValid && !errors.password}
            />

            <Input
              label="Подтверждение пароля"
              type="password"
              placeholder="Подтверждение пароля"
              toggleVisibility={true}
              {...register('confirmPassword', {
                required: 'Подтвердите пароль',
                validate: value => {
                  const isMatch = value === password;
                  setConfirmPasswordValid(isMatch);
                  return isMatch || 'Пароли не совпадают';
                },
              })}
              error={errors.confirmPassword?.message}
              success={confirmPasswordValid && !errors.confirmPassword}
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
          <p>Пожалуйста, проверьте свою почту и следуйте инструкциям.</p>
        </div>
      )}
    </div>
  );
};
