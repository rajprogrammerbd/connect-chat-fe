import React from 'react';
import { motion } from 'framer-motion';
import LoginBodyOptionsBar from '../LoginBodyOptionsBar';
import MessagesListBox from '../MessagesListBox';
import ChatBox from '../ChatBox';
import AttachmentBox from '../AttachmentBox';

export const DisplayChatFn = React.createContext((name?: string) => {});
export const DisplayName = React.createContext('');

function LoginBody() {
    const [state, setState] = React.useState(() => {
        return {
            activeGroupName: ''
        };
    });

    const displayChat = React.useCallback((name = '') => {
        setState(prev => ({
            ...prev,
            activeGroupName: name
        }));
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
                    <ChatBox activeGroupName={state.activeGroupName} />
                    <AttachmentBox />
                </motion.div>
            </DisplayChatFn.Provider>
        </DisplayName.Provider>
    );
}

export default React.memo(LoginBody);
