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
