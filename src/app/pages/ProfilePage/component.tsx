import { BlockInfo } from '@/shared/components/BlockInfo';
import { ProfileStats } from '@/shared/components/ProfileStats';
import { useFetchUserData } from '@/app/hooks/user/useFetchUserData';
import { useFileUrl } from '@/app/hooks/user/useGetFile';
import { ClipLoader } from 'react-spinners';
import { Button } from '@/shared/components/Button';
import { Tabs } from '@/shared/components/Tabs/component';
import { LANGUAGES, PROFILE_TABS, STATS } from './constants';
import { useState } from 'react';
import { Select } from '@/shared/components/Select';
import { Link } from 'react-router-dom';
import { ROUTER_PATHS } from '@/app/consts';
import { Clock01Icon, PencilEdit02Icon } from 'hugeicons-react';

export const ProfilePage = () => {
  const { data } = useFetchUserData();
  const { fileUrl, isLoading } = useFileUrl(data?.avatar?.id);

  const [activeTab, setActiveTab] = useState<string>(PROFILE_TABS[0]);
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="gap-3 my-2 mx-6 pr-1">
      <div className="flex items-center gap-5 p-4">
        {isLoading ? (
          <ClipLoader color="#ff5722" size={96} />
        ) : (
          fileUrl && (
            <div className="w-24 h-24 rounded-xl overflow-hidden">
              <img src={fileUrl} alt="User Avatar" className="w-full h-full object-cover" />
            </div>
          )
        )}
        <h2 className="text-3xl font-bold text-base-grey-07">{data?.nickname}</h2>
        <div className="flex items-center pl-3 gap-2">
          <Clock01Icon color="var(--base-grey-07)" />
          <p className="text-base-grey-07">последний раз в сети 1 час назад</p>
        </div>
        <Link to={ROUTER_PATHS.EDIT_PROFILE} className="ml-auto">
          <Button className="bg-base-orange-01 flex items-center text-base font-semibold gap-3 px-2 py-1">
            <PencilEdit02Icon />
            Редактировать профиль
          </Button>
        </Link>
      </div>
      <Tabs tabs={PROFILE_TABS} onTabChange={handleTabChange} className="pl-2" />
      {activeTab === 'Профиль' && (
        <div className="flex justify-between gap-10 pt-5">
          <ProfileStats items={STATS(data)} className="h-fit" />
          <div className="grid gap-4 flex-1">
            <BlockInfo
              title="О себе"
              descroption="У вас не заполнена секция «Обо мне»."
              highlightText="Редактировать профиль"
              className="h-[185px]"
              link={ROUTER_PATHS.EDIT_PROFILE}
            />
            <BlockInfo
              title="Достижения"
              descroption="Вы ещё не получали"
              highlightText="знаки"
              className="h-[125px]"
            />
          </div>
        </div>
      )}
      {activeTab === 'Настройки' && (
        <div className="flex justify-between gap-10 pt-5">
          <Select
            label="Выбранный язык"
            options={LANGUAGES}
            selected={selectedLanguage}
            onChange={setSelectedLanguage}
          />
        </div>
      )}
    </div>
  );
};
