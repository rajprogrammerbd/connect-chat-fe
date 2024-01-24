import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IInitialState, RESPONSE_CHAT_BODY } from '../Types';
import { FaCropSimple } from 'react-icons/fa6';

const initialState: IInitialState = {
    groups: []
};

export const messageSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        add_message: (state, action: PayloadAction<{ messages: RESPONSE_CHAT_BODY[], connection_id: string, group_name: string }>) => {
            const idx = state.groups.findIndex((v) => v.connection_id === action.payload.connection_id);
            const obj = {
                messages: action.payload.messages,
                group_name: action.payload.group_name,
                connection_id: action.payload.connection_id,
                time: new Date().toLocaleTimeString()
            }

            if (idx === -1) {
                state.groups.push(obj);
            } else {
                state.groups[idx] = obj;
            }
        }
    }
});

export const { add_message } = messageSlice.actions;
export default messageSlice;
