import { motion } from "framer-motion";
import React from "react";
import { FaCircleUser } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { IMessageBoxState, IMessageGroupObj, RESPONSE_CHAT_BODY, SIDE } from "../../Types";
import TextMessage from "../TextMessage";
import { SendMessage } from "../../App";
import textFinder from "../assets/static-texts";

function MessageBox() {
    const [state, setState] = React.useState<IMessageBoxState>({
        text: ''
    });

    const sendMessages = React.useContext(SendMessage);
    const { selectedGroupName } = useSelector((state: RootState) => state.user.data);
    const { body } = useSelector((state: RootState) => state.user.user);
    const { groups } = useSelector((state: RootState) => state.messages);

    const { messages, connection_id, group_name, time } = React.useMemo((): IMessageGroupObj => {
        const filter = groups.filter((group: IMessageGroupObj) => group.group_name === selectedGroupName);

       return filter[0];
    }, [groups]);

    const side = (name: string, notification: boolean): SIDE => {
        if (notification) {
            return "middle";
        }
        
        if (body.username === name) {
            return "left";
        }

        return "right";
    }

    const submittedMessage = () => {
        if (state.text !== '') {
            sendMessages(body.connection_id, body.is_root, body.username, state.text, body.socket_id);
            setState(prev => ({ ...prev, text: '' }));
        }
    }

    return (
        <div className="message-box w-full h-full">
            <div className="message-image"></div>
            <div className="message-content">
                <div className="">
                    { messages.map((message: RESPONSE_CHAT_BODY, key: number) => (
                        <TextMessage
                            key={key}
                            side={side(message.username, message.notification)}
                            text={message.message}
                        />
                    )) }
                </div>

                <div className="flex items-center justify-center">
                    <div className="w-11/12 relative">
                        <div className="absolute" style={{ top: 4, left: 4 }}>
                            <FaCircleUser size={33} />
                        </div>
                        <input
                            type="text"
                            className="w-full outline-none border border-slate-300 rounded-3xl border-solid"
                            style={{ padding: "7px 100px 7px 50px" }}
                            placeholder={textFinder("enterYourMessage")}
                            onChange={e => setState({ ...state, text: e.target.value })}
                            value={state.text}
                        />
                        
                        <div className="absolute text-sm text-white" style={{ right: 6, top: 4 }}>
                            <motion.button onClick={submittedMessage} whileTap={{ padding: "5px 9px" }} transition={{ duration: 0.1 }} initial={{ padding: '6px 10px', display: 'flex', flexDirection: 'row', alignItems: 'center', fontSize: 'small' }} className="send-message-btn flex flex-row rounded-full items-center bg-blue-600">Send <IoIosSend style={{ marginLeft: 1 }} size={16} /></motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(MessageBox);
