import React from 'react';
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import TypingBar from '../typingBar';
import { IMsg } from '../../Types';


const useStyles: any = makeStyles({
    notifyMessage: {
        display: 'block',
        color: "#fff",
        background: '#66a1db',
        padding: '18px 21px',
        borderRadius: '20px'
    },
    modified_notifyMessage: {
        display: 'block',
        color: "#fff",
        background: '#66a1db',
        borderRadius: '20px',
        padding: '5px 21px'
    }
});

interface IProps {
    msg: IMsg;
}

function ShowMessageNotificationBar(props: IProps) {
    const { msg } = props;

    const classes = useStyles();

    return (
        <>
            <Box className={msg.type === 'typing' ? classes.modified_notifyMessage : classes.notifyMessage}>
                {msg.type === 'typing' ? <TypingBar msg={msg} /> : <Typography style={{ marginBottom: 0, lineHeight: 0 }} variant="caption" display="block" gutterBottom>{msg.message}</Typography>}
            </Box>
        </>
    )
}

export default ShowMessageNotificationBar;
