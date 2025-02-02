import { Search } from '@/shared/components/Search';
import { PageLayout } from '../PageLayout';
import { Button } from '@/shared/components/Button';
import { FiltersBar } from '@/shared/components/FilterBar';
import { useState } from 'react';
import { TagsTableGrid } from './TagsTable/component';
import { useTags } from '@/app/hooks/tags/useGetTags';
import { Loader } from '@/shared/components/Loader';

export const TagsPage = () => {
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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <PageLayout className={'overflow-x-hidden gap-3 my-4 mx-6 px-4'}>
      <h1 className="text-3xl text-base-grey-09">Теги</h1>
      <p className="text-base text-base-grey-09">
        Тег - это ключевое слово или метка, которая объединяет ваш вопрос с другими похожими вопросами. Использование
        правильных тегов облегчает другим пользователям поиск ответа на ваш вопрос.
      </p>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-4 items-center">
          <Search className="w-[300px]" />
          <Button variant="filterBar" className="px-8 py-1.5 h-fit">
            Искать
          </Button>
        </div>
        <FiltersBar
          options={filterOptions}
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
          className="py-1"
        />
      </div>
      <TagsTableGrid tags={tagsData?.items} />
    </PageLayout>
  );
};
