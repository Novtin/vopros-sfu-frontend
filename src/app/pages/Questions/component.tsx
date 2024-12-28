import { getQuestionCount } from '@/api/useGetCountQuestions';
import { useAuth } from '@/app/hooks/useAuth';
import { Button } from '@/shared/components/Button';
import { FiltersBar } from '@/shared/components/FilterBar/component';
import { Header } from '@/shared/components/Header';
import { Navbar } from '@/shared/components/NavBar/component';
import { useEffect, useState } from 'react';

export const QuestionPage = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const [activeFilter, setActiveFilter] = useState<string>('new');
  const [countQuestions, setCountQuestions] = useState<number | null>();

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
    <main>
      <Header />
      <div className="flex flex-row bg-base-grey-01">
        <Navbar />
        <div className="flex flex-col w-full gap-3 my-4 mx-6">
          <div className="flex flex-row justify-between">
            <p className="text-base-grey-09 text-3xl font-opensans font-semibold">Все вопросы</p>
            <Button variant="secondary" className="w-[250px] font-opensans" children="Задать вопрос" />
          </div>
          <div className="flex flex-row justify-between items-center">
            <p className="text-base-grey-09 text-base font-opensans">{countQuestions} вопросов</p>
            <FiltersBar options={filterOptions} activeFilter={activeFilter} onFilterChange={handleFilterChange} />
          </div>
          <button onClick={handleLogout}>Выйти из аккаунта</button>
        </div>
      </div>
    </main>
  );
};
