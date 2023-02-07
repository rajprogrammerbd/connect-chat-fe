import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { WebSocketHook } from 'react-use-websocket/dist/lib/types';
import { WebSocketEvents } from 'vitest';

type WebSocketType = WebSocketHook<any | null>;

// Define a type for the slice state
interface WebsocketState {
  ws: null | WebSocketType
}

// Define the initial state using that type
const initialState: WebsocketState = {
  ws: null,
}

export const websocketSlice = createSlice({
  name: 'websocket',
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setWebSocket: (state, action: PayloadAction<any>) => {
      // state.value += action.payload
        state.ws = action.payload;
    },
  },
})

export const { setWebSocket } = websocketSlice.actions;

export default websocketSlice.reducer;
