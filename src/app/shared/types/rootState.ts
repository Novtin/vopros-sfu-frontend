import type { store } from '../../model';

type IRootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export type { IRootState, AppDispatch };
