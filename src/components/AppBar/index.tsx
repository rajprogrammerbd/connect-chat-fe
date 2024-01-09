import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import textFinder from '../assets/static-texts';
import { useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/store';
import { Button, IconButton, Modal } from '@mui/material';
import { IUser } from '../../Types';

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