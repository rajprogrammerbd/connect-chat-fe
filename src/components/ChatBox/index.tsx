import React from 'react';
import { useSelector } from "react-redux";
import { IMessageGroupObj } from "../../Types";
import textFinder from "../assets/static-texts";
import { FaCircleUser } from "react-icons/fa6";
import { IoArrowRedoSharp } from "react-icons/io5";
import styled from "styled-components";
import { RootState } from "../../store/store";
import MessageBox from '../MessageBox';
import { UpdateGroupNameFunc } from '../../App';
import { useDispatch } from 'react-redux';
import { setUp_selectedChatData } from '../../store';

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

interface IState {
    text: string;
    state: boolean;
}

function ChatBox() {
    const [state, setState] = React.useState<IState>({
        text: '',
        state: false
    });
    const dispatch = useDispatch();
    const { selectedGroupName, selectedConnection_id } = useSelector((states: RootState) => states.user.data);
    const updateGroupNameFn = React.useContext(UpdateGroupNameFunc);

    React.useEffect(() => {
        setState(prev => ({
            ...prev,
            text: selectedGroupName
        }))
    }, [selectedGroupName]);

    const { groups } = useSelector((states: RootState) => states.messages);
    const { body } = useSelector((states: RootState) => states.user.user);

    const getGroup = (): IMessageGroupObj => {
        const filter = groups.filter((group: IMessageGroupObj) => group.connection_id === selectedConnection_id);

        return filter[0];
    }

    const data = getGroup();

    const updateText = (text: string): void => {
        setState(prev => ({
            ...prev,
            state: true,
            text
        }));
    }


    const toggleUpdateBtn = (): void => {
        setState(prev => ({
            ...prev,
            state: !prev.state
        }))
    }

    const groupNameFn = () => {
        dispatch(setUp_selectedChatData({ groupName: state.text, connection_id: selectedConnection_id }));
        updateGroupNameFn(state.text);
        setState(prev => ({
            ...prev,
            state: !prev.state
        }));
    }

    return (
        <>
            <div className="chatbox m-5 rounded-md border-gray-100 border-2 flex flex-col items-center justify-center">
                {(selectedGroupName === "") ? (
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
                                                {!state.state ? (
                                                    <Titled>{data.group_name}</Titled>
                                                ) : (
                                                    <>
                                                        <input
                                                            type="text"
                                                            value={state.text}
                                                            onChange={e => updateText(e.target.value)}
                                                            className="border-2 border-slate-400 border-solid outline-none rounded-md px-2"
                                                        />
                                                        <button
                                                            style={{ backgroundColor: "#1976d2" }}
                                                            className="text-white rounded-lg text-sm py-1 px-3 ml-3"
                                                            onClick={groupNameFn}
                                                            disabled={state.text.trim() === ""}
                                                        >
                                                            Update
                                                        </button>
                                                    </>
                                                )}
                                                {!state.state && <IoArrowRedoSharp style={{ cursor: 'pointer' }} onClick={toggleUpdateBtn} />}
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
