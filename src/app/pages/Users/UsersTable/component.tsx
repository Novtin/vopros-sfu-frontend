import { useUsers } from '@/app/hooks/user/useGetUsers';
import { Loader } from '@/shared/components/Loader';
import { UserCard } from '@/shared/components/UserCard/component';
import { UsersTableProps } from './component.props';

export const UserTable = ({ searchQuery }: UsersTableProps) => {
  const { data: usersData, isLoading } = useUsers({ page: 1, pageSize: 100, filter: 'rating' });

  if (isLoading) {
    return <Loader />;
  }

  if (!usersData) {
    return <p className="text-base-grey-08 text-center mt-8 text-base">Нет данных о пользователях</p>;
  }

  const filteredUsers = usersData.items.filter(user => user.nickname.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="overflow-x-hidden grid grid-cols-auto sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-2">
      {filteredUsers.length > 0 ? (
        filteredUsers.map(user => <UserCard key={user.id} userData={user} />)
      ) : (
        <div className="col-span-full flex justify-center">
          <p className="text-base-grey-08 text-center mt-8 text-base">Пользователи не найдены</p>
        </div>
      )}
    </div>
  );
};
