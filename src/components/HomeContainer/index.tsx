import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

function HomeContainer() {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Box sx={{ height: '100vh',  display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Box sx={{ borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70% ", width: "80%", height: '80%', backgroundImage: 'linear-gradient(45deg,#3023AE 0%,#FF0099 100%)' }}></Box>
                </Box>
            </Container>
      </React.Fragment>
      );
}

export default HomeContainer;