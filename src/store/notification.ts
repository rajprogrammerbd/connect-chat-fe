import LinkedList from './../Data/LinkedList';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface NotificationState {
    status: boolean;
    duration: number;
    message: string;
}

export interface ISetNotification {
    message: string;
    status: boolean;
}

const list = new LinkedList();

// Define the initial state using that type
const initialState: NotificationState = {
    status: false,
    duration: 12000,
    message: ''
}

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {

    set_notification: (state, action: PayloadAction<ISetNotification>) => {
      state.message = action.payload.message;
      state.status = action.payload.status;
    }
  },
})

export const { set_notification } = notificationSlice.actions;

export default notificationSlice.reducer;
