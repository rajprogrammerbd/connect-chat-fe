import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IMsg, IUser, ReceivedMessagePayload } from '../Types';

// Define a type for the slice state
interface UserState {
  isConnected: boolean;
  connectedUsersList: IUser[];
  name?: string;
  isErrorOccured: boolean;
  userId?: string;
  chatId?: string;
  isAdmin?: boolean;
  messages?: IMsg[];
  isAdminError: boolean;
}

// Define the initial state using that type
const initialState: UserState = {
  isConnected: false,
  connectedUsersList: [],
  isErrorOccured: false,
  isAdminError: false
}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    set_isAdminError(state, action: PayloadAction<boolean>) {
      state.isAdminError = action.payload;
    },
    set_isError(state, action: PayloadAction<boolean>) {
      state.isErrorOccured = action.payload;
    },
    set_isConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    update_total_messages: (state, action: PayloadAction<IMsg[]>) => {
      state.messages = action.payload;
    },
    add_message: (state, action: PayloadAction<IMsg>) => {
      state.messages?.push(action.payload);  
    },
    received_message: (state, action: PayloadAction<ReceivedMessagePayload>) => {
      state.chatId = action.payload.chatId;
      state.connectedUsersList = action.payload.connectedUsersList;
      if (action.payload.isAdmin !== undefined) {
        state.isAdmin = action.payload.isAdmin;
        state.messages = action.payload.messages;
        state.name = action.payload.name;
        state.userId = action.payload.userId;
      }
    },
    add_new_user_update: (state, action: PayloadAction<IUser[]>) => {
      state.connectedUsersList = action.payload;
    }
  },
});

export const { set_isAdminError, set_isError, set_isConnected, received_message, update_total_messages, add_message, add_new_user_update } = userSlice.actions;

export default userSlice;
