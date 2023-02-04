import * as React from 'react';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import { Button, FormLabel, Stack } from '@mui/material';
import textFinder from '../assets/static-texts';

function QuestionBox() {
    return (
        <>
            <Typography variant="h5" gutterBottom>{textFinder('longDescriptionFormText')}</Typography>
            <FormControl sx={{ m: 3, display: 'block' }} component="fieldset" variant="standard">
                <FormLabel component="legend">{textFinder('questionAboutExistedID')}</FormLabel>

                <Stack spacing={1} mt={1} direction="row">
                    <Button variant="contained">{textFinder('existedIdButtonText')}</Button>
                    <Button variant="contained">{textFinder('startNewChatButtonText')}</Button>
                </Stack>
            </FormControl>
        </>
    );
}

export default React.memo(QuestionBox);
