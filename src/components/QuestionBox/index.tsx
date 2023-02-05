import * as React from 'react';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import { Button, FormLabel, Stack } from '@mui/material';
import textFinder from '../assets/static-texts';
import DialogBar from '../DialogBar';

interface IDialogState {
    openDialog: boolean;
    forNewUser: boolean;
}

interface IProps {
    startNewConnection: () => void;
}

function QuestionBox(props: IProps) {
    const { startNewConnection } = props;

    const [dialog, setDialog] = React.useState<IDialogState>({ openDialog: false, forNewUser: false });

    const openBar = () => {
        setDialog({ ...dialog, openDialog: true, forNewUser: false });
    }

    const openBarForNewUser = () => {
        setDialog({ ...dialog, openDialog: true, forNewUser: true });
    }

    const closeBar = () => {
        setDialog({ ...dialog, openDialog: false });
    }

    const formSubmitted = (event: any) => {
        console.log('formSubmitted', event);
    }

    return (
        <>
            <Typography variant="h5" gutterBottom>{textFinder('longDescriptionFormText')}</Typography>
            <FormControl sx={{ m: 3, display: 'block' }} component="fieldset" variant="standard">
                <FormLabel component="legend">{textFinder('questionAboutExistedID')}</FormLabel>

                <Stack spacing={1} mt={1} direction="row">
                    <Button variant="contained" onClick={openBar}>{textFinder('existedIdButtonText')}</Button>
                    <Button variant="contained" onClick={openBarForNewUser}>{textFinder('startNewChatButtonText')}</Button>
                </Stack> { /** startNewConnection **/}
            </FormControl>
            <DialogBar isOpen={dialog.openDialog} closedFn={closeBar} formSumit={formSubmitted} isNewUser={dialog.forNewUser} />
        </>
    );
}

export default React.memo(QuestionBox);
