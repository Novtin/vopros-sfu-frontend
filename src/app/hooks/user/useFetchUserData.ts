import { fetchUserData, getSavedAvatar } from '@/data/user';
import { UserData } from '@/shared/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useFetchUserData = (queryOptions?: UseQueryOptions<UserData, Error>) => {
  const queryResult = useQuery<UserData, Error>({
    queryKey: ['userData'],
    queryFn: fetchUserData,
    ...queryOptions,
  });

  if (queryResult.isSuccess) {
    const data = queryResult.data!;

    if (data.avatar) {
      if (data.avatar.name) {
        localStorage.setItem('avatar', data.avatar.name);
      } else {
        const newAvatar = getSavedAvatar();
        localStorage.setItem('avatar', newAvatar);
        data.avatar.name = newAvatar;
      }
    } else {
      const newAvatar = getSavedAvatar();
      localStorage.setItem('avatar', newAvatar);
      data.avatar = {
        name: newAvatar,
        id: 0,
        size: 0,
        mimetype: '',
      };
    }

    if (data.nickname) {
      localStorage.setItem('nickname', data.nickname);
    }
  }

  return queryResult;
};
