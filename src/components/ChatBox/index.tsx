import React from 'react';
import { useSelector } from "react-redux";
import { IChatBoxProps, IChatBoxState, IMessageGroupObj, RESPONSE_CHAT_BODY } from "../../Types";
import textFinder from "../assets/static-texts";
import { FaCircleUser } from "react-icons/fa6";
import Skeleton from "@mui/material/Skeleton";
import styled from "styled-components";
import { RootState } from "../../store/store";

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
`;

const NamedShow = styled.small`
    color: #828282;
`;

function ChatBox(props: IChatBoxProps) {
    const { activeGroupName } = props;
    const { groups } = useSelector((state: RootState) => state.messages);
    const { body } = useSelector((state: RootState) => state.user.user);

    const getGroup = (): IMessageGroupObj => {
        const filter = groups.filter((group: IMessageGroupObj) => group.group_name === activeGroupName);

        return filter[0];
    }

    const data = getGroup();


    return (
        <>
            <div className="chatbox m-5 rounded-md border-gray-100 border-2 flex flex-col items-center justify-center">
                {(activeGroupName === "") ? (
                    <>
                        <NoMessageToShow>{textFinder("noChatSelectedMessage")}</NoMessageToShow>
                    </>
                ) : (
                    <>
                        <div className="w-full h-full p-5">
                            <div>
                                <MessageDetails>{textFinder("MessageDetails")}</MessageDetails>
                                <ChatSettings>
                                    <LogoAndName>
                                        <FaCircleUser size={33} />

                                        <div className="ml-3">
                                            <Titled>{data.group_name}</Titled>
                                            <NamedShow>{body.username}</NamedShow>
                                        </div>
                                    </LogoAndName>
                                </ChatSettings>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default React.memo(ChatBox);
