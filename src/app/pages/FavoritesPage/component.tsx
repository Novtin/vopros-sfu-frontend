import { Search } from '@/shared/components/Search';
import { QuestionsTable } from '../Questions/QuestionTable/component';
import { useGetQuestions } from '@/app/hooks/question/useGetQuestions';
import { PAGE_SIZE } from '../Questions/constants';
import { useFetchUserData } from '@/app/hooks/user/useFetchUserData';
import { Loader } from '@/shared/components/Loader';
import { Button } from '@/shared/components/Button';
import { useEffect, useMemo, useState } from 'react';

export const FavoritesPage = () => {
  const { data, isLoading } = useFetchUserData();
  const {
    data: questionsData,
    isLoading: isLoadingQuestions,
    fetchNextPage,
    hasNextPage,
  } = useGetQuestions({
    pageSize: PAGE_SIZE,
    sort: 'createdAt',
    favoriteUserId: data?.id,
  });

  const questions = questionsData?.pages.flatMap(page => page.items) || [];
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // фильтрация
  const filteredQuestions = useMemo(() => {
    if (!debouncedSearchQuery.trim()) return questions;
    const lowerQuery = debouncedSearchQuery.toLowerCase();
    return questions.filter(
      q => q.title?.toLowerCase().includes(lowerQuery) || q.description?.toLowerCase().includes(lowerQuery),
    );
  }, [debouncedSearchQuery, questions]);

  if (isLoading && isLoadingQuestions) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col flex-grow gap-3 my-4 mx-6 pr-1">
      <div className="flex flex-col gap-10 align-middle justify-between">
        <div className="flex flex-row justify-between">
          <h1 className="text-xl text-base-grey-09 mb-2 md:mb-0">Избранные - {filteredQuestions?.length} вопросов</h1>
          <div className="flex flex-row gap-3 items-center">
            <Search
              className="w-[350px]"
              placeholder="Поиск вопроса..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <Button
              variant="filterBar"
              className="px-6 py-1 h-fit"
              onClick={() => {
                setSearchQuery('');
                setDebouncedSearchQuery('');
              }}
            >
              Сбросить
            </Button>
          </div>
        </div>
      </div>
      <div>
        {isLoadingQuestions ? (
          <Loader />
        ) : (
          <QuestionsTable questions={filteredQuestions} fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} />
        )}
      </div>
    </div>
  );
};
