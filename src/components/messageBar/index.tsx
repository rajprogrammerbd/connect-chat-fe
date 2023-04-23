import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Typography } from '@mui/material';
import { useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/store';
import { IMsg } from '../../Types';

const useStyles: any = makeStyles({
    textWrapper: {
        display: 'flex',
        flexDirection: 'column',
    },
    text: {
        color: 'white',
        borderRadius: '20px 0px 20px 0',
        backgroundColor: '#7a7afd',
        padding: '5px 17px',
        fontSize: '15px !important'
    }
  });

interface IProps {
    msg: IMsg;
}

function MessageBar(props: IProps) {
    const { userId } = useAppSelector((state: RootState) => state.user);
    const { chatId, message, timestamp, userName } = props.msg;
    const classes = useStyles();

    return (
        <>
            <Box className={classes.textWrapper} sx={{ alignItems: (props.msg.userId === userId) ? 'flex-start' : 'flex-end' }}>
                <Typography variant="caption" display="block" gutterBottom>{userName}</Typography>
                <Typography className={classes.text} variant="body1" gutterBottom>{message}</Typography>
                <Typography variant="caption" display="block" gutterBottom>{new Date(timestamp).toISOString()}</Typography>
            </Box>
        </>
    );
}

export default MessageBar;
