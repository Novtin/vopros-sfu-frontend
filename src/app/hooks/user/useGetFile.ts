import { fetchFile } from '@/data/user';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export const useFileUrl = (id: number, isExample: boolean, queryOptions?: UseQueryOptions<Blob, Error>) => {
  const { data: fileData, ...queryResult } = useQuery<Blob, Error>({
    queryKey: ['file', id],
    queryFn: () => fetchFile(id, isExample),
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
