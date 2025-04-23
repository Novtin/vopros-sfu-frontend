import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { addNotification } from '@/store/notificationsSlice';
import { NotificationItem } from '@/shared/types/notification';

export const useSocket = (userId: number) => {
  const socketRef = useRef<Socket | null>(null);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userId) return;

    const socket = io('http://localhost:9311', {
      query: { userId },
      transports: ['websocket'],
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('🔌 Подключено к сокету');
    });

    socket.on('new-answer', (notification: NotificationItem) => {
      dispatch(addNotification(notification));
      queryClient.setQueryData(['notifications', userId], (oldData: any) => {
        if (!oldData) {
          return {
            items: [notification],
            total: 1,
            page: 1,
            limit: 5,
          };
        }

        return {
          ...oldData,
          items: [notification, ...oldData.items],
          total: oldData.total + 1,
        };
      });
    });

    socket.on('connect_error', err => {
      console.error('❗ Ошибка подключения:', err.message);
    });

    socket.io.on('reconnect_attempt', () => {
      console.log('🔄 Повторная попытка подключения...');
    });

    socket.on('disconnect', () => {
      console.log('❌ Отключено от сокета');
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, queryClient, dispatch]);

  return socketRef;
};
