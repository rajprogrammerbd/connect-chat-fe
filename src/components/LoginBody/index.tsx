import React from 'react';
import { motion } from 'framer-motion';

function LoginBody() {
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="mx-auto w-full h-full"
            >
                <p className="text-white bg-black">Hello world</p>
            </motion.div>
        </>
    );
}

export default React.memo(LoginBody);
