import { combineReducers, configureStore } from '@reduxjs/toolkit'
import websocketReducer from './index';
import socketSlice from './socket';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';

const persistConfig = {
  key: 'root',
  storage: storageSession,
}

const combine = combineReducers({
  websocketReducer,
  socketSlice
});

const persistedReducer = persistReducer(persistConfig, combine);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
  }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;