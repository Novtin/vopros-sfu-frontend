import { useState } from 'react';
import { useFileUrl } from '@/app/hooks/user/useGetFile';
import { ClipLoader } from 'react-spinners';
import { ImageWithHookProps } from './component.props';

export const ImageWithHook = ({ id, title, onDelete }: ImageWithHookProps) => {
  const { fileUrl, isLoading } = useFileUrl(id, false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return <ClipLoader color="#ff5722" size={30} />;
  }

  return (
    <>
      <div className="w-40 h-40 rounded-xl overflow-hidden cursor-pointer" onClick={openModal}>
        <img
          src={fileUrl}
          alt={`Изображение к вопросу ${title}`}
          className="w-full h-full object-cover cursor-zoom-in"
        />
        {onDelete && (
          <button
            onClick={() => onDelete(id)}
            className="absolute top-1 right-1 bg-black bg-opacity-60 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
            title="Удалить"
          >
            ✕
          </button>
        )}
      </div>
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 cursor-zoom-out"
          onClick={closeModal}
        >
          <img
            src={fileUrl}
            alt={`Изображение к вопросу ${title}`}
            className="max-h-full max-w-full object-contain"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};
