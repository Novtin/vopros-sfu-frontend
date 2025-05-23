import { useGetQuestionById } from '@/app/hooks/question/useGetQuestionById';
import { Loader } from '@/shared/components/Loader';
import { UserCard } from '@/shared/components/UserCard/component';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getTimeAgo } from '../Questions/QuestionTable/constants';
import { StatisticActions } from '@/shared/components/StatisticActions';
import { useFetchUserData } from '@/app/hooks/user/useFetchUserData';
import { ImageWithHook } from '@/shared/components/ImageWithHook';
import { AddAnswer } from '@/shared/modules/AddAnswer';
import { AxiosError } from 'axios';
import { ROUTER_PATHS } from '@/app/consts';
import { Button } from '@/shared/components/Button';
import { useState } from 'react';
import { EditQuestionForm } from '@/shared/modules/EditQuestionForm';
import { AnswerCard } from '@/shared/components/AnswerCard';
import { useDeleteQuestion } from '@/app/hooks/question/useDeleteQuestion';
import { Modal } from '@/shared/modules/Modal';
import notify from '@/utils/notify';

export const AnswerQuestion = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: dataQuestion, isLoading, refetch, error } = useGetQuestionById(id);
  const { data: currentUser, isLoading: isLoadingUser } = useFetchUserData();
  const { mutate: deleteQuestion } = useDeleteQuestion({
    onSuccess: () => {
      notify('Вопрос удален!', 'Ваш вопрос успешно удален!', 'success');
      navigate(ROUTER_PATHS.QUESTIONS);
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState<number | null>(null);

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
    setQuestionToDelete(dataQuestion.id);
  };

  const handleConfirmDelete = () => {
    if (questionToDelete !== null) {
      deleteQuestion({ id: questionToDelete });
      setIsDeleteModalOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const isLiked = dataQuestion?.likeUserIds.includes(Number(currentUser?.id));
  const isDisliked = dataQuestion?.dislikeUserIds.includes(Number(currentUser?.id));

  if (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 404) {
      return <Navigate to={ROUTER_PATHS.ERROR_404} replace />;
    }
  }

  if (isLoading || isLoadingUser) {
    return <Loader />;
  }

  return (
    <>
      {isEditing ? (
        <EditQuestionForm
          onClose={() => {
            setIsEditing(false);
            refetch();
          }}
          dataQuestion={dataQuestion}
        />
      ) : (
        <div className="my-4 mx-6">
          <div className="bg-base-grey-01 rounded-md shadow-sm p-4 border border-gray-200 flex flex-row gap-4">
            <StatisticActions
              id={dataQuestion.id}
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
                  {currentUser?.id === dataQuestion.author.id && (
                    <>
                      <Button variant="secondary" className="text-base px-3 py-0.5" onClick={() => setIsEditing(true)}>
                        ✎ Редактировать
                      </Button>
                      <Button variant="primary" className="text-base px-3 py-0.5" onClick={handleDeleteClick}>
                        Удалить
                      </Button>
                    </>
                  )}
                </div>
              </div>
              {/* Текст вопроса */}
              <div className="quill-content text-base-grey-08 mb-4">
                <div className="ql-editor" dangerouslySetInnerHTML={{ __html: dataQuestion.description }} />
              </div>
              {/* Отображение изображений */}
              <div className="flex gap-3 my-4">
                {dataQuestion?.images?.map(image => (
                  <ImageWithHook key={image.id} id={image.id} title={dataQuestion.title} />
                ))}
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
          <div className="mt-3 space-y-4">
            <div className="text-lg text-base-grey-09 font-medium">{dataQuestion?.countAnswers} ответов</div>
            {dataQuestion.answers.map(answer => (
              <AnswerCard key={answer.id} answerId={answer.id} isOwner={currentUser?.id === dataQuestion.author.id} />
            ))}
          </div>
          <div className="mt-3 ml-4">
            <AddAnswer key={id} idQuestion={Number(id)} onFetch={() => refetch()} />
          </div>
        </div>
      )}
      {/* Модальное окно с подтверждением удаления */}
      {isDeleteModalOpen && (
        <Modal>
          <div className="p-6">
            <h2 className="text-lg font-semibold text-center text-base-grey-09">
              Вы уверены, что хотите удалить этот вопрос?
            </h2>
            <div className="mt-4 text-center">
              <Button
                variant="secondary"
                className="bg-base-red-01 px-3 py-0.5 hover:bg-red-600"
                onClick={handleConfirmDelete}
              >
                Удалить
              </Button>
              <Button variant="secondary" className="ml-2 px-3 py-0.5" onClick={handleCancelDelete}>
                Отменить
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
