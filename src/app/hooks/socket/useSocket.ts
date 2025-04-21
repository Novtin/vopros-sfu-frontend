import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useQueryClient } from '@tanstack/react-query';

export const useSocket = (userId: number) => {
  const socketRef = useRef<Socket | null>(null);
  const queryClient = useQueryClient(); // Используем для обновления кэшированных данных React Query

  useEffect(() => {
    if (!userId) return;

    const socket = io('http://localhost:9311', {
      query: { userId },
      transports: ['websocket'], // Принудительно через websocket
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('🔌 Подключено к сокету');
    });

    socket.on('new-answer', (notification: any) => {
      console.log('📨 Новое уведомление:', notification);
      queryClient.setQueryData(['notifications', userId], (oldData: any) => {
        return {
          ...oldData,
          items: [notification, ...oldData.items], // Добавляем новое уведомление в начало списка
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
  }, [userId, queryClient]);

  return socketRef;
};
