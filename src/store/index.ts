import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { FAILED_RESPONSE_USER_CREATE, SUCCESS_RESPONSE_USER_CREATE } from '../Types';

// Define a type for the slice state
interface IDataInterface {
  selectedGroupName: string;
  selectedConnection_id: string;
}

interface UserState {
  isConnected: {
    status: number;
    message: 'connected' | 'disconnected'
  } | false;
  user: SUCCESS_RESPONSE_USER_CREATE | null;
  error: null | FAILED_RESPONSE_USER_CREATE;
  data: IDataInterface;
}

// Define the initial state using that type
const initialState: UserState = {
  isConnected: false,
  user: null,
  error: null,
  data: {
    selectedGroupName: '',
    selectedConnection_id: ''
  }
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
    },
    setUp_selectedChatData: (state, action: PayloadAction<{ groupName: string, connection_id: string }>) => {
      if (state.data.selectedGroupName === action.payload.groupName) {
        state.data = {
          selectedGroupName: '',
          selectedConnection_id: ''
        }
      } else {
        state.data = {
          selectedGroupName: action.payload.groupName.trim(),
          selectedConnection_id: action.payload.connection_id
        }
      }
    }
  },
});

export const { set_isConnected, setUp_user, set_error, setUp_selectedChatData } = userSlice.actions;

export default userSlice;
