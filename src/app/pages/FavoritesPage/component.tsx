import { Search } from '@/shared/components/Search';
import { QuestionsTable } from '../Questions/QuestionTable/component';
import { useGetQuestions } from '@/app/hooks/question/useGetQuestions';
import { PAGE_SIZE } from '../Questions/constants';
import { useFetchUserData } from '@/app/hooks/user/useFetchUserData';
import { Loader } from '@/shared/components/Loader';

export const FavoritesPage = () => {
  const { data } = useFetchUserData();
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
  return (
    <div className="flex flex-col flex-grow gap-3 my-4 mx-6 pr-1">
      <div className="flex flex-col gap-10 align-middle justify-between">
        <div className="flex flex-row justify-between">
          <h1 className="text-xl mb-2 md:mb-0">Избранные - {questions?.length} вопросов</h1>
          <Search className="w-[400px]" placeholder="Поиск вопроса..." />
        </div>
      </div>
      <div>
        {isLoadingQuestions ? (
          <Loader />
        ) : (
          <QuestionsTable questions={questions ?? []} fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} />
        )}
      </div>
    </div>
  );
};
