import { UserCard } from '../UserCard';
import { getTimeAgo } from '@/app/pages/Questions/QuestionTable/constants';
import { CheckmarkCircle02Icon, Delete02Icon, PencilEdit02Icon } from 'hugeicons-react';
import { AnswerCardProps } from './component.props';
import { StatisticActions } from '../StatisticActions';
import { useFetchUserData } from '@/app/hooks/user/useFetchUserData';
import { useGetANswerById } from '@/app/hooks/answer/useGetAnswerById';
import { Loader } from '../Loader';
import { cn } from '@/shared/lib/cn';
import { useDeleteAnswer } from '@/app/hooks/answer/useDeleteAnswer';
import notify from '@/utils/notify';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Modal } from '@/shared/modules/Modal';
import { Button } from '../Button';
import { ClipLoader } from 'react-spinners';
import { useUpdateAnswer } from '@/app/hooks/answer/useUpdateAnswer';
import { Controller, useForm } from 'react-hook-form';
import { QuillEditor } from '@/shared/modules/QuillEditor';

export const AnswerCard = ({ answerId, isOwner }: AnswerCardProps) => {
  const { data: currentUser } = useFetchUserData();
  const queryClient = useQueryClient();
  const { data: dataAnswer, isLoading } = useGetANswerById(answerId);

  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      content: dataAnswer?.text || '',
    },
  });

  useEffect(() => {
    if (dataAnswer?.text) {
      setValue('content', dataAnswer.text);
    }
  }, [dataAnswer?.text, setValue]);

  const { mutate: updateAnswer, isPending } = useUpdateAnswer({
    onSuccess: () => {
      notify('Ответ обновлен!', 'Ваш ответ успешно обновлен!', 'success');
      queryClient.invalidateQueries();
      setIsModalEditOpen(false);
    },
    onError: () => {
      notify('Ошибка!', 'Не удалось обновить ответ', 'warning');
    },
  });

  const handleUpdate = (data: { content: string }) => {
    updateAnswer({ id: answerId, text: data.content });
  };

  const { mutate: deleteAnswer, isPending: isDeleting } = useDeleteAnswer({
    onSuccess: () => {
      notify('Ответ удален!', 'Ваш ответ успешно удален!', 'success');
      queryClient.invalidateQueries();
    },
    onError: () => {
      notify('Ошибка удаления!', 'Возникла ошибка при удалении ответа', 'warning');
      console.error('Ошибка при удалении ответа');
    },
  });

  const handleDelete = () => {
    deleteAnswer({ id: answerId });
  };

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
            {isOwner && (
              <>
                <button aria-label="Редактировать ответ">
                  <PencilEdit02Icon color="var(--base-grey-09)" onClick={() => setIsModalEditOpen(true)} />
                </button>
                <button aria-label="Удалить ответ">
                  <Delete02Icon color="var(--base-red-01)" onClick={() => setIsModalDeleteOpen(true)} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      {isModalEditOpen && (
        <Modal>
          <form onSubmit={handleSubmit(handleUpdate)}>
            <div className="text-lg font-medium mb-4 text-base-grey-09 text-center">Редактировать ответ</div>
            <div className="max-w-5xl py-2">
              <Controller
                name="content"
                control={control}
                rules={{ required: 'Ответ не может быть пустым' }}
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <QuillEditor
                    value={value}
                    onChange={onChange}
                    error={error?.message}
                    label="Ваш ответ"
                    placeholder="Добавьте свой ответ на вопрос."
                  />
                )}
              />
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <Button
                type="button"
                className="px-3 py-0.5"
                variant="secondary"
                onClick={() => setIsModalEditOpen(false)}
              >
                Отмена
              </Button>
              <Button
                type="submit"
                className="px-3 py-0.5 flex items-center justify-center text-base"
                variant="primary"
                disabled={isPending}
              >
                Сохранить изменения
                {isPending && <ClipLoader className="ml-2" size={20} color="var(--base-grey-01)" />}
              </Button>
            </div>
          </form>
        </Modal>
      )}
      {isModalDeleteOpen && (
        <Modal>
          <div className="text-lg font-medium mb-4 text-base-grey-09 text-center">Удалить ответ?</div>
          <div className="text-sm text-base-grey-07 mb-6">
            Вы действительно хотите удалить этот ответ? Это действие необратимо.
          </div>
          <div className="flex justify-end gap-4">
            <Button variant="secondary" className="px-3 py-0.5" onClick={() => setIsModalDeleteOpen(false)}>
              Отмена
            </Button>
            <Button
              variant="secondary"
              className="px-3 py-0.5 bg-base-red-01 hover:bg-red-600"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              Удалить {isDeleting ? <ClipLoader size={16} color="var(--base-grey-01)" /> : ''}
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};
