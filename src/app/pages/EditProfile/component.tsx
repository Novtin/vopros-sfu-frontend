import { useFetchUserData } from '@/app/hooks/user/useFetchUserData';
import { useFileUrl } from '@/app/hooks/user/useGetFile';
import { Button } from '@/shared/components/Button';
import { Input } from '@/shared/components/Input';
import { Textarea } from '@/shared/components/Textarea';
import { ResetPasswordForm } from '@/shared/modules/ResetPasswordForm';
import { AvatarUploadModal } from '@/shared/modules/UploadImageModal';
import { useState } from 'react';
import { ClipLoader } from 'react-spinners';

export const EditProfile = () => {
  const [changePassword, setChangePassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data } = useFetchUserData();
  const { fileUrl, isLoading } = useFileUrl(data?.avatar?.id);
  return (
    <>
      {changePassword && <ResetPasswordForm className="text-center" onClose={() => setChangePassword(false)} />}
      <div className="grid gap-3 my-5 mx-8">
        <AvatarUploadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} userId={data?.id} />
        <div className="w-fit flex flex-col gap-2.5 items-center">
          <h2 className="text-base-grey-07 font-bold text-2xl">Изображение профиля</h2>
          {isLoading ? (
            <ClipLoader color="#ff5722" size={96} />
          ) : (
            fileUrl && (
              <div className="w-[150px] h-[150px] rounded-xl overflow-hidden">
                <img src={fileUrl} alt="User Avatar" className="w-full h-full object-cover" />
              </div>
            )
          )}
          <Button className="font-normal text-sm px-3 py-0.5" variant="secondary" onClick={() => setIsModalOpen(true)}>
            Изменить фото
          </Button>
        </div>
        <Input
          label="Отображаемое имя"
          type="text"
          placeholder="username"
          value={data?.nickname}
          className="w-[350px] border border-base-grey-07"
        />
        <Button className="w-[250px] text-base py-0.5" variant="secondary" onClick={() => setChangePassword(true)}>
          Изменить пароль
        </Button>
        <Textarea
          label="Обо мне"
          labelSx="mb-1 text-base text-base-blue-02"
          placeholder="Я люблю программировать..."
          value={data?.description}
          className="w-[650px] border border-base-grey-07"
        />
        <Button className="w-[250px] text-base py-0.5">Сохранить</Button>
      </div>
    </>
  );
};
