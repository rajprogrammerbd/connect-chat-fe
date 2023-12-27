import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IMsg, IUser, ReceivedMessagePayload } from '../Types';

// Define a type for the slice state
interface UserState {
  isConnected: {
    status: number;
    message: 'connected' | 'disconnected'
  } | false;
}

// Define the initial state using that type
const initialState: UserState = {
  isConnected: false
}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    set_isConnected: (state, action: PayloadAction<{ status: number; message: 'connected' | 'disconnected' }>) => {
      state.isConnected = {
        status: action.payload.status,
        message: action.payload.message
      }
    }
  },
});

export const { set_isConnected } = userSlice.actions;

export default userSlice;
