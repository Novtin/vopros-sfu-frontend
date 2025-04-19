export const FORMAT_FILE_SIZE = (sizeInBytes: number) => {
  if (sizeInBytes < 1024) {
    return `${sizeInBytes} B`;
  } else if (sizeInBytes < 1024 * 1024) {
    return `${(sizeInBytes / 1024).toFixed(1)} KB`;
  }
  return `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const GET_FILE_EXTENSION = (fileName: string) => {
  const parts = fileName.split('.');
  return parts[parts.length - 1]?.toLowerCase() || '';
};

export const GET_ICON_BY_EXTENSION = (ext: string) => {
  switch (ext) {
    case 'jpg':
      return '/images/jpgIcon.png';
    case 'jpeg':
      return '/images/jpgIcon.png';
    case 'png':
      return '/images/pngIcon.png';
    default:
      return '/icons/file-icon.svg';
  }
};
