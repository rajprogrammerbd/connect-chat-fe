import React from 'react';
import styled from 'styled-components';
import { RiGroup2Line } from "react-icons/ri";
import { IChatGroupProps } from '../../Types';
import { DisplayChatFn, DisplayName } from '../LoginBody';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useDispatch } from 'react-redux';
import { setUp_selectedChatData } from '../../store';

const GridMessageItemBlock = styled.div<{$bgColor: string}>`
    display: grid;
    gap: 10px;
    grid-template-columns: 0.5fr 4fr;
    grid-template-rows: auto;
    cursor: pointer;
    background-color: ${prop => prop.$bgColor ? prop.$bgColor : "inherit"};
    padding: 10px 15px;
`;

const Top = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const GroupName = styled.h5`
    font-size: 15px;
    font-weight: bold;
`;

const DisplayTime = styled.small`
    font-size: 12px;
`;

const Bottom = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const LastMessage = styled.p`
    font-size: 12px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;

function ChatGroup(props: IChatGroupProps) {
    const dispatch = useDispatch();
    // const display = React.useContext(DisplayChatFn);
    // const name = React.useContext(DisplayName);
    const { selectedGroupName } = useSelector((state: RootState) => state.user.data);
    
    const { data, groupName, time, connection_id } = props;

    const handleDisplay = (groupName: string, connection_id: string) => {
        dispatch(setUp_selectedChatData({ groupName, connection_id }));
        /*
        if (name === groupName) {
            display(connection_id);
        } else {
            display(connection_id, groupName);
        }
        */
    }

    return (
        <>
            <GridMessageItemBlock
                $bgColor={selectedGroupName === groupName ? "#ddd" : "transparent"}
                onClick={() => handleDisplay(groupName, connection_id)}
                className="message-items-block"
            >
                <div className="flex items-center justify-center">
                    <RiGroup2Line size={30} />
                </div>

                <div className="flex flex-col">
                    <Top>
                        <GroupName>{groupName}</GroupName>
                        <DisplayTime>{time}</DisplayTime>
                    </Top>

                    <Bottom>
                        <LastMessage>
                            {data[data.length - 1].username}: {data[data.length - 1].message}
                        </LastMessage>
                    </Bottom>
                </div>
            </GridMessageItemBlock>
        </>
    );
}

export default React.memo(ChatGroup);
