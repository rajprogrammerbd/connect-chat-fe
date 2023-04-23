import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import QuestionBox from '../QuestionBox';
import ChatBox from '../chatBox';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { RootState } from '../../store/store';
import { SocketConnection } from '../../App';
import cogoToast from 'cogo-toast';
import { add_new_user_update, received_message, set_isConnected, set_isError, update_total_messages } from '../../store';
import { IMsg, IReciveUser, ISendMsgType, IUser } from '../../Types';

function HomeContainer() {
    const socket = React.useContext(SocketConnection);

    const dispatch = useAppDispatch();
    const [isSocketConnected, setIsSocketConnected] = React.useState(socket.connected);

    const { isShownNotification, isConnected, isErrorOccured, userId, chatId } = useAppSelector((state: RootState) => state.user);

    const userTypingStart = (chatId: string, userId: string): void => {
        socket.emit('user_typing_message_start', chatId, userId);
    }

    const userTypingStop = (chatId: string, userId: string): void => {
        socket.emit('user_typing_message_stop', chatId, userId);
    }

    React.useEffect(() => {
        socket.on('connect', () => {
            setIsSocketConnected(true);
        });
    
        socket.on('disconnect', () => {
            setIsSocketConnected(false);
        });
      }, []);

      React.useEffect(() => {
        /*
        if (isSocketConnected) {
            if (chatId !== '' && userId !== '') {
                socket.emit('retrieve_info_of_refreshed_user', userId, accessId, connectedAccessId);
            }
        }
        */
      }, [isSocketConnected]);

      React.useEffect(() => {
        socket.on('add_new_user_update', (obj: IUser[], msg: IMsg[]) => {
            dispatch(add_new_user_update(obj));
            dispatch(update_total_messages(msg));
        });
        /*
        socket.on('responding-typing-message', (msg: LinkedList) => {
            dispatch(update_total_messages(msg));
        });
        */
        socket.on('update-all-messages', (msg: IMsg[]) => {
            dispatch(update_total_messages(msg));
        });
        /*
        socket.on('update-message-connectedUser', (msg: LinkedList, user: IUsersName[]) => {
            dispatch(update_message_and_connectedUser({ msg, users: user }));
        });

        socket.on('refreshed_new_existed_user', (obj: INewConnectionResponse) => {

            dispatch(received_message({
                accessId: obj.accessId,
                connected: obj.userIds,
                connectedAccessId: obj.connectedAccessId,
                messages: obj.messages,
                userId: obj.userId,
                userName: obj.name
            }));
         });

         socket.on('failed_response', (obj: IFailedResponse) => {
            dispatch(set_isError(true));                    
            handleNotificationOpen(obj.message, true);
        });
        */

        socket.on('recived_new_existed_user', (obj: IReciveUser) => {

            // socket.emit('update-connected-user', obj.userIds, obj.connectedAccessId === '' ? obj.accessId : obj.connectedAccessId);

            dispatch(set_isError(false));

            if (!isShownNotification) {
                dispatch(set_isConnected(true));
                handleNotificationOpen(obj.message, false);
            }

            const { chatId, connectedUsersList, messages, name, userId } = obj;

            dispatch(received_message({ chatId: chatId, connectedUsersList, messages, name: name, userId, isAdmin: false }));
        });

        /*
        socket.on('updated-connected-users', (obj: IUsersName[], msg: LinkedList) => {
            dispatch(update_connected_users({ msg, obj }));
        });
        */
        socket.on("receive_new_connection", (resObj: IReciveUser) => {
            if (!resObj.connection) {
                dispatch(set_isError(true));
                handleNotificationOpen(resObj.message, true);
            } else {
                dispatch(set_isError(false));
                if (!isShownNotification) {
                    dispatch(set_isConnected(true));
                    handleNotificationOpen(resObj.message, false);
                }

                const { chatId, connectedUsersList, messages, name, userId } = resObj;
                console.log('execute');
                dispatch(received_message({ chatId: chatId, connectedUsersList, messages, name: name, userId, isAdmin: true }));
            }
        });
    }, []);

    const sendMessage = (msg: ISendMsgType) => {
        socket.emit('send_message', msg.chatId, msg.userId, msg.msg);

        socket.emit('update-msg-user', msg.chatId, msg.userId);
    }

    const handleNotificationOpen = (message: string, isError: boolean) => {
        const { hide } = cogoToast[isError ? "error": "success"](message, {
            onClick: () => {
                if (hide) {
                    hide();
                }
            },
        });
    }

    const startExistedConnection = (name: string, chatID: string) => {
        if (isSocketConnected) {
            socket.emit('add_new_existed', name, chatID);
        }
    }

    const startNewConnection = (name: string) =>  {
        if (isSocketConnected) {
            socket.emit('new_user', name);
        }
    }

    const setDialogLocallyResDefault = () => {
        dispatch(set_isError(false));
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Box sx={{ height: '100vh',  display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', p: 0, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: "80%", height: '80%', border: '1px solid #ddd' }}>
                        {isConnected ? <ChatBox userTypingStart={userTypingStart} userTypingStop={userTypingStop} sendMessage={sendMessage} /> : <QuestionBox setDialogLocallyResDefault={setDialogLocallyResDefault} canOpen={isErrorOccured} startExistedConnection={startExistedConnection} startNewConnection={startNewConnection} />}
                    </Box>
                </Box>
            </Container>
      </React.Fragment>
    );
}

export default React.memo(HomeContainer);
