import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import textFinder from '../assets/static-texts';
import { Button } from '@mui/material';
import CustomInput from '../customTextField';

interface IPropsOfState {
    name: string;
    chatID: string;
}
interface IProps {
    isOpen: boolean;
    closedFn: () => void;
    formSumit: (state: IPropsOfState) => void;
}

interface ISubmitted {
    isSubmitted: boolean;
}

function DialogBar(props: IProps) {
    const { isOpen, closedFn, formSumit } = props;

    const [state, setState] = React.useState<IPropsOfState>({
        name: '',
        chatID: ''
    });

    const [submittedData, setSubmittedData] = React.useState<ISubmitted>({ isSubmitted: false });

    const changeNameText = (event: any) => {
        const { value } = event.target;

        setState({ ...state, name: value });
    }

    const changeChatId = (event: any) => {
        const { value } = event.target;

        setState({ ...state, chatID: value });
    }

    const formSubmittedLocally = () => {
        setSubmittedData({ ...submittedData, isSubmitted: true });
        formSumit(state);
    }

    return (
        <>
            <Dialog
                open={isOpen}
                onClose={closedFn}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {textFinder('labelOfAskingID')}
                </DialogTitle>

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {textFinder('noteOfAdminPermission')}
                    </DialogContentText>

                    <CustomInput type="text" value={state.chatID} onChange={changeChatId} placeholder={textFinder('placeholderForNameInput')}  />
                    <CustomInput type="text" value={state.name} onChange={changeNameText} placeholder={textFinder('placeholderForIDInput')} />
                </DialogContent>

                <DialogActions>
                    <Button onClick={closedFn}>Disagree</Button>
                    <Button onClick={formSubmittedLocally}>
                        {submittedData.isSubmitted ? <CircularProgress /> : textFinder('submit')}
                    </Button>
                </DialogActions>

            </Dialog>
        </>
    );
}

export default React.memo(DialogBar);
