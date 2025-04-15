import { useGetQuestionById } from '@/app/hooks/question/useGetQuestionById';
import { Loader } from '@/shared/components/Loader';
import { UserCard } from '@/shared/components/UserCard/component';
import { useParams } from 'react-router-dom';
import { getTimeAgo } from '../Questions/QuestionTable/constants';
import { QuestionActions } from '@/shared/components/QuestionActions';
import { useFetchUserData } from '@/app/hooks/user/useFetchUserData';

export const AnswerQuestion = () => {
  const { id } = useParams<{ id: string }>();
  const { data: dataQuestion, isLoading } = useGetQuestionById(id || '');
  const { data: currentUser, isLoading: isLoadingUser } = useFetchUserData();

  const isLiked = dataQuestion?.likeUserIds.includes(Number(currentUser?.id));
  const isDisliked = dataQuestion?.dislikeUserIds.includes(Number(currentUser?.id));

  if (isLoading || isLoadingUser) {
    return <Loader />;
  }

  return (
    <div className="bg-base-grey-01 rounded-md shadow-sm p-4 border border-gray-200 my-4 mx-6 flex flex-row gap-4">
      <QuestionActions
        questionId={dataQuestion.id}
        countLikes={dataQuestion.countLikes}
        countDislikes={dataQuestion.countDislikes}
        isFavoriteInitial={currentUser?.favoriteQuestionIds.includes(parseInt(id))}
        isLiked={isLiked}
        isDisliked={isDisliked}
      />
      <div className="flex flex-col flex-grow">
        <div className="flex flex-row items-start mb-4 justify-between">
          {/* Заголовок вопроса и дата */}
          <div className="flex flex-col">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-base-blue-01">{dataQuestion.title}</h1>
              {dataQuestion.isResolved && (
                <span className="ml-2 px-2 py-1 text-xs text-white bg-green-500 rounded">Решён</span>
              )}
            </div>
            <div className="flex text-sm mt-1 gap-10">
              <p className="text-base-grey-08">
                <span className="text-base-grey-11">Спросили</span> {getTimeAgo(dataQuestion.createdAt)}
              </p>
              <p className="text-base-grey-08">
                <span className="text-base-grey-11">Изменили</span> {getTimeAgo(dataQuestion.updatedAt)}
              </p>
              <p className="text-base-grey-08">
                <span className="text-base-grey-11">Просмотров</span> {dataQuestion.views}
              </p>
              <p className="text-base-grey-08">
                <span className="text-base-grey-11">Ответов</span> {dataQuestion.countAnswers}
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center gap-4">
            <p className="text-sm text-base-blue-01">Спросил</p>
            <UserCard key={dataQuestion?.author?.id} userData={dataQuestion?.author} variant="answerQuestion" />
          </div>
        </div>
        {/* Текст вопроса */}
        <div className="quill-content text-base-grey-08 mb-4">
          <div className="ql-editor" dangerouslySetInnerHTML={{ __html: dataQuestion.description }} />
        </div>
        {/* Теги */}
        <div className="flex flex-wrap gap-2">
          {dataQuestion.tags.map(tag => (
            <div
              key={tag.id}
              className="w-fit text-sm inline-block h-fit py-1 px-3 rounded-full bg-base-grey-04 text-base-grey-08"
            >
              {tag.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
