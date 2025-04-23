import { configureStore } from '@reduxjs/toolkit';
import questionReducer from './questionSlice';
import ratingsReducer from './ratingsSlice';
import notificationsReducer from './notificationsSlice';

export const store = configureStore({
  reducer: {
    questions: questionReducer,
    ratings: ratingsReducer,
    notifications: notificationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
