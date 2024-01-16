import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import textFinder from '../assets/static-texts';
import { useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/store';
import { Button } from '@mui/material';

function AppBarContainer() {
  const { isConnected } = useAppSelector((state: RootState) => state.user);
  const [showModal, setShowModal] = React.useState<boolean>(false);

  return (
    <Box sx={{ flexGrow: 1 }} position="fixed">
      <AppBar>
        <Toolbar variant="dense">
           <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }}>
            {textFinder('appName')}
          </Typography>
          {isConnected ? <Button color="inherit" onClick={() => setShowModal(true)}>Connected: 0</Button> : null}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default React.memo(AppBarContainer);

/*
      <Modal
            open={showModal}
            onClose={() => setShowModal(false)}
            aria-labelledby="show-list-title"
            aria-describedby="show-list-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Users name:
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {connectedUsersList.map((connectUser: IUser) => <Typography key={connectUser.userId} variant='h6' color="inherit">{connectUser.userName}</Typography>)}
                </Typography>
        </Box>
      </Modal>
*/