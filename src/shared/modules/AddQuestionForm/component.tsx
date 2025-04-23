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
import { useState } from 'react';
import { ImageUploadModal } from '../UploadImageModal/component';
import { FORMAT_FILE_SIZE, GET_FILE_EXTENSION, GET_ICON_BY_EXTENSION } from './constants';
import { useUploadQuestionImages } from '@/app/hooks/image/useUploadQuestionImages';
import { ClipLoader } from 'react-spinners';

export const AddQuestionForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutateAsync: addNewQuestion, isPending } = useAddNewQuestion();
  const { mutate: uploadImages } = useUploadQuestionImages();

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const onSubmit = async (data: FormValues) => {
    try {
      const tagNames = data.tags.split(',').map(tag => tag.trim());
      const question = await addNewQuestion({
        title: data.title,
        description: data.content,
        tagNames,
      });

      if (question?.id) {
        if (uploadedFiles) {
          uploadImages({ id: question.id, imageFiles: uploadedFiles });
        }
        notify('Вопрос создан!', 'Ваш вопрос успешно опубликован!', 'success');
        queryClient.invalidateQueries({ queryKey: ['questions'] });
        queryClient.invalidateQueries({ queryKey: ['questionCount'] });
        dispatch(hideForm());
      } else {
        alert(`Произошла ошибка: вопрос не создан`);
      }
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  };

  const handleUploadImages = (files: File[]) => {
    if (uploadedFiles.length + files.length > 5) {
      notify('Ошибка', `Вы можете загрузить только 5 фотографий. Лишние файлы были удалены.`, 'warning');
    }
    const newFiles = [...uploadedFiles, ...files].slice(0, 5);
    setUploadedFiles(newFiles);
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
        <div className="flex my-2 gap-3 flex-wrap">
          {uploadedFiles.map((file, index) => {
            const extension = GET_FILE_EXTENSION(file.name);
            const icon = GET_ICON_BY_EXTENSION(extension);

            const handleRemove = () => {
              setUploadedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
            };

            return (
              <div
                key={index}
                className="relative flex items-center border p-2 rounded max-w-[200px] bg-base-grey-02 shadow"
              >
                <button
                  type="button"
                  onClick={handleRemove}
                  className="absolute top-[-6px] right-[-6px] bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                  title="Удалить"
                >
                  ✕
                </button>
                <div className="flex items-center gap-2">
                  <img src={icon} alt={extension} className="w-8 h-8" />
                  <div className="flex flex-col">
                    <span className="text-base-grey-09 text-sm block overflow-hidden whitespace-nowrap overflow-ellipsis max-w-[150px]">
                      {file.name}
                    </span>
                    <span className="text-xs text-base-grey-06">{FORMAT_FILE_SIZE(file.size)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Button onClick={() => setIsImageModalOpen(true)} variant="primary" className="w-[250px] text-sm py-0.5">
          Загрузить изображения
        </Button>
      </div>
      <div className="mt-3 text-center flex items-center justify-center gap-4">
        <Button
          type="submit"
          className="w-[250px] h-10 bg-base-blue-01 flex items-center justify-center"
          variant="secondary"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          Опубликовать вопрос
          {isPending && <ClipLoader className="ml-2" size={20} color="var(--base-grey-01)" />}
        </Button>
      </div>

      <ImageUploadModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        multiple={true}
        onUpload={files => {
          const newFiles = [...uploadedFiles, ...files];
          handleUploadImages(newFiles);
          setIsImageModalOpen(false);
        }}
      />
    </div>
  );
};
