import { Search } from '@/shared/components/Search';
import { Button } from '@/shared/components/Button';
import { FiltersBar } from '@/shared/components/FilterBar';
import { useEffect, useState } from 'react';
import { TagsTableGrid } from './TagsTable/component';
import { useTags } from '@/app/hooks/tags/useGetTags';
import { Loader } from '@/shared/components/Loader';

export const TagsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTags, setFilteredTags] = useState([]);

  const [activeFilter, setActiveFilter] = useState<string>('new');
  const filterOptions = [
    { id: 'popular', label: 'Популярные' },
    { id: 'name', label: 'По имени' },
    { id: 'new', label: 'Новые' },
  ];

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
    console.log(`Выбран фильтр: ${filterId}`);
  };

  const { data: tagsData, isLoading } = useTags();

  useEffect(() => {
    if (!searchQuery) {
      setFilteredTags(tagsData?.items || []);
      return;
    }
    const handler = setTimeout(() => {
      if (tagsData?.items) {
        const results = tagsData.items.filter(tag => tag.name.toLowerCase().includes(searchQuery.toLowerCase()));
        setFilteredTags(results);
      }
    }, 1000);

    return () => clearTimeout(handler);
  }, [searchQuery, tagsData]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="overflow-x-hidden grid gap-3 mt-4 mx-6 px-4">
      <h1 className="text-3xl text-base-grey-09">Теги</h1>
      <p className="text-base text-base-grey-09">
        Тег - это ключевое слово или метка, которая объединяет ваш вопрос с другими похожими вопросами. Использование
        правильных тегов облегчает другим пользователям поиск ответа на ваш вопрос.
      </p>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-4 items-center">
          <Search className="w-[300px]" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          <Button variant="filterBar" className="px-8 py-1.5 h-fit" onClick={() => setSearchQuery('')}>
            Сбросить
          </Button>
        </div>
        <FiltersBar
          options={filterOptions}
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
          className="py-1"
        />
      </div>
      {filteredTags.length > 0 ? (
        <TagsTableGrid tags={filteredTags} />
      ) : tagsData?.items?.length > 0 ? (
        <p className="text-center text-gray-500 p-4">Ничего не найдено по запросу "{searchQuery}"</p>
      ) : (
        <div className="text-center text-gray-500 p-4">Тегов пока нет</div>
      )}
    </div>
  );
};
