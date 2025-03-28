import { fetchUsers } from '@/data/user';
import { UsersResponse } from '@/shared/types/user';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useUsers = (
  params: Parameters<typeof fetchUsers>[0],
  queryOptions?: Omit<
    UseQueryOptions<UsersResponse, Error, UsersResponse, [string, Parameters<typeof fetchUsers>[0]]>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery<UsersResponse, Error>({
    queryKey: ['users', params],
    queryFn: () => fetchUsers(params),
    ...queryOptions,
  });
};
