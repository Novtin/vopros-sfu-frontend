export interface IUserData {
  rating?: number;
  countAnswers?: number;
  countQuestions?: number;
}

export const PROFILE_TABS = ['Профиль', 'Настройки'];

export const STATS = (data?: IUserData) => [
  { value: data?.rating, label: 'репутация' },
  { value: data?.countAnswers, label: 'ответов' },
  { value: data?.countQuestions, label: 'вопросов' },
];

export const LANGUAGES = [{ value: 'ru', label: 'Русский' }];
