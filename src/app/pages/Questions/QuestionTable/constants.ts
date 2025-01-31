export const getTimeAgo = (updatedAt: string): string => {
  const currentTime = new Date();
  const updatedTime = new Date(updatedAt);

  const userOffset = currentTime.getTimezoneOffset() * 60000;

  const localUpdatedTime = new Date(updatedTime.getTime() - userOffset);

  const diffInSeconds = Math.floor((currentTime.getTime() - localUpdatedTime.getTime()) / 1000);
  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return 'Только что';
  if (minutes < 60) return `${minutes} мин назад`;
  if (hours < 24) return `${hours} ч назад`;
  return `${days} д назад`;
};
