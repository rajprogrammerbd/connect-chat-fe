import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RESPONSE_CHAT_BODY } from '../Types';

export interface IMessageGroupObj {
    messages: RESPONSE_CHAT_BODY[];
    group_name: string;
    time: string;
}

interface IInitialState {
    groups: IMessageGroupObj[];
}

const initialState: IInitialState = {
    groups: []
};

export const messageSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        add_message: (state, action: PayloadAction<{ messages: RESPONSE_CHAT_BODY[], groupName: string }>) => {
            const idx = state.groups.findIndex((v) => v.group_name === action.payload.groupName);
            const obj = {
                messages: action.payload.messages,
                group_name: action.payload.groupName,
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
