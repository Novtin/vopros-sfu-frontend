import { useFileUrl } from '@/app/hooks/user/useGetFile';
import { UserCardProps } from './component.props';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import { ROUTER_PATHS } from '@/app/consts';

export const UserCard = ({ userData }: UserCardProps) => {
  const { fileUrl, isLoading } = useFileUrl(userData?.avatar?.id);
  const plugAvatar = '/images/plugAvatar.png';

  return (
    <Link to={`${ROUTER_PATHS.PROFILE}/${userData.id}`} className="cursor-pointer">
      <div className="flex items-center p-2 bg-base-grey-02 rounded-xl w-full shadow dark:shadow-[0_4px_12px_rgba(0,0,0,1)]">
        {isLoading ? (
          <ClipLoader color="#ff5722" size={30} />
        ) : (
          <img
            src={fileUrl}
            alt="User Avatar"
            className="w-12 h-12 rounded-full mr-4"
            onError={e => {
              (e.target as HTMLImageElement).src = plugAvatar;
            }}
          />
        )}
        <div className="w-full overflow-hidden">
          <h4 className="font-semibold text-base-blue-01 truncate w-full">{userData?.nickname}</h4>
          <p className="text-sm text-base-grey-07 truncate w-full">{userData?.description}</p>
        </div>
      </div>
    </Link>
  );
};
