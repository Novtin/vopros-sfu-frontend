import { useEffect, useState } from 'react';
import { StatisticActionsProps } from './component.props';
import { Bookmark01Icon, Tick03Icon, TriangleIcon } from 'hugeicons-react';
import { useToggleFavoriteQuestion } from '@/app/hooks/question/useToggleFavoriteQuestion';
import { useRateQuestion } from '@/app/hooks/question/useRateQuestion';
import { useDeleteRateQuestion } from '@/app/hooks/question/useDeleteRateQuestion';
import { useDispatch, useSelector } from 'react-redux';
import { resetRating, setRating } from '@/store/ratingsSlice';
import { useRateAnswer } from '@/app/hooks/answer/useRateAnswer';
import { useDeleteRateAnswer } from '@/app/hooks/answer/useDeleteRateAnswer';
import { useResolveAnswer } from '@/app/hooks/answer/useResolveAnswer';
import { useParams } from 'react-router-dom';
import notify from '@/utils/notify';

export const StatisticActions = ({
  id,
  countLikes,
  countDislikes,
  isFavoriteInitial,
  isLiked,
  isDisliked,
  isSolutionInitial,
  isOwner,
  type = 'question',
}: StatisticActionsProps) => {
  const [isFavorite, setIsFavorite] = useState(isFavoriteInitial);
  const [localLikes, setLocalLikes] = useState(countLikes);
  const [localDislikes, setLocalDislikes] = useState(countDislikes);
  const [isSolution, setIsSolution] = useState(isSolutionInitial);

  // вопросы
  const toggleFavoriteMutation = useToggleFavoriteQuestion();
  const rateQuestion = useRateQuestion();
  const deleteRateQuestion = useDeleteRateQuestion();

  // ответы
  const { id: stringId } = useParams<{ id: string }>();
  const questionId = Number(stringId);

  const rateAnswer = useRateAnswer(id);
  const deleteRateAnswer = useDeleteRateAnswer(id);
  const { markAsResolved, unmarkAsResolved } = useResolveAnswer();

  const handleToggleSolution = () => {
    if (isSolution) {
      unmarkAsResolved
        .mutateAsync({ questionId })
        .then(() => {
          notify('Решение вопроса удалено!', 'Вы успешно удалили отметку решения вопроса у вопроса!', 'warning');
          setIsSolution(false);
        })
        .catch(error => {
          console.error('Error unmarking solution:', error);
        });
    } else {
      markAsResolved
        .mutateAsync({ questionId, answerId: id })
        .then(() => {
          setIsSolution(true);
          notify('Решение вопроса отмечено!', 'Вы успешно отметили ответ как решение вопроса!', 'success');
        })
        .catch(error => {
          console.error('Error marking solution:', error);
        });
    }
  };

  const handleToggleFavorite = () => {
    toggleFavoriteMutation.mutate(
      { id: id, isFavorite },
      {
        onSuccess: () => setIsFavorite(prev => !prev),
      },
    );
  };

  const dispatch = useDispatch();
  const currentRating = useSelector((state: any) => state.ratings[id]?.currentRating || 'none');

  useEffect(() => {
    setLocalLikes(countLikes);
    setLocalDislikes(countDislikes);
  }, [countLikes, countDislikes]);

  useEffect(() => {
    if (isLiked) {
      dispatch(setRating({ id, rating: 'up' }));
    } else if (isDisliked) {
      dispatch(setRating({ id, rating: 'down' }));
    } else {
      dispatch(setRating({ id, rating: 'none' }));
    }
  }, [isLiked, isDisliked, id, dispatch]);

  const handleRateUp = () => {
    if (currentRating === 'up') {
      dispatch(resetRating(id));
      if (type === 'question') {
        deleteRateQuestion.mutate({ id, value: 1 });
      } else {
        deleteRateAnswer.mutate({ id, value: 1 });
      }
      setLocalLikes(prev => prev - 1);
    } else {
      if (currentRating === 'down') {
        setLocalDislikes(prev => prev - 1);
      }
      dispatch(setRating({ id, rating: 'up' }));

      if (type === 'question') {
        rateQuestion.mutate({ id, value: 1 });
      } else {
        rateAnswer.mutate({ id, value: 1 });
      }
      setLocalLikes(prev => prev + 1);
    }
  };

  const handleRateDown = () => {
    if (currentRating === 'down') {
      dispatch(resetRating(id));
      if (type === 'question') {
        deleteRateQuestion.mutate({ id, value: -1 });
      } else {
        deleteRateAnswer.mutate({ id, value: -1 });
      }
      setLocalDislikes(prev => prev - 1);
    } else {
      if (currentRating === 'up') {
        setLocalLikes(prev => prev - 1);
      }
      dispatch(setRating({ id, rating: 'down' }));
      if (type === 'question') {
        rateQuestion.mutate({ id, value: -1 });
      } else {
        rateAnswer.mutate({ id, value: -1 });
      }
      setLocalDislikes(prev => prev + 1);
    }
  };

  return (
    <div className="flex flex-col gap-3 items-center">
      <button onClick={handleRateUp}>
        <TriangleIcon
          fill={currentRating === 'up' ? 'var(--base-orange-03)' : 'transparent'}
          color="var(--base-grey-08)"
        />
      </button>
      <p className="text-xl text-base-grey-09">{localLikes - localDislikes}</p>
      <button onClick={handleRateDown}>
        <TriangleIcon
          className="rotate-180"
          fill={currentRating === 'down' ? 'var(--base-orange-03)' : 'transparent'}
          color="var(--base-grey-08)"
        />
      </button>
      {isFavoriteInitial !== undefined && (
        <button className="mt-2" onClick={handleToggleFavorite}>
          <Bookmark01Icon
            color="var(--base-grey-09)"
            fill={isFavorite ? 'var(--base-orange-03)' : 'var(--base-grey-01)'}
          />
        </button>
      )}
      {isSolutionInitial !== undefined && isOwner && (
        <button className="mt-2" onClick={handleToggleSolution}>
          <Tick03Icon color="var(--base-grey-09)" fill={isSolution ? 'var(--base-green-03)' : 'var(--base-grey-01)'} />
        </button>
      )}
    </div>
  );
};
