import { useUsers } from '@/app/hooks/user/useGetUsers';
import { Loader } from '@/shared/components/Loader';
import { UserCard } from '@/shared/components/UserCard/component';

export const UserTable = () => {
  const { data: usersData, isLoading } = useUsers({ page: 1, pageSize: 100, filter: 'rating' });

  if (isLoading) {
    return <Loader />;
  }

  if (!usersData) {
    return <p className="text-base-grey-08 text-center mt-8 text-base">Нет данных о пользователях</p>;
  }

  return (
    <div className="overflow-x-hidden grid grid-cols-auto sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-2">
      {usersData?.items.map(user => (
        <UserCard key={user.id} userData={user} />
      ))}
    </div>
  );
};
