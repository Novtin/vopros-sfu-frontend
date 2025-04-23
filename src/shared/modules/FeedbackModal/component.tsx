import { useState } from 'react';
import { Button } from '@/shared/components/Button';
import { useFetchUserData } from '@/app/hooks/user/useFetchUserData';
import { ImageUploadModal } from '../UploadImageModal/component';
import { Input } from '@/shared/components/Input';
import { Textarea } from '@/shared/components/Textarea';
import { useSendFeedback } from '@/app/hooks/notification/useSendFeedback';
import notify from '@/utils/notify';
import { ClipLoader } from 'react-spinners';
import { AxiosError } from 'axios';

export const FeedbackModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { data: currentUser } = useFetchUserData();
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const handleImageUpload = (uploaded: File[]) => {
    setFiles(uploaded.slice(0, 5));
  };

  const { mutate, isPending } = useSendFeedback({
    onSuccess: () => {
      notify('Обратная связь отправлена!', 'Спасибо за ваше сообщение.', 'success');
      setTopic('');
      setDescription('');
      setFiles([]);
      onClose();
    },
    onError: (error: AxiosError) => {
      const status = error?.response?.status;
      if (status === 413) {
        notify('Файлы слишком большие', 'Максимальный размер загружаемого файла - 1.5Мб.', 'danger');
      } else {
        notify('Ошибка', 'Не удалось отправить сообщение. Попробуйте позже.', 'danger');
      }
    },
  });

  const handleSubmit = () => {
    mutate({ title: topic, text: description, email: currentUser?.email || '', imageFiles: files });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center">
      <div className="bg-base-grey-06 rounded-2xl shadow-lg p-6 max-w-xl w-full relative">
        <h2 className="text-xl font-bold mb-4 text-base-grey-09">Обратная связь</h2>
        <div className="space-y-4">
          {currentUser && (
            <>
              <div>
                <Input label="Email" type="email" variant="primary" value={currentUser?.email || ''} disabled />
              </div>
            </>
          )}
          <div>
            <Input label="Тема" type="text" variant="primary" value={topic} onChange={e => setTopic(e.target.value)} />
          </div>
          <div>
            <Textarea
              label="Описание"
              placeholder="Введите описание"
              value={description}
              className="text-sm"
              onChange={e => setDescription(e.target.value)}
            />
          </div>
          <div className="text-center">
            <Button className="text-sm py-0.5 px-4" onClick={() => setIsImageModalOpen(true)}>
              Загрузить изображения
            </Button>
            {files.length > 0 && (
              <div className="mt-2 text-sm text-gray-500">Загружено файлов: {files.length} (макс. 5)</div>
            )}
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-2">
          <Button className="text-base px-3 py-1" variant="secondary" onClick={onClose}>
            Отмена
          </Button>
          <Button className="text-base px-3 py-1 flex items-center justify-center" onClick={handleSubmit}>
            Отправить
            {isPending && <ClipLoader className="ml-2" size={16} color="var(--base-grey-01)" />}
          </Button>
        </div>
        <ImageUploadModal
          isOpen={isImageModalOpen}
          onClose={() => setIsImageModalOpen(false)}
          userId={currentUser?.id}
          multiple={true}
          onUpload={handleImageUpload}
        />
      </div>
    </div>
  );
};
