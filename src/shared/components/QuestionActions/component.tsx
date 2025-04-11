import { useState } from 'react';
import { QuestionActionsProps } from './component.props';
import { Bookmark01Icon, TriangleIcon } from 'hugeicons-react';
import { useToggleFavoriteQuestion } from '@/app/hooks/question/useToggleFavoriteQuestion';

export const QuestionActions = ({ questionId, countLikes, countDislikes, isFavoriteInitial }: QuestionActionsProps) => {
  const [isFavorite, setIsFavorite] = useState(isFavoriteInitial);
  const toggleFavoriteMutation = useToggleFavoriteQuestion();

  const handleToggleFavorite = () => {
    toggleFavoriteMutation.mutate(
      { id: questionId, isFavorite },
      {
        onSuccess: () => setIsFavorite(prev => !prev),
      },
    );
  };

  return (
    <div className="flex flex-col gap-3 items-center">
      <button>
        <TriangleIcon color="var(--base-grey-08)" />
      </button>
      <p className="text-xl text-base-grey-09">{countLikes - countDislikes}</p>
      <button>
        <TriangleIcon className="rotate-180" color="var(--base-grey-08)" />
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
