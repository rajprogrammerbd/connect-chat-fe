import React from 'react';
import { IValues } from '../../Data/LinkedList';
import { makeStyles } from '@mui/styles';
import { Box, Typography } from '@mui/material';
import { useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/store';

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
    msg: IValues;
}

function MessageBar(props: IProps) {
    const { userId } = useAppSelector((state: RootState) => state.websocketReducer);
    const { msg } = props;
    const classes = useStyles();

    return (
        <>
            <Box className={classes.textWrapper} sx={{ alignItems: (msg.userId === userId) ? 'flex-start' : 'flex-end' }}>
                <Typography variant="caption" display="block" gutterBottom>{msg.userName}</Typography>
                <Typography className={classes.text} variant="body1" gutterBottom>{msg.message}</Typography>
                <Typography variant="caption" display="block" gutterBottom>{new Date(msg.timeStamp).toISOString()}</Typography>
            </Box>
        </>
    );
}

export default MessageBar;
