const BASE_FONT_SIZE = 36;
const MIN_FONT_SIZE = 12;

export const calculateFontSize = (text: string): number => {
  const adjustment = Math.floor(text.length * 0.5);
  const newSize = BASE_FONT_SIZE - adjustment;
  return newSize < MIN_FONT_SIZE ? MIN_FONT_SIZE : newSize;
};
