import { useState, DragEvent, ChangeEvent } from 'react';
import { UploadImageModalProps } from './component.props';
import { Button } from '@/shared/components/Button';
import { ALLOWED_TYPES, IMAGE_ACCEPT_ERROR, IMAGE_ACCEPT_TYPES } from './constants';
import notify from '@/utils/notify';

export const ImageUploadModal = ({ isOpen, onClose, userId, multiple = false, onUpload }: UploadImageModalProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const isValidImage = (file: File) => {
    return ALLOWED_TYPES.includes(file.type);
  };

  // Обработчик выбора файла через input
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const files = Array.from(event.target.files);
    const validFiles: File[] = [];

    files.forEach(file => {
      if (!isValidImage(file)) {
        notify('Ошибка', IMAGE_ACCEPT_ERROR, 'danger');
      } else {
        validFiles.push(file);
      }
    });

    if (validFiles.length > 0) {
      setSelectedFiles(multiple ? [...selectedFiles, ...validFiles] : validFiles);
    }
  };

  // Обработчик "дропа" файла
  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!event.dataTransfer.files) return;

    const files = Array.from(event.dataTransfer.files);
    const validFiles: File[] = [];

    files.forEach(file => {
      if (!isValidImage(file)) {
        notify('Ошибка', 'Можно загружать только изображения (PNG, JPEG, JPG)', 'danger');
      } else {
        validFiles.push(file);
      }
    });

    if (validFiles.length > 0) {
      setSelectedFiles(multiple ? [...selectedFiles, ...validFiles] : validFiles);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  // Отправка файлов на сервер
  const handleSubmit = () => {
    if (selectedFiles.length === 0) return;
    onUpload(selectedFiles, userId);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-base-grey-01 p-6 rounded-lg shadow-md max-w-lg w-full">
        <h2 className="text-xl text-base-grey-09 font-bold mb-4">Загрузить {multiple ? 'фотографии' : 'фото'}</h2>
        {/* Зона для Drag & Drop */}
        <div
          className="border-dashed border-2 border-base-grey-08 rounded-md p-4 mb-4 flex flex-col items-center justify-center text-center cursor-pointer"
          onDragOver={e => e.preventDefault()}
          onDrop={handleDrop}
        >
          <p className="text-sm text-base-grey-08 mb-2">Перетащите {multiple ? 'файлы' : 'файл'} сюда</p>
          <label className="text-sm text-base-blue-05 underline cursor-pointer">
            или выберите {multiple ? 'файлы' : 'файл'} с компьютера
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept={IMAGE_ACCEPT_TYPES}
              multiple={multiple}
            />
          </label>
          <p className="text-xs text-gray-500 mt-1">Поддерживаемые типы: PNG, JPG, JPEG</p>
        </div>
        {/* Предпросмотр загруженных файлов */}
        {selectedFiles.length > 0 && (
          <div className="mb-4 space-y-2">
            {selectedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between border p-2 rounded">
                <div className="flex items-center">
                  <img src={URL.createObjectURL(file)} alt="preview" className="w-10 h-10 object-cover rounded mr-2" />
                  <span className="text-sm text-base-grey-09">{file.name}</span>
                </div>
                <button className="text-red-500 hover:text-red-300" onClick={() => removeFile(index)}>
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-end space-x-2">
          <Button className="text-sm px-5 py-1" variant="secondary" onClick={onClose}>
            Отмена
          </Button>
          <Button
            className="text-sm px-5 py-1 disabled:opacity-70"
            onClick={handleSubmit}
            disabled={selectedFiles.length === 0}
          >
            Загрузить
          </Button>
        </div>
      </div>
    </div>
  );
};
