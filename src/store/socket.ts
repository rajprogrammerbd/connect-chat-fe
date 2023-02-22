import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface SocketState {
    socketId: string;
}

// Define the initial state using that type
const initialState: SocketState = {
    socketId: '',
}

export const socketSlice = createSlice({
  name: 'socketConnection',
  initialState,
  reducers: {

    set_socket_id: (state, action: PayloadAction<{ id: string }>) => {
        state.socketId = action.payload.id;
    }

  },
})

export const { set_socket_id } = socketSlice.actions;

export default socketSlice.reducer;
