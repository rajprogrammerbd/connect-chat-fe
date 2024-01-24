import React from 'react';
import { motion } from 'framer-motion';
import LoginBodyOptionsBar from '../LoginBodyOptionsBar';
import MessagesListBox from '../MessagesListBox';
import ChatBox from '../ChatBox';
import AttachmentBox from '../AttachmentBox';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { IMessageGroupObj } from '../../Types';

export const DisplayChatFn = React.createContext((connection_id: string, name?: string) => {});
export const DisplayName = React.createContext('');

function LoginBody() {
    const [state, setState] = React.useState(() => {
        return {
            connection_id: '',
            activeGroupName: ''
        };
    });

    const { groups } = useSelector((state: RootState) => state.messages);
    React.useEffect(() => {
        const ar = groups?.filter((group: IMessageGroupObj) => group.connection_id === state.connection_id);
        
        if (ar.length === 1) {
            const { connection_id, group_name } = ar[0];
            setState({ connection_id, activeGroupName: group_name  })
        }
    }, [groups]);

    const displayChat = React.useCallback((connection_id: string, name = '') => {
        setState(prev => ({
            ...prev,
            connection_id,
            activeGroupName: name
        }));
    }, []);

    const updateText = React.useCallback((value: string) => {
        setState(prev => ({ ...prev, activeGroupName: value }));
    }, []);

    return (
        <DisplayName.Provider value={state.activeGroupName}>
            <DisplayChatFn.Provider value={displayChat}>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    className="mx-auto mt-12 w-full h-full grid-design-custom"
                >
                    <LoginBodyOptionsBar />
                    <MessagesListBox />
                    <ChatBox updateText={updateText} activeGroupName={state.activeGroupName} connection_id={state.connection_id} />
                    <AttachmentBox />
                </motion.div>
            </DisplayChatFn.Provider>
        </DisplayName.Provider>
    );
}

export default React.memo(LoginBody);
