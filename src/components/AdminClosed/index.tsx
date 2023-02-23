import React from 'react';
import { CssBaseline, Container, Box, Typography, Button } from '@mui/material';
import { useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/store';
import { useDispatch } from 'react-redux';
import { reset_websocket } from '../../store';
import { reset_socket } from '../../store/socket';

function AdminClosed() {
    const dispatch = useDispatch();
    const { adminErrorMessage } = useAppSelector((state: RootState) => state.socketSlice);

    const clickReset = () => {
        dispatch(reset_websocket({}));
        dispatch(reset_socket({}));
    }

    return (
        <>
            <CssBaseline />
            <Container maxWidth="lg">
                <Box sx={{ height: '100vh',  display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', p: 0, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: "80%", height: '80%', border: '1px solid #ddd' }}>
                    <Typography variant="h4" gutterBottom>
                        {adminErrorMessage}
                    </Typography>

                    <Typography variant="button" display="block" gutterBottom>
                        Go back to homepage
                    </Typography>
                    <Button onClick={clickReset} variant="contained">GO BACK</Button>
                    </Box>
                </Box>
            </Container>
        </>
    );
}

export default AdminClosed;
