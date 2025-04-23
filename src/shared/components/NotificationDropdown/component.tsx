import { useState, useRef } from 'react';
import { Notification03Icon } from 'hugeicons-react';
import { useClickAway } from 'react-use';
import { ClipLoader } from 'react-spinners';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export const NotificationDropdown = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const notifications = useSelector((state: RootState) => state.notifications.items);

  useClickAway(ref, () => setOpen(false));

  return (
    <div className="relative" ref={ref}>
      <button className="text-xl ml-4 mt-2" onClick={() => setOpen(prev => !prev)} aria-label="Уведомления">
        <Notification03Icon size={24} color="var(--base-grey-08)" />
      </button>

      {open && (
        <div className="absolute left-0 mt-1 w-80 bg-base-grey-01 border border-gray-300 rounded-xl shadow-lg z-50">
          <div className="p-4 border-b text-base font-semibold text-base-grey-09">Уведомления</div>
          {!notifications ? (
            <div className="flex items-center justify-center h-32">
              <ClipLoader size={48} color="var(--base-orange-01)" />
            </div>
          ) : notifications.length ? (
            <ul className="max-h-60 overflow-y-auto">
              {notifications.map((notifRaw, index) => {
                const notif = typeof notifRaw === 'string' ? JSON.parse(notifRaw) : notifRaw;
                const isLast = index === notifications.length - 1;
                console.log(isLast);
                return (
                  <li key={notif.id || index} className={`p-3 hover:bg-base-grey-02 ${isLast ? 'rounded-b-xl' : ''}`}>
                    <div className="text-sm text-base-blue-01">{notif.payload?.message || 'Новое уведомление'}</div>
                    <div className="text-xs text-gray-500 mt-1">{new Date(notif.createdAt).toLocaleString()}</div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="p-4 text-sm text-gray-500">Нет новых уведомлений</div>
          )}
        </div>
      )}
    </div>
  );
};
