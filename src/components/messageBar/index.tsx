import React from 'react';
import { IValues } from '../../Data/LinkedList';

interface IProps {
    msg: IValues;
}

function MessageBar(props: IProps) {
    const { msg } = props;

    return (
        <>
            <h3>{msg.message}</h3>
        </>
    );
}

export default MessageBar;
