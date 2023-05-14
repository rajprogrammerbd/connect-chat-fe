import React from 'react';
import { CssBaseline, Container, Box, Typography, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { resetStoreDispatch } from '../../helper';

interface IProps {
    text: string;
}

function AdminClosed(props: IProps) {
    const dispatch = useDispatch();
    const { text } = props;

    const clickReset = () => {
        resetStoreDispatch(dispatch);
    }

    return (
        <>
            <CssBaseline />
            <Container maxWidth="lg">
                <Box sx={{ height: '100vh',  display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', p: 0, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: "80%", height: '80%', border: '1px solid #ddd' }}>
                    <Typography variant="h4" gutterBottom>
                        {text}
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
