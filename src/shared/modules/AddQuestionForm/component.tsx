import { Button } from '@/shared/components/Button';
import { Input } from '@/shared/components/Input';
import { hideForm } from '@/store/questionSlice';
import notify from '@/utils/notify';
import { Controller, useForm } from 'react-hook-form';
import { FormValues } from './component.props';
import { useDispatch } from 'react-redux';
import { useAddNewQuestion } from '@/app/hooks/question/useAddQuestion';
import { useQueryClient } from '@tanstack/react-query';
import { ArrowRight02Icon } from 'hugeicons-react';
import { QuillEditor } from '../QuillEditor';

export const AddQuestionForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutateAsync: addNewQuestion } = useAddNewQuestion();

  const onSubmit = async (data: FormValues) => {
    try {
      const tagNames = data.tags.split(',').map(tag => tag.trim());
      const statusCode = await addNewQuestion({
        title: data.title,
        description: data.content,
        tagNames,
      });

      if (statusCode === 200 || statusCode == 201) {
        notify('Вопрос создан!', 'Ваш вопрос успешно опубликован!', 'success');
        queryClient.invalidateQueries({ queryKey: ['questions'] });
        queryClient.invalidateQueries({ queryKey: ['questionCount'] });
        dispatch(hideForm());
      } else {
        alert(`Произошла ошибка. Код состояния: ${statusCode}`);
      }
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  };

  return (
    <div className="m-4">
      <div className="flex mb-4 gap-2">
        <button
          onClick={() => {
            dispatch(hideForm());
          }}
        >
          <ArrowRight02Icon color="var(--base-grey-08)" width="32px" height="32px" className="rotate-180" />
        </button>
        <h2 className="text-base-grey-09 text-2xl font-medium">Задать публичный вопрос</h2>
      </div>
      <div className="p-6 bg-base-grey-03 rounded-md shadow-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Input
              label="Заголовок"
              type="text"
              placeholder="В чём заключается вопрос? Будьте конкретны."
              {...register('title', { required: 'Заголовок обязателен' })}
              error={errors.title?.message}
              variant="primary"
            />
          </div>
          <div>
            <Controller
              name="content"
              control={control}
              rules={{ required: 'Основная часть обязательна' }}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <QuillEditor value={value || ''} onChange={onChange} error={error?.message} />
              )}
            />
          </div>
          <div>
            <Input
              label="Теги"
              type="text"
              placeholder="Введите через запятую, например: javascript,python,linux"
              {...register('tags', {
                required: 'Теги обязательны',
                validate: value => {
                  const tags = value.split(',').map(tag => tag.trim());
                  if (tags.some(tag => !tag)) return 'Теги не должны быть пустыми';
                  return true;
                },
              })}
              error={errors.tags?.message}
              variant="primary"
            />
          </div>
        </form>
      </div>
      <div className="mt-3 text-center">
        <Button
          type="submit"
          className="w-[250px] h-10 bg-base-blue-01"
          variant="secondary"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          Опубликовать вопрос
        </Button>
      </div>
    </div>
  );
};
