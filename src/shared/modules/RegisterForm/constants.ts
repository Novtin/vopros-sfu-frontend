import { AuthCodeType } from '@/shared/types/code';
import * as yup from 'yup';

export const REGISTER_SCHEMA = yup.object().shape({
  nickname: yup.string().required('Никнейм обязателен'),
  email: yup
    .string()
    .email('Введите корректный email')
    .matches(/@stud\.sfu-kras\.ru$/, 'Введите университетский email')
    .required('Почта обязательна'),
  password: yup
    .string()
    .required('Пароль обязателен')
    .min(8, 'Минимум 8 символов')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)/, 'Должен содержать букву и цифру'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Пароли не совпадают')
    .required('Подтвердите пароль'),
});

export const ERROR_MESSAGES = {
  EMAIL_TAKEN: 'Пользователь с таким email уже зарегистрирован',
  NICKNAME_TAKEN: 'Пользователь с таким nickname уже зарегистрирован',
};

export const NOTIFY_MESSAGES = {
  SUCCESS_REGISTER: 'Вы успешно зарегистрировались!',
  SUCCESS_CHANGE_PASSWORD: 'Вы успешно изменили пароль!',
  NEW_CODE_SENT: 'Новый код был отправлен на почту!',
  ERROR_CODE_EXHAUSTED: 'Попытки исчерпаны, запросите новый код',
  ERROR_WRONG_CODE: (attempts: number) => `Неверный код. Осталось ${attempts} попыток`,
};

export const AUTH_CODE_TYPE = AuthCodeType.REGISTER_USER;
