import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { io } from "socket.io-client";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import QuestionBox from '../QuestionBox';
import ChatBox from '../chatBox';
import NotificationBar from '../NotificationBar';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { received_message, set_admin, set_isConnected, set_isError, update_connected_users } from '../../store';
import { set_notification } from '../../store/notification';
import { RootState } from '../../store/store';
import LinkedList from '../../Data/LinkedList';
import { IFailedResponse, INewConnectionResponse, IUsersName } from '../../Types';

const socketUrl = import.meta.env.VITE_WEBSOCKET_URL as string;
const socket = io(socketUrl);
function HomeContainer() {
    const dispatch = useAppDispatch();
    const [isSocketConnected, setIsSocketConnected] = React.useState(socket.connected);

    const { isShownNotification, isConnected, isErrorOccured, userId, accessId, connectedAccessId } = useAppSelector((state: RootState) => state.websocketReducer);
    const { duration, message, status } = useAppSelector((state: RootState) => state.notificationReducer);

    const componentUnmounted = () => {
        socket.emit('remove_user', { accessId, userId });
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
        if (isSocketConnected) {
            if (accessId !== '' && userId !== '') {
                socket.emit('retrieve_info_of_refreshed_user', userId, accessId, connectedAccessId);
            }
        }
      }, [isSocketConnected]);

      React.useEffect(() => {
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
            handleNotificationOpen(obj.message);
        });

        socket.on('recived_new_existed_user', (obj: INewConnectionResponse) => {

            socket.emit('update-connected-user', obj.userIds, obj.connectedAccessId === '' ? obj.accessId : obj.connectedAccessId);

            dispatch(set_isError(false));
            if (!isShownNotification) {
                dispatch(set_isConnected(true));
                handleNotificationOpen(obj.message);
            }
            dispatch(set_admin(false));
            dispatch(received_message({
                accessId: obj.accessId,
                connected: obj.userIds,
                userId: obj.userId,
                userName: obj.name,
                messages: obj.messages,
                connectedAccessId: obj.connectedAccessId
            }));
        });

        socket.on('updated-connected-users', (obj: IUsersName[], msg: LinkedList) => {
            dispatch(update_connected_users({ msg, obj }));
        });

        socket.on("receive_new_connection", (resObj: INewConnectionResponse) => {
            console.log('recieved new connection ', resObj);
            if (!resObj.connection) {
                dispatch(set_isError(true));
                handleNotificationOpen(resObj.message);
            } else {
                dispatch(set_isError(false));
                if (!isShownNotification) {
                    dispatch(set_isConnected(true));
                    handleNotificationOpen(resObj.message);
                }
                dispatch(set_admin(true));

                dispatch(received_message({
                    accessId: resObj.accessId,
                    connected: resObj.userIds,
                    userId: resObj.userId,
                    userName: resObj.name,
                    messages: resObj.messages,
                    connectedAccessId: resObj.connectedAccessId
                }));
            }
        });
    }, []);

    const handleNotificationOpen = (message: string) => {
        dispatch(set_notification({ message, status: true }));
    }

    const closeNotification = () => {
        dispatch(set_notification({ message: '', status: false }));
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
                        {isConnected ? <ChatBox /> : <QuestionBox setDialogLocallyResDefault={setDialogLocallyResDefault} canOpen={isErrorOccured} startExistedConnection={startExistedConnection} startNewConnection={startNewConnection} />}
                    </Box>
                </Box>
                <NotificationBar duration={duration} handleClose={closeNotification} message={message} severity={"success"} open={status} />
            </Container>
      </React.Fragment>
    );
}

export default React.memo(HomeContainer);
