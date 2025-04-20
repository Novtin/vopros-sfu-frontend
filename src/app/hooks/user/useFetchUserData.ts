import { fetchUserData } from '@/data/user';
import { UserData } from '@/shared/types/user';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useFetchUserData = (id?: number, queryOptions?: UseQueryOptions<UserData, Error>) => {
  const token = localStorage.getItem('accessToken');
  return useQuery<UserData, Error>({
    queryKey: ['userData', id],
    queryFn: () => fetchUserData(id),
    enabled: !!token,
    ...queryOptions,
  });
};
