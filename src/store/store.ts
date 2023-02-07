import { configureStore } from '@reduxjs/toolkit'
import websocketReducer from './index';
import notificationReducer from './notification';

export const store = configureStore({
  reducer: {
    websocketReducer,
    notificationReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
      }),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;