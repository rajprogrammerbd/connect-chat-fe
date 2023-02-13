import React from 'react';
import { IValues } from '../../Data/LinkedList';
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';


const useStyles: any = makeStyles({
    notifyMessage: {
        display: 'block',
        color: "#fff",
        background: '#1976d2',
        padding: '18px 21px',
        borderRadius: '20px'
    }
});

interface IProps {
    msg: IValues;
}

function ShowMessageNotificationBar(props: IProps) {
    const { msg } = props;

    const classes = useStyles();

    return (
        <>
            <Box className={classes.notifyMessage}>
            <Typography style={{ marginBottom: 0, lineHeight: 0 }} variant="caption" display="block" gutterBottom>{msg.message}</Typography>
            </Box>
        </>
    )
}

export default ShowMessageNotificationBar;
