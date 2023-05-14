import * as React from 'react';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/store';
import { Modal } from '@mui/material';
import ShowMessageNotificationBar from '../showMessageNotificationBar';
import MessageBar from '../messageBar';
import cogoToast from 'cogo-toast';
import { IMsg, ISendMsgType, Msg_Types } from '../../Types';
import { add_message } from '../../store';

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

interface IProps {
    sendMessage: (msg: any /* IValues */) => void;
    userTypingStart: (chatId: string, userId: string) => void;
    userTypingStop: (chatId: string, userId: string) => void;
}

function ChatBox(props: IProps) {
    const dispatch = useAppDispatch();
    const { sendMessage, userTypingStart, userTypingStop } = props;
    const container = React.useRef<HTMLElement>();
    const inputRef = React.useRef<any>();

    const { name, connectedUsersList, chatId, messages, userId } = useAppSelector((state: RootState) => state.user);

    const [accessVisible, setAccessVisible] = React.useState<boolean>(false);
    const [input, setInput] = React.useState<string>('');

    React.useEffect(() => {
        if (input === '') {
            userTypingStop(chatId ? chatId : '', userId ? userId : '');
        } else {
            userTypingStart(chatId ? chatId : '', userId ? userId : '');
        }
    }, [input]);

    React.useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }

        if (container.current) {
            container.current.scrollTop = container.current.scrollHeight;
        }
    });

    const openNotification = (message: string) => {
        const { hide } = cogoToast.warn(message, {
            onClick: () => {
                if (hide) {
                    hide();
                }
            },
        });
    }

    const classes = useStyles();

    const sendMsg = () => {
        if (input !== '') {
            const msg: ISendMsgType = {
                msg: input,
                userId: userId ? userId : '',
                chatId: chatId ? chatId : ''
            };

            setInput('');
            dispatch(add_message({
                type: Msg_Types.msg,
                chatId: chatId ? chatId : '',
                userName: name ? name : '',
                userId: userId ? userId : '',
                message: input,
                timestamp: new Date()
            }));
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
        if (connectedUsersList.length === 1) {
            const timeout = window.setTimeout(() => {
                openNotification('Still one is available on the chat');
            }, 10000);

            return () => {
                window.clearTimeout(timeout);
            }
        }
    }, [connectedUsersList]);


    const onChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        setInput(value);
    }

    return (
        <>
            <Box sx={{ width: 1, height: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textTransform: 'uppercase', fontWeight: 'bold' }}>
                            {name}
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
                {messages?.map((obj: IMsg, index) => (
                    (obj.type === 'typing' && obj.userId === userId) ? null : (
                        <Box key={index} className={classes.common} sx={{ justifyContent: (obj.type !== 'message' && obj.type !== Msg_Types.typing) ? 'center' : ((obj.type === 'message' || obj.type === 'typing') && userId === obj.userId) ? "flex-start" : "flex-end" }}>
                        {obj.type !== 'message' ? <ShowMessageNotificationBar msg={obj}/> : <MessageBar msg={obj} />}
                    </Box>
                    )
                ))}
            </Box>


            <AppBar position="static" sx={{ bottom: 0 }}>
                <Toolbar sx={{ w: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <input type="text" ref={inputRef} onKeyUp={keyPress} className={classes.inputBox} value={input} onChange={onChangeInputValue} placeholder='Enter your message' />
                    <Button color="inherit" disabled={input === '' ? true : false} onClick={sendMsg}>Send</Button>
                </Toolbar>
            </AppBar>
        </Box>

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
                    {chatId}
                </Typography>
        </Box>
      </Modal>
        </>
    );
}

export default React.memo(ChatBox);
