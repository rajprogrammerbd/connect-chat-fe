import React from 'react';
import styled from 'styled-components';
import { RiGroup2Line } from "react-icons/ri";
import { IChatGroupProps } from '../../Types';

const GridMessageItemBlock = styled.div`
    display: grid;
    gap: 10px;
    grid-template-columns: 0.5fr 4fr;
    grid-template-rows: auto;
    cursor: pointer;
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
    const { data, groupName, time } = props;

    return (
        <>
            <GridMessageItemBlock className="message-items-block">
                <div className="flex items-center justify-center">
                    <RiGroup2Line size={30} />
                </div>

                <div className="flex flex-col">
                    <Top>
                        <GroupName>{groupName}</GroupName>
                        <DisplayTime>{time}</DisplayTime>
                    </Top>

                    <Bottom>
                        <LastMessage>{data[data.length - 1].username}: {data[data.length - 1].message}</LastMessage>
                    </Bottom>
                </div>
            </GridMessageItemBlock>
        </>
    );
}

export default React.memo(ChatGroup);
