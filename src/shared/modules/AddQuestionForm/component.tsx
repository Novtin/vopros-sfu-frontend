import { Button } from '@/shared/components/Button';
import { Input } from '@/shared/components/Input';
import { Textarea } from '@/shared/components/Textarea';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormValues } from './component.props';
import { AddNewQuestion } from '@/api/useAddNewQuestion';
import { useDispatch } from 'react-redux';
import { hideForm } from '@/store/questionSlice';

export const AddQuestionForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();
  const dispatch = useDispatch();

  const onSubmit = async (data: FormValues) => {
    try {
      const tagNames = data.tags.split(',').map(tag => tag.trim());
      const result = await AddNewQuestion(data.title, data.content, tagNames);
      console.log(result);

      if (result) {
        alert('Ваш вопрос успешно опубликован!');
        dispatch(hideForm());
      }
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  };

  return (
    <div className="m-4">
      <h2 className="text-base-grey-09 text-2xl font-medium mb-4 ml-3">Задать публичный вопрос</h2>
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
            <Textarea
              label="Основная часть"
              placeholder="Добавьте всю информацию, которая может понадобиться для ответа на ваш вопрос."
              {...register('content', { required: 'Основная часть обязательна' })}
              className="min-h-[100px]"
              error={errors.content?.message}
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
