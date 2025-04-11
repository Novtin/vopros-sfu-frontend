import { configureStore } from '@reduxjs/toolkit';
import questionReducer from './questionSlice';
import ratingsReducer from './ratingsSlice';

export const store = configureStore({
  reducer: {
    questions: questionReducer,
    ratings: ratingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
