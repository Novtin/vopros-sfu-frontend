import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as authReducer } from '@/entities/Auth/model';
import { authApi } from '@/entities/Auth/api';

const mainReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
});

const store = configureStore({
  reducer: mainReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware),
});

export { store };
