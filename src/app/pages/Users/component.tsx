import { Button } from '@/shared/components/Button';
import { Search } from '@/shared/components/Search';
import { UserTable } from './UsersTable';

export const UsersPage = () => {
  return (
    <div className="my-4 grid gap-4 mx-6 px-4">
      <h1 className="text-3xl text-base-grey-09">Пользователи</h1>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-4 items-center">
          <Search className="w-[350px]" placeholder="Искать пользователя..." />
          <Button variant="filterBar" className="px-8 py-1.5 h-fit">
            Искать
          </Button>
        </div>
      </div>
      <UserTable />
    </div>
  );
};
