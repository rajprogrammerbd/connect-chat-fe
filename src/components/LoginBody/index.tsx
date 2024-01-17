import React from 'react';
import { motion } from 'framer-motion';
import LoginBodyOptionsBar from '../LoginBodyOptionsBar';
import MessagesListBox from '../MessagesListBox';
import ChatBox from '../ChatBox';
import AttachmentBox from '../AttachmentBox';


function LoginBody() {
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="mx-auto mt-12 w-full h-full grid-design-custom"
            >
                <LoginBodyOptionsBar />
                <MessagesListBox />
                <ChatBox />
                <AttachmentBox />
            </motion.div>
        </>
    );
}

export default React.memo(LoginBody);
