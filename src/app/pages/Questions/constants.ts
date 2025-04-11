export const SORT_OPTIONS = [
  { id: 'new', label: 'Новые', queryValue: 'createdAt' },
  { id: 'views', label: 'Популярные', queryValue: 'views' },
  { id: 'rating', label: 'Активные', queryValue: 'rating' },
];

// Функция для получения значения фильтра, которое будет отправляться на сервер
export const getFilterQueryValue = (filterId: string) => {
  return SORT_OPTIONS.find(option => option.id === filterId)?.queryValue || 'createdAt';
};

export const PAGE_SIZE = 10;
