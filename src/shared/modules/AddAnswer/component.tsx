import { Controller, useForm } from 'react-hook-form';
import { QuillEditor } from '../QuillEditor';
import { Button } from '@/shared/components/Button';
import { useAddNewAnswer } from '@/app/hooks/answer/useAddNewAnswer';
import { ClipLoader } from 'react-spinners';
import notify from '@/utils/notify';
import { FormValues } from './component.props';
import { useQueryClient } from '@tanstack/react-query';

export const AddAnswer = ({ idQuestion, onFetch }: { idQuestion: number; onFetch: () => void }) => {
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: { content: '' },
  });

  const queryClient = useQueryClient();

  const { mutate: publishAnswer, isPending } = useAddNewAnswer({
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({ queryKey: ['question', Number(idQuestion)] });
      notify('Ваш ответ создан!', 'Ваш ответ успешно опубликован!', 'success');
      onFetch();
    },
    onError: err => {
      console.error('Ошибка при отправке ответа:', err.message);
    },
  });

  const onSubmit = (data: FormValues) => {
    if (!data.content.trim()) return;
    publishAnswer({ questionId: idQuestion, text: data.content });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="max-w-4xl py-2">
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
      <Button
        type="submit"
        className="w-[220px] h-10 flex items-center justify-center text-base -mt-2"
        variant="primary"
        disabled={isPending}
      >
        Опубликовать ответ
        {isPending && <ClipLoader className="ml-2" size={20} color="var(--base-grey-01)" />}
      </Button>
    </form>
  );
};
