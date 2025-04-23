import { NotificationItem } from '@/shared/types/notification';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificationsState {
  items: NotificationItem[];
}

const initialState: NotificationsState = {
  items: [],
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<NotificationItem>) => {
      state.items.unshift(action.payload);
    },
    clearNotifications: state => {
      state.items = [];
    },
  },
});

export const { addNotification, clearNotifications } = notificationsSlice.actions;
export default notificationsSlice.reducer;
