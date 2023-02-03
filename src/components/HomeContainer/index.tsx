import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

function HomeContainer() {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} />
            </Container>
      </React.Fragment>
      );
}

export default HomeContainer;