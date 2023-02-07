import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import QuestionBox from '../QuestionBox';
import ChatBox from '../chatBox';
import NotificationBar from '../NotificationBar';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { received_message, set_isConnected, set_isError } from '../../store';
import { set_notification } from '../../store/notification';
import { RootState } from '../../store/store';
import LinkedList from '../../Data/LinkedList';

const socketUrl = import.meta.env.VITE_WEBSOCKET_URL as string;

function HomeContainer() {
    const dispatch = useAppDispatch();

    const { isShownNotification, isConnected, isErrorOccured } = useAppSelector((state: RootState) => state.websocketReducer);
    const { duration, message, status } = useAppSelector((state: RootState) => state.notificationReducer);

    const handleNotificationOpen = (message: string) => {
        dispatch(set_notification({ message, status: true }));
    }

    const closeNotification = () => {
        dispatch(set_notification({ message: '', status: false }));
    }

    const startNewConnection = (name: string) =>  {
        const wss = new WebSocket(socketUrl);

        wss.onopen = function() {
            wss.send(JSON.stringify({ newConnection: true, name }));

            wss.onmessage = function(data: any) {
                const parsed = JSON.parse(data.data);

                if (!parsed.connection) {
                    dispatch(set_isError(true));                    
                    handleNotificationOpen(parsed.message);
                } else {
                    dispatch(set_isError(false));
                    if (!isShownNotification) {
                        dispatch(set_isConnected(true));
                        handleNotificationOpen(parsed.message);
                        dispatch(received_message({ accessId: parsed.accessId, connected: parsed.userIds, userId: parsed.userId, userName: parsed.name, messages: new LinkedList() }));
                    }
                }
            }
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
                        {isConnected ? <ChatBox /> : <QuestionBox setDialogLocallyResDefault={setDialogLocallyResDefault} canOpen={isErrorOccured} startNewConnection={startNewConnection} />}
                    </Box>
                </Box>
                <NotificationBar duration={duration} handleClose={closeNotification} message={message} severity={"success"} open={status} />
            </Container>
      </React.Fragment>
      );
}

export default React.memo(HomeContainer);
