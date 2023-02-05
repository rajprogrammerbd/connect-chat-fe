import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface IProps {
    open: boolean;
    duration: number;
    handleClose: () => void;
    message: string;
}

function NotificationBar(props: IProps) {
    const { open, duration, handleClose, message } = props;

    const action = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );

    return (
        <Snackbar
        open={open}
        autoHideDuration={duration}
        onClose={handleClose}
        message={message}
        action={action}
      />
    );
}

export default NotificationBar;
