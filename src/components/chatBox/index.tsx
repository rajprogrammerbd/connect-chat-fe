import * as React from 'react';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import NotificationBar from '../NotificationBar';
import { useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/store';
import { Modal } from '@mui/material';
import map from '../../helper';
import LinkedList, { IValues } from '../../Data/LinkedList';
import ShowMessageNotificationBar from '../showMessageNotificationBar';
import MessageBar from '../messageBar';
import { useDispatch } from 'react-redux';
import { update_the_message } from '../../store';

type SEVERITY = "error" | "warning" | "info" | "success";

interface INotificationBar {
    open: boolean;
    message: string;
    duration: number;
    severity: SEVERITY;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const useStyles: any = makeStyles({
    inputBox: {
        width: '100%',
        borderRadius: '20px',
        outline: 0,
        border: 'none',
        padding: '10px 20px'
    },
    common: {
        backgroundColor: 'inherit',
        display: 'flex',
        // border: '1px solid #ddd',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '10px 15px 10px 15px'
    },
    design_scrollbar: {
        backgroundColor: 'inherit',
        overflow: 'auto',
        visibility: 'inherit',
        '&::-webkit-scrollbar': {
            width: '10px'
        },
        '&::-webkit-scrollbar-track': {
            background: "#f1f1f1" 
        },
        '&::-webkit-scrollbar-thumb': {
            background: '#888'
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: '#555'
          }
    },
  });

interface IUserType {
    status: boolean;
    id: string;
}

interface IProps {
    sendMessage: (msg: IValues) => void;
    userTypingFn: (obj: IUserType) => void;
}

function ChatBox(props: IProps) {
    const { sendMessage, userTypingFn } = props;
    const container = React.useRef<HTMLElement>();
    const inputRef = React.useRef<any>();

    const dispatch = useDispatch();

    const { userName, connected, accessId, isAdmin, connectedAccessId, messages, userId } = useAppSelector((state: RootState) => state.websocketReducer);

    const id = `${userName}-${userId}`;

    const [notification, setNotification] = React.useState<INotificationBar>({ open: false, message: '', duration: 2000, severity: 'warning' });
    const [userTyping, setUserTyping] = React.useState<IUserType>({ status: false, id: `${userName}-${userId}` });

    const [accessVisible, setAccessVisible] = React.useState<boolean>(false);
    const [input, setInput] = React.useState<string>('');

    React.useEffect(() => {
        userTypingFn(userTyping);
    }, [userTyping]);

    React.useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }

        if (container.current) {
            container.current.scrollTop = container.current.scrollHeight;
        }
    });

    const openNotification = (message: string, type: SEVERITY) => {
        setNotification({ ...notification, open: true, message, severity: type });
    }

    const closeNotification = () => {
        setNotification({ ...notification, open: false });
    }

    const classes = useStyles();

    const sendMsg = () => {
        if (input !== '') {
            const msg: IValues = {
                message: input,
                timeStamp: new Date(),
                type: 'message',
                userId,
                userName
            };

            const newList = new LinkedList();
            let current = messages?.head;

            while (current) {
                newList.push(current.value);

                if (current.next === null) {
                    newList.push(msg);
                    break;
                }
                current = current.next;
            }

            setInput('');
            setUserTyping({ ...userTyping, status: false });
            dispatch(update_the_message(newList));
            sendMessage(msg);
        }
    }

    const keyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (input !== '') {
                if (event.code === "Enter") {
                sendMsg();
            }
        }
    }

    React.useEffect(() => {
        if (connected.length === 0) {
            const timeout = window.setTimeout(() => {
                openNotification('Still one is available on the chat', 'warning');
            }, 10000);

            return () => {
                window.clearTimeout(timeout);
            }
        }
    }, [connected]);


    const onChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        if (value !== '') {
            setUserTyping({ ...userTyping, status: true });
        } else {
            setUserTyping({ ...userTyping, status: false });
        }

        setInput(value);
    }

    return (
        <>
            <Box sx={{ width: 1, height: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textTransform: 'uppercase', fontWeight: 'bold' }}>
                            {userName}
                        </Typography>
                        <Button color="inherit" size="small" onClick={() => setAccessVisible(true)}>Access ID</Button>
                    </Toolbar>
            </AppBar>


            <Box
                className={classes.design_scrollbar}
                ref={container}
                sx={{
                    width: 1,
                    height: 1
                }}
            >
                {/* Chats going to appear in here */}
                {map(messages as LinkedList).map((obj: IValues, index) => (
                    obj.type !== 'typing' || (obj.type === 'typing' && obj.typingId !== id) ? (
                        <Box key={index} className={classes.common} sx={{ justifyContent: (obj.type !== 'message' && obj.type !== 'typing') ? 'center' : ((obj.type === 'message' || obj.type === 'typing') && userId === obj.userId) ? "flex-start" : "flex-end" }}>
                        {obj.type !== 'message' ? <ShowMessageNotificationBar msg={obj} /> : <MessageBar msg={obj} />}
                    </Box>
                    ) : null
                ))}
            </Box>


            <AppBar position="static" sx={{ bottom: 0 }}>
                <Toolbar sx={{ w: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <input type="text" ref={inputRef} onKeyUp={keyPress} className={classes.inputBox} value={input} onChange={onChangeInputValue} placeholder='Enter your message' />
                    <Button color="inherit" disabled={input === '' ? true : false} onClick={sendMsg}>Send</Button>
                </Toolbar>
            </AppBar>
        </Box>

        <NotificationBar duration={notification.duration} handleClose={closeNotification} message={notification.message} open={notification.open} severity={notification.severity} />
        <Modal
            open={accessVisible}
            onClose={() => setAccessVisible(false)}
            aria-labelledby="access-id-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Access ID
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {isAdmin ? accessId : connectedAccessId}
                </Typography>
        </Box>
      </Modal>
        </>
    );
}

export default React.memo(ChatBox);
