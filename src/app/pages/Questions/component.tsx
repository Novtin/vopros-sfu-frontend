import { Button } from '@/shared/components/Button';
import { FiltersBar } from '@/shared/components/FilterBar/component';
import { useEffect, useState } from 'react';
import { PageLayout } from '../PageLayout';
import { AddQuestionForm } from '@/shared/modules/AddQuestionForm';
import { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFormVisibility } from '@/store/questionSlice';
import { Loader } from '@/shared/components/Loader';
import { useQuestionCount } from '@/app/hooks/question/useGetCountQuestions';
import { useAuth } from '@/app/hooks/authentication/useAuth';
import { useNavigate } from 'react-router-dom';
import { useGetQuestions } from '@/app/hooks/question/useGetQuestions';
import { QuestionsTable } from './QuestionTable/component';

export const QuestionPage = () => {
  const dispatch = useDispatch();
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  const isFormVisible = useSelector((state: RootState) => state.questions.isFormVisible);

  const { isLoading: isLoadingCountQuestions, data: countQuestions } = useQuestionCount();
  const { data: questionsData, isLoading: isLoadingQuestions } = useGetQuestions({
    page: 0,
    pageSize: 20,
    filter: 'createdAt',
  });

  const [activeFilter, setActiveFilter] = useState<string>('new');

  const handleToggleFormVisibility = () => {
    if (!isAuth) {
      navigate('/login');
      return;
    }
    dispatch(toggleFormVisibility());
  };

  const filterOptions = [
    { id: 'new', label: 'Новые' },
    { id: 'popular', label: 'Популярные' },
    { id: 'active', label: 'Активные' },
    { id: 'unanswered', label: 'Без ответов' },
  ];

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
    console.log(`Выбран фильтр: ${filterId}`);
  };

  useEffect(() => {
    if (isFormVisible && !isAuth) {
      navigate('/login');
    }
  }, [isFormVisible, isAuth, navigate]);

  if (isLoadingCountQuestions || isLoadingQuestions) {
    return <Loader />;
  }

  return (
    <PageLayout className={isFormVisible ? 'my-4 mx-6' : 'gap-3 my-4 mx-6 pr-1'}>
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
            <FiltersBar options={filterOptions} activeFilter={activeFilter} onFilterChange={handleFilterChange} />
          </div>
          <div>
            <QuestionsTable questions={questionsData.items} />
          </div>
        </>
      )}
    </PageLayout>
  );
};
