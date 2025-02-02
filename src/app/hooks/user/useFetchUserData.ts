import { fetchUserData } from '@/data/user';
import { UserData } from '@/shared/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useFetchUserData = (queryOptions?: UseQueryOptions<UserData, Error>) => {
  const queryResult = useQuery<UserData, Error>({
    queryKey: ['userData'],
    queryFn: fetchUserData,
    ...queryOptions,
  });
  return queryResult;
};
