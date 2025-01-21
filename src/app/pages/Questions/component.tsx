import { getQuestionCount } from '@/api/useGetCountQuestions';
import { useAuth } from '@/app/hooks/useAuth';
import { Button } from '@/shared/components/Button';
import { FiltersBar } from '@/shared/components/FilterBar/component';
import { useEffect, useState } from 'react';
import { PageLayout } from '../PageLayout';
import { AddQuestionForm } from '@/shared/modules/AddQuestionForm';
import { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFormVisibility } from '@/store/questionSlice';

export const QuestionPage = () => {
  const dispatch = useDispatch();
  const isFormVisible = useSelector((state: RootState) => state.questions.isFormVisible);
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const [activeFilter, setActiveFilter] = useState<string>('new');
  const [countQuestions, setCountQuestions] = useState<number | null>();

  const handleToggleFormVisibility = () => {
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
    const fetchCount = async () => {
      const count = (await getQuestionCount()) ?? 0;
      setCountQuestions(count);
    };

    fetchCount();
  }, []);

  return (
    <PageLayout className={isFormVisible ? '' : 'gap-3 my-4 mx-6'}>
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
            <p className="text-base-grey-09 text-base font-opensans">{countQuestions} вопросов</p>
            <FiltersBar options={filterOptions} activeFilter={activeFilter} onFilterChange={handleFilterChange} />
          </div>
          <button onClick={handleLogout}>Выйти из аккаунта</button>
        </>
      )}
    </PageLayout>
  );
};
