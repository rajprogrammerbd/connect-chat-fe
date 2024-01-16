import React from 'react';
import { motion } from 'framer-motion';
import LoginBodyOptionsBar from '../LoginBodyOptionsBar';


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
                <div></div>
                <div></div>
                <div></div>
            </motion.div>
        </>
    );
}

export default React.memo(LoginBody);
