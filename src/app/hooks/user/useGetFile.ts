import { fetchFile } from '@/data/user';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export const useFileUrl = (
  id: number | undefined,
  queryOptions?: Omit<UseQueryOptions<Blob, Error, Blob, [string, number | undefined]>, 'queryKey' | 'queryFn'>,
) => {
  const { data: fileData, ...queryResult } = useQuery<Blob, Error, Blob, [string, number | undefined]>({
    queryKey: ['file', id],
    queryFn: () => {
      if (id === undefined) {
        return Promise.reject(new Error('id is undefined'));
      }
      return fetchFile(id);
    },
    ...queryOptions,
  });

  const [fileUrl, setFileUrl] = useState<string>('');

  useEffect(() => {
    if (fileData) {
      const url = URL.createObjectURL(fileData);
      setFileUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [fileData]);

  return { fileUrl, fileData, ...queryResult };
};
