import { useFileUrl } from '@/app/hooks/user/useGetFile';
import { UserCardProps } from './component.props';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import { ROUTER_PATHS } from '@/app/consts';

export const UserCard = ({ userData, variant = 'usersTable' }: UserCardProps) => {
  const { fileUrl, isLoading } = useFileUrl(userData?.avatar?.id);
  const plugAvatar = '/images/plugAvatar.png';

  return (
    <Link to={`${ROUTER_PATHS.PROFILE}/${userData.id}`} className="cursor-pointer">
      <div className="flex items-center p-2 bg-base-grey-02 rounded-xl w-full shadow dark:shadow-[0_4px_12px_rgba(0,0,0,1)]">
        {isLoading ? (
          <ClipLoader role="status" color="#ff5722" size={variant === 'usersTable' ? 48 : 32} />
        ) : (
          <img
            src={fileUrl}
            alt="User Avatar"
            className={`rounded-full object-cover flex-shrink-0 ${
              variant === 'usersTable' ? 'w-12 h-12 mr-4' : 'w-8 h-8 mr-2'
            }`}
            onError={e => {
              (e.target as HTMLImageElement).src = plugAvatar;
            }}
          />
        )}
        <div className="w-full overflow-hidden">
          <h4 className="font-semibold text-base-blue-01 truncate w-full">{userData?.nickname}</h4>
          {variant === 'usersTable' ? (
            <p className="text-sm text-base-grey-07 truncate w-full">{userData?.description}</p>
          ) : (
            ''
          )}
        </div>
      </div>
    </Link>
  );
};
