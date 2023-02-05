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

const socketUrl = import.meta.env.VITE_WEBSOCKET_URL as string;

function HomeContainer() {
    const [notification, setNotification] = React.useState<INotification>({ status: false, duration: 1000, message: '' });
    const ws = useWebSocket(socketUrl);
    const [state, setState] = React.useState<IState>({
        websocket: null,
        isConnected: false,
    });

    const handleNotificationOpen = (message: string) => {
        setNotification({ ...notification, status: true, message });
    }

    const handleNotificationClose = () => {
        setNotification({ ...notification, status: false });
    }

    const startNewConnection = () =>  {
        ws.sendJsonMessage({ newConnections: true });
    }

    React.useEffect(() => {
        const lastMessage: any = ws.lastJsonMessage !== null ? ws.lastJsonMessage : null;
        
        if (lastMessage !== null && !lastMessage.connection) {
            // This block means connection failed.
            handleNotificationOpen(lastMessage.message);

        }
    }, [ws.lastJsonMessage]);

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Box sx={{ height: '100vh',  display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', p: "40px", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: "80%", height: '80%', border: '1px solid #ddd' }}>
                        {state.isConnected ? <ChatBox ws={ws} /> : <QuestionBox startNewConnection={startNewConnection} />}
                    </Box>
                </Box>
                <NotificationBar duration={notification.duration} handleClose={handleNotificationClose} message={notification.message} open={notification.status} />
            </Container>
      </React.Fragment>
      );
}

export default React.memo(HomeContainer);
