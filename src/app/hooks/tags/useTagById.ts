import { getTagById } from '@/data/tags/tagsService';
import { useQuery } from '@tanstack/react-query';

export const useTagById = (id: number) => {
  return useQuery({
    queryKey: ['tag', id],
    queryFn: async () => getTagById(id),
    enabled: id !== undefined,
    staleTime: 5 * 60 * 1000,
  });
};
