import { Button } from '@/shared/components/Button';
import { Input } from '@/shared/components/Input';
import notify from '@/utils/notify';
import { Controller, useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { ArrowRight02Icon } from 'hugeicons-react';
import { QuillEditor } from '../QuillEditor';
import { useEffect, useState } from 'react';
import { ImageUploadModal } from '../UploadImageModal/component';
import { useUploadQuestionImages } from '@/app/hooks/image/useUploadQuestionImages';
import { ClipLoader } from 'react-spinners';
import { FormValues } from '../AddQuestionForm/component.props';
import { FORMAT_FILE_SIZE, GET_FILE_EXTENSION, GET_ICON_BY_EXTENSION } from '../AddQuestionForm/constants';
import { EditQuestionFormProps } from './component.props';
import { useUpdateQuestion } from '@/app/hooks/question/useUpdateQuestion';
import { Image } from '@/shared/types/question';

export const EditQuestionForm = ({ onClose, dataQuestion }: EditQuestionFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      title: '',
      content: '',
      tags: '',
    },
  });

  const queryClient = useQueryClient();
  const { mutateAsync: updateQuestion, isPending } = useUpdateQuestion();
  const { mutate: uploadImages } = useUploadQuestionImages();

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<Image[]>([]);
  const [initialized, setInitialized] = useState(false);

  const onSubmit = async (data: FormValues) => {
    if (!dataQuestion) return;

    try {
      const tagNames = data.tags.split(',').map(tag => tag.trim());

      const updated = await updateQuestion({
        id: dataQuestion.id,
        title: data.title,
        description: data.content,
        tagNames,
      });

      if (uploadedFiles.length > 0) {
        uploadImages({ id: updated.id, imageFiles: uploadedFiles });
      }

      notify('Вопрос обновлён!', 'Ваш вопрос был успешно изменён.', 'success');
      queryClient.invalidateQueries({ queryKey: ['questions'] });
      queryClient.invalidateQueries({ queryKey: ['questionCount'] });
      queryClient.invalidateQueries({ queryKey: ['question', dataQuestion.id] });
      onClose();
    } catch (error) {
      console.error('Ошибка при обновлении:', error);
    }
  };

  const handleUploadImages = (files: File[]) => {
    const maxFiles = 5;

    const allFiles = [...uploadedFiles, ...files];
    if (allFiles.length + existingImages.length > maxFiles) {
      notify('Ошибка', `Можно загрузить максимум ${maxFiles} файлов. Лишние не были добавлены.`, 'warning');
    }

    const newFiles = allFiles.slice(0, maxFiles - existingImages.length);
    setUploadedFiles(newFiles);
  };

  useEffect(() => {
    if (dataQuestion && !initialized) {
      reset({
        title: dataQuestion?.title || '',
        content: dataQuestion?.description || '',
        tags: dataQuestion.tags?.map(tag => tag.name).join(',') || '',
      });
      setExistingImages(dataQuestion.images || []);
      setUploadedFiles([]);
      setInitialized(true);
    }
  }, [dataQuestion, reset, initialized]);

  return (
    <div className="m-4">
      <div className="flex mb-4 gap-2">
        <button onClick={onClose}>
          <ArrowRight02Icon color="var(--base-grey-08)" width="32px" height="32px" className="rotate-180" />
        </button>
        <h2 className="text-base-grey-09 text-2xl font-medium">Изменить вопрос</h2>
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
          {existingImages.map((img, index) => {
            const extension = GET_FILE_EXTENSION(img.name);
            const icon = GET_ICON_BY_EXTENSION(extension);
            const handleRemove = () => {
              setExistingImages(prev => prev.filter((_, i) => i !== index));
            };

            return (
              <div
                key={`existing-${img.id}`}
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
                      {img.name}
                    </span>
                    <span className="text-xs text-base-grey-06">{FORMAT_FILE_SIZE(img.size)}</span>
                  </div>
                </div>
              </div>
            );
          })}
          {uploadedFiles.map((file, index) => {
            const extension = GET_FILE_EXTENSION(file.name);
            const icon = GET_ICON_BY_EXTENSION(extension);

            const handleRemove = () => {
              setExistingImages(prev => prev.filter((_, i) => i !== index));
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
          Обновить вопрос
          {isPending && <ClipLoader className="ml-2" size={20} color="var(--base-grey-01)" />}
        </Button>
      </div>

      <ImageUploadModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        multiple={true}
        onUpload={files => {
          handleUploadImages(files);
          setIsImageModalOpen(false);
        }}
      />
    </div>
  );
};
