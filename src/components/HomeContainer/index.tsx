import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import QuestionBox from '../QuestionBox';
import ChatBox from '../chatBox';
import useWebSocket from 'react-use-websocket';
import NotificationBar from '../NotificationBar';

interface IState {
    websocket: WebSocket | null;
    isConnected: boolean;
    isShownNotification: boolean;
}

interface IRecived {
    connection: boolean;
    message: string;
}

interface INotification {
    status: boolean;
    duration: number;
    message: string;
}

interface DialogBarResTypes {
    isErrorOccured: boolean;
}

const socketUrl = import.meta.env.VITE_WEBSOCKET_URL as string;

function HomeContainer() {
    const [notification, setNotification] = React.useState<INotification>({ status: false, duration: 12000, message: '' });
    const ws = useWebSocket(socketUrl);
    const [state, setState] = React.useState<IState>({
        websocket: null,
        isConnected: false,
        isShownNotification: false,
    });
    const [dialogBarRes, setDialogBarRes] = React.useState<DialogBarResTypes>({ isErrorOccured: false });

    const handleNotificationOpen = (message: string) => {
        setNotification({ ...notification, status: true, message });
    }

    const closeNotification = () => {
        console.log('close notification');
        setNotification({ ...notification, status: false });
    }

    const startNewConnection = (name: string) =>  {
        ws.sendJsonMessage({ newConnection: true, name });
    }

    const setDialogLocallyResDefault = () => {
        // This block means connection failed.
        setDialogBarRes({ isErrorOccured: false });
    }

    React.useEffect(() => {
        const lastMessage: any = ws.lastJsonMessage !== null ? ws.lastJsonMessage : null;
        if (lastMessage !== null && !lastMessage.connection) {
            console.log('this runs when the request failed');
            // This block means connection failed.
            setDialogBarRes({ isErrorOccured: true });
            
            handleNotificationOpen(lastMessage.message);

        } else if (lastMessage !== null && lastMessage.connection) {
            setDialogBarRes({ isErrorOccured: false });
            if (!state.isShownNotification) {
                setState({ ...state, isConnected: true });
                handleNotificationOpen(lastMessage.message);
            }
        }
    }, [ws.lastJsonMessage]);

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Box sx={{ height: '100vh',  display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', p: 0, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: "80%", height: '80%', border: '1px solid #ddd' }}>
                        {state.isConnected ? <ChatBox ws={ws} /> : <QuestionBox setDialogLocallyResDefault={setDialogLocallyResDefault} canOpen={dialogBarRes.isErrorOccured} ws={ws} startNewConnection={startNewConnection} />}
                    </Box>
                </Box>
                <NotificationBar duration={notification.duration} handleClose={closeNotification} message={notification.message} severity={"success"} open={notification.status} />
            </Container>
      </React.Fragment>
      );
}

export default React.memo(HomeContainer);
