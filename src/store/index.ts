import LinkedList from './../Data/LinkedList';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IUsersName } from '../Types';

// Define a type for the slice state
interface UserState {
  userName: string;
  accessId: string;
  connected: IUsersName[];
  userId: string;
  messages?: LinkedList,
  isConnected?: boolean;
  isShownNotification?: boolean;
  isErrorOccured?: boolean;
  isAdmin: boolean;
  connectedAccessId: string;
}

interface IUpdateConnectedUser {
  obj: IUsersName[];
  msg: LinkedList;
}

export interface ReceivedMessagePayload {
  userName: string;
  accessId: string;
  connected: IUsersName[];
  userId: string;
  messages: LinkedList;
  connectedAccessId: string;
}

const list = new LinkedList();

// Define the initial state using that type
const initialState: UserState = {
  userName: '',
  accessId: '',
  connected: [],
  userId: '',
  messages: list,
  isConnected: false,
  isShownNotification: false,
  isErrorOccured: false,
  isAdmin: false,
  connectedAccessId: ''
}

export const websocketSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    default_start: (state, action: PayloadAction<UserState>) => {
      state.accessId = action.payload.accessId;
      state.connected = action.payload.connected;
      action.payload.messages ? state.messages = action.payload.messages : null;
      state.userName = action.payload.userName;
      state.accessId = action.payload.accessId;
    },

    set_isConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    set_isError: (state, action: PayloadAction<boolean>) => {
      state.isErrorOccured = action.payload;
    },
    update_connected_users: (state, action: PayloadAction<IUpdateConnectedUser>) => {
      state.connected = action.payload.obj;
      state.messages = action.payload.msg;
    },
    received_message: (state, action: PayloadAction<ReceivedMessagePayload>) => {
      state.accessId = action.payload.accessId;
      state.connected = action.payload.connected;
      state.userId = action.payload.userId;
      state.userName = action.payload.userName;
      state.accessId = action.payload.accessId;
      state.connectedAccessId = action.payload.connectedAccessId;
    },

    set_admin: (state, action: PayloadAction<boolean>) => {
      state.isAdmin = action.payload;
    }
  },
})

export const { default_start, set_isConnected, set_isError, received_message, update_connected_users, set_admin } = websocketSlice.actions;

export default websocketSlice.reducer;
