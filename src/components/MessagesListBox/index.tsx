import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import ChatGroup from '../ChatGroup';
import { IMessageGroupObj } from '../../store/messages';

function MessagesListBox() {
    const groups = useSelector((state: RootState) => state.messages.groups);



    return (
        <>
            <div className="m-5 rounded-md border-gray-100 border-2 flex flex-col">
                <div className="border-b-2 border-gray-100 flex flex-row py-3 px-3">
                    <p className="font-bold">Messages</p>
                </div>

                <div className="p-4">
                    {(!groups.length) ? (
                        <p>Not messages to show</p>
                    ) : (
                        <>
                            {groups.map((chat: IMessageGroupObj, id: number) => <ChatGroup groupName={chat.group_name} time={chat.time} key={id} data={chat.messages} /> )}
                        </>
                    )}
                </div>
            </div>         
        </>
    );
}

export default React.memo(MessagesListBox);
