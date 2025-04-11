import { useEffect, useState } from 'react';
import { QuestionActionsProps } from './component.props';
import { Bookmark01Icon, TriangleIcon } from 'hugeicons-react';
import { useToggleFavoriteQuestion } from '@/app/hooks/question/useToggleFavoriteQuestion';
import { useRateQuestion } from '@/app/hooks/question/useRateQuestion';
import { useDeleteRateQuestion } from '@/app/hooks/question/useDeleteRateQuestion';
import { useDispatch, useSelector } from 'react-redux';
import { resetRating, setRating } from '@/store/ratingsSlice';

export const QuestionActions = ({
  questionId,
  countLikes,
  countDislikes,
  isFavoriteInitial,
  isLiked,
  isDisliked,
}: QuestionActionsProps) => {
  const [isFavorite, setIsFavorite] = useState(isFavoriteInitial);
  const [localLikes, setLocalLikes] = useState(countLikes);
  const [localDislikes, setLocalDislikes] = useState(countDislikes);

  const toggleFavoriteMutation = useToggleFavoriteQuestion();

  const handleToggleFavorite = () => {
    toggleFavoriteMutation.mutate(
      { id: questionId, isFavorite },
      {
        onSuccess: () => setIsFavorite(prev => !prev),
      },
    );
  };

  const rateQuestion = useRateQuestion();
  const deleteRateQuestion = useDeleteRateQuestion();

  const dispatch = useDispatch();
  const currentRating = useSelector((state: any) => state.ratings[questionId]?.currentRating || 'none');

  useEffect(() => {
    setLocalLikes(countLikes);
    setLocalDislikes(countDislikes);
  }, [countLikes, countDislikes]);

  useEffect(() => {
    if (isLiked) {
      dispatch(setRating({ questionId, rating: 'up' }));
    } else if (isDisliked) {
      dispatch(setRating({ questionId, rating: 'down' }));
    } else {
      dispatch(setRating({ questionId, rating: 'none' }));
    }
  }, [isLiked, isDisliked, questionId, dispatch]);

  const handleRateUp = () => {
    if (currentRating === 'up') {
      dispatch(resetRating(questionId));
      deleteRateQuestion.mutate({ id: questionId, value: 1 });
      setLocalLikes(prev => prev - 1);
    } else if (currentRating === 'down') {
      dispatch(setRating({ questionId, rating: 'none' }));
      deleteRateQuestion.mutate({ id: questionId, value: -1 });
      setLocalDislikes(prev => prev - 1);
    } else {
      dispatch(setRating({ questionId, rating: 'up' }));
      rateQuestion.mutate({ id: questionId, value: 1 });
      setLocalLikes(prev => prev + 1);
    }
  };

  const handleRateDown = () => {
    if (currentRating === 'down') {
      dispatch(resetRating(questionId));
      deleteRateQuestion.mutate({ id: questionId, value: -1 });
      setLocalDislikes(prev => prev - 1);
    } else if (currentRating === 'up') {
      dispatch(setRating({ questionId, rating: 'none' }));
      deleteRateQuestion.mutate({ id: questionId, value: 1 });
      setLocalLikes(prev => prev - 1);
    } else {
      dispatch(setRating({ questionId, rating: 'down' }));
      rateQuestion.mutate({ id: questionId, value: -1 });
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
      <button className="mt-2" onClick={handleToggleFavorite}>
        <Bookmark01Icon
          color="var(--base-grey-09)"
          fill={isFavorite ? 'var(--base-orange-03)' : 'var(--base-grey-01)'}
        />
      </button>
    </div>
  );
};
