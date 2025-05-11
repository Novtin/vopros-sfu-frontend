import { useAuth } from '@/app/hooks/authentication/useAuth';
import { useGetQuestions } from '@/app/hooks/question/useGetQuestions';
import { Button } from '@/shared/components/Button';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuestionsTable } from '../Questions/QuestionTable/component';
import { useFetchUserData } from '@/app/hooks/user/useFetchUserData';
import { PAGE_SIZE } from '../Questions/constants';
import { Loader } from '@/shared/components/Loader';
import { useSetFavoriteTags } from '@/app/hooks/tags/useSetFavoriteTags';
import { Question } from '@/shared/types/question';
import { Tag } from '@/shared/types';
import { TagSelectionModal } from '@/shared/modules/TagSelectionModal';
import notify from '@/utils/notify';

export const HomePage = () => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  const { data: userData, isLoading: isLoadingData } = useFetchUserData();
  const { mutate: setFavoriteTags } = useSetFavoriteTags();

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  const {
    data: questionsData,
    isLoading: loadingQuestions,
    fetchNextPage,
    hasNextPage,
  } = useGetQuestions({
    pageSize: PAGE_SIZE,
    sort: 'createdAt',
    isResolved: false,
    isWithoutAnswer: false,
    isWithoutView: false,
    isWithoutRating: false,
    tagIds: selectedTags,
  });

  const questions = useMemo(() => {
    const all = questionsData?.pages.flatMap(p => p.items) || [];
    const map = new Map<number, Question>();
    all.forEach(q => {
      const existing = map.get(q.id);

      if (!existing) {
        map.set(q.id, q);
      } else {
        const mergedTagsMap = new Map<number, Tag>();
        [...existing.tags, ...q.tags].forEach(tag => {
          mergedTagsMap.set(tag.id, tag);
        });
        map.set(q.id, {
          ...existing,
          tags: Array.from(mergedTagsMap.values()),
        });
      }
    });

    return Array.from(map.values());
  }, [questionsData]);

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
      return;
    }
    if (!isLoadingData) {
      if (!userData?.favoriteTagIds || userData?.favoriteTagIds.length === 0) {
        setModalOpen(true);
      } else {
        setSelectedTags(userData?.favoriteTagIds);
      }
    }
  }, [isAuth, isLoadingData, userData?.favoriteTagIds, navigate]);

  const handleApplyTags = (tagsIds: number[]) => {
    setFavoriteTags(
      { tagsIds },
      {
        onSuccess: () => {
          notify('Подписка создана!', 'Вы успешно создали подписку вопросы по тегам!', 'success');
          setModalOpen(false);
        },
        onError: error => {
          console.error('Ошибка при обновлении тегов:', error);
        },
      },
    );
  };

  const openEditModal = () => {
    setModalOpen(true);
  };

  return (
    <div className="subscription-page my-4 mx-6 pr-1">
      <div className="header flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold text-base-grey-09">Подписка на теги</h1>
        <Button variant="secondary" className="px-3 py-0.5" onClick={openEditModal}>
          Изменить теги
        </Button>
      </div>
      {loadingQuestions ? (
        <Loader />
      ) : (
        <QuestionsTable questions={questions ?? []} fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} />
      )}
      <TagSelectionModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        initialSelectedTags={selectedTags}
        onApply={handleApplyTags}
      />
    </div>
  );
};
