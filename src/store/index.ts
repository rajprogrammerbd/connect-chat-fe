import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { FAILED_RESPONSE_USER_CREATE, SUCCESS_RESPONSE_USER_CREATE } from '../Types';

// Define a type for the slice state
interface UserState {
  isConnected: {
    status: number;
    message: 'connected' | 'disconnected'
  } | false;
  user: SUCCESS_RESPONSE_USER_CREATE | null;
  error: null | FAILED_RESPONSE_USER_CREATE;
}

// Define the initial state using that type
const initialState: UserState = {
  isConnected: false,
  user: null,
  error: null
}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    set_error: (state, action: PayloadAction<FAILED_RESPONSE_USER_CREATE | null>) => {
      state.error = action.payload;
    },
    set_isConnected: (state, action: PayloadAction<{ status: number; message: 'connected' | 'disconnected' }>) => {
      state.isConnected = {
        status: action.payload.status,
        message: action.payload.message
      }
    },

    setUp_user: (state, action: PayloadAction<SUCCESS_RESPONSE_USER_CREATE | null>) => {
      state.user = action.payload;
      state.error = null;
    }
  },
});

export const { set_isConnected, setUp_user, set_error } = userSlice.actions;

export default userSlice;
