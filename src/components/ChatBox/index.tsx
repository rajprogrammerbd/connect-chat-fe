import React from 'react';
import { useSelector } from "react-redux";
import { IChatBoxProps, IMessageGroupObj, RESPONSE_CHAT_BODY } from "../../Types";
import textFinder from "../assets/static-texts";
import { FaCircleUser } from "react-icons/fa6";
import { IoArrowRedoSharp } from "react-icons/io5";
import styled from "styled-components";
import { RootState } from "../../store/store";
import MessageBox from '../MessageBox';
import { UpdateGroupNameFunc } from '../../App';

const NoMessageToShow = styled.p`
    color: #ddd;
`;

const MessageDetails = styled.h3`
    font-weight: bold;
    font-size: 23px;
`;

const ChatSettings = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 16px;
`;

const LogoAndName = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const Titled = styled.h5`
    font-weight: bold;
    margin-right: 7px;
`;

const NamedShow = styled.small`
    color: #828282;
`;

const NamedShowDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    min-width: 122px;
    width: auto;
`;

function ChatBox(props: IChatBoxProps) {
    const { activeGroupName, connection_id, updateText } = props;
    const updateGroupNameFn = React.useContext(UpdateGroupNameFunc);
    const [updateGroupState, setUpdateGroupState] = React.useState<boolean>(false);

    const { groups } = useSelector((state: RootState) => state.messages);
    const { body } = useSelector((state: RootState) => state.user.user);

    const getGroup = (): IMessageGroupObj => {
        const filter = groups.filter((group: IMessageGroupObj) => group.connection_id === connection_id);

        return filter[0];
    }

    const data = getGroup();

    const toggleUpdateGroupName = (): void => {
        setUpdateGroupState(prev => !prev );
    }

    const groupNameFn = () => {
        setUpdateGroupState(prev => !prev);

        updateGroupNameFn(activeGroupName);
    }

    return (
        <>
            <div className="chatbox m-5 rounded-md border-gray-100 border-2 flex flex-col items-center justify-center">
                {(activeGroupName === "") ? (
                    <>
                        <NoMessageToShow>
                            {textFinder("noChatSelectedMessage")}
                        </NoMessageToShow>
                    </>
                ) : (
                    <>
                        <div className="w-full h-full" style={{ display: 'grid', gridTemplateColumns: '4fr', gridTemplateRows: '0.3fr 3.5fr', gap: 10 }}>
                            <div className='p-5'>
                                <MessageDetails>{textFinder("MessageDetails")}</MessageDetails>
                                <ChatSettings>
                                    <LogoAndName>
                                        <FaCircleUser size={33} />
                                        <div className="ml-3">
                                            <NamedShowDiv>
                                                {!updateGroupState ? (
                                                    <Titled>{data.group_name}</Titled>
                                                ) : (
                                                    <>
                                                        <input
                                                            type="text"
                                                            value={activeGroupName}
                                                            onChange={e => updateText(e.target.value)}
                                                            className="border-2 border-slate-400 border-solid outline-none rounded-md px-2"
                                                        />
                                                        <button
                                                            style={{ backgroundColor: "#1976d2" }}
                                                            className="text-white rounded-lg text-sm py-1 px-3 ml-3"
                                                            onClick={groupNameFn}
                                                            disabled={activeGroupName.trim() === ""}
                                                        >
                                                            Update
                                                        </button>
                                                    </>
                                                )}
                                                {!updateGroupState && <IoArrowRedoSharp style={{ cursor: 'pointer' }} onClick={toggleUpdateGroupName} />}
                                            </NamedShowDiv>
                                            <NamedShow>{body.username}</NamedShow>
                                        </div>
                                    </LogoAndName>
                                </ChatSettings>
                            </div>

                            <MessageBox />
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default React.memo(ChatBox);
