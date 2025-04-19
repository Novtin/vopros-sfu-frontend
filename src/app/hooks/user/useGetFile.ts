import { fetchFile } from '@/data/img';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export const useFileUrl = (
  id: number | undefined,
  isMiniature?: boolean,
  queryOptions?: Omit<
    UseQueryOptions<Blob, Error, Blob, [string, number | undefined, boolean | undefined]>,
    'queryKey' | 'queryFn'
  >,
) => {
  const { data: fileData, ...queryResult } = useQuery<
    Blob,
    Error,
    Blob,
    [string, number | undefined, boolean | undefined]
  >({
    queryKey: ['file', id, isMiniature],
    queryFn: () => fetchFile(id!, isMiniature),
    enabled: Boolean(id),
    ...queryOptions,
  });

  const plugAvatar = '/images/plugAvatar.png';
  const [fileUrl, setFileUrl] = useState<string>(plugAvatar);

  useEffect(() => {
    if (!fileData) {
      setFileUrl(plugAvatar);
      return;
    }
    const newUrl = URL.createObjectURL(fileData);
    setFileUrl(newUrl);
    return () => {
      URL.revokeObjectURL(newUrl);
    };
  }, [fileData]);

  return { fileUrl, fileData, ...queryResult };
};
