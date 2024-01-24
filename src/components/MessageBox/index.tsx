import { motion } from "framer-motion";
import React from "react";
import { FaCircleUser } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";

function MessageBox() {
    return (
        <div className="message-box w-full h-full">
            <div className="message-image"></div>
            <div className="message-content">
                <div className="">
                    
                </div>

                <div className="flex items-center justify-center">
                    <div className="w-11/12 relative">
                        <div className="absolute" style={{ top: 4, left: 4 }}>
                            <FaCircleUser size={33} />
                        </div>
                        <input type="text" className="w-full outline-none border border-slate-300 rounded-3xl border-solid" style={{ padding: "7px 100px 7px 50px" }} placeholder="Enter your message" />
                        
                        <div className="absolute text-sm text-white" style={{ right: 6, top: 4 }}>
                            <motion.button whileTap={{ padding: "5px 9px" }} transition={{ duration: 0.1 }} initial={{ padding: '6px 10px', display: 'flex', flexDirection: 'row', alignItems: 'center', fontSize: 'small' }} className="send-message-btn flex flex-row rounded-full items-center bg-blue-600">Send <IoIosSend style={{ marginLeft: 1 }} size={16} /></motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(MessageBox);
