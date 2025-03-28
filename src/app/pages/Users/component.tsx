import { Button } from '@/shared/components/Button';
import { Search } from '@/shared/components/Search';
import { UserTable } from './UsersTable';
import { useEffect, useState } from 'react';

export const UsersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    if (!searchQuery) {
      setDebouncedSearch('');
      return;
    }

    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 1000);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  const handleReset = () => {
    setSearchQuery('');
    setDebouncedSearch('');
  };
  return (
    <div className="my-4 grid gap-4 mx-6 px-4">
      <h1 className="text-3xl text-base-grey-09">Пользователи</h1>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-4 items-center">
          <Search
            className="w-[350px]"
            placeholder="Искать пользователя..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <Button variant="filterBar" className="px-8 py-1.5 h-fit" onClick={handleReset}>
            Сбросить
          </Button>
        </div>
      </div>
      <UserTable searchQuery={debouncedSearch} />
    </div>
  );
};
