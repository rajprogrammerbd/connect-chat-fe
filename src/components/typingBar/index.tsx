import React from 'react';
import { Box, Typography } from '@mui/material';
import { RootState } from '../../store/store';
import { useAppSelector } from '../../store/hooks';
import { makeStyles } from '@mui/styles';
import { SiGooglechat } from "react-icons/si";
import { IMsg } from '../../Types';

interface IProps {
    msg: IMsg;
}

const useStyles: any = makeStyles({
    push_right: {
        marginRight: '1px'
    },
    textDesign: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '0px !important'
    },
    text: {
        color: 'white',
        borderRadius: '20px 0px 20px 0',
        backgroundColor: '#7a7afd',
        padding: '5px 17px',
        fontSize: '15px !important'
    }
  });

function TypingBar(props: IProps) {
    const { userId } = useAppSelector((state: RootState) => state.user);

    const { msg } = props;
    const classes = useStyles();

    if (msg.userId === userId) {
        return null;
    }
    
    return (
        <>
            <Box>
                <Typography variant="caption" display="block" gutterBottom alignItems="center" className={classes.textDesign}><SiGooglechat size={12} className={classes.push_right} /> {msg.message}</Typography>
            </Box>
        </>
    );
}

export default TypingBar;
