import { UserCard } from '../UserCard';
import { getTimeAgo } from '@/app/pages/Questions/QuestionTable/constants';
import { CheckmarkCircle02Icon } from 'hugeicons-react';
import { AnswerCardProps } from './component.props';
import { StatisticActions } from '../StatisticActions';
import { useFetchUserData } from '@/app/hooks/user/useFetchUserData';
import { useGetANswerById } from '@/app/hooks/answer/useGetAnswerById';
import { Loader } from '../Loader';
import { cn } from '@/shared/lib/cn';

export const AnswerCard = ({ answerId, isOwner }: AnswerCardProps) => {
  const { data: currentUser } = useFetchUserData();

  const { data: dataAnswer, isLoading } = useGetANswerById(answerId);

  if (isLoading || !dataAnswer) {
    return <Loader />;
  }

  const isLiked = dataAnswer?.likeUserIds.includes(currentUser?.id);
  const isDisliked = dataAnswer?.dislikeUserIds.includes(currentUser?.id);

  return (
    <div
      className={cn(
        'mt-4 p-4 border rounded-md shadow-sm bg-base-grey-01',
        dataAnswer?.isSolution && 'border-green-500',
      )}
    >
      {dataAnswer?.isSolution && (
        <div className="flex items-center text-green-600 font-medium gap-2 mb-3">
          <CheckmarkCircle02Icon className="w-6 h-6" />
          Решение
        </div>
      )}
      <div className="flex justify-between">
        <StatisticActions
          id={dataAnswer?.id}
          countLikes={dataAnswer?.likeUserIds?.length ?? 0}
          countDislikes={dataAnswer?.dislikeUserIds.length ?? 0}
          isLiked={isLiked}
          isDisliked={isDisliked}
          isSolutionInitial={dataAnswer?.isSolution}
          isOwner={isOwner}
          type="answer"
        />
        <div className="quill-content text-base-grey-08 mb-3 w-full">
          <div className="ql-editor" dangerouslySetInnerHTML={{ __html: dataAnswer?.text }} />
        </div>
        <div className="flex justify-between items-start mb-2">
          <div className="flex gap-3 items-center">
            <span className="text-sm text-base-grey-08 min-w-24 text-right">{getTimeAgo(dataAnswer?.createdAt)}</span>
            <UserCard key={dataAnswer?.author?.id} userData={dataAnswer?.author} variant="answerQuestion" />
          </div>
        </div>
      </div>
    </div>
  );
};
