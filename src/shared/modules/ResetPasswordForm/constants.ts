import * as yup from 'yup';

export const EMAIL_SCHEMA = yup.object().shape({
  email: yup
    .string()
    .email('Введите корректный email')
    .matches(/@stud\.sfu-kras\.ru$/, 'Введите университетский email')
    .required('Почта обязательна'),
});

export const PASSWORD_SCHEMA = yup.object().shape({
  password: yup
    .string()
    .required('Пароль обязателен')
    .min(8, 'Минимум 8 символов')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)/, 'Должен содержать букву и цифру'),
});
