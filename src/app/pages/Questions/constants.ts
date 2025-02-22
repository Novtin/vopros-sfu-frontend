export const FILTER_OPTIONS = [
  { id: 'new', label: 'Новые', queryValue: 'createdAt' },
  { id: 'views', label: 'Популярные', queryValue: 'views' },
  { id: 'rating', label: 'Активные', queryValue: 'rating' },
  { id: 'withoutAnswer', label: 'Без ответов', queryValue: 'withoutAnswer' },
];

// Функция для получения значения фильтра, которое будет отправляться на сервер
export const getFilterQueryValue = (filterId: string) => {
  return FILTER_OPTIONS.find(option => option.id === filterId)?.queryValue || 'createdAt';
};
