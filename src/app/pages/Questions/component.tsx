import { Button } from '@/shared/components/Button';
import { FiltersBar } from '@/shared/components/FilterBar/component';
import { useEffect, useState } from 'react';
import { AddQuestionForm } from '@/shared/modules/AddQuestionForm';
import { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFormVisibility } from '@/store/questionSlice';
import { useQuestionCount } from '@/app/hooks/question/useGetCountQuestions';
import { useAuth } from '@/app/hooks/authentication/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetQuestions } from '@/app/hooks/question/useGetQuestions';
import { QuestionsTable } from './QuestionTable/component';
import { SORT_OPTIONS, getFilterQueryValue, PAGE_SIZE } from './constants';
import { Loader } from '@/shared/components/Loader';
import { FilterModal } from '@/shared/modules/FilterModal';

export const QuestionPage = () => {
  const dispatch = useDispatch();
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  const isFormVisible = useSelector((state: RootState) => state.questions.isFormVisible);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tagIdsQuery = searchParams.get('tagIds');
  const tagIds = tagIdsQuery ? [Number(tagIdsQuery)] : [];

  const [filters, setFilters] = useState({
    isWithoutAnswer: false,
    isWithoutView: false,
    isWithoutRating: false,
    isResolved: false,
    tagIds: tagIds,
  });

  const [activeSort, setActiveSort] = useState<string>('new');
  const [sortQuery, setSortQuery] = useState<string>('createdAt');

  const { data: countQuestions } = useQuestionCount();
  const {
    data: questionsData,
    isLoading: isLoadingQuestions,
    fetchNextPage,
    hasNextPage,
  } = useGetQuestions({
    pageSize: PAGE_SIZE,
    sort: sortQuery,
    isResolved: filters.isResolved,
    isWithoutAnswer: filters.isWithoutAnswer,
    isWithoutView: filters.isWithoutView,
    isWithoutRating: filters.isWithoutRating,
    tagIds: filters.tagIds,
  });

  const handleApplyFilters = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const questions = questionsData?.pages.flatMap(page => page.items) || [];

  useEffect(() => {
    setSortQuery(getFilterQueryValue(activeSort));
  }, [activeSort]);

  const handleFilterChange = (filterId: string) => {
    setActiveSort(filterId);
  };

  const handleToggleFormVisibility = () => {
    if (!isAuth) {
      navigate('/login');
      return;
    }
    dispatch(toggleFormVisibility());
  };

  useEffect(() => {
    if (isFormVisible && !isAuth) {
      navigate('/login');
    }
  }, [isFormVisible, isAuth, navigate]);

  return (
    <div className={isFormVisible ? 'grid my-4 mx-6' : 'grid gap-3 my-4 mx-6 pr-1'}>
      {isFormVisible ? (
        <AddQuestionForm />
      ) : (
        <>
          <div className="flex flex-row justify-between">
            <p className="text-base-grey-09 text-3xl font-opensans font-semibold">Все вопросы</p>
            <Button
              variant="secondary"
              className="w-[250px] font-opensans"
              children="Задать вопрос"
              onClick={handleToggleFormVisibility}
            />
          </div>
          <div className="flex flex-row justify-between items-center">
            <p className="text-base-grey-09 text-base font-opensans">{countQuestions ?? 0} вопросов</p>
            <div className="flex flex-row flex-wrap items-center gap-5">
              <FiltersBar options={SORT_OPTIONS} activeFilter={activeSort} onFilterChange={handleFilterChange} />
              <FilterModal currentFilters={filters} onApplyFilters={handleApplyFilters} />
            </div>
          </div>
          <div>
            {isLoadingQuestions ? (
              <Loader />
            ) : (
              <QuestionsTable questions={questions ?? []} fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} />
            )}
          </div>
        </>
      )}
    </div>
  );
};
