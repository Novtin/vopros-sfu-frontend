// Функция для разбиения массива на чанки (подмассивы) по указанному количеству элементов
export const chunkArray = <T>(arr: T[], chunkSize: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    chunks.push(arr.slice(i, i + chunkSize));
  }
  return chunks;
};
