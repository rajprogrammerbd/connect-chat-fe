import { AnyAction, Reducer, combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import userSlice from '.';


const persistConfig = {
  key: 'root',
  storage: storageSession,
}

const combine = combineReducers({
  user: userSlice.reducer
});

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === 'user/reset_users') {
    sessionStorage.removeItem('persist:root')
    console.log('this running now', sessionStorage.getItem('persist:root'))
    state = {} as RootState
  }
  return combine(state, action);
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

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