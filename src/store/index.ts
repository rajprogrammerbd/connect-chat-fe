import LinkedList from './../Data/LinkedList';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface UserState {
  userName: string;
  accessId: string;
  connected: string[];
  userId: string;
  messages?: LinkedList,
  isConnected?: boolean;
  isShownNotification?: boolean;
  isErrorOccured?: boolean;
}

interface ReceivedMessagePayload {
  userName: string;
  accessId: string;
  connected: string[];
  userId: string;
  messages: LinkedList;
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
  isErrorOccured: false
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
    received_message: (state, action: PayloadAction<ReceivedMessagePayload>) => {
      state.accessId = action.payload.accessId;
      state.connected = action.payload.connected;
      state.userName = action.payload.userName;
      state.accessId = action.payload.accessId;
    }
  },
})

export const { default_start, set_isConnected, set_isError, received_message } = websocketSlice.actions;

export default websocketSlice.reducer;
