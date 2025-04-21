import { useState, useRef } from 'react';
import { Notification03Icon } from 'hugeicons-react';
import { useNotifications } from '@/app/hooks/notification/useNotifications';
import { useClickAway } from 'react-use';

export const NotificationDropdown = ({ userId }: { userId: number }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const { data, isLoading } = useNotifications(userId, 1, 5);

  useClickAway(ref, () => setOpen(false));

  return (
    <div className="relative" ref={ref}>
      <button className="text-xl ml-4 mt-2" onClick={() => setOpen(prev => !prev)} aria-label="Уведомления">
        <Notification03Icon size={24} color="var(--base-grey-08)" />
      </button>

      {open && (
        <div className="absolute left-0 mt-1 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
          <div className="p-4 border-b text-base font-semibold">Уведомления</div>

          {isLoading ? (
            <div className="p-4 text-sm text-gray-500">Загрузка...</div>
          ) : data?.items.length ? (
            <ul className="max-h-60 overflow-y-auto">
              {data.items.map(notif => (
                <li key={notif.id} className="p-3 border-b hover:bg-gray-50">
                  <div className="text-sm text-gray-800">{notif.payload?.text || 'Новое уведомление'}</div>
                  <div className="text-xs text-gray-500 mt-1">{new Date(notif.createdAt).toLocaleString()}</div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-sm text-gray-500">Нет новых уведомлений</div>
          )}
        </div>
      )}
    </div>
  );
};
