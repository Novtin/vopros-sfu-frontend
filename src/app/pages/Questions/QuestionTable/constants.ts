export const getTimeAgo = (updatedAt: string): string => {
  let isoTime = updatedAt.replace(' ', 'T');
  // Если часовой пояс указан в формате +00 (без минут), добавляем ":00"
  if (/([+-]\d{2})$/.test(isoTime)) {
    isoTime = isoTime.replace(/([+-]\d{2})$/, '$1:00');
  }

  const currentTime = new Date();
  const updatedTime = new Date(isoTime);

  const diffInSeconds = Math.floor((currentTime.getTime() - updatedTime.getTime()) / 1000);
  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return 'Только что';
  if (minutes < 60) return `${minutes} мин назад`;
  if (hours < 24) return `${hours} ч назад`;
  return `${days} д назад`;
};
