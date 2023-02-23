import LinkedList, { IValues } from './../Data/LinkedList';
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

interface IUpdateMsgAndUsers {
  msg: LinkedList;
  users: IUsersName[];
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
    reset_websocket: (state, action) => {
      state.userName = initialState.userName;
      state.accessId = initialState.accessId;
      state.connected = initialState.connected;
      state.userId = initialState.userId;
      state.messages = initialState.messages;
      state.isConnected = initialState.isConnected;
      state.isShownNotification = initialState.isShownNotification;
      state.isErrorOccured = initialState.isErrorOccured;
      state.isAdmin = initialState.isAdmin;
      state.connectedAccessId = initialState.connectedAccessId;
    },
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
      state.messages = action.payload.messages;
      state.accessId = action.payload.accessId;
      state.connectedAccessId = action.payload.connectedAccessId;
    },

    update_the_message: (state, action: PayloadAction<LinkedList>) => {
      state.messages = action.payload;
    },

    update_total_messages: (state, action: PayloadAction<LinkedList>) => {
      state.messages = action.payload;
    },

    set_admin: (state, action: PayloadAction<boolean>) => {
      state.isAdmin = action.payload;
    },

    update_message_and_connectedUser: (state, action: PayloadAction<IUpdateMsgAndUsers>) => {
      state.messages = action.payload.msg;
      state.connected = action.payload.users;
    }
  },
})

export const {
  reset_websocket,
  default_start,
  set_isConnected,
  set_isError,
  received_message,
  update_connected_users,
  set_admin,
  update_the_message,
  update_total_messages,
  update_message_and_connectedUser
} = websocketSlice.actions;

export default websocketSlice.reducer;
