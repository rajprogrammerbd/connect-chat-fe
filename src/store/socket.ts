import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface SocketState {
    socketId: string;
    isAdminError: boolean;
    adminErrorMessage: string;
    isRefreshed: boolean;
}

// Define the initial state using that type
const initialState: SocketState = {
    socketId: '',
    isAdminError: false,
    adminErrorMessage: '',
    isRefreshed: false
}

export const socketSlice = createSlice({
  name: 'socketConnection',
  initialState,
  reducers: {
    set_admin_error: (state, action: PayloadAction<{ status: boolean, message: string }>) => {
      state.isAdminError = action.payload.status;
      state.adminErrorMessage = action.payload.message;
    },

    set_socket_id: (state, action: PayloadAction<{ id: string }>) => {
        state.socketId = action.payload.id;
    },

    reset_socket: (state, action) => {
      state.socketId = initialState.socketId,
      state.isAdminError = initialState.isAdminError;
      state.adminErrorMessage = initialState.adminErrorMessage;
      state.isRefreshed = initialState.isRefreshed;
    },

    set_is_refresh: (state, action: PayloadAction<boolean>) => {
      state.isRefreshed = action.payload;
    }
  },
})

export const {
  set_socket_id,
  set_admin_error,
  reset_socket,
  set_is_refresh
} = socketSlice.actions;

export default socketSlice.reducer;
