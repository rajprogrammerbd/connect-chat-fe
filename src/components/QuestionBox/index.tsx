import * as React from 'react';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import { Button, FormLabel, Stack } from '@mui/material';
import textFinder from '../assets/static-texts';
import DialogBar from '../DialogBar';

interface IDialogState {
    openDialog: boolean;
}

interface IProps {
    startNewConnection: () => void;
}

function QuestionBox(props: IProps) {
    const { startNewConnection } = props;

    const [dialog, setDialog] = React.useState<IDialogState>({ openDialog: false });

    const openBar = () => {
        setDialog({ ...dialog, openDialog: true });
    }

    const closeBar = () => {
        setDialog({ ...dialog, openDialog: false });
    }

    const formSubmitted = () => {
        
    }

    return (
        <>
            <Typography variant="h5" gutterBottom>{textFinder('longDescriptionFormText')}</Typography>
            <FormControl sx={{ m: 3, display: 'block' }} component="fieldset" variant="standard">
                <FormLabel component="legend">{textFinder('questionAboutExistedID')}</FormLabel>

                <Stack spacing={1} mt={1} direction="row">
                    <Button variant="contained" onClick={openBar}>{textFinder('existedIdButtonText')}</Button>
                    <Button variant="contained" onClick={startNewConnection}>{textFinder('startNewChatButtonText')}</Button>
                </Stack>
            </FormControl>
            <DialogBar isOpen={dialog.openDialog} closedFn={closeBar} formSumit={formSubmitted} />
        </>
    );
}

export default React.memo(QuestionBox);
